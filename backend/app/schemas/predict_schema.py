from pydantic import BaseModel, Field

class PredictRequest(BaseModel):
    text: str = Field(..., min_length=1, description="The message text to classify.")

class PredictResponse(BaseModel):
    input: str
    prediction: str
    spam_probability: float
    threshold: float
