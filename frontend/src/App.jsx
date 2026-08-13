import { BrowserRouter, Routes, Route } from "react-router-dom";

import Button from "./components/ui/Button"
import LandingPage from "./pages/Landingpage"
import Theme from "./pages/Theme";
// import Authentication from "./components/auth/AuthLayout";
// import Login from "./pages/Login";
import AuthPage from "./pages/AuthPage";
// import Register from "./pages/Register";

function App() {

  return (
    <>

      <BrowserRouter>
        <Routes>
          <Route path="/" element={<LandingPage />} />
          {/* <Route path="/login" element={<Login />} /> */}
          <Route
          path="/auth"
          element={<AuthPage />}
        />




          {/* Development reference page */}
          <Route path="/theme" element={<Theme />} />

        </Routes>
      </BrowserRouter>



    </>
  )
}

export default App
