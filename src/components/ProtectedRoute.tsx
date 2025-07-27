// src/components/ProtectedRoute.tsx
import React, { useEffect } from 'react';
import { selectAuthLoading, selectIsAuthenticated } from '@/store/auth/auth.selectors';
import { fetchUser } from '@/store/auth/auth.slice';
import { AppDispatch } from '@/store/store';
import { useDispatch, useSelector } from 'react-redux';
import { Navigate, useLocation } from 'react-router';
import { Spin } from 'antd';

interface ProtectedRouteProps {
  children: React.ReactNode;
}

export const ProtectedRoute: React.FC<ProtectedRouteProps> = ({ children }) => {
  const dispatch = useDispatch<AppDispatch>();
  const location = useLocation();
  const isAuthenticated = useSelector(selectIsAuthenticated);
  const loading = useSelector(selectAuthLoading);

  useEffect(() => {
    // Try to fetch user if not authenticated (in case of page refresh)
    if (!isAuthenticated && !loading) dispatch(fetchUser());
  }, [dispatch, isAuthenticated, loading]);

  if (loading) {
    return (
      <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh' }}>
        <Spin size="large" />
      </div>
    );
  }

  if (!isAuthenticated) return <Navigate to="/login" state={{ from: location }} replace />;

  return <>{children}</>;
};
