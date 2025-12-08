"use client";

import Loading from "@/components/loading";
import { allScenarios } from "@/lib/models/scenario";
import { notFound, useParams, useRouter } from "next/navigation";
import { useEffect } from "react";

export default function Home() {
  const router = useRouter();
  const params = useParams();
  const mapId = params.mapId as string;

  useEffect(() => {
    // Validate the mapId
    const mapIndex = Number.parseInt(mapId);
    if (isNaN(mapIndex) || mapIndex < 0 || mapIndex >= allScenarios.length) {
      notFound();
    }

    router.replace(`/${mapId}/exterior`);
  }, [mapId, router]);

  return <Loading />;
}
