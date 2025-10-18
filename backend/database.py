from sqlalchemy import create_engine
from sqlalchemy.ext.declarative import declarative_base
from sqlalchemy.orm import sessionmaker
from sqlalchemy.pool import StaticPool
import os

# Use environment variable for database URL, with a default for development
DATABASE_URL = os.getenv("DATABASE_URL", "postgresql://username:password@localhost/dogpose_db")

# For development with TimescaleDB, you might want to use:
# DATABASE_URL = "postgresql://postgres:password@localhost:5432/dogpose_timescale"

engine = create_engine(
    DATABASE_URL,
    # For SQLite only (for testing)
    # connect_args={"check_same_thread": False},
    # poolclass=StaticPool,
)

SessionLocal = sessionmaker(autocommit=False, autoflush=False, bind=engine)

Base = declarative_base()

def get_db():
    db = SessionLocal()
    try:
        yield db
    finally:
        db.close()