"use client";

import PageLoading from "@/components/ui/page-loading";
import useAuthStore from "@/stores/authStore";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

const AdminLayout = ({ children }: { children: React.ReactNode }) => {
  const [mounted, setMounted] = useState(false);
  const router = useRouter();
  const { user } = useAuthStore();

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    return <PageLoading />;
  }

  if ((user && user?.email !== "admin@foodexpress.com") === undefined) {
    router.push("/");
  } else if (user && user?.email !== "admin@foodexpress.com") {
    router.push("/");
  } else {
    return <main className="max-w-7xl mx-auto px-3 lg:px-7">{children}</main>;
  }
};

export default AdminLayout;
