# Database setup script for DogPose Platform
# This script helps set up TimescaleDB for the dog pose analysis platform

import os
import subprocess
from sqlalchemy import create_engine, text
from models.database import Base

def setup_timescaledb():
    """
    Setup TimescaleDB hypertables and extensions
    """
    # Use environment variable for database URL
    DATABASE_URL = os.getenv("DATABASE_URL", "postgresql://username:password@localhost/dogpose_db")
    
    # Connect to the database
    engine = create_engine(DATABASE_URL)
    
    # Enable TimescaleDB extension
    with engine.connect() as conn:
        # Enable the TimescaleDB extension
        conn.execute(text("CREATE EXTENSION IF NOT EXISTS timescaledb CASCADE;"))
        conn.commit()
        
        # Create tables defined in models
        Base.metadata.create_all(bind=engine)
        
        # Convert biometric_data table to a hypertable (if not already)
        try:
            conn.execute(text("""
                SELECT create_hypertable('biometric_data', 'time', if_not_exists => TRUE);
            """))
            conn.commit()
            print("Hypertable 'biometric_data' created or already exists.")
        except Exception as e:
            print(f"Error creating hypertable: {e}")
            conn.rollback()
    
    print("TimescaleDB setup completed!")

def create_indexes():
    """
    Create useful indexes for the database
    """
    DATABASE_URL = os.getenv("DATABASE_URL", "postgresql://username:password@localhost/dogpose_db")
    engine = create_engine(DATABASE_URL)
    
    with engine.connect() as conn:
        # Create index for faster queries on user_id, dog_id, and time
        conn.execute(text("""
            CREATE INDEX IF NOT EXISTS idx_biometric_user_dog_time 
            ON biometric_data (user_id, dog_id, time DESC);
        """))
        
        # Create index for sessions
        conn.execute(text("""
            CREATE INDEX IF NOT EXISTS idx_sessions_user_dog 
            ON exercise_sessions (user_id, dog_id);
        """))
        
        conn.commit()
        print("Database indexes created!")

if __name__ == "__main__":
    setup_timescaledb()
    create_indexes()