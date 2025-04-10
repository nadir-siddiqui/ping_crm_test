# backend/app/main.py

from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware

from .routers import contacts, companies
from . import models, database

# Create DB tables if not already present (for development use; in production use migrations)
models.Base.metadata.create_all(bind=database.engine)

app = FastAPI(title="PingCRM Migration Challenge API")

# Enable CORS so the frontend can call the API (adjust allowed origins for production)
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],  # Replace with your frontend domain in production
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Include the routers
app.include_router(contacts.router, prefix="/api")
app.include_router(companies.router, prefix="/api")
