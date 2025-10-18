from fastapi import FastAPI, HTTPException
from fastapi.middleware.cors import CORSMiddleware
import uvicorn
from typing import Optional
import os

from api.routes import router as api_router

app = FastAPI(title="DogPose Backend API", 
              description="API for non-real-time backend operations for the Dog Pose Analysis platform",
              version="1.0.0")

# Add CORS middleware
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],  # In production, replace with specific origins
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Include the API routes
app.include_router(api_router, prefix="/api", tags=["dog-pose"])

@app.get("/")
def read_root():
    return {"message": "Welcome to the DogPose Backend API"}

@app.get("/api/health")
def health_check():
    return {"status": "healthy", "service": "backend"}

if __name__ == "__main__":
    port = int(os.getenv("PORT", 8000))
    uvicorn.run(app, host="0.0.0.0", port=port)