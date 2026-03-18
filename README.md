<div align="center">
  
  <h1>🤖 NeuroSentry: AI-Powered Spam Intelligence</h1>
  <p>A full-stack, futuristic web application that uses Machine Learning to detect and visualize spam threats in real-time.</p>

  <!-- Badges -->
  ![Python](https://img.shields.io/badge/Python-3.9+-yellow?style=for-the-badge&logo=python&logoColor=white)
  ![FastAPI](https://img.shields.io/badge/FastAPI-005571?style=for-the-badge&logo=fastapi)
  ![React](https://img.shields.io/badge/React-20232A?style=for-the-badge&logo=react&logoColor=61DAFB)
  ![Vite](https://img.shields.io/badge/vite-%23646CFF.svg?style=for-the-badge&logo=vite&logoColor=white)
  ![Scikit-Learn](https://img.shields.io/badge/scikit--learn-%23F7931E.svg?style=for-the-badge&logo=scikit-learn&logoColor=white)

</div>

---

## 📖 Overview

**NeuroSentry** is a specialized end-to-end spam detection pipeline. It features a hardened **FastAPI Python Backend** running a pre-trained Scikit-Learn `LogisticRegression` model, paired with a sleek, **Cyber-Futuristic React Frontend**. 

Instead of relying on standard 50/50 prediction splits, this engine intercepts the raw probability matrices and enforces a custom `0.4` strict threshold to aggressively filter out sophisticated spam payloads.

## ✨ Key Features

- **⚡ Blazing Fast API**: Built on standard ASGI Python architecture (FastAPI + Uvicorn).
- **🛡️ Custom ML Thresholds**: Programmatically intercepts `predict_proba` to enforce strict spam classifications.
- **🎨 Glassmorphism UI**: A visually stunning dark-mode interface (`#0B1A12` & `#B4FF00`) with deep blur effects.
- **🎬 Micro-Interactions**: Fully animated using `framer-motion` for a premium, futuristic user experience (dynamic probability fill-bars, shrinking UI states).
- **📱 Fully Responsive**: Locks perfectly to the viewport without breaking format, rendering beautifully on smartphones and 4K monitors alike.

---

## 🛠️ Technology Stack

### Backend (`/backend`)
*   **Framework**: FastAPI
*   **Machine Learning**: Scikit-Learn, Joblib (TF-IDF Vectorization)
*   **Validation**: Pydantic
*   **Server**: Uvicorn

### Frontend (`/frontend`)
*   **Framework**: React 18 (Initialized via Vite)
*   **Styling**: Pure Vanilla CSS (No bloat, absolute control)
*   **Animations**: Framer Motion
*   **Icons**: Lucide-React

---

## 📂 Project Structure

```text
📦 spammessagedetector
 ┣ 📂 backend                 # Python API & ML Engine
 ┃ ┣ 📂 app
 ┃ ┃ ┣ 📂 core                # App Config (Thresholds, Paths)
 ┃ ┃ ┣ 📂 schemas             # Pydantic validation contracts
 ┃ ┃ ┣ 📂 services            # ML Pickle loading & Prediction Logic
 ┃ ┃ ┗ 📜 main.py             # FastAPI Router & CORS initialization
 ┃ ┣ 📂 dataset               # Training data and spam_detector.pkl
 ┃ ┣ 📜 README.md             # Backend specific docs
 ┃ ┣ 📜 requirements.txt      # Python dependencies
 ┃ ┗ 📜 test_api.py           # Endpoint integration testing
 ┃
 ┣ 📂 frontend                # Cyber-Futuristic React UI
 ┃ ┣ 📂 src
 ┃ ┃ ┣ 📜 App.jsx             # Core animated interface
 ┃ ┃ ┣ 📜 index.css           # Global theme variables & Glassmorphism
 ┃ ┃ ┗ 📜 main.jsx            # React root injection
 ┃ ┣ 📜 index.html            # Entry point & Google Fonts
 ┃ ┣ 📜 package.json          # Node dependencies (configured via npx)
 ┃ ┗ 📜 vite.config.js        # Vite bundler settings
 ┗ 📜 README.md               # You are here!
```

---

## 🚀 Getting Started (Local Development)

To run this full-stack application locally, you will need two terminal windows open.

### 1. Start the Backend API
```bash
cd backend
# Create a virtual env (Optional but recommended)
python -m venv venv
source venv/bin/activate  # On Windows: venv\Scripts\activate

# Install dependencies
pip install -r requirements.txt

# Boot the server
uvicorn app.main:app --reload
```
*The api is now listening on `http://127.0.0.1:8000`*

### 2. Start the Frontend UI
Open a **new terminal tab**:
```bash
cd frontend

# Install Node modules
npm install

# Start the Vite development server
npm run dev
```
*The UI is now live at `http://localhost:5173`*

---

## ☁️ Deployment Guides

### Deploying Backend (Render)
This backend is optimized for Render's Web Service environment.
1. Connect this repo to Render.
2. Set **Root Directory** to `backend`.
3. Set **Build Command** to `pip install -r requirements.txt`.
4. Set **Start Command** to `uvicorn app.main:app --host 0.0.0.0 --port $PORT`.

### Deploying Frontend (Vercel)
This frontend is configured to bypass common permission bugs heavily prevalent in Vite/Vercel migrations.
1. Connect this repo to Vercel.
2. Set **Root Directory** to `frontend`.
3. The Build settings will auto-detect Vite. The `package.json` has already been hardened using `npx vite build` to ensure cloud-compilation works flawlessly.
*(Note: Be sure to update the fetch URL in `App.jsx` from `127.0.0.1` to your live deployed backend URL once your Render API instance is live).*

---

<div align="center">
  <i>Designed and developed with 💚 for the future of web security.</i>
</div>
