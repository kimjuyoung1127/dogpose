from fastapi import APIRouter, Depends, HTTPException, status
from sqlalchemy.orm import Session
from typing import List
import uuid

from models.database import User, Dog, ExerciseSession, BiometricData
from schemas.schema import (
    UserCreate, User, DogCreate, Dog, SessionCreate, Session, 
    BiometricDataCreate, BiometricData, AnalysisResult, 
    StatusResponse, SessionResponse, AnalysisHistoryResponse
)
from database import get_db

router = APIRouter()

# User endpoints
@router.post("/users", response_model=User)
def create_user(user: UserCreate, db: Session = Depends(get_db)):
    db_user = User(email=user.email, username=user.username)
    db.add(db_user)
    db.commit()
    db.refresh(db_user)
    return db_user

@router.get("/users/{user_id}", response_model=User)
def get_user(user_id: str, db: Session = Depends(get_db)):
    user = db.query(User).filter(User.user_id == user_id).first()
    if not user:
        raise HTTPException(status_code=404, detail="User not found")
    return user

# Dog endpoints
@router.post("/dogs", response_model=Dog)
def create_dog(dog: DogCreate, db: Session = Depends(get_db)):
    # Verify user exists
    user = db.query(User).filter(User.user_id == dog.user_id).first()
    if not user:
        raise HTTPException(status_code=404, detail="User not found")
    
    db_dog = Dog(
        name=dog.name,
        breed=dog.breed,
        birth_date=dog.birth_date,
        user_id=dog.user_id
    )
    db.add(db_dog)
    db.commit()
    db.refresh(db_dog)
    return db_dog

@router.get("/dogs/{dog_id}", response_model=Dog)
def get_dog(dog_id: str, db: Session = Depends(get_db)):
    dog = db.query(Dog).filter(Dog.dog_id == dog_id).first()
    if not dog:
        raise HTTPException(status_code=404, detail="Dog not found")
    return dog

@router.get("/users/{user_id}/dogs", response_model=List[Dog])
def get_user_dogs(user_id: str, db: Session = Depends(get_db)):
    dogs = db.query(Dog).filter(Dog.user_id == user_id).all()
    return dogs

# Session endpoints
@router.post("/sessions", response_model=SessionResponse)
def create_session(session_data: SessionCreate, db: Session = Depends(get_db)):
    # Verify user and dog exist
    user = db.query(User).filter(User.user_id == session_data.user_id).first()
    if not user:
        raise HTTPException(status_code=404, detail="User not found")
    
    dog = db.query(Dog).filter(Dog.dog_id == session_data.dog_id).first()
    if not dog:
        raise HTTPException(status_code=404, detail="Dog not found")
    
    session = ExerciseSession(
        user_id=session_data.user_id,
        dog_id=session_data.dog_id,
        session_name=session_data.session_name,
        notes=session_data.notes
    )
    
    db.add(session)
    db.commit()
    db.refresh(session)
    
    return SessionResponse(
        session_id=session.session_id,
        status="created",
        message="Session created successfully"
    )

@router.get("/sessions/{user_id}/{dog_id}", response_model=List[Session])
def get_sessions(user_id: str, dog_id: str, db: Session = Depends(get_db)):
    sessions = db.query(ExerciseSession).filter(
        ExerciseSession.user_id == user_id,
        ExerciseSession.dog_id == dog_id
    ).all()
    return sessions

# Biometric data endpoints
@router.post("/biometric-data", response_model=StatusResponse)
def save_biometric_data(data: BiometricDataCreate, db: Session = Depends(get_db)):
    # Verify session exists
    session = db.query(ExerciseSession).filter(
        ExerciseSession.session_id == data.session_id
    ).first()
    if not session:
        raise HTTPException(status_code=404, detail="Session not found")
    
    biometric_record = BiometricData(
        session_id=data.session_id,
        user_id=data.user_id,
        dog_id=data.dog_id,
        frame_number=data.frame_number,
        keypoints=data.keypoints,
        stability_score=data.stability_score,
        posture_score=data.posture_score
    )
    
    db.add(biometric_record)
    db.commit()
    
    return StatusResponse(status="saved", message="Biometric data saved successfully")

@router.get("/biometric-data/{user_id}/{dog_id}", response_model=List[BiometricData])
def get_biometric_data(user_id: str, dog_id: str, db: Session = Depends(get_db)):
    records = db.query(BiometricData).filter(
        BiometricData.user_id == user_id,
        BiometricData.dog_id == dog_id
    ).order_by(BiometricData.time.desc()).all()
    return records

# Analysis history endpoints
@router.get("/analysis-history/{user_id}/{dog_id}", response_model=AnalysisHistoryResponse)
def get_analysis_history(user_id: str, dog_id: str, db: Session = Depends(get_db)):
    # Get recent analysis results for the dog
    records = db.query(BiometricData).filter(
        BiometricData.user_id == user_id,
        BiometricData.dog_id == dog_id,
        BiometricData.stability_score.isnot(None),
        BiometricData.posture_score.isnot(None)
    ).order_by(BiometricData.time.desc()).limit(10).all()
    
    analysis_history = []
    for record in records:
        analysis_history.append({
            "date": record.time.isoformat(),
            "stability_score": record.stability_score,
            "posture_score": record.posture_score
        })
    
    return AnalysisHistoryResponse(analysis_history=analysis_history)

# Save analysis result endpoint
@router.post("/analysis", response_model=StatusResponse)
def save_analysis_result(analysis_result: AnalysisResult, db: Session = Depends(get_db)):
    # Verify session exists
    session = db.query(ExerciseSession).filter(
        ExerciseSession.session_id == analysis_result.session_id
    ).first()
    if not session:
        raise HTTPException(status_code=404, detail="Session not found")
    
    # Create biometric record with analysis results
    biometric_record = BiometricData(
        session_id=analysis_result.session_id,
        user_id=analysis_result.user_id,
        dog_id=analysis_result.dog_id,
        stability_score=analysis_result.stability_score,
        posture_score=analysis_result.posture_score,
        keypoints=analysis_result.keypoints_data[-1] if analysis_result.keypoints_data else None  # Use the last frame's keypoints
    )
    
    db.add(biometric_record)
    db.commit()
    
    return StatusResponse(status="saved", message="Analysis result saved successfully")