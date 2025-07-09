# Vibe Dashboard

A modern, personal dashboard application with editable graphs and real-time data visualization from PostgreSQL.

## 🚀 Features

- **Editable Graphs**: Low-code graph editing with React ApexCharts
- **Real-time Data**: Direct PostgreSQL polling (every 1 hour) with manual refresh option
- **Modern UI**: Clean, responsive dashboard interface
- **Docker Ready**: Single command deployment with `docker compose up -d --build`
- **Manager-Friendly**: Well-documented and easy to understand

## 🛠 Tech Stack

### Backend
```
Node.js (LTS) + Express.js
```
*Simple and efficient API server, with direct access to Postgres via REST. Leaves room for future GraphQL if needed.*

### Frontend
```
React 18+ (SPA, TypeScript, Vite)
```
*Modern, fast, and widely supported. SPA is ideal for internal tools with dynamic data and no SEO needs.*

### Graphs Library
```
React ApexCharts
```
*Rich set of graph types (line, bar, pie, heatmap), highly customizable via JSON config—perfect for low-code editability.*

### Database
```
PostgreSQL
```
*Reliable SQL database, ideal for time-series and aggregate queries. No sharding needed for a personal project.*

### Package Manager
```
pnpm (with workspaces)
```
*Faster, disk-efficient package manager with native monorepo support. Great for projects with separate frontend/backend.*

### Deployment
```
Docker + Docker Compose
```
*Spin up the full stack with one command. Clean separation of services, easy to deploy, manage, and document.*

### Configuration
```
.env + ENABLE_EDIT env toggle
```
*Keeps secrets/configs out of code. `ENABLE_EDIT` controls edit mode without adding auth complexity.*

### Documentation
```
README.md (with setup, architecture, and usage)
```
*Makes project clear and maintainable, even for non-devs or external contributors (e.g., on GitHub).*

## 📋 Requirements

### Core Expectations
1. **Node.js Server**: Launched with `pnpm` for efficient package management
2. **Single Frontend Framework**: Modern React-based SPA with TypeScript
3. **Manager-Friendly**: Clear documentation and simple setup process
4. **Public Repository**: Designed for GitHub hosting with personal use focus
5. **Docker Deployment**: Single command: `docker compose up -d --build`

### Technical Constraints
1. **Editable Graphs**: Low-code editing capabilities for all chart types
2. **PostgreSQL Integration**: Direct database polling every 1 hour + manual refresh
3. **No Database Sharding**: Simple PostgreSQL setup for personal use

## 🏗 Architecture

```
┌─────────────────┐    ┌─────────────────┐    ┌─────────────────┐
│   React SPA     │    │   Express API   │    │   PostgreSQL    │
│   (Frontend)    │◄──►│   (Backend)     │◄──►│   (Database)    │
│                 │    │                 │    │                 │
│ • ApexCharts    │    │ • REST API      │    │ • Time-series   │
│ • TypeScript    │    │ • Data polling  │    │ • Aggregates    │
│ • Vite build    │    │ • Graph config  │    │ • No sharding   │
└─────────────────┘    └─────────────────┘    └─────────────────┘
```

## 🚀 Quick Start

### Prerequisites
- Docker and Docker Compose
- Node.js LTS (for development)
- pnpm (for development)

### Production Deployment
```bash
# Clone the repository
git clone <your-repo-url>
cd vibe-dash

# Start all services
docker compose up -d --build

# Access the dashboard
open http://localhost:3000
```

### Development Setup
```bash
# Install dependencies
pnpm install

# Start development servers
pnpm dev

# Build for production
pnpm build
```

## 📊 Graph Features

### Editable Charts
- **Line Charts**: Time-series data visualization
- **Bar Charts**: Comparative data analysis
- **Pie Charts**: Proportional data representation
- **Heatmaps**: Multi-dimensional data display

### Data Integration
- **Automatic Polling**: Updates every 1 hour from PostgreSQL
- **Manual Refresh**: On-demand data updates
- **Real-time Config**: JSON-based chart configuration
- **Low-code Editing**: Simple interface for chart modifications

## 🔧 Configuration

### Environment Variables
```env
# Database
DATABASE_URL=postgresql://user:password@localhost:5432/vibe_dash

# Server
PORT=3001
NODE_ENV=production

# Frontend
VITE_API_URL=http://localhost:3001
ENABLE_EDIT=true
```

### Docker Compose Services
- **Frontend**: React SPA on port 3000
- **Backend**: Express API on port 3001
- **Database**: PostgreSQL on port 5432

## 📁 Project Structure

```
vibe-dash/
├── frontend/           # React SPA
│   ├── src/
│   │   ├── components/
│   │   ├── pages/
│   │   └── utils/
│   ├── package.json
│   └── vite.config.ts
├── backend/            # Express API
│   ├── src/
│   │   ├── routes/
│   │   ├── controllers/
│   │   └── models/
│   ├── package.json
│   └── server.js
├── docker-compose.yml  # Multi-service deployment
├── Dockerfile          # Backend container
├── .env.example        # Environment template
└── README.md          # This file
```

## 🎯 Use Cases

### Personal Dashboard
- **Data Monitoring**: Track personal metrics and KPIs
- **Custom Visualizations**: Create charts for specific needs
- **Easy Updates**: Modify graphs without coding
- **Portable**: Run anywhere with Docker

### Manager Benefits
- **Simple Setup**: One command deployment
- **Clear Documentation**: Easy to understand and maintain
- **Modern Stack**: Industry-standard technologies
- **Scalable**: Ready for future enhancements

## 🔄 Data Flow

1. **PostgreSQL** stores time-series and aggregate data
2. **Express API** polls database every hour for updates
3. **React Frontend** fetches data via REST API
4. **ApexCharts** renders configurable visualizations
5. **Edit Mode** allows low-code chart modifications

## 🛡 Security Considerations

- **Public Repo**: No sensitive data in code
- **Environment Variables**: Secrets managed via .env
- **Personal Use**: No authentication complexity
- **Docker Isolation**: Secure containerized deployment

## 📈 Future Enhancements

- **GraphQL API**: For more efficient data fetching
- **Real-time Updates**: WebSocket integration
- **Advanced Charts**: More ApexCharts configurations
- **User Authentication**: If needed for shared access
- **Data Export**: CSV/PDF export capabilities

## 🤝 Contributing

This is a personal project, but contributions are welcome:
1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Submit a pull request

## 📄 License

MIT License - feel free to use for personal or commercial projects.

---

**Built with ❤️ for personal data visualization needs**
