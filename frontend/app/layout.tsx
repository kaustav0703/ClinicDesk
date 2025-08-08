import type { Metadata } from 'next';
import './globals.css';
import Navbar from '../components/Navbar';
import { AuthProvider } from '@/context/AuthContext';

export const metadata: Metadata = {
  title: 'Healthcare App',
  description: 'A Next.js healthcare application with hospital, doctors, and patients sections',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className='dark'>
      <body className="flex flex-col min-h-screen bg-gray-100 dark:bg-gray-900 text-white">
        <AuthProvider>
          <Navbar /> {/* Will still render always – for conditional render, use `useAuth()` inside Navbar */}
          <main className="flex-grow pt-16">{children}</main>
        </AuthProvider>
      </body>
    </html>
  );
}
