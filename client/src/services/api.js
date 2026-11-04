const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || 'http://localhost:5000/api';

/**
 * Universal fetch wrapper with authorization headers & error handling
 */
export async function apiRequest(endpoint, options = {}) {
  const token = localStorage.getItem('luna_auth_token');
  
  const headers = {
    'Content-Type': 'application/json',
    ...(token ? { 'Authorization': `Bearer ${token}` } : {}),
    ...options.headers
  };

  const url = endpoint.startsWith('http') ? endpoint : `${API_BASE_URL}${endpoint}`;

  try {
    const res = await fetch(url, {
      ...options,
      headers
    });

    const data = await res.json().catch(() => null);

    if (!res.ok) {
      const errorMsg = data?.message || data?.error || `HTTP error ${res.status}`;
      throw new Error(errorMsg);
    }

    return data;
  } catch (error) {
    // If the server is offline during development, return null to let local fallback activate
    console.warn(`API call to ${endpoint} failed:`, error.message);
    throw error;
  }
}

export default {
  get: (endpoint, options) => apiRequest(endpoint, { method: 'GET', ...options }),
  post: (endpoint, body, options) => apiRequest(endpoint, { method: 'POST', body: JSON.stringify(body), ...options }),
  put: (endpoint, body, options) => apiRequest(endpoint, { method: 'PUT', body: JSON.stringify(body), ...options }),
  delete: (endpoint, options) => apiRequest(endpoint, { method: 'DELETE', ...options })
};
