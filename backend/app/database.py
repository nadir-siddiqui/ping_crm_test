# backend/app/database.py

import os
from sqlalchemy import create_engine
from sqlalchemy.orm import sessionmaker
from dotenv import load_dotenv

load_dotenv()  # load environment variables from .env

DATABASE_URL = os.getenv("DATABASE_URL", "postgresql://username:password@localhost:5432/mydatabase")

engine = create_engine(DATABASE_URL)
SessionLocal = sessionmaker(autocommit=False, autoflush=False, bind=engine)

# Dependency that yields a new session per request
def get_db():
    db = SessionLocal()
    try:
        yield db
    finally:
        db.close()
