import type { Metadata } from 'next';
import './globals.css';
import { AmbientBackground } from '@/components/AmbientBackground';
import { SoundController } from '@/components/SoundController';

export const metadata: Metadata = {
  title: 'Innovation Legacy Tree | Every Signature Becomes a Legacy',
  description: 'A premium digital chief guest registration and institutional heritage system for inaugurations, summits, and ceremonies.',
  keywords: 'Innovation Legacy Tree, digital signature, chief guest registration, institutional heritage',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="dark">
      {/* overflow-hidden on html/body prevents unwanted scroll bars on kiosk page;
          each scrollable page manages its own scroll via overflow-y-auto wrappers */}
      <body className="antialiased bg-[#07090E] text-[#FEF7E0] overflow-hidden select-none" style={{ height: '100dvh' }}>
        <AmbientBackground />
        <main className="relative z-10 w-full h-full">
          {children}
        </main>
        <SoundController />
      </body>
    </html>
  );
}
