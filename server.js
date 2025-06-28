const express = require('express')
const cors = require('cors')
const { simulateVisit } = require('./browserBot')

const app = express()
app.use(cors())
app.use(express.json())
app.use(express.static('public'))

app.post('/visit', async (req, res) => {
  const {
    url,
    count = 1,
    delay = 1000,
    userAgent,
    userAgentSelect,
    proxy,
    waitTime,
    viewportWidth,
    headless = false,
    scrollCount = 3,
    randomizeActions = true,
    simulateTyping = false,
    clickLinks = false,
    simulateReads = true,
    geolocation,
    timezone,
    language = 'en-US',
    cookieConsent = true,
    screenshots = false,
    videoRecording = false,
    customActions = []
  } = req.body

  try {
    // Validate URL format
    new URL(url);

    // Determine final user agent
    let finalUserAgent = userAgent || userAgentSelect
    if (userAgentSelect === 'random') {
      finalUserAgent = 'random'
    }

    // Determine viewport
    let viewport = { width: 1366, height: 768 }
    if (viewportWidth === 'random') {
      viewport.width = 'random'
    } else if (viewportWidth) {
      viewport.width = parseInt(viewportWidth)
      viewport.height = Math.floor(viewport.width * 0.6) // Maintain aspect ratio
    } else {
      viewport = {
        width: Math.floor(Math.random() * 400) + 1200,
        height: Math.floor(Math.random() * 200) + 700
      }
    }

    // Parse geolocation if provided
    let parsedGeolocation = null
    if (geolocation && geolocation.includes(',')) {
      const [lat, lng] = geolocation.split(',').map(coord => parseFloat(coord.trim()))
      if (!isNaN(lat) && !isNaN(lng)) {
        parsedGeolocation = { latitude: lat, longitude: lng }
      }
    }

    const simulationOptions = {
      url,
      userAgent: finalUserAgent,
      proxy,
      waitTime: waitTime || Math.floor(Math.random() * 15000 + 5000),
      viewport,
      headless,
      scrollCount: parseInt(scrollCount) || 3,
      randomizeActions: randomizeActions === 'true' || randomizeActions === true,
      simulateTyping: simulateTyping === 'true' || simulateTyping === true,
      clickLinks: clickLinks === 'true' || clickLinks === true,
      simulateReads: simulateReads === 'true' || simulateReads === true,
      geolocation: parsedGeolocation,
      timezone,
      language,
      cookieConsent: cookieConsent === 'true' || cookieConsent === true,
      screenshots: screenshots === 'true' || screenshots === true,
      videoRecording: videoRecording === 'true' || videoRecording === true,
      customActions: Array.isArray(customActions) ? customActions : []
    }

    // Start the first simulation and wait for it to begin successfully
    const firstSimulation = simulateVisit(simulationOptions);

    // Wait a moment to see if the first simulation starts without immediate errors
    await Promise.race([
      firstSimulation.catch(err => Promise.reject(err)),
      new Promise(resolve => setTimeout(resolve, 3000)) // Give it 3 seconds to start
    ]);

    // If we get here, the first simulation started successfully
    // Now start the remaining simulations with delays
    for (let i = 1; i < count; i++) {
      setTimeout(() => {
        simulateVisit({
          ...simulationOptions,
          waitTime: simulationOptions.waitTime || Math.floor(Math.random() * 15000 + 5000),
          viewport: simulationOptions.viewport.width === 'random' ? { width: 'random' } : {
            width: Math.floor(Math.random() * 400) + 1200,
            height: Math.floor(Math.random() * 200) + 700
          }
        }).catch(console.error)
      }, i * (parseInt(delay) || 1000))
    }

    res.json({ 
      status: 'started', 
      count,
      message: `Started ${count} visitor simulation(s) with advanced options`
    })
  } catch (error) {
    console.error('Simulation failed:', error);
    res.status(400).json({
      status: 'error',
      message: error.message || 'Failed to start simulation'
    })
  }
})

app.listen(3000, () => console.log('Control panel running at http://localhost:3000'))
