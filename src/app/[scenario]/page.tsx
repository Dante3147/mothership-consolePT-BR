"use client";

import Loading from "@/src/components/loading";
import { allScenarios } from "@/src/models/scenario";
import { notFound, useParams, useRouter } from "next/navigation";
import { useEffect } from "react";

/**
 * Page that displays the scenario of the current route.
 *
 * Default to scenario 0 on exterior view.
 */
export default function ScenarioSelector() {
  const router = useRouter();
  const params = useParams();
  const mapId = params.scenario as string;

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
