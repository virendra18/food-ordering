import { cookies } from "next/headers";
import React from "react";
import ProfilePageClient from "./_components/client";

const ProfilePage = async () => {
  return (
    <div>
      <h1 className="text-4xl font-bold my-7 text-center">Profile</h1>
      <ProfilePageClient />
    </div>
  );
};

export default ProfilePage;
