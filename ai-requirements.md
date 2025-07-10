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
- **Prohibited to update DB config**: Current db config and compose files content related to db must persist.

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

## Database Schema
### Table "public.food_consumption"
Table stores log of cat's food consumption

Column|Type|Collation|Nullable|Default|Storage|Compression|Stats target|Description
id|integer||not null|nextval('food_consumption_id_seq'::regclass)|plain|||
date|date||not null||plain|||
product_id|integer||||plain|||
notes|text||||extended|||
portion_size|real||||plain|||
leftovers|real||||plain|||
consumption|real|||generated always as (portion_size - leftovers) stored|plain|||
dishware_id|integer||||plain|||
Check constraints:
    "food_consumption_leftovers_check" CHECK (leftovers >= 0::double precision)
    "food_consumption_portion_size_check" CHECK (portion_size >= 0::double precision)
Foreign-key constraints:
    "food_consumption_dishware_id_fkey" FOREIGN KEY (dishware_id) REFERENCES dishware(id) ON DELETE SET NULL
    "food_consumption_product_id_fkey" FOREIGN KEY (product_id) REFERENCES products(id) ON DELETE SET NULL

### Table "public.water_consumption"
Table stores log of cat's water consumption

Column|Type|Collation|Nullable|Default|Storage|Compression|Stats target|Description
id|integer||not null|nextval('water_consumption_id_seq'::regclass)|plain|||
date|date||not null||plain|||
dishware_id|integer||||plain|||
notes|text||||extended|||
portion_size|real||||plain|||
residue|real||||plain|||
vaporized|real||||plain|||
consumption|real||||plain|||
Check constraints:
    "water_consumption_consumption_check" CHECK (consumption >= 0::double precision)
    "water_consumption_portion_size_check" CHECK (portion_size >= 0::double precision)
    "water_consumption_residue_check" CHECK (residue >= 0::double precision)
    "water_consumption_vaporized_check" CHECK (vaporized >= 0::double precision)
Foreign-key constraints:
    "water_consumption_dishware_id_fkey" FOREIGN KEY (dishware_id) REFERENCES dishware(id) ON DELETE SET NULL
Triggers:
    trg_update_water_consumption BEFORE UPDATE OF portion_size, residue, vaporized ON water_consumption FOR EACH ROW EXECUTE FUNCTION update_water_consumption()

### Table "public.dishware"
Column|Type|Collation|Nullable|Default|Storage|Compression|Stats target|Description
id|integer||not null|nextval('dishware_id_seq'::regclass)|plain|||
dish|text||not null||extended|||
weight|integer||||plain|||
description|text||||extended|||
image_url|text||||extended|||
vapor_factor|integer||||plain|||
Check constraints:
    "dishware_vapor_factor_check" CHECK (vapor_factor >= 0)
    "dishware_weight_check" CHECK (weight > 0)
Referenced by:
    TABLE "food_consumption" CONSTRAINT "food_consumption_dishware_id_fkey" FOREIGN KEY (dishware_id) REFERENCES dishware(id) ON DELETE SET NULL
    TABLE "water_consumption" CONSTRAINT "water_consumption_dishware_id_fkey" FOREIGN KEY (dishware_id) REFERENCES dishware(id) ON DELETE SET NULL

### Table "public.products"
Column|Type|Collation|Nullable|Default|Storage|Compression|Stats target|Description
id|integer||not null|nextval('products_id_seq'::regclass)|plain|||
name|text||not null||extended|||
calories|real||||plain|||
protein|real||||plain|||
fats|real||||plain|||
ash|real||||plain|||
fibre|real||||plain|||
moisture|real||||plain|||
measure|real||||plain|||
notes|text||||extended|||
reception|text||||extended|||
Check constraints:
    "products_ash_check" CHECK (ash >= 0::double precision)
    "products_calories_check" CHECK (calories >= 0::double precision)
    "products_fats_check" CHECK (fats >= 0::double precision)
    "products_fibre_check" CHECK (fibre >= 0::double precision)
    "products_measure_check" CHECK (measure > 0::double precision)
    "products_moisture_check" CHECK (moisture >= 0::double precision)
    "products_protein_check" CHECK (protein >= 0::double precision)
Referenced by:
    TABLE "food_consumption" CONSTRAINT "food_consumption_product_id_fkey" FOREIGN KEY (product_id) REFERENCES products(id) ON DELETE SET NULL

### Table "public.shit_tracker"
Column|Type|Collation|Nullable|Default|Storage|Compression|Stats target|Description
id|integer||not null|nextval('shit_tracker_id_seq'::regclass)|plain|||
date|date||not null||plain|||
notes|text||||extended|||

## API Endpoints Required

### Backend API
- `GET /health` - Health check
- `GET /api/data-sources` - Get a list of available data source identifiers and their descriptions.
- `GET /api/data/:dataSourceId` - Fetch cached data for a specific data source.
- `GET /api/configs` - Get all chart configurations.
- `GET /api/configs/:id` - Get a single chart configuration.
- `POST /api/configs` - Create a new chart configuration.
- `PUT /api/configs/:id` - Update a chart configuration.
- `DELETE /api/configs/:id` - Delete a chart configuration.
- `POST /api/refresh/:dataSourceId` - Manually refresh data for a specific data source.
- `GET /api/polling/status` - Polling service status for all data sources.

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
  "dataSourceId": "string",
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