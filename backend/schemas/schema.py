from pydantic import BaseModel
from typing import Optional, List, Dict, Any
from datetime import datetime
from uuid import UUID

# User Schemas
class UserBase(BaseModel):
    email: str
    username: str

class UserCreate(UserBase):
    pass

class User(UserBase):
    user_id: str
    
    class Config:
        from_attributes = True

# Dog Schemas
class DogBase(BaseModel):
    name: str
    breed: Optional[str] = None
    birth_date: Optional[datetime] = None

class DogCreate(DogBase):
    user_id: str

class Dog(DogBase):
    dog_id: str
    user_id: str
    created_at: datetime
    
    class Config:
        from_attributes = True

# Session Schemas
class SessionBase(BaseModel):
    user_id: str
    dog_id: str
    session_name: Optional[str] = None
    notes: Optional[str] = None

class SessionCreate(SessionBase):
    pass

class Session(SessionBase):
    session_id: str
    start_time: datetime
    end_time: Optional[datetime] = None
    duration_seconds: Optional[int] = None
    
    class Config:
        from_attributes = True

# Biometric Data Schemas
class BiometricDataBase(BaseModel):
    session_id: str
    user_id: str
    dog_id: str
    frame_number: Optional[int] = None
    keypoints: Optional[Dict[str, Any]] = None
    stability_score: Optional[float] = None
    posture_score: Optional[float] = None

class BiometricDataCreate(BiometricDataBase):
    pass

class BiometricData(BiometricDataBase):
    id: int
    time: datetime
    
    class Config:
        from_attributes = True

# Analysis Result Schema
class AnalysisResult(BaseModel):
    user_id: str
    dog_id: str
    session_id: str
    stability_score: float
    posture_score: float
    keypoints_data: List
    metadata: Dict[str, Any]

# Response Schemas
class StatusResponse(BaseModel):
    status: str
    message: Optional[str] = None

class SessionResponse(BaseModel):
    session_id: str
    status: str
    message: str

class AnalysisHistoryResponse(BaseModel):
    analysis_history: List[Dict[str, Any]]