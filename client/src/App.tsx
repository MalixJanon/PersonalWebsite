import { useEffect } from "react";
import { Switch, Route, Router } from "wouter";
import { queryClient } from "./lib/queryClient";
import { QueryClientProvider } from "@tanstack/react-query";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";
import CustomCursor from "@/components/ui/custom-cursor";
import { useHasFinePointer } from "@/hooks/use-has-fine-pointer";
import Home from "@/pages/Home";
import NotFound from "@/pages/not-found";

function Routes() {
  return (
    <Switch>
      <Route path="/" component={Home} />
      <Route component={NotFound} />
    </Switch>
  );
}

function App() {
  const hasFinePointer = useHasFinePointer();
  const routerBase =
    typeof window !== "undefined"
      ? new URL(import.meta.env.BASE_URL, window.location.href).pathname.replace(/\/$/, "") || "/"
      : "/";

  useEffect(() => {
    document.body.classList.toggle("has-fine-pointer", hasFinePointer);
  }, [hasFinePointer]);

  return (
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        {hasFinePointer && <CustomCursor />}
        <Toaster />
        <Router base={routerBase}>
          <Routes />
        </Router>
      </TooltipProvider>
    </QueryClientProvider>
  );
}

export default App;