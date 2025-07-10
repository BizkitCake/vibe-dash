# Vibe Dashboard - Project Plan

## Overview
This plan outlines the atomic tasks required to build the Vibe Dashboard application from scratch. Each task has clear start and end criteria, making it suitable for AI agent execution.

## Project Structure
```
vibe-dash/
├── frontend/           # React SPA
├── backend/            # Express API
├── docker-compose.yml  # Multi-service deployment
├── Dockerfile          # Backend container
├── .env.example        # Environment template
└── README.md          # Documentation
```

## Phase 1: Project Foundation

### Task 1.1: Initialize Project Structure
**End**: Basic directory structure created
- [x] Create `frontend/` directory
- [x] Create `backend/` directory
- [ ] Create root-level configuration files
- [x] Initialize git repository (if not already done)

### Task 1.2: Setup Package Management
**Start**: Empty directories
**End**: pnpm workspace configuration complete
- [ ] Create root `package.json` with pnpm workspace configuration
- [ ] Create `frontend/package.json` with React dependencies
- [ ] Create `backend/package.json` with Express dependencies
- [ ] Create `pnpm-workspace.yaml` file

### Task 1.3: Environment Configuration
**Start**: Basic structure exists
**End**: Environment templates ready
- [ ] Create `.env.example` with all required variables
- [ ] Create `.gitignore` file
- [ ] Create environment validation scripts

## Phase 2: Backend Development

### Task 2.1: Express Server Setup
**Start**: Backend directory exists
**End**: Basic Express server running with TypeScript
- [ ] Install Express.js and core dependencies (`typescript`, `ts-node`, `@types/node`, `@types/express`)
- [ ] Create `backend/src/server.ts` with basic Express setup
- [ ] Implement basic health check endpoint
- [ ] Add CORS middleware
- [ ] Add error handling middleware

### Task 2.2: Database Connection
**Start**: Express server exists
**End**: PostgreSQL connection established
- [ ] Install PostgreSQL client (`pg`) and types (`@types/pg`)
- [ ] Create database connection module
- [ ] Implement connection pooling
- [ ] Add database health check endpoint
- [ ] Create `backend/src/db/init.ts` script to create `chart_configs` table.
**Info**: DB host - db_vibe:5432; User - mneza

### Task 2.3: API Routes Structure
**Start**: Database connection working
**End**: REST API endpoints defined for chart configurations
- [ ] Create routes directory structure for `configs` and `data`
- [ ] Implement CRUD endpoints for `/api/configs`
- [ ] Add request validation middleware (e.g., using `joi` or `zod`)
- [ ] Implement `GET /api/data-sources` endpoint.
- [ ] Implement `GET /api/data/:dataSourceId` endpoint.

### Task 2.4: Data Polling Service
**Start**: API routes exist
**End**: Automatic data polling working
- [ ] Create a data source mapping (from `dataSourceId` to SQL query) in the backend.
- [ ] Create polling service module that iterates through data sources.
- [ ] Implement 1-hour interval polling to refresh data for each source.
- [ ] Add polling status endpoint
- [ ] Implement error handling for polling failures
- [ ] Implement `POST /api/refresh/:dataSourceId` manual refresh endpoint.

## Phase 3: Frontend Development

### Task 3.1: React Application Setup
**Start**: Frontend directory exists
**End**: React app with Vite running
- [ ] Install React, TypeScript, and Vite
- [ ] Configure Vite for development and production
- [ ] Setup TypeScript configuration
- [ ] Create basic React component structure
- [ ] Implement routing with React Router

### Task 3.2: ApexCharts Integration
**Start**: React app running
**End**: Charts library integrated for displaying data
- [ ] Install React ApexCharts
- [ ] Create chart wrapper components (Line, Bar, Pie, Heatmap) that take configuration and data.
- [ ] Implement a system to render a grid of charts based on configuration from the backend.
- [ ] Add chart type definitions and interfaces in TypeScript.

### Task 3.3: Dashboard Layout
**Start**: Charts integrated
**End**: Dashboard UI complete
- [ ] Create responsive dashboard layout
- [ ] Implement grid system for charts
- [ ] Add navigation and header components
- [ ] Create chart container components
- [ ] Implement responsive design

### Task 3.4: Data Integration
**Start**: Dashboard layout complete
**End**: Real-time data display working
- [ ] Create API service layer
- [ ] Implement data fetching from backend
- [ ] Add loading states and error handling
- [ ] Implement manual refresh functionality
- [ ] Add real-time data updates

## Phase 4: Chart Editing System

### Task 4.1: Chart Configuration System
**Start**: Basic charts displaying
**End**: JSON-based chart configuration is fetched and managed from the frontend.
- [ ] Create a state management solution (e.g., Zustand, Redux Toolkit) for chart configs.
- [ ] Implement fetching all chart configs on dashboard load.
- [ ] Add configuration validation on the frontend.
- [ ] Implement persistence through API calls for any change.

