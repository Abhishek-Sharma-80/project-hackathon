import type { Metadata } from 'next';
import './globals.css';
import { AuthProvider } from '@/context/AuthContext';

export const metadata: Metadata = {
  title: 'SmartEdu AI — AI-Powered Learning, Skill Intelligence & Internship Platform',
  description:
    'SmartEdu AI bridges the gap between what students learn and what industry needs through explainable AI matching, skill gap diagnostics, and personalized roadmaps. Smart India Hackathon 2026.',
  icons: {
    icon: '/favicon.ico',
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className="antialiased font-sans bg-[#F8FAFC] text-slate-900 min-h-screen">
        <AuthProvider>
          {children}
        </AuthProvider>
      </body>
    </html>
  );
}
