const puppeteer = require('puppeteer-extra')
const StealthPlugin = require('puppeteer-extra-plugin-stealth')
puppeteer.use(StealthPlugin())

const delay = ms => new Promise(resolve => setTimeout(resolve, ms))

// Random user agents pool
const USER_AGENTS = [
  'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36',
  'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36',
  'Mozilla/5.0 (Windows NT 10.0; Win64; x64; rv:121.0) Gecko/20100101 Firefox/121.0',
  'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/605.1.15 (KHTML, like Gecko) Version/17.2 Safari/605.1.15',
  'Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36',
  'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Edge/120.0.0.0 Safari/537.36'
]

// Random viewport sizes
const VIEWPORT_SIZES = [
  { width: 1920, height: 1080 },
  { width: 1366, height: 768 },
  { width: 1536, height: 864 },
  { width: 1440, height: 900 },
  { width: 1280, height: 720 },
  { width: 768, height: 1024 },
  { width: 375, height: 667 }
]

// Simulate human-like typing
async function simulateTyping(page, selector, text, options = {}) {
  const { delay: typingDelay = 100, humanLike = true } = options
  await page.focus(selector)
  
  for (let char of text) {
    await page.keyboard.type(char)
    if (humanLike) {
      await delay(Math.random() * typingDelay + 50)
    } else {
      await delay(typingDelay)
    }
  }
}

// Simulate reading behavior
async function simulateReading(page, options = {}) {
  const { scrollPauses = 3, readingSpeed = 2000 } = options
  
  for (let i = 0; i < scrollPauses; i++) {
    await page.evaluate((scrollAmount) => {
      window.scrollBy({ top: scrollAmount, behavior: 'smooth' })
    }, Math.random() * 300 + 200)
    
    await delay(Math.random() * readingSpeed + 1000)
  }
}

// Click random links on the same domain
async function clickRandomLinks(page, url, options = {}) {
  const { maxClicks = 2, sameDomain = true } = options
  const baseUrl = new URL(url)
  
  try {
    const links = await page.$$eval('a[href]', (elements, baseHostname, sameDomain) => {
      return elements
        .map(el => ({ href: el.href, text: el.textContent?.trim() }))
        .filter(link => {
          if (!sameDomain) return true
          try {
            const linkUrl = new URL(link.href)
            return linkUrl.hostname === baseHostname
          } catch {
            return false
          }
        })
        .slice(0, 10) // Limit to first 10 links
    }, baseUrl.hostname, sameDomain)
    
    const clickCount = Math.min(maxClicks, links.length)
    for (let i = 0; i < clickCount; i++) {
      const randomLink = links[Math.floor(Math.random() * links.length)]
      if (randomLink) {
        console.log(`Attempting to click link: ${randomLink.text || randomLink.href}`)
        await Promise.race([
          page.goto(randomLink.href, { waitUntil: 'networkidle2', timeout: 15000 }),
          delay(15000)
        ])
        await delay(Math.random() * 3000 + 2000)
      }
    }
  } catch (error) {
    console.log('Link clicking failed:', error.message)
  }
}

