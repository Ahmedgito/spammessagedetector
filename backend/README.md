# Spam Message Detector API

## Overview
This is a production-ready REST API built with [FastAPI](https://fastapi.tiangolo.com/), designed to detect whether a given text message is spam or not. The prediction engine uses a pre-trained scikit-learn `LogisticRegression` pipeline utilizing TF-IDF with N-Grams logic.

## 🚀 Key Features
- **FastAPI Framework**: Chosen for its high performance, ease of use, and out-of-the-box OpenAPI documentation (`/docs`).
- **Pydantic Validation**: Guarantees type safety. Ensures the incoming message bodies have the required structure (i.e. preventing empty text).
- **Custom Thresholding**: Implements a stricter manual classification probability threshold of `0.4` rather than the model's default `0.5`, allowing the ML to be more aggressive against tricky spam patterns.
- **Modular Architecture**: Built utilizing a controller/service separation of concerns, keeping API routing distinct from the actual machine learning mechanics.

---

## 📂 Project Structure

```text
backend/
├── app/
│   ├── core/
│   │   └── config.py          # App configuration and environment variables
│   ├── schemas/
│   │   └── predict_schema.py  # Pydantic models for strict request & response validation
│   ├── services/
│   │   └── predict_service.py # ML Model loader and prediction logic
│   └── main.py                # FastAPI router and core endpoint logic
├── dataset/
│   ├── spam.csv               # Original training dataset (reference)
│   └── spam_detector.pkl      # Pre-trained ML model payload
├── requirements.txt           # Project dependencies
├── test_api.py                # Local integration testing script
└── README.md                  # This documentation
```

---

## 🛠️ Installation & Setup

1. **Navigate to the Backend**:
   Ensure you are in the `backend` directory before running any commands.
   ```bash
   cd spammessagedetector/backend
   ```

2. **Install Dependencies**:
   It is recommended to use a virtual environment.
   ```bash
   pip install -r requirements.txt
   ```

3. **Start the API locally**:
   Use Uvicorn to run the FastAPI development server.
   ```bash
   uvicorn app.main:app --reload
   ```
   *The server will start at `http://127.0.0.1:8000`.*

---

## 🌐 API Endpoints

### 1. Health Check
Checks if the server has booted correctly.
- **URL**: `/`
- **Method**: `GET`
- **Response**:
  ```json
  {
      "message": "API is running"
  }
  ```

### 2. Spam Prediction
Analyzes an incoming message array and estimates the likelihood of it being spam. 
- **URL**: `/predict`
- **Method**: `POST`
- **Request Body** (JSON):
  ```json
  {
      "text": "Congratulations! You've won a $1000 gift card. Click here to claim."
  }
  ```
- **Response** (JSON):
  ```json
  {
      "input": "Congratulations! You've won a $1000 gift card. Click here to claim.",
      "prediction": "spam",
      "spam_probability": 0.73864,
      "threshold": 0.4
  }
  ```

### 3. API Documentation (Swagger UI)
Once running locally, FastAPI provides an automatically generated interactive UI to explore the API.
- **URL**: `http://127.0.0.1:8000/docs`

---

## ☁️ Deployment (Render)

This application is lightweight and ready to be deployed to Render's free tier. 
1. Connect your GitHub repository to Render and create a new **Web Service**.
2. **Settings**:
   - **Environment**: Python
   - **Root Directory**: `backend` (if you want Render to focus only on this backend folder)
   - **Build Command**: `pip install -r requirements.txt`
   - **Start Command**: `uvicorn app.main:app --host 0.0.0.0 --port $PORT`
3. Render automatically provisions the port using the `$PORT` environment variable under the hood, perfectly connecting Uvicorn to the public web.

---

## 🧬 Machine Learning Specifics

The central brain of this API sits inside `predict_service.py`. When the API starts up, it utilizes `joblib` from scikit-learn to unpack `dataset/spam_detector.pkl` into memory to save time on subsequent predictions. 

By default, an ML classification will mark anything `>= 0.5` probability as a positive class hit. We manually bypass this logic in the script:
1. Extract `.predict_proba([text])` from the sklearn pipeline instead of `.predict()`.
2. Grab the specific spam dimension. 
3. Re-evaluate `is_spam = spam_prob >= 0.4` guaranteeing the strict rule provided during training is maintained safely in production.
