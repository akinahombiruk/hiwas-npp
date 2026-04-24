import "./App.css";
import { useEffect } from "react";
import { ProtectedRoute } from "./components/ProtectedRoute";

import { BrowserRouter as Router, Switch, Route } from "react-router-dom";

import { Pages } from "./components/pages/Pages";
import { AdminUpload } from "./components/pages/AdminUpload";
import { Login } from "./components/pages/Login";

import AOS from "aos";
import "aos/dist/aos.css";

function App() {
  useEffect(() => {
    AOS.init();
    AOS.refresh();
  }, []);

  return (
    <Router>
      <Switch>
        {/* Main website */}
        <Route path="/" exact component={Pages} />

        {/* Admin upload page */}
       import { ProtectedRoute } from "./components/ProtectedRoute";

<ProtectedRoute path="/admin/upload" component={AdminUpload} />
        <Route path="/admin/login" component={Login} />
      </Switch>
    </Router>
  );
}

export default App;