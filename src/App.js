import Register from "./pages/Register";
import Login from "./pages/Login";
import Home from "./pages/Home";
import "./style.scss";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { useContext, useState, useEffect } from "react";
import { AuthContext } from "./context/AuthContext";
import NotAvailPage from "./pages//NotAvailPage";

function App() {
  const { currentUser } = useContext(AuthContext);
  const [showMobileMessage, setShowMobileMessage] = useState(false);
  useEffect(() => {
    const mediaQuery = window.matchMedia("(max-width: 1024px)");

    const handleMediaChange = (mediaQuery) => {
      setShowMobileMessage(mediaQuery.matches);
    };

    handleMediaChange(mediaQuery);
    mediaQuery.addEventListener("change", handleMediaChange);

    return () => {
      mediaQuery.removeEventListener("change", handleMediaChange);
    };
  }, []);

  const ProtectedRoot = ({ children }) => {
    if (!currentUser) {
      return <Navigate to="/login" />;
    }
    return children;
  };

  return (
    <BrowserRouter>
      {showMobileMessage && <NotAvailPage />}
      {!showMobileMessage && (
        <Routes>
          <Route path="">
            <Route
              index
              element={
                <ProtectedRoot>
                  <Home />
                </ProtectedRoot>
              }
            />
            <Route path="login" element={<Login />} />
            <Route path="register" element={<Register />} />
          </Route>
        </Routes>
      )}
    </BrowserRouter>
  );
}

export default App;
