# YOLOv11-pose Model Integration Guide

## Overview
This document describes the integration of the YOLOv11-pose model fine-tuned for dog anatomy into the DogPose platform. The model runs in the browser using ONNX Runtime Web for real-time pose estimation.

## Model Architecture
- Base model: YOLOv11n-pose
- Fine-tuned on: Dog-specific pose dataset
- Keypoints: 17 key anatomical points
- Output format: Normalized coordinates with confidence scores

## Conversion to ONNX Format
The model needs to be converted to ONNX format for use with ONNX Runtime Web:

```bash
# Example conversion command (requires the original PyTorch model)
python -c "
import torch
import onnx

# Load the trained PyTorch model
model = torch.load('yolov11_pose_dog.pt')
model.eval()

# Create dummy input for tracing
dummy_input = torch.randn(1, 3, 640, 640)

# Export to ONNX
torch.onnx.export(
    model,
    dummy_input,
    'yolov11_pose_dog.onnx',
    export_params=True,
    opset_version=11,
    do_constant_folding=True,
    input_names=['input'],
    output_names=['output']
)
print('Model converted to ONNX format successfully')
"
```

## Model Files Structure
```
model/
├── yolo/
│   ├── yolov11_pose_dog.onnx        # ONNX model file for browser inference
│   ├── dog_pose_labels.txt          # Label names for keypoints
│   └── config.yaml                  # Model configuration
```

## Model Configuration
The config.yaml file contains model parameters:

```yaml
MODEL_NAME: "yolov11n-pose"
MODEL_INPUT_SIZE: [640, 640]  # Height, Width
CONFIDENCE_THRESHOLD: 0.5
NMS_THRESHOLD: 0.5
KEYPOINT_NAMES: [
    "nose", "left_eye", "right_eye", "left_ear", "right_ear",
    "left_shoulder", "right_shoulder", "left_elbow", "right_elbow", "left_wrist",
    "right_wrist", "left_hip", "right_hip", "left_knee", "right_knee",
    "left_ankle", "right_ankle"
]
SKELETON_CONNECTIONS: [
    [0, 1], [0, 2],     # nose to eyes
    [1, 3], [2, 4],     # eyes to ears
    [5, 6],             # shoulders
    [5, 7], [7, 9],     # left arm
    [6, 8], [8, 10],    # right arm
    [11, 12],           # hips
    [11, 13], [13, 15], # left leg
    [12, 14], [14, 16], # right leg
    [5, 11], [6, 12]    # shoulders to hips (torso)
]
```

## Integration with Frontend
The model is loaded and used in the frontend as follows:

1. **Model Loading**: The ONNX model is loaded using ONNX Runtime Web when the application initializes
2. **Preprocessing**: Video frames are resized and normalized to match the model's expected input
3. **Inference**: The model processes the frame and outputs keypoint coordinates
4. **Postprocessing**: Raw outputs are converted to meaningful pose information
5. **Visualization**: Keypoints are connected and drawn on the canvas overlay

## Performance Considerations
- Input size affects both accuracy and speed; 640x640 is a good balance
- Confidence threshold can be adjusted to balance between false positives and missed detections
- The model should run efficiently on modern devices with WebAssembly support

## Training the Model
To train the dog-specific pose estimation model:

1. Collect dog pose images with annotated keypoints
2. Use Ultralytics' YOLOv11 training pipeline with pose configuration
3. Fine-tune the model on your dog dataset
4. Convert to ONNX format following the steps above

## Accuracy Improvements
- Use a dataset with diverse dog breeds, sizes, and poses
- Include various backgrounds and lighting conditions
- Augment data with rotations, scaling, and lighting variations
- Fine-tune hyperparameters based on validation performance

## Troubleshooting
If the model doesn't run correctly in the browser:
1. Verify the ONNX file is loaded correctly
2. Check browser console for ONNX Runtime Web errors
3. Ensure the model input dimensions match the preprocessing
4. Verify that the user's device supports WebAssembly and WebGL

## Future Improvements
- Model quantization to reduce file size and improve inference speed
- Multi-dog detection for sessions with multiple dogs
- Breed-specific models for improved accuracy
- Integration of temporal consistency for smoother pose tracking