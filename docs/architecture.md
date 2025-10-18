# DogPose Platform - Architecture Overview

## Executive Summary

This document outlines the architecture for a real-time dog fitness and analysis platform that solves the high latency problem in current AI pose analysis systems. The solution involves transitioning from a server-centric architecture to a client-centric hybrid approach, moving AI pose estimation computation to the user's device (web browser) which eliminates network latency.

## Core Architecture Strategy

### Problem Statement
Current systems suffer from slow result response times due to server-side AI image processing pipelines. This creates a fundamental structural limitation where the "glass-to-glass" latency (time from when video is captured on the camera lens to when the analysis results are displayed on the user's screen) is affected by multiple network-dependent stages:

1. Initial delay (Cold Start): Serverless platforms like Hugging Face go to sleep mode, taking 5-20 seconds to reactivate.
2. Uplink transmission: Encoding and sending captured video frames from the client device to the server.
3. Server-side processing: Frames wait in a queue before getting GPU resources for AI model inference.
4. Downlink transmission: Sending inference results back to the client device.
5. Decoding and rendering: Client decodes results and displays them.

### Solution
The platform transitions to a client-centric hybrid architecture where AI pose estimation computation runs in the user's browser, eliminating network round-trip time. This approach provides:

- Enhanced user experience
- Improved privacy for sensitive video data
- Significant reduction in GPU server operational costs
- Better service scalability through distributed computational load

## Technology Stack

### 1. AI Model: YOLOv11-pose
- Fine-tuned for dog anatomical structure to maximize accuracy
- Replaces the previous YOLOv8 implementation
- Optimized for browser-based inference

### 2. Inference Engine: ONNX Runtime Web
- Enables real-time inference in web browsers
- Provides framework independence and excellent performance
- Runs the AI model directly on the user's device

### 3. Database: TimescaleDB
- PostgreSQL-based time-series database
- Efficiently stores high-frequency biomechanical time-series data generated during exercise sessions
- Enables complex analytical queries

### 4. Backend Services: FastAPI Microservices
- Handles non-real-time backend logic (user account management, data aggregation)
- Built with FastAPI for excellent asynchronous processing capabilities
- Separates real-time processing (on client) from non-real-time processing (on server)

## System Components

### Frontend (Client-Side)
- Real-time pose estimation using ONNX Runtime Web
- Video capture and rendering
- Local processing of biomechanical data
- User interface for real-time feedback

### Backend Services
- User account management
- Data aggregation and analytics
- Historical data storage and retrieval
- Non-real-time computations

### Database Layer
- TimescaleDB for time-series biomechanical data
- User data storage
- Exercise session metadata

## Performance Benefits

### Latency Reduction
By moving computation to the client, the system eliminates:
- Server cold start delays
- Uplink and downlink transmission times
- Server processing queue wait times

### Scalability
- Distributed computational load across users' devices
- Reduced server-side processing requirements
- Lower infrastructure costs

## Implementation Roadmap

1. Frontend implementation with ONNX Runtime Web integration
2. YOLOv11-pose model optimization for browser
3. Backend API services with FastAPI
4. TimescaleDB schema and integration
5. Full system integration and testing