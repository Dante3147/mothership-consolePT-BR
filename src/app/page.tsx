"use client";

import Loading from "@/src/components/loading";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

/**
 * Root page for the application.
 *
 * Redirects to scenario 0 on exterior view.
 */
export default function Home() {
  const router = useRouter();

  useEffect(() => {
    router.replace(`/0/exterior`);
  }, [router]);

  return <Loading />;
}
