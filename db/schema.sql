-- TimescaleDB Schema for Dog Pose Analysis Platform

-- Create hypertable for time-series biomechanical data
CREATE TABLE IF NOT EXISTS biomechanical_data (
    time TIMESTAMPTZ NOT NULL,
    user_id UUID NOT NULL,
    dog_id UUID NOT NULL,
    session_id UUID NOT NULL,
    frame_number INTEGER,
    keypoints JSONB,  -- Stores the pose estimation keypoints
    stability_score FLOAT,
    posture_score FLOAT,
    PRIMARY KEY(time, user_id, dog_id)
);

-- Create hypertable for exercise sessions
CREATE TABLE IF NOT EXISTS exercise_sessions (
    session_id UUID PRIMARY KEY,
    user_id UUID NOT NULL,
    dog_id UUID NOT NULL,
    session_name VARCHAR(255),
    start_time TIMESTAMPTZ NOT NULL,
    end_time TIMESTAMPTZ,
    duration_seconds INTEGER,
    notes TEXT
);

-- Create table for user accounts
CREATE TABLE IF NOT EXISTS users (
    user_id UUID PRIMARY KEY,
    email VARCHAR(255) UNIQUE NOT NULL,
    username VARCHAR(255) UNIQUE NOT NULL,
    created_at TIMESTAMPTZ DEFAULT NOW()
);

-- Create table for dogs
CREATE TABLE IF NOT EXISTS dogs (
    dog_id UUID PRIMARY KEY,
    user_id UUID REFERENCES users(user_id),
    name VARCHAR(255) NOT NULL,
    breed VARCHAR(255),
    birth_date DATE,
    created_at TIMESTAMPTZ DEFAULT NOW()
);

-- Convert tables to hypertables (for time-series optimization)
SELECT create_hypertable('biomechanical_data', 'time');

-- Create indexes for faster queries
CREATE INDEX idx_biomechanical_user_dog_time ON biomechanical_data (user_id, dog_id, time DESC);
CREATE INDEX idx_sessions_user_dog ON exercise_sessions (user_id, dog_id);