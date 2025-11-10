// src/main.tsx
import React from "react";
import ReactDOM from "react-dom/client";
import {
  createBrowserRouter,
  RouterProvider,
  Navigate,
  Outlet,
  useLocation,
} from "react-router-dom";
import { Toaster } from "react-hot-toast";

import App from "./App";                // <- ต้องเป็น Layout ที่มี <Outlet />
import Dashboard from "./pages/Dashboard";
import BotsPage from "./pages/Bots";
import BotDetail from "./pages/BotDetail";
import Login from "./pages/Login";
import "./index.css";

const TOKEN_KEY = "BN9_TOKEN";

/* ----------------------------- helpers ----------------------------- */

function hasToken() {
  try {
    return !!localStorage.getItem(TOKEN_KEY);
  } catch {
    return false;
  }
}

// เลื่อนขึ้นบนสุดเมื่อเปลี่ยนเส้นทาง
function ScrollTop() {
  const { pathname } = useLocation();
  React.useEffect(() => {
    try {
      window.scrollTo(0, 0);
    } catch {}
  }, [pathname]);
  return null;
}

// ป้องกันหน้า protected ถ้ายังไม่มี token
function AuthGate({ children }: { children: React.ReactNode }) {
  if (!hasToken()) return <Navigate to="/login" replace />;
  return <>{children}</>;
}

// หน้า error ของ router
function RouteError() {
  return (
    <div className="p-6">
      <h2 className="text-lg font-semibold">เกิดข้อผิดพลาดของเส้นทาง</h2>
      <p className="text-sm text-neutral-500">ลองรีเฟรชหน้า หรือกลับไปหน้าแรก</p>
      <a href="/" className="text-indigo-500 underline">
        กลับหน้าแรก
      </a>
    </div>
  );
}

/* ------------------------------ router ------------------------------ */

const router = createBrowserRouter([
  // public route
  { path: "/login", element: <Login /> },

  // shell + nested routes
  {
    path: "/",
    element: (
      <>
        <ScrollTop />
        {/* App เป็น shell/layout ที่หุ้ม <Outlet /> */}
        <App />
      </>
    ),
    errorElement: <RouteError />,
    children: [
      {
        element: (
          <AuthGate>
            <Outlet />
          </AuthGate>
        ),
        children: [
          { index: true, element: <Dashboard /> }, // หน้าแรก → Dashboard
          { path: "dashboard", element: <Dashboard /> },
          { path: "bots", element: <BotsPage /> },
          { path: "bots/:botId", element: <BotDetail /> },
        ],
      },
      { path: "*", element: <Navigate to="/" replace /> },
    ],
  },
]);

function Root() {
  return (
    <>
      <RouterProvider router={router} />
      <Toaster position="top-right" />
    </>
  );
}

/* ------------------------------ mount ------------------------------ */

ReactDOM.createRoot(document.getElementById("root") as HTMLElement).render(
  <React.StrictMode>
    <Root />
  </React.StrictMode>
);
