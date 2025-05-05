import { Button } from "@/components/ui/button";
import { Link } from "@tanstack/react-router";

export default function NotFound() {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-background text-foreground animate-fade-in">
      <img
        src="/logo.png"
        alt="Logo"
        className="w-20 h-20 mb-6 drop-shadow-lg animate-fade-in"
        style={{ animationDelay: '100ms' }}
      />
      <h1 className="text-6xl font-extrabold mb-2">404</h1>
      <p className="text-lg mb-8 text-muted-foreground animate-fade-in" style={{ animationDelay: '200ms' }}>
        Página no encontrada
      </p>
      <Button asChild variant="outline" className="animate-fade-in" style={{ animationDelay: '300ms' }}>
        <Link to="/">Volver al inicio</Link>
      </Button>
      <style>{`
        .animate-fade-in {
          animation: fadeIn 0.7s ease both;
        }
        @keyframes fadeIn {
          from { opacity: 0; transform: translateY(20px); }
          to { opacity: 1; transform: none; }
        }
        .animate-bounce-slow {
          animation: bounce 1.5s infinite;
        }
        @keyframes bounce {
          0%, 100% { transform: translateY(0); }
          50% { transform: translateY(-12px); }
        }
      `}</style>
    </div>
  );
} 