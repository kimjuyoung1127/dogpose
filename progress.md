# Development Progress & Debugging Log

This document summarizes the key development and debugging steps taken to implement the real-time pose estimation feature.

## 1. Initial Implementation & Challenges

The initial goal was to run a YOLOv8-pose ONNX model in the browser to perform real-time analysis of a dog's posture from a video stream. The core tasks were to:
1.  Load and run the ONNX model using `onnxruntime-web`.
2.  Pre-process video frames to feed into the model.
3.  Post-process the model's output to get keypoint coordinates.
4.  Draw the resulting skeleton on a canvas overlaid on the video.

Early attempts resulted in the skeleton either not appearing or being drawn incorrectly (e.g., as a diagonal line across the screen). This kicked off an intensive debugging process.

## 2. Debugging the Black Box: The ONNX Model Output

The primary challenge was correctly interpreting the raw output from the ONNX model, which was a large, one-dimensional Float32Array. Our debugging journey involved investigating several incorrect hypotheses.

### Hypothesis A: Data Structure (Linear vs. Transposed)
-   **Linear:** We first assumed the data was structured like `[prediction1_data, prediction2_data, ...]`. This was incorrect.
-   **Transposed:** We then hypothesized the data was structured as `[all_x_coords, all_y_coords, all_confidences, ...]`. This was the **correct** data structure, but initial attempts to implement it had other bugs, leading us to wrongly discard this hypothesis.
-   **The "Diagonal Line" Clue:** The "diagonal line" symptom was a classic sign of reading Transposed data in a Linear fashion. After several dead ends, we returned to the Transposed approach, which was the key to the solution.

### Hypothesis B: Keypoint Count (17 vs. 24)
-   Based on analysis of Python code from a similar project, we initially assumed the model detected 17 keypoints (a standard COCO format).
-   However, debugging revealed the model's output array corresponded to **24 keypoints**. This mismatch caused incorrect data parsing and visualization.

### Hypothesis C: Keypoint Index Mapping
-   This was the final and most critical piece of the puzzle. We initially assumed a standard mapping (e.g., Nose=0, L-Shoulder=5).
-   However, strange behavior (e.g., deleting a "leg" point caused a "head" point to disappear) proved this assumption was **completely wrong**.

## 3. The Solution: "Discovery Mode"

To solve the incorrect mapping, we stopped guessing and implemented a **"Discovery Mode"**:
1.  The `drawSkeleton` function was modified to draw **no lines**.
2.  Instead, it drew each detected point along with its **index number** printed next to it.
3.  This allowed for direct visual confirmation of the mapping between the model's output indices and the actual body parts of the dog on screen.

## 4. Final Implementation

With the correct keypoint mapping identified through Discovery Mode, a final, stable version of `drawSkeleton` was created:
1.  A definitive `connections` array was built based on the **correct, user-verified keypoint indices**.
2.  Logic was added to hide unnecessary or distracting points to create a cleaner final skeleton.
3.  The final implementation correctly visualizes the dog's posture by connecting the intended joints.

## 5. Additional Fixes
-   **Webcam Flow:** Fixed a bug in `OnboardingFlow.jsx` where the webcam stream would be interrupted when navigating between steps. The logic was improved to keep the stream active.
-   **Video Scaling:** Corrected the CSS `object-fit` property on the video element from `cover` to `contain` to prevent parts of the video from being cut off during analysis.
