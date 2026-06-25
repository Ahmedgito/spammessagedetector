import joblib
import os
import logging
from app.core.config import settings

logger = logging.getLogger(__name__)

class ModelService:
    def __init__(self):
        self.model = None
        self.threshold = settings.SPAM_THRESHOLD
        self.load_model()

    def load_model(self):
        try:
            if not os.path.exists(settings.MODEL_PATH):
                logger.error(f"Model file not found at {settings.MODEL_PATH}")
                return
            
            model_data = joblib.load(settings.MODEL_PATH)
            
            if isinstance(model_data, dict) and "pipeline" in model_data:
                self.model = model_data["pipeline"]
                if "threshold" in model_data:
                    self.threshold = float(model_data["threshold"])
            else:
                self.model = model_data
                
            logger.info("Model loaded successfully.")
        except Exception as e:
            logger.error(f"Failed to load model: {e}")

    def predict(self, text: str):
        if self.model is None:
            raise RuntimeError("Model is not loaded.")
            
        # Wrap input in list: [text]
        prediction_prob = self.model.predict_proba([text])[0]
        
        # Identify the index for 'spam'
        # Assuming classes are ['ham', 'spam'] or [0, 1] mapped to non-spam and spam
        # If classes_ is available, find index of 'spam' or 1
        spam_index = 1
        if hasattr(self.model, "classes_"):
            classes = list(self.model.classes_)
            if "spam" in classes:
                spam_index = classes.index("spam")
            elif 1 in classes:
                spam_index = classes.index(1)
        
        spam_prob = float(prediction_prob[spam_index])
        
        is_spam = spam_prob >= self.threshold
        prediction_label = "spam" if is_spam else "not spam"
        
        return {
            "prediction": prediction_label,
            "spam_probability": spam_prob,
            "threshold": self.threshold
        }

model_service = ModelService()
