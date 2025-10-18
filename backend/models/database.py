from sqlalchemy import create_engine, Column, Integer, String, DateTime, Float, Text, ForeignKey, JSON
from sqlalchemy.ext.declarative import declarative_base
from sqlalchemy.orm import relationship, sessionmaker
from datetime import datetime
import uuid

Base = declarative_base()

def generate_uuid():
    return str(uuid.uuid4())

class User(Base):
    __tablename__ = "users"
    
    user_id = Column(String, primary_key=True, default=generate_uuid)
    email = Column(String, unique=True, nullable=False)
    username = Column(String, unique=True, nullable=False)
    created_at = Column(DateTime, default=datetime.utcnow)
    
    # Relationship
    dogs = relationship("Dog", back_populates="user")
    sessions = relationship("ExerciseSession", back_populates="user")

class Dog(Base):
    __tablename__ = "dogs"
    
    dog_id = Column(String, primary_key=True, default=generate_uuid)
    user_id = Column(String, ForeignKey("users.user_id"))
    name = Column(String, nullable=False)
    breed = Column(String)
    birth_date = Column(DateTime)
    created_at = Column(DateTime, default=datetime.utcnow)
    
    # Relationship
    user = relationship("User", back_populates="dogs")
    sessions = relationship("ExerciseSession", back_populates="dog")

class ExerciseSession(Base):
    __tablename__ = "exercise_sessions"
    
    session_id = Column(String, primary_key=True, default=generate_uuid)
    user_id = Column(String, ForeignKey("users.user_id"))
    dog_id = Column(String, ForeignKey("dogs.dog_id"))
    session_name = Column(String)
    start_time = Column(DateTime, default=datetime.utcnow)
    end_time = Column(DateTime)
    duration_seconds = Column(Integer)
    notes = Column(Text)
    
    # Relationships
    user = relationship("User", back_populates="sessions")
    dog = relationship("Dog", back_populates="sessions")
    biometric_data = relationship("BiometricData", back_populates="session")

class BiometricData(Base):
    __tablename__ = "biometric_data"
    
    id = Column(Integer, primary_key=True, autoincrement=True)
    time = Column(DateTime, default=datetime.utcnow, nullable=False)
    session_id = Column(String, ForeignKey("exercise_sessions.session_id"))
    user_id = Column(String, nullable=False)
    dog_id = Column(String, nullable=False)
    frame_number = Column(Integer)
    keypoints = Column(JSON)  # Stores the pose estimation keypoints
    stability_score = Column(Float)
    posture_score = Column(Float)
    
    # Relationship
    session = relationship("ExerciseSession", back_populates="biometric_data")