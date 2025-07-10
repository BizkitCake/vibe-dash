# Beautiful FastAPI Dashboard

A modern, responsive dashboard built with FastAPI featuring three interactive charts and real-time data visualization.

## Features

- 🚀 **Fast**: Built with FastAPI for high performance
- 🎨 **Beautiful**: Modern glassmorphism design with smooth animations
- 📱 **Responsive**: Works perfectly on desktop, tablet, and mobile
- 📊 **Interactive Charts**: Three example charts with real-time data
- 🐳 **Dockerized**: Easy deployment with Docker Compose
- 🔄 **Real-time**: Auto-refreshing dashboard with live data updates

## Dashboard Components

### Summary Statistics
- Total Users
- Revenue
- Conversion Rate  
- Active Sessions

### Interactive Charts
1. **Line Chart**: Revenue over time (30-day trend)
2. **Doughnut Chart**: Traffic by device type
3. **Bar Chart**: System performance metrics with color-coded status

## Quick Start

1. **Start the services**:
   ```bash
   docker-compose up -d
   ```

2. **Access the dashboard**:
   - Open your browser and navigate to: `http://localhost:8000`
   - The dashboard will load with sample data and interactive charts

3. **Stop the services**:
   ```bash
   docker-compose down
   ```

## API Endpoints

- `GET /` - Main dashboard interface
- `GET /api/stats` - Dashboard summary statistics
- `GET /api/chart1` - Line chart data (revenue over time)
- `GET /api/chart2` - Doughnut chart data (traffic by device)
- `GET /api/chart3` - Bar chart data (system performance)

## Development

### Local Development

1. **Install dependencies**:
   ```bash
   cd dashboard
   pip install -r requirements.txt
   ```

2. **Run the development server**:
   ```bash
   uvicorn main:app --reload --host 0.0.0.0 --port 8000
   ```

3. **Access the dashboard**:
   - Navigate to: `http://localhost:8000`

### Customization

- **Modify chart data**: Edit the data generation functions in `dashboard/main.py`
- **Update styling**: Modify the CSS in `dashboard/templates/dashboard.html`
- **Add new charts**: Create new API endpoints and corresponding frontend code

## Tech Stack

- **Backend**: FastAPI, Python 3.11
- **Frontend**: HTML5, CSS3, JavaScript (ES6+)
- **Charts**: Chart.js
- **Icons**: Font Awesome
- **Containerization**: Docker & Docker Compose
- **Database**: PostgreSQL (existing service)

## Health Checks

The dashboard includes health checks that monitor:
- Application availability
- API endpoint responsiveness
- Container health status

## Mobile Responsive

The dashboard is fully responsive and includes:
- Adaptive grid layouts
- Touch-friendly interactions
- Optimized mobile navigation
- Scalable chart visualizations

Enjoy your beautiful, fast dashboard! 🎉