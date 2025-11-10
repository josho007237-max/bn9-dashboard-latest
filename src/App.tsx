// src/App.tsx
import { Link, useNavigate, Outlet } from "react-router-dom";
import { useCallback } from "react";

const TOKEN_KEY = "BN9_TOKEN";

export default function App() {
  const nav = useNavigate();

  const onLogout = useCallback(() => {
    try { localStorage.removeItem(TOKEN_KEY); } catch {}
    nav("/login", { replace: true });
  }, [nav]);

  return (
    <div className="min-h-screen bg-[#0f1113] text-gray-100">
      {/* Header / Shell */}
      <header className="sticky top-0 z-10 bg-[#0f1113]/80 backdrop-blur border-b border-neutral-800">
        <div className="max-w-6xl mx-auto px-4 py-3 flex items-center gap-3">
          <Link to="/dashboard" className="text-lg font-semibold">
            BN9
          </Link>

          <nav className="ml-auto flex items-center gap-2 text-sm">
            <Link
              to="/dashboard"
              className="px-3 py-1.5 rounded-lg hover:bg-white/5"
            >
              Dashboard
            </Link>
            <Link
              to="/bots"
              className="px-3 py-1.5 rounded-lg hover:bg-white/5"
            >
              Bots
            </Link>

            {/* Logout */}
            <button
              onClick={onLogout}
              className="ml-2 px-3 py-1.5 rounded-lg bg-neutral-800 hover:bg-neutral-700 border border-neutral-700"
              title="ออกจากระบบ"
            >
              Logout
            </button>
          </nav>
        </div>
      </header>

      {/* Page content */}
      <main className="max-w-6xl mx-auto px-4 py-6">
        <Outlet />
      </main>
    </div>
  );
}
