from fastapi import FastAPI, Request
from fastapi.responses import HTMLResponse
from fastapi.staticfiles import StaticFiles
from fastapi.templating import Jinja2Templates
import json
import random
import os
from datetime import datetime, timedelta
from typing import List, Dict, Any
import uvicorn

app = FastAPI(title="Dashboard", description="A beautiful dashboard with example graphs")

# Create static directory if it doesn't exist
if not os.path.exists("static"):
    os.makedirs("static")

# Mount static files
app.mount("/static", StaticFiles(directory="static"), name="static")

# Templates
templates = Jinja2Templates(directory="templates")

def generate_time_series_data(days: int = 30) -> List[Dict[str, Any]]:
    """Generate sample time series data"""
    data = []
    base_date = datetime.now() - timedelta(days=days)
    
    for i in range(days):
        date = base_date + timedelta(days=i)
        value = 100 + random.randint(-20, 20) + (i * 2)  # Trending upward with noise
        data.append({
            "date": date.strftime("%Y-%m-%d"),
            "value": value
        })
    
    return data

def generate_category_data() -> List[Dict[str, Any]]:
    """Generate sample category data"""
    categories = ["Desktop", "Mobile", "Tablet", "Other"]
    data = []
    
    for category in categories:
        value = random.randint(10, 100)
        data.append({
            "category": category,
            "value": value
        })
    
    return data

def generate_performance_data() -> List[Dict[str, Any]]:
    """Generate sample performance metrics"""
    metrics = ["CPU Usage", "Memory Usage", "Disk I/O", "Network"]
    data = []
    
    for metric in metrics:
        value = random.randint(20, 95)
        data.append({
            "metric": metric,
            "value": value,
            "status": "good" if value < 70 else "warning" if value < 85 else "critical"
        })
    
    return data

@app.get("/", response_class=HTMLResponse)
async def dashboard(request: Request):
    """Serve the main dashboard page"""
    return templates.TemplateResponse("dashboard.html", {"request": request})

@app.get("/api/chart1")
async def get_chart1_data():
    """API endpoint for line chart data - Revenue over time"""
    return {
        "title": "Revenue Over Time",
        "type": "line",
        "data": generate_time_series_data(30)
    }

@app.get("/api/chart2") 
async def get_chart2_data():
    """API endpoint for bar chart data - Traffic by device"""
    return {
        "title": "Traffic by Device Type",
        "type": "bar",
        "data": generate_category_data()
    }

@app.get("/api/chart3")
async def get_chart3_data():
    """API endpoint for gauge chart data - System performance"""
    return {
        "title": "System Performance Metrics",
        "type": "gauge",
        "data": generate_performance_data()
    }

@app.get("/api/stats")
async def get_dashboard_stats():
    """API endpoint for dashboard summary stats"""
    return {
        "total_users": random.randint(1000, 5000),
        "total_revenue": random.randint(50000, 150000),
        "conversion_rate": round(random.uniform(2.1, 4.8), 1),
        "active_sessions": random.randint(50, 200)
    }

@app.get("/health")
async def health_check():
    """Health check endpoint"""
    return {"status": "healthy", "message": "Dashboard is running!"}

if __name__ == "__main__":
    uvicorn.run(app, host="0.0.0.0", port=8000)