async function simulateVisit({
  url,
  userAgent,
  waitTime = 10000,
  proxy = null,
  viewport = { width: 1366, height: 768 },
  headless = false,
  scrollCount = 3,
  randomizeActions = true,
  simulateTyping: enableTyping = false,
  clickLinks = false,
  simulateReads = true,
  customActions = [],
  geolocation = null,
  timezone = null,
  language = 'en-US',
  cookieConsent = true,
  screenshots = false,
  videoRecording = false
}) {  let browser = null;
  
  try {
    // Use random user agent if specified
    if (userAgent === 'random') {
      userAgent = USER_AGENTS[Math.floor(Math.random() * USER_AGENTS.length)]
    }
    
    // Use random viewport if specified
    if (viewport.width === 'random') {
      const randomViewport = VIEWPORT_SIZES[Math.floor(Math.random() * VIEWPORT_SIZES.length)]
      viewport = randomViewport
    }

    const launchOptions = {
      headless: headless === 'true' || headless === true,
      args: [
        '--no-sandbox',
        '--disable-setuid-sandbox',
        '--disable-blink-features=AutomationControlled',
        '--disable-web-security',
        '--disable-features=VizDisplayCompositor',
        `--window-size=${viewport.width},${viewport.height}`
      ]
    }

    if (proxy) {
      launchOptions.args.push(`--proxy-server=${proxy}`)
    }

    // Add timezone support
    if (timezone) {
      launchOptions.env = { ...process.env, TZ: timezone }
    }

    console.log(`Starting browser for ${url}...`);
    browser = await puppeteer.launch(launchOptions)
    const page = await browser.newPage()

    // Set user agent
    if (userAgent) {
      await page.setUserAgent(userAgent)
    }

    // Set viewport
    await page.setViewport(viewport)

    // Set language
    await page.setExtraHTTPHeaders({
      'Accept-Language': language
    })

    // Set geolocation if provided
    if (geolocation) {
      await page.setGeolocation({
        latitude: geolocation.latitude,
        longitude: geolocation.longitude
      })
    }

    // Stealth modifications
    await page.evaluateOnNewDocument(() => {
      Object.defineProperty(navigator, 'webdriver', {
        get: () => undefined,
      })
    })

    console.log(`Navigating to ${url}...`);
    await page.goto(url, { waitUntil: 'networkidle2', timeout: 30000 })

    console.log(`Successfully loaded ${url}, simulating user behavior...`);
    
    // Handle cookie consent if enabled
    if (cookieConsent) {
      try {
        const cookieSelectors = [
          'button[id*="accept"]',
          'button[class*="accept"]',
          'button[class*="cookie"]',
          'a[class*="accept"]',
          '[data-testid*="accept"]',
          '.cookie-accept',
          '.accept-cookies'
        ]
        
        for (const selector of cookieSelectors) {
          const element = await page.$(selector)
          if (element) {
            await element.click()
            console.log('Clicked cookie consent button')
            await delay(1000)
            break
          }
        }
      } catch (error) {
        console.log('Cookie consent handling failed:', error.message)
      }
    }

    // Take initial screenshot if enabled
    if (screenshots) {
      await page.screenshot({ 
        path: `screenshot-${Date.now()}-initial.png`,
        fullPage: false 
      })
    }

    // Simulate human-like mouse movements and interactions
    const movements = randomizeActions ? Math.floor(Math.random() * 5) + 2 : 3
    for (let i = 0; i < movements; i++) {
      const x = Math.floor(Math.random() * viewport.width)
      const y = Math.floor(Math.random() * viewport.height)
      await page.mouse.move(x, y, { steps: Math.floor(Math.random() * 20) + 10 })
      await delay(Math.random() * 1000 + 500)
    }

    // Simulate scrolling behavior
    for (let i = 0; i < scrollCount; i++) {
      const scrollAmount = Math.random() * 500 + 200
      await page.evaluate((amount) => {
        window.scrollBy({ top: amount, behavior: 'smooth' })
      }, scrollAmount)
      await delay(Math.random() * 2000 + 1000)
    }

    // Simulate reading if enabled
    if (simulateReads) {
      await simulateReading(page, { scrollPauses: Math.floor(scrollCount / 2) + 1 })
    }

    // Simulate typing in input fields if enabled
    if (enableTyping) {
      try {
        const inputs = await page.$$('input[type="text"], input[type="search"], textarea')
        if (inputs.length > 0) {
          const randomInput = inputs[Math.floor(Math.random() * inputs.length)]
          const sampleTexts = [
            'hello world',
            'test query',
            'sample text',
            'user input'
          ]
          const randomText = sampleTexts[Math.floor(Math.random() * sampleTexts.length)]
          
          await randomInput.focus()
          await simulateTyping(page, randomInput, randomText, { humanLike: true })
          console.log('Simulated typing in input field')
        }
      } catch (error) {
        console.log('Typing simulation failed:', error.message)
      }
    }

    // Click random links if enabled
    if (clickLinks) {
      await clickRandomLinks(page, url, { maxClicks: 2, sameDomain: true })
    }

    // Execute custom actions if provided
    if (customActions && customActions.length > 0) {
      for (const action of customActions) {
        try {
          await page.evaluate(action)
          await delay(1000)
        } catch (error) {
          console.log('Custom action failed:', error.message)
        }
      }
    }

    // Final wait time
    await delay(waitTime)
    
    // Take final screenshot if enabled
    if (screenshots) {
      await page.screenshot({ 
        path: `screenshot-${Date.now()}-final.png`,
        fullPage: false 
      })
    }
    
    console.log(`Completed simulation for ${url}`);
  } catch (error) {
    console.error(`Error simulating visit to ${url}:`, error.message);
    throw new Error(`Failed to simulate visit: ${error.message}`);
  } finally {
    if (browser) {
      await browser.close()
    }
  }
}

module.exports = { simulateVisit }
