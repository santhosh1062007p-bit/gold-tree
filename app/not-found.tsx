import Link from 'next/link';

export default function NotFound() {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-[#07090E] text-[#FEF7E0] p-6 text-center">
      <div className="max-w-md p-8 rounded-2xl bg-[#0f1420]/80 border border-amber-500/30 shadow-[0_0_50px_rgba(212,175,55,0.2)]">
        <h2 className="text-3xl font-bold text-amber-400 mb-2">404</h2>
        <p className="text-amber-200/80 mb-6 font-medium">Page Not Found</p>
        <Link
          href="/"
          className="inline-block px-6 py-2.5 rounded-full bg-amber-500/20 border border-amber-500/50 text-amber-300 font-semibold hover:bg-amber-500/30 transition-all"
        >
          Return to Kiosk
        </Link>
      </div>
    </div>
  );
}
