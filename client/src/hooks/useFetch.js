import { useState, useEffect, useCallback } from 'react';
import { apiRequest } from '../services/api.js';

export const useFetch = (endpoint, options = {}, immediate = true) => {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(immediate);
  const [error, setError] = useState(null);

  const execute = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      const result = await apiRequest(endpoint, options);
      setData(result?.data !== undefined ? result.data : result);
      return result;
    } catch (err) {
      setError(err.message);
      return null;
    } finally {
      setLoading(false);
    }
  }, [endpoint]);

  useEffect(() => {
    if (immediate && endpoint) {
      execute();
    }
  }, [execute, immediate, endpoint]);

  return { data, loading, error, refetch: execute };
};

export default useFetch;
