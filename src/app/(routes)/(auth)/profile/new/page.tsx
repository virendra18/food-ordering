import { Metadata } from "next";
import React from "react";
import ProfileForm from "./_components/profile-form";
import db from "@/lib/db";
import useAuthStore from "@/stores/authStore";

export const metadata: Metadata = {
  title: "Create New Profile",
};
const NewProfilePage = async () => {
  return (
    <div>
      <ProfileForm />
    </div>
  );
};

export default NewProfilePage;
