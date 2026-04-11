import NotFound from "@/pages/NotFound";
import { Route, Switch } from "wouter";
import ErrorBoundary from "./components/ErrorBoundary";
import { ThemeProvider } from "./contexts/ThemeContext";
import Home from "./pages/Home";

function Router() {
  const base = "/wellpriv";
  return (
    <Switch>
      <Route path={base + "/"} component={Home} />
      <Route path={base} component={Home} />
      <Route path={"/"} component={Home} />
      <Route path={base + "/404"} component={NotFound} />
      <Route path={"/404"} component={NotFound} />
      <Route component={NotFound} />
    </Switch>
  );
}

function App() {
  return (
    <ErrorBoundary>
      <ThemeProvider defaultTheme="dark">
        <Router />
      </ThemeProvider>
    </ErrorBoundary>
  );
}

export default App;
