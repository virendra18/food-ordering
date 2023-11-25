import React from "react";

import SignupForm from "./_components/signup-form";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Signup | Restaurant",
};

const Signup = () => {
  return <SignupForm />;
};

export default Signup;
