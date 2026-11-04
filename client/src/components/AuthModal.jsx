import React, { useState } from 'react';
import { useStore } from '../context/StoreContext';
import { X, Eye, EyeOff, LogIn, UserPlus } from 'lucide-react';

export const AuthModal = () => {
  const { authModalOpen, setAuthModalOpen, loginUser, registerUser } = useStore();
  const [mode, setMode] = useState('login');
  const [showPw, setShowPw] = useState(false);
  const [form, setForm] = useState({ name: '', email: '', password: '' });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  if (!authModalOpen) return null;

  const update = (key, val) => setForm(prev => ({ ...prev, [key]: val }));

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    if (!form.email || !form.password) { setError('Email and password are required'); return; }
    if (mode === 'register' && !form.name) { setError('Name is required'); return; }
    
    setLoading(true);
    let success;
    if (mode === 'login') {
      success = await loginUser(form.email, form.password);
    } else {
      success = await registerUser(form.name, form.email, form.password);
    }
    if (!success) setError('Authentication failed. Please try again.');
    setLoading(false);
  };

  return (
    <div className="modal-overlay" onClick={() => setAuthModalOpen(false)}>
      <div className="auth-modal animate-popup" onClick={e => e.stopPropagation()}>
        <button className="modal-close-btn" onClick={() => setAuthModalOpen(false)}>
          <X size={22} />
        </button>

        {/* Logo in Modal */}
        <div className="auth-modal-logo">
          <svg width="32" height="32" viewBox="0 0 24 24" fill="none">
            <circle cx="12" cy="12" r="10" stroke="#c5a880" strokeWidth="1.5" />
            <path d="M12 2a10 10 0 0 1 10 10A10 10 0 0 1 12 22 10 10 0 0 0 12 2z" fill="#c5a880" />
          </svg>
          <span className="auth-brand-name">LUNA WEAR</span>
        </div>

        <h2 className="auth-modal-title">
          {mode === 'login' ? 'Welcome Back' : 'Create Account'}
        </h2>
        <p className="auth-modal-subtitle">
          {mode === 'login'
            ? 'Sign in to access your orders, wishlist, and exclusive offers.'
            : 'Join the Luna Wear community and get 10% off your first order.'}
        </p>

        {mode === 'login' && (
          <div className="auth-demo-hint">
            <strong>Demo:</strong> Email: haider@lunawear.com · Password: password123
          </div>
        )}

        <form className="auth-form" onSubmit={handleSubmit}>
          {mode === 'register' && (
            <div className="form-group">
              <label>Full Name</label>
              <input
                className="input-base"
                type="text"
                placeholder="Elena Rostova"
                value={form.name}
                onChange={e => update('name', e.target.value)}
              />
            </div>
          )}

          <div className="form-group">
            <label>Email Address</label>
            <input
              className="input-base"
              type="email"
              placeholder="you@example.com"
              value={form.email}
              onChange={e => update('email', e.target.value)}
            />
          </div>

          <div className="form-group">
            <label>Password</label>
            <div className="password-input-wrap">
              <input
                className="input-base password-input"
                type={showPw ? 'text' : 'password'}
                placeholder="••••••••"
                value={form.password}
                onChange={e => update('password', e.target.value)}
              />
              <button
                type="button"
                className="password-toggle-btn"
                onClick={() => setShowPw(p => !p)}
              >
                {showPw ? <EyeOff size={17} /> : <Eye size={17} />}
              </button>
            </div>
          </div>

          {error && <p className="auth-error-msg">{error}</p>}

          <button className="btn-primary auth-submit-btn" type="submit" disabled={loading}>
            {loading ? 'Please wait...' : (
              mode === 'login'
                ? <><LogIn size={17} /> Sign In</>
                : <><UserPlus size={17} /> Create Account</>
            )}
          </button>
        </form>

        <div className="auth-switch-row">
          {mode === 'login' ? (
            <p>New to Luna Wear? <button className="auth-switch-link" onClick={() => setMode('register')}>Create a free account</button></p>
          ) : (
            <p>Already have an account? <button className="auth-switch-link" onClick={() => setMode('login')}>Sign in</button></p>
          )}
        </div>

        {mode === 'register' && (
          <p className="auth-terms-note">
            By creating an account, you agree to our <u>Terms of Service</u> and <u>Privacy Policy</u>.
          </p>
        )}
      </div>
    </div>
  );
};
