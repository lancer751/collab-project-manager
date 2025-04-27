import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import { createRouter, RouterProvider } from "@tanstack/react-router";
import { routeTree } from "./routeTree.gen";
import { ThemeProvider } from "./components/theme-provider";
import { AuthProvider } from "./contexts/Auth";
import { useAuth } from "./hooks/useAuth";

const router = createRouter({
  routeTree,
  defaultPreload: "intent",
  scrollRestoration: true,
  context: {
    auth: undefined!
  }
});

declare module "@tanstack/react-router" {
  interface Register {
    router: typeof router;
  }
}

function InnerApp(){
  const auth = useAuth()
  return (
    <RouterProvider router={router} context={{auth}}/>
  )
}

function App () {
  return (
    <AuthProvider>
      <InnerApp/>
    </AuthProvider>
  )
}

const rootElement = document.getElementById("app")!;

if (!rootElement.innerHTML) {
  const root = createRoot(rootElement);
  root.render(
    <StrictMode>
      <ThemeProvider defaultTheme="dark" storageKey="vite-ui-theme">
        <App/>
      </ThemeProvider>
    </StrictMode>
  );
}
