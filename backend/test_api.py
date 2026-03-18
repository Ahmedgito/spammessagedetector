import warnings
warnings.filterwarnings('ignore')

from fastapi.testclient import TestClient
from app.main import app

client = TestClient(app)

def run_tests():
    with open('results.txt', 'w', encoding='utf-8') as f:
        f.write("--- Root Endpoint ---\n")
        response = client.get("/")
        f.write(f"Status: {response.status_code}\n")
        f.write(f"Body: {response.json()}\n\n")
        
        f.write("--- Normal Message ---\n")
        response = client.post("/predict", json={"text": "Hey, are we still on for tomorrow?"})
        f.write(f"Status: {response.status_code}\n")
        f.write(f"Body: {response.json()}\n\n")
        
        f.write("--- Spam Message ---\n")
        response = client.post("/predict", json={"text": "Congratulations! You've won a $1000 gift card. Click here to claim."})
        f.write(f"Status: {response.status_code}\n")
        f.write(f"Body: {response.json()}\n\n")
        
        f.write("--- Empty Message ---\n")
        response = client.post("/predict", json={"text": ""})
        f.write(f"Status: {response.status_code}\n")
        f.write(f"Body: {response.json()}\n\n")

if __name__ == "__main__":
    run_tests()
