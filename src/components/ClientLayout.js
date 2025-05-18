'use client'

import { AuthProvider } from '@/contexts/AuthContext';
import MainLayout from './Layout/MainLayout';

export default function ClientLayout({ children }) {
  return (
    <AuthProvider>
      <MainLayout>
        {children}
      </MainLayout>
    </AuthProvider>
  );
} 