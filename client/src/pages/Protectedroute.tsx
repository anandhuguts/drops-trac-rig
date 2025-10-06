// src/components/ProtectedRoute.tsx
import { useLocation } from "wouter";
import { useEffect, ReactNode } from "react";

interface ProtectedRouteProps {
  children: ReactNode;
}

export default function ProtectedRoute({ children }: ProtectedRouteProps) {
  const [, setLocation] = useLocation();

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token) {
      setLocation("/"); // redirect to login if no token
    }
  }, [setLocation]);

  return <>{children}</>;
}
