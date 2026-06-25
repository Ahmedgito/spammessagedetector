from fastapi import FastAPI, HTTPException
import logging
from app.schemas.predict_schema import PredictRequest, PredictResponse
from app.services.predict_service import model_service

logging.basicConfig(level=logging.INFO)
logger = logging.getLogger(__name__)

app = FastAPI(title="Spam Message Detector API")

@app.get("/")
def health_check():
    return {"message": "API is running"}

@app.post("/predict", response_model=PredictResponse)
def predict_spam(request: PredictRequest):
    if not request.text or not request.text.strip():
        raise HTTPException(status_code=400, detail="Text cannot be empty or whitespace.")
        
    try:
        result = model_service.predict(request.text)
        return PredictResponse(
            input=request.text,
            prediction=result["prediction"],
            spam_probability=result["spam_probability"],
            threshold=result["threshold"]
        )
    except RuntimeError as e:
        logger.error(f"Prediction failed: {str(e)}")
        raise HTTPException(status_code=503, detail="Model is unavailable.")
    except Exception as e:
        logger.error(f"Unexpected error during prediction: {str(e)}")
        raise HTTPException(status_code=500, detail="Internal server error.")
