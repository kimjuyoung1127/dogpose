# DogPose Database Setup

## Overview
This document describes the setup and configuration of the TimescaleDB database for the DogPose platform.

## Requirements
- PostgreSQL with TimescaleDB extension installed
- Python 3.8+
- Required Python packages (see `requirements.txt`)

## Setup Instructions

### 1. Install TimescaleDB
First, make sure TimescaleDB is installed on your PostgreSQL server. Follow TimescaleDB's official installation guide for your platform:
- [TimescaleDB Installation Guide](https://docs.timescale.com/install/latest/self-hosted/installation-linux/)

### 2. Environment Configuration
Set up your environment variables in a `.env` file:
```
DATABASE_URL=postgresql://username:password@localhost:5432/dogpose_timescale
```

### 3. Run Setup Script
Execute the database setup script to create tables, hypertables, and indexes:
```bash
cd backend
python -m db.setup_timescaledb
```

## Database Schema

### Hypertable: biometric_data
TimescaleDB hypertable for storing time-series biomechanical data:
- `time`: Timestamp of the measurement (partitioning column)
- `user_id`: UUID of the user
- `dog_id`: UUID of the dog
- `session_id`: UUID of the exercise session
- `frame_number`: Frame number in the video
- `keypoints`: JSONB storing pose estimation keypoints
- `stability_score`: Stability score (0-100)
- `posture_score`: Posture score (0-100)

### Regular Tables:
- `users`: User account information
- `dogs`: Dog profile information linked to users
- `exercise_sessions`: Exercise session metadata

## Connection Pooling
For production deployments, consider using connection pooling (e.g., PgBouncer) to efficiently manage database connections.

## Backup and Recovery
Regularly backup your TimescaleDB database using PostgreSQL's standard tools:
```bash
pg_dump -h hostname -U username -d dogpose_timescale > backup.sql
```

## Performance Optimization
- Use appropriate chunk time intervals based on your data ingestion rate
- Configure compression policies for older data to save space
- Use TimescaleDB's continuous aggregates for frequently accessed summary data