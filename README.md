# 🚀 Advanced Fake Visitor Bot

A comprehensive website traffic simulation tool with realistic visitor behavior patterns and extensive customization options.

## 🌟 Features

### Core Traffic Simulation
- **Multiple Visitors**: Simulate 1-1000+ concurrent visitors
- **Custom Delays**: Configure delays between visitor sessions
- **Session Duration Control**: From quick 5-second visits to 15-minute browsing sessions
- **Traffic Patterns**: Constant, burst, gradual, random, or peak-hour simulation

### 🎭 Realistic Behavior Simulation
- **Human-like Mouse Movements**: Randomized cursor movements and clicks
- **Intelligent Scrolling**: Multiple scroll actions with reading pauses
- **Text Input Simulation**: Types in forms and search boxes
- **Link Clicking**: Navigates through internal links (same domain)
- **Reading Simulation**: Pauses on content as if reading
- **Cookie Consent**: Automatically handles cookie banners

### 🌐 Browser & Device Options
- **User Agent Randomization**: Multiple browser signatures including Chrome, Firefox, Safari, Edge
- **Viewport Simulation**: Desktop (1920px), Laptop (1366px), Tablet (768px), Mobile (375px)
- **Headless/Visible Mode**: Run browsers visibly or in background
- **Device Mix**: Simulate traffic from mixed devices or specific device types

### 🌍 Geographic & Language Options
- **Geolocation**: Set custom latitude/longitude coordinates
- **Timezone Support**: 12+ major timezone options
- **Language Settings**: 12+ language/locale combinations
- **International Traffic**: Simulate visitors from different regions

### 🔧 Technical Features
- **Proxy Support**: Route traffic through proxy servers
- **Screenshot Capture**: Take before/after screenshots
- **Ad/Tracker Blocking**: Optional ad and tracker blocking
- **Performance Optimization**: Disable images/CSS for faster execution
- **JavaScript Control**: Enable/disable JS execution
- **Cache Management**: Clear cache between visits

### 📊 Analytics & Reporting
- **Detailed Logging**: Comprehensive activity logs
- **Performance Metrics**: Load times and interaction data
- **Error Reporting**: Enhanced error tracking and reporting
- **CSV Export**: Export results for analysis
- **Real-time Status**: Live updates on simulation progress

### 🎮 Advanced Customization
- **Custom JavaScript**: Execute custom browser actions
- **Bounce Rate Control**: Set realistic bounce rate percentages
- **Return Visitor Simulation**: Simulate returning vs new visitors
- **Referrer Simulation**: Mimic traffic from search engines, social media, or direct

### 💾 Preset Configurations
Pre-built configurations for different website types:
- **🔰 Basic Traffic**: Simple traffic simulation
- **🛒 E-commerce**: Online store traffic patterns
- **📝 Blog/Content**: Content consumption behavior
- **💼 SaaS Application**: Business application usage
- **👥 Social Media**: High-engagement social traffic
- **📰 News Website**: News reading patterns
- **🎮 Gaming Site**: Gaming community behavior
- **📱 Mobile-First**: Mobile-optimized traffic
- **🌍 International**: Global visitor simulation
- **🔥 Stress Test**: High-volume testing

## 🚀 Quick Start

1. **Install Dependencies**
   ```bash
   npm install
   ```

2. **Start Server**
   ```bash
   npm start
   ```

3. **Open Control Panel**
   Navigate to `http://localhost:3000`

4. **Configure & Launch**
   - Enter target URL
   - Select desired options
   - Choose a preset or customize settings
   - Click "Start Advanced Simulation"

## 📋 Usage Examples

### Basic Traffic Simulation
- URL: `https://example.com`
- Visitors: `10`
- Delay: `2000ms`
- Preset: `Basic Traffic`

### E-commerce Testing
- URL: `https://shop.example.com`
- Visitors: `25`
- Enable: Typing simulation, Link clicking
- Device Mix: `Mixed`
- Session Duration: `Medium`
- Preset: `E-commerce`

### International Traffic
- Multiple languages and timezones
- Geographic distribution
- Mixed device types
- Preset: `International`

### Stress Testing
- High visitor count (200+)
- Minimal delays
- Headless mode for speed
- Preset: `Stress Test`

## ⚙️ Configuration Options

### Traffic Control
- **Visitor Count**: 1-1000+ simultaneous visitors
- **Delay Between Visits**: 0-unlimited milliseconds
- **Session Duration**: Predefined ranges or custom min/max
- **Traffic Patterns**: Various timing distributions

### Behavior Settings
- **Scroll Actions**: 1-10 scroll events per session
- **Mouse Randomization**: Enable/disable random movements
- **Typing Simulation**: Interact with form fields
- **Link Navigation**: Click internal links
- **Reading Simulation**: Pause on content
- **Bounce Rate**: Control visitor retention (0-100%)

### Technical Settings
- **Browser Mode**: Headless or visible
- **User Agents**: Random, specific, or custom
- **Proxy**: Optional proxy server configuration
- **Viewport**: Screen resolution simulation
- **Resource Loading**: Control image/CSS loading
- **JavaScript**: Enable/disable JS execution

## 🛡️ Safety & Ethics

- **Respect robots.txt**: Check target site's robots.txt
- **Rate Limiting**: Use appropriate delays to avoid overwhelming servers
- **Terms of Service**: Ensure compliance with target site's ToS
- **Local Testing**: Primarily designed for testing your own websites
- **Resource Usage**: Monitor system resources during large simulations

## 🔒 Privacy & Security

- **No Data Collection**: Tool doesn't collect or store user data
- **Local Execution**: All simulations run locally
- **Proxy Support**: Route traffic through proxies for privacy
- **Stealth Mode**: Includes stealth plugins to avoid detection

## 📈 Performance Tips

- **Headless Mode**: Use for faster execution with many visitors
- **Resource Blocking**: Disable images/CSS for speed
- **Proxy Rotation**: Use different proxies for large simulations
- **Batch Processing**: Spread large visitor counts over time
- **System Resources**: Monitor CPU/Memory usage

## 🐛 Troubleshooting

### Common Issues
- **Browser Launch Failures**: Check Chrome/Chromium installation
- **Proxy Errors**: Verify proxy server accessibility
- **High Memory Usage**: Reduce concurrent visitors
- **Network Timeouts**: Increase timeout values or reduce load

### Performance Issues
- **Slow Execution**: Enable headless mode, disable images
- **High CPU Usage**: Reduce visitor count or increase delays
- **Memory Leaks**: Restart application periodically for long runs

## 📝 License

ISC License - See package.json for details

## 🤝 Contributing

This is an educational/testing tool. Use responsibly and in accordance with website terms of service and applicable laws.

---

**⚠️ Disclaimer**: This tool is for legitimate website testing and traffic analysis purposes. Users are responsible for ensuring compliance with target website terms of service and applicable laws.
