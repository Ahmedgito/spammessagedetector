import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ShieldCheck, ShieldAlert, Cpu } from 'lucide-react';

const API_URL = "https://spammessagedetector.onrender.com";

function App() {
  const [text, setText] = useState('');
  const [loading, setLoading] = useState(false);
  const [loadingText, setLoadingText] = useState("Analyze Payload");
  const [result, setResult] = useState(null);
  const [error, setError] = useState(null);

  // Wake up the Render server silently when the page loads
  useEffect(() => {
    fetch(`${API_URL}/`).catch(() => {});
  }, []);

  const analyzeSpam = async () => {
    if (!text.trim()) return;
    
    setLoading(true);
    setLoadingText("Analyzing...");
    setResult(null);
    setError(null);
    
    // If Render hasn't booted yet, update text after 3 seconds
    const timeoutMsg = setTimeout(() => {
      setLoadingText("Booting AI Engine (up to 50s)...");
    }, 3000);
    
    try {
      const response = await fetch(`${API_URL}/predict`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ text })
      });
      
      clearTimeout(timeoutMsg);
      
      if (!response.ok) {
        throw new Error('API Error - Failed to connect to neuro-engine');
      }
      
      const data = await response.json();
      setResult(data);
    } catch (err) {
      clearTimeout(timeoutMsg);
      setError(err.message);
    } finally {
      setLoading(false);
      setLoadingText("Analyze Payload");
    }
  };

  return (
    <div className="app-container">
      <motion.div 
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.8, ease: "easeOut" }}
        className="glass-panel"
      >
        <div style={{ display: 'flex', justifyContent: 'center', marginBottom: '1rem' }}>
          <motion.div
            animate={{ rotate: 360 }}
            transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
          >
            <Cpu size={36} color="var(--neon-green)" />
          </motion.div>
        </div>
        
        <h1><span className="text-gradient">NEUROSENTRY</span></h1>
        <p className="subtitle">AI-Powered Spam Intelligence</p>
        
        <textarea
          placeholder="Paste transmission data here for threat analysis..."
          value={text}
          onChange={(e) => setText(e.target.value)}
        />
        
        {error && (
          <p style={{ color: 'var(--danger)', marginTop: '0.5rem', textAlign: 'center' }}>
            {error}
          </p>
        )}
        
        <button 
          className="btn-primary" 
          onClick={analyzeSpam}
          disabled={loading || !text.trim()}
          style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', gap: '10px' }}
        >
          {loading ? <><span className="loader"></span> <span style={{fontSize: '1rem'}}>{loadingText}</span></> : "Analyze Payload"}
        </button>

        <AnimatePresence>
          {result && (
            <motion.div 
              initial={{ opacity: 0, height: 0, y: 20 }}
              animate={{ opacity: 1, height: 'auto', y: 0 }}
              exit={{ opacity: 0, height: 0 }}
              className={`result-container ${result.prediction === 'spam' ? 'spam' : 'safe'}`}
              style={{ overflow: 'hidden' }}
            >
              {result.prediction === 'spam' ? (
                <ShieldAlert size={48} color="var(--danger)" />
              ) : (
                <ShieldCheck size={48} color="var(--neon-green)" />
              )}
              
              <div className="result-status">
                {result.prediction === 'spam' ? 'THREAT DETECTED' : 'CLEAN'}
              </div>
              <p style={{ color: 'var(--text-secondary)' }}>
                {result.prediction === 'spam' 
                  ? 'This message matches known spam signatures.' 
                  : 'This message appears safe and organically generated.'}
              </p>
              
              <div className="probability-bar-bg">
                <motion.div 
                  className="probability-bar-fill"
                  initial={{ width: 0 }}
                  animate={{ width: `${result.spam_probability * 100}%` }}
                  transition={{ duration: 1, delay: 0.2 }}
                />
              </div>
              <div className="prob-text">
                Threat Confidence: {(result.spam_probability * 100).toFixed(2)}% | Threshold: {(result.threshold * 100).toFixed(0)}%
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.div>
    </div>
  );
}

export default App;
