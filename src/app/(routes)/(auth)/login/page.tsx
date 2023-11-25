import LoginForm from "./_components/login-form";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Login | Restaurant",
};

const Login = () => {
  return <LoginForm />;
};

export default Login;
