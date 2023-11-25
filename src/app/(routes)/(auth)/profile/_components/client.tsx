"use client";
import PageLoading from "@/components/ui/page-loading";
import useAuthStore from "@/stores/authStore";
import React from "react";
import useSWR from "swr";
const ProfilePageClient = () => {
  const { user } = useAuthStore();

  const fetcher = async () => {
    const res = await fetch("/api/profile");
    const resData = await res.json();

    return resData.data;
  };
  const { data, isLoading, error } = useSWR(`/${user?.id}/profile`, fetcher);

  if (isLoading) {
    return <PageLoading />;
  }
  return (
    <section className="md:w-1/2 mx-auto">
      <div className="border-2 border-gray-600 px-5 py-3 rounded-md">
        <div>
          <p>Name: {data[0]?.user?.name}</p>
        </div>
        <div className="mt-3">
          <p>Email: {data[0]?.user?.email}</p>
        </div>

        <div className="mt-3">
          <p>
            Address:
            {data[0]?.address}, {data[0]?.city},{" "}
            {data[0]?.state.toLocaleUpperCase()}, {data[0]?.pincode}
          </p>
        </div>
        <div className="mt-3">
          <p>Phone: {data[0]?.phone}</p>
        </div>
      </div>

      {/* <div className=" mt-5 rounded-md profiles flex items-center flex-wrap">
        {data?.map((profile: any, idx: number) => (
          <div className="border-2 px-3 py-5 rounded-md" key={profile.id}>
            <p className="text-center font-bold">Profile {idx + 1}</p>

            <p>
              {profile?.address}, {profile?.city}, {profile?.state},{" "}
              {profile?.pincode}
            </p>

            <p>{profile?.phone}</p>
          </div>
        ))}
      </div> */}
    </section>
  );
};

export default ProfilePageClient;
