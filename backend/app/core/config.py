import os
from pathlib import Path

class Settings:
    PROJECT_NAME: str = "Spam Message Detector API"
    BASE_DIR: Path = Path(__file__).resolve().parent.parent.parent
    MODEL_PATH: Path = BASE_DIR / "dataset" / "spam_detector.pkl"
    SPAM_THRESHOLD: float = 0.4

settings = Settings()