### Task 4.2: Low-Code Editor Interface
**Start**: Configuration system exists
**End**: User-friendly chart editor complete
- [ ] Create a modal or side panel for chart editing.
- [ ] Build a form to edit basic properties (title, chart type). The chart type selector should use `ApexCharts` types.
- [ ] Implement a data source selector that fetches from `GET /api/data-sources`.
- [ ] Create a simple UI to edit chart-specific `options` (e.g., colors, labels).
- [ ] Implement "Save" and "Cancel" functionality that uses the API to persist changes.
- [ ] Implement creating and deleting charts from the UI.

### Task 4.3: Edit Mode Toggle
**Start**: Editor interface exists
**End**: Edit mode controlled by environment variable
- [ ] Implement ENABLE_EDIT environment variable
- [ ] Add edit mode UI indicators
- [ ] Create edit mode toggle functionality
- [ ] Implement edit mode permissions
- [ ] Add edit mode documentation

## Phase 5: Docker Deployment

### Task 5.1: Backend Containerization
**Start**: Backend application complete
**End**: Backend Docker container working
- [ ] Create `Dockerfile` for backend
- [ ] Optimize Docker image size
- [ ] Add health checks to container
- [ ] Configure environment variables
- [ ] Test container build and run

### Task 5.2: Frontend Containerization
**Start**: Frontend application complete
**End**: Frontend Docker container working
- [ ] Create `Dockerfile` for frontend
- [ ] Configure production build process
- [ ] Setup nginx for static file serving
- [ ] Optimize frontend container
- [ ] Test container build and run

### Task 5.3: Docker Compose Setup
**Start**: Both containers working
**End**: Single command deployment ready
- [ ] Create `docker-compose.yml`
- [ ] Configure PostgreSQL service
- [ ] Setup service networking
- [ ] Add volume mounts for persistence
- [ ] Test complete stack deployment

### Task 5.4: Production Configuration
**Start**: Docker Compose working
**End**: Production-ready deployment
- [ ] Configure production environment variables
- [ ] Add logging configuration
- [ ] Setup monitoring and health checks
- [ ] Create deployment documentation
- [ ] Test production deployment

## Phase 6: Testing and Documentation

### Task 6.1: API Testing
**Start**: Backend API complete
**End**: API endpoints tested and validated
- [ ] Create API test suite
- [ ] Test all endpoints with sample data
- [ ] Validate error handling
- [ ] Test data polling functionality
- [ ] Document API endpoints

### Task 6.2: Frontend Testing
**Start**: Frontend application complete
**End**: Frontend functionality tested
- [ ] Test chart rendering with different data
- [ ] Validate edit mode functionality
- [ ] Test responsive design
- [ ] Validate data integration
- [ ] Test error states and loading

### Task 6.3: Integration Testing
**Start**: Both frontend and backend tested
**End**: Full stack integration validated
- [ ] Test complete data flow
- [ ] Validate chart editing workflow
- [ ] Test Docker deployment end-to-end
- [ ] Validate environment variable configuration
- [ ] Test manual refresh functionality

### Task 6.4: Documentation Finalization
**Start**: Application fully functional
**End**: Complete documentation ready
- [ ] Update README with final instructions
- [ ] Create deployment guide
- [ ] Document configuration options
- [ ] Add troubleshooting section
- [ ] Create development setup guide

## Phase 7: Final Validation

### Task 7.1: End-to-End Testing
**Start**: All components complete
**End**: Full application validated
- [ ] Test complete user workflows
- [ ] Validate all chart types
- [ ] Test edit mode functionality
- [ ] Verify data persistence
- [ ] Test deployment process

### Task 7.2: Performance Optimization
**Start**: Application functional
**End**: Performance optimized
- [ ] Optimize chart rendering performance
- [ ] Implement data caching
- [ ] Optimize Docker image sizes
- [ ] Add performance monitoring
- [ ] Validate production performance

### Task 7.3: Security Review
**Start**: Application complete
**End**: Security validated
- [ ] Review environment variable security
- [ ] Validate CORS configuration
- [ ] Check for common vulnerabilities
- [ ] Review database connection security
- [ ] Document security considerations

## Success Criteria

### Functional Requirements
- [ ] Dashboard displays charts with real data
- [ ] Charts are editable when ENABLE_EDIT=true
- [ ] Data polls every hour automatically
- [ ] Manual refresh works
- [ ] Docker deployment works with single command
- [ ] All chart types (line, bar, pie, heatmap) work

### Technical Requirements
- [ ] React SPA with TypeScript
- [ ] Express API with PostgreSQL
- [ ] ApexCharts integration
- [ ] pnpm workspace setup
- [ ] Docker Compose deployment
- [ ] Environment variable configuration

### Manager-Friendly Requirements
- [ ] Clear documentation
- [ ] Simple deployment process
- [ ] Easy to understand codebase
- [ ] Well-documented configuration
- [ ] Troubleshooting guides

## Estimated Timeline
- **Phase 1**: 1-2 hours
- **Phase 2**: 3-4 hours
- **Phase 3**: 4-5 hours
- **Phase 4**: 3-4 hours
- **Phase 5**: 2-3 hours
- **Phase 6**: 2-3 hours
- **Phase 7**: 1-2 hours

**Total Estimated Time**: 16-23 hours

## Notes for AI Agent
- Each task should be completed before moving to the next
- Validate each task completion before proceeding
- Update ai-requirements.md with new constraints as they are discovered
- Test functionality at each phase
- Document any deviations from the plan