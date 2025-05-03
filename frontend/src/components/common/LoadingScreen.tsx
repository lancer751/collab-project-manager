import React from "react";

export function LoadingScreen() {
  return (
    <div className="fixed inset-0 z-50 flex flex-col items-center justify-center bg-background">
      <img src="/logo.png" alt="Logo" className="w-20 h-20 animate-bounce mb-6" />
      <div className="w-10 h-10 border-4 border-primary border-t-transparent rounded-full animate-spin mb-2" />
      <span className="text-muted-foreground mt-2">Cargando...</span>
    </div>
  );
} 