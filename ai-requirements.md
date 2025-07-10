# AI Requirements for Vibe Dashboard

## Project Overview
Building a modern, personal dashboard application with editable graphs and real-time data visualization from PostgreSQL.

## Core Constraints

### Technology Stack (Fixed)
- **Backend**: Node.js (LTS) + Express.js
- **Frontend**: React 18+ (SPA, TypeScript, Vite)
- **Charts**: React ApexCharts
- **Database**: PostgreSQL
- **Package Manager**: pnpm (with workspaces)
- **Deployment**: Docker + Docker Compose
- **Configuration**: .env + ENABLE_EDIT env toggle

### Architecture Constraints
- **Single Page Application**: No server-side rendering needed
- **Direct Database Access**: Backend polls PostgreSQL directly
- **No Authentication**: Simple ENABLE_EDIT toggle for edit mode
- **No Database Sharding**: Simple PostgreSQL setup for personal use
- **Real-time Polling**: Every 1 hour automatic + manual refresh

### Functional Constraints
- **Editable Charts**: Low-code editing for all chart types (line, bar, pie, heatmap)
- **JSON Configuration**: Chart configs stored as JSON
- **Manager-Friendly**: Clear documentation and simple setup
- **Single Command Deployment**: `docker compose up -d --build`

## Current Status

### ✅ Completed
- Project README with comprehensive specifications
- Project plan with atomic tasks (PLAN.md)

### 🔄 In Progress
- None (project not started)

### ❌ Not Started
- All development tasks from PLAN.md

## Development Constraints

### Code Quality
- Use TypeScript for frontend
- Follow ESLint/Prettier standards
- Write clear, documented code
- Use meaningful variable and function names
- Add JSDoc comments for complex functions

### Security Constraints
- Never hardcode sensitive data
- Use environment variables for all configuration
- Validate all user inputs
- Implement proper CORS configuration
- Use parameterized queries for database operations

### Performance Constraints
- Optimize Docker image sizes
- Implement efficient database queries
- Use connection pooling for PostgreSQL
- Minimize bundle size for frontend
- Implement proper caching strategies

### Testing Constraints
- Test all API endpoints
- Validate chart rendering with different data types
- Test edit mode functionality
- Verify Docker deployment process
- Test error handling scenarios

## Environment Variables Required

### Backend (.env)
```
DATABASE_URL=postgresql://user:password@localhost:5432/vibe_dash
PORT=3001
NODE_ENV=production
```

### Frontend (.env)
```
VITE_API_URL=http://localhost:3001
ENABLE_EDIT=true
```

## API Endpoints Required

### Backend API
- `GET /health` - Health check
- `GET /api/data` - Fetch chart data
- `GET /api/config` - Get chart configurations
- `POST /api/config` - Update chart configurations
- `POST /api/refresh` - Manual data refresh
- `GET /api/polling/status` - Polling service status

## Chart Types to Support

### ApexCharts Integration
- **Line Charts**: Time-series data visualization
- **Bar Charts**: Comparative data analysis
- **Pie Charts**: Proportional data representation
- **Heatmaps**: Multi-dimensional data display

### Chart Configuration Schema
```json
{
  "id": "string",
  "type": "line|bar|pie|heatmap",
  "title": "string",
  "dataSource": "string",
  "options": "object",
  "position": {
    "x": "number",
    "y": "number",
    "width": "number",
    "height": "number"
  }
}
```

## Docker Requirements

### Services
- **Frontend**: React SPA on port 3000
- **Backend**: Express API on port 3001
- **Database**: PostgreSQL on port 5432

### Container Configuration
- Use multi-stage builds for optimization
- Include health checks
- Configure proper networking
- Use volume mounts for data persistence
- Implement proper logging

## Development Workflow Constraints

### Task Execution
- Complete tasks in order from PLAN.md
- Validate each task before moving to next
- Update this document with new constraints discovered
- Test functionality at each phase
- Document any deviations from the plan

### Code Organization
- Use clear directory structure
- Separate concerns (routes, controllers, models)
- Implement proper error handling
- Use consistent naming conventions
- Add comprehensive documentation

### Git Workflow
- Commit after each completed task
- Use descriptive commit messages
- Include .gitignore for node_modules, .env, etc.
- Document any environment setup requirements

## Error Handling Requirements

### Backend
- Graceful database connection failures
- API endpoint error responses
- Polling service error recovery
- Input validation errors
- Environment variable validation

### Frontend
- Network request error handling
- Chart rendering error states
- Loading states for all async operations
- User-friendly error messages
- Graceful degradation

## Documentation Requirements

### Code Documentation
- API endpoint documentation
- Component prop documentation
- Database schema documentation
- Configuration options documentation
- Deployment instructions

### User Documentation
- Setup instructions
- Configuration guide
- Troubleshooting section
- Feature documentation
- API reference

## Testing Requirements

### Unit Testing
- API endpoint testing
- Component testing
- Utility function testing
- Database query testing

### Integration Testing
- End-to-end data flow
- Chart editing workflow
- Docker deployment testing
- Environment variable validation

### Manual Testing
- All chart types rendering
- Edit mode functionality
- Responsive design
- Cross-browser compatibility

## Performance Requirements

### Frontend
- Fast initial load time
- Smooth chart animations
- Efficient re-rendering
- Optimized bundle size
- Responsive UI interactions

### Backend
- Fast API response times
- Efficient database queries
- Proper connection pooling
- Minimal memory usage
- Scalable architecture

## Security Requirements

### Data Protection
- No sensitive data in logs
- Secure environment variable handling
- Input sanitization
- SQL injection prevention
- XSS protection

### Access Control
- CORS configuration
- API rate limiting (if needed)
- Environment-based feature toggles
- Secure database connections

## Monitoring Requirements

### Health Checks
- Application health endpoints
- Database connection monitoring
- Polling service status
- Container health checks
- Error logging and monitoring

### Logging
- Structured logging
- Error tracking
- Performance monitoring
- User activity logging (if needed)
- Debug information for development

## Future Considerations

### Scalability
- Design for potential GraphQL migration
- Consider microservices architecture
- Plan for horizontal scaling
- Design for multiple users (if needed)

### Maintainability
- Clear code organization
- Comprehensive documentation
- Automated testing
- CI/CD pipeline ready
- Easy deployment process

## Notes for AI Agent

### When Starting
1. Read PLAN.md completely
2. Understand all constraints in this document
3. Set up development environment
4. Begin with Phase 1, Task 1.1

### During Development
1. Update this document with new constraints discovered
2. Test each completed task
3. Document any deviations from the plan
4. Commit code after each task completion

### When Stuck
1. Review the README.md for context
2. Check PLAN.md for task details
3. Validate environment setup
4. Test individual components
5. Document issues in this file

### Quality Assurance
1. Follow all coding standards
2. Implement proper error handling
3. Test all functionality
4. Document all changes
5. Ensure manager-friendly deployment