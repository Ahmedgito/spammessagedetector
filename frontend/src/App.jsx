import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ShieldCheck, ShieldAlert, Cpu } from 'lucide-react';

function App() {
  const [text, setText] = useState('');
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState(null);
  const [error, setError] = useState(null);

  const analyzeSpam = async () => {
    if (!text.trim()) return;
    
    setLoading(true);
    setResult(null);
    setError(null);
    
    try {
      const response = await fetch('http://127.0.0.1:8000/predict', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ text })
      });
      
      if (!response.ok) {
        throw new Error('API Error - Ensure the backend is running');
      }
      
      const data = await response.json();
      setResult(data);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
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
            <Cpu size={48} color="var(--neon-green)" />
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
        >
          {loading ? <span className="loader"></span> : "Analyze Payload"}
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
                <ShieldAlert size={64} color="var(--danger)" />
              ) : (
                <ShieldCheck size={64} color="var(--neon-green)" />
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
