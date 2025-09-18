import React, { createContext, useContext, useEffect, useMemo, useState } from 'react';
import { onAuthStateChanged, signInWithEmailAndPassword, createUserWithEmailAndPassword, signOut } from 'firebase/auth';
import { auth } from '../firebase';

const AuthContext = createContext(null);

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [initializing, setInitializing] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const unsub = onAuthStateChanged(auth, (u) => {
      setUser(u);
      if (initializing) setInitializing(false);
    });
    return () => unsub();
  }, [initializing]);

  const value = useMemo(() => ({
    user,
    initializing,
    error,
    async signIn(email, password) {
      setError(null);
      try {
        await signInWithEmailAndPassword(auth, email.trim(), password);
      } catch (e) {
        setError(e.message);
        throw e;
      }
    },
    async signUp(email, password) {
      setError(null);
      try {
        await createUserWithEmailAndPassword(auth, email.trim(), password);
      } catch (e) {
        setError(e.message);
        throw e;
      }
    },
    async signOut() {
      setError(null);
      try {
        await signOut(auth);
      } catch (e) {
        setError(e.message);
        throw e;
      }
    },
  }), [user, initializing, error]);

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error('useAuth must be used within AuthProvider');
  return ctx;
}

