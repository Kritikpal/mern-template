import LoginForm from "./component/forms/LoginForm";
import { BrowserRouter, Route, Routes, redirect } from "react-router-dom";
import DrawerAppBar from "./component/common/DrawerAppbar";
import Home from "./pages/Home";
import Contact from "./pages/Contact";
import About from "./pages/About";
import SignUpForm from "./component/forms/SignUpForm";
import ForgotPasswordForm from "./component/forms/ForgotPasswordForm";
import NewPasswordForm from "./component/forms/NewPasswordForm";
function App() {
  return (
    <div>
      <DrawerAppBar />
      <BrowserRouter>
        <Routes>
          <Route path="/login" element={<LoginForm />} />
          <Route path="/forgotPassword" element={<ForgotPasswordForm />} />
          <Route path="/resetPassword" element={<NewPasswordForm />} />
          <Route path="/signup" element={<SignUpForm />} />
          <Route path="/home" element={<Home />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/about" element={<About />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
