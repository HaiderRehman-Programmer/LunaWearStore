import React, { useState } from 'react';
import { useAuth } from '../../hooks/useAuth.js';
import { Modal } from './Modal.jsx';
import { Lock, Mail, User, ArrowRight, ShieldCheck, Sparkles } from 'lucide-react';

export const AuthModal = () => {
  const { authModalOpen, setAuthModalOpen, loginUser, registerUser, loading, error } = useAuth();
  const [isRegister, setIsRegister] = useState(false);
  const [name, setName] = useState('');
  const [email, setEmail] = useState('haider@lunawear.com');
  const [password, setPassword] = useState('password123');

  if (!authModalOpen) return null;

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (isRegister) {
      await registerUser(name, email, password);
    } else {
      await loginUser(email, password);
    }
  };

  const handleUseDemoAdmin = () => {
    setEmail('haider@lunawear.com');
    setPassword('password123');
    loginUser('haider@lunawear.com', 'password123');
  };

  return (
    <Modal
      isOpen={authModalOpen}
      onClose={() => setAuthModalOpen(false)}
      title={isRegister ? 'Join Luna Wear' : 'Welcome Back'}
      maxWidth="460px"
    >
      <div className="auth-modal-body">
        {/* Demo Fast Login Pill */}
        <div className="demo-credentials-card" onClick={handleUseDemoAdmin}>
          <div className="demo-card-top">
            <Sparkles size={16} className="sparkle-icon" />
            <span>Instant Demo Access</span>
          </div>
          <p className="demo-sub">Click here to log in as <strong>Haider Rehman</strong> (Admin & Buyer)</p>
        </div>

        <form onSubmit={handleSubmit} className="auth-modal-form">
          {isRegister && (
            <div className="form-group-block">
              <label className="field-label">Full Name</label>
              <div className="input-with-icon-wrap">
                <User size={16} className="field-icon-left" />
                <input 
                  type="text" 
                  placeholder="Julian Vance"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  required
                  className="form-input with-icon"
                />
              </div>
            </div>
          )}

          <div className="form-group-block">
            <label className="field-label">Email Address</label>
            <div className="input-with-icon-wrap">
              <Mail size={16} className="field-icon-left" />
              <input 
                type="email" 
                placeholder="name@example.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                className="form-input with-icon"
              />
            </div>
          </div>

          <div className="form-group-block">
            <label className="field-label">Password</label>
            <div className="input-with-icon-wrap">
              <Lock size={16} className="field-icon-left" />
              <input 
                type="password" 
                placeholder="••••••••"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                className="form-input with-icon"
              />
            </div>
          </div>

          {error && (
            <p className="auth-error-msg animate-fade">{error}</p>
          )}

          <button 
            type="submit" 
            className="auth-submit-btn"
            disabled={loading}
          >
            {loading ? 'Authenticating...' : (isRegister ? 'Create Account' : 'Sign In')}
            <ArrowRight size={16} />
          </button>
        </form>

        <div className="auth-toggle-footer">
          <span>{isRegister ? 'Already have an account?' : "Don't have an account yet?"}</span>
          <button 
            type="button" 
            className="auth-mode-switch-btn"
            onClick={() => setIsRegister(!isRegister)}
          >
            {isRegister ? 'Sign In' : 'Create One Now'}
          </button>
        </div>
      </div>
    </Modal>
  );
};

export default AuthModal;
