# DogPose - Real-time Dog Fitness Platform

## Overview
The DogPose platform addresses high latency issues in current AI pose analysis systems by implementing a client-centric hybrid architecture where AI inference runs in the user's browser, eliminating network round-trip time.

## Architecture
- **Frontend**: React application with ONNX Runtime Web for real-time pose analysis in the browser
- **Backend**: FastAPI services for non-real-time operations (user accounts, data aggregation)
- **Database**: TimescaleDB for storing biomechanical time-series data
- **Model**: YOLOv11-pose model fine-tuned for dog anatomy

## Setup Instructions

### Prerequisites
- Node.js v16+ for frontend
- Python 3.8+ for backend
- PostgreSQL with TimescaleDB extension for database
- Git

### Frontend Setup
1. Navigate to the frontend directory
   ```bash
   cd frontend
   ```

2. Install dependencies
   ```bash
   npm install
   ```

3. Start the development server
   ```bash
   npm run dev
   ```

### Backend Setup
1. Navigate to the backend directory
   ```bash
   cd backend
   ```

2. Create a virtual environment and activate it
   ```bash
   python -m venv venv
   # On Windows:
   venv\Scripts\activate
   # On macOS/Linux:
   source venv/bin/activate
   ```

3. Install dependencies
   ```bash
   pip install -r requirements.txt
   ```

4. Set up environment variables (create a `.env` file)
   ```
   DATABASE_URL=postgresql://username:password@localhost:5432/dogpose_timescale
   ```

5. Start the backend server
   ```bash
   python main.py
   ```

### Database Setup
1. Ensure PostgreSQL with TimescaleDB extension is installed and running

2. Create the database schema:
   ```bash
   cd backend
   python -m db.setup_timescaledb
   ```

### Model Integration
1. Place your ONNX model file in `model/yolo/` as `yolov11_pose_dog.onnx`
2. Ensure you have the correct `config.yaml` and `dog_pose_labels.txt` files

## Development
- Frontend: React with Vite, Tailwind CSS, ONNX Runtime Web
- Backend: FastAPI with SQLAlchemy, TimescaleDB
- For details on model training, see the model README

## API Documentation
After starting the backend, visit `http://localhost:8000/docs` for interactive API documentation.

## Deployment
- Frontend: Can be deployed to any static hosting service (Netlify, Vercel, etc.)
- Backend: Deploy to platforms that support Python (Heroku, Railway, etc.)
- Database: Managed PostgreSQL service with TimescaleDB extension

## Project Structure
```
dogpose/
├── frontend/                 # React frontend with ONNX Runtime Web
│   ├── public/
│   ├── src/
│   │   ├── components/       # React components
│   │   ├── utils/            # Utility functions
│   │   └── hooks/            # Custom React hooks
│   ├── package.json
│   └── vite.config.js
├── backend/                  # FastAPI backend
│   ├── api/                  # API route definitions
│   ├── models/               # Database models
│   ├── schemas/              # Pydantic schemas
│   ├── database.py           # DB configuration
│   ├── main.py               # Main application entrypoint
│   └── requirements.txt
├── db/                       # Database configuration
│   ├── migrations/           # DB migration scripts
│   ├── schema.sql            # Database schema
│   └── setup_timescaledb.py  # TimescaleDB setup script
├── model/                    # AI model files
│   ├── yolo/                 # YOLO-specific files
│   │   ├── yolov11_pose_dog.onnx
│   │   └── dog_pose_labels.txt
│   └── config.yaml           # Model configuration
├── docs/                     # Project documentation
└── README.md
```

## Key Features
- Real-time pose analysis in the browser (no network latency)
- Time-series storage of biomechanical data
- Dog-specific pose estimation with YOLOv11-pose
- User account management and session tracking
- Privacy-focused (processing happens locally in browser)

## Contributing
1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Submit a pull request

## License
MIT License - see the LICENSE file for details.