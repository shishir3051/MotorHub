import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import axiosInstance from '../api/axiosInstance';
import { useStore } from '../store/useStore';
import {
  clearSession,
  getContextFromPath,
  migrateLegacyToken,
  setSession,
} from '../utils/session';

export function useSessionSync() {
  const location = useLocation();
  const { loadSession, setAuth, logout, refreshSessionFlags } = useStore();

  useEffect(() => {
    migrateLegacyToken();

    const context = getContextFromPath(location.pathname);
    const existing = loadSession(context);

    if (!existing?.token) {
      refreshSessionFlags();
      return;
    }

    axiosInstance
      .get('/auth/me', { sessionToken: existing.token })
      .then((res) => {
        setSession(context, { user: res.data, token: existing.token });
        setAuth(context, res.data, existing.token);
      })
      .catch(() => {
        clearSession(context);
        logout(context);
      });
  }, [location.pathname]); // eslint-disable-line react-hooks/exhaustive-deps
}
