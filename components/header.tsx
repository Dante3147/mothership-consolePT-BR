"use client";

import { useAdmin } from "@/lib/context/admin-context";
import { useEmergency } from "@/lib/context/emergency-context";
import { useScenario } from "@/lib/context/scenario-context";
import { useSimulationTime } from "@/lib/context/simulation-time-context";
import { useView, ViewType } from "@/lib/context/view-context";
import {
  AlertTriangle,
  Anchor,
  Brain,
  Cpu,
  Database,
  DollarSign,
  Map as MapIcon,
  PersonStanding,
  Radio,
  Shield,
  Slice,
  Terminal,
  Tractor,
  Wine,
} from "lucide-react";
import { useParams, useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { ImageSelector } from "./images/image-selector";
import { Button } from "./ui/button";

const tableIcons = {
  Wine,
  DollarSign,
  Cpu,
  Slice,
  Brain,
  PersonStanding,
  Database,
  Tractor,
  Terminal,
  Anchor,
};

export type TableIcon = keyof typeof tableIcons;

export function Header() {
  const { scenario, map } = useScenario();
  const { emergency } = useEmergency();
  const { isAdmin } = useAdmin();
  const { currentView, setCurrentView } = useView();
  const router = useRouter();
  const params = useParams();
  const { currentTime } = useSimulationTime();
  const mapId = params.mapId as string;
  const [isImageSelectorOpen, setIsImageSelectorOpen] = useState(false);

  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      // Check for Cmd+K (Mac) or Ctrl+K (Windows/Linux)
      if ((event.metaKey || event.ctrlKey) && event.key === "k") {
        event.preventDefault();
        setIsImageSelectorOpen((prev) => !prev);
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, []);

  const handleViewChange = (view: ViewType) => {
    setCurrentView(view);
    router.push(`/${mapId}/${view}`);
  };

  // Determine available views
  const availableViews: ViewType[] = [
    "exterior",
    map ? "interior" : null,
    scenario.asciiMap ? "interior-ascii" : null,
    scenario.showPcView ? "pcs" : null,
    ...(scenario.tables ? scenario.tables.map((_, idx) => `table-${idx}`) : []),
  ].filter(Boolean) as ViewType[];

  return (
    <header className="border border-primary p-2">
      <div className="flex flex-col md:flex-row md:justify-between md:items-center gap-2">
        <div className="flex items-center gap-2 flex-wrap">
          <Terminal className="h-6 w-6" />
          <h1 className="text-xl md:text-2xl font-bold tracking-wider">
            {scenario.name}
          </h1>
          {emergency.active && emergency.alarm && (
            <div className="flex items-center gap-1 text-red-500 animate-pulse">
              <AlertTriangle className="h-4 w-4" />
              <span className="text-sm md:text-2xl">
                {emergency.reason === "self-destruct"
                  ? "SELF-DESTRUCT ACTIVE"
                  : "EMERGENCY PROTOCOL"}
              </span>
            </div>
          )}
          {isAdmin && (
            <div className="flex items-center gap-1 text-green-500">
              <Shield className="h-4 w-4" />
              <span className="text-sm md:text-xl">ADMIN MODE</span>
            </div>
          )}
        </div>
        <div className="flex flex-col md:flex-row md:items-center gap-2 md:gap-12">
          <div className="text-sm md:text-base font-mono">
            <p className="flex justify-between">
              <span>CREW:&nbsp;</span>
              <button
                onClick={() => setIsImageSelectorOpen(true)}
                className="hover:text-primary transition-colors"
              >
                {scenario.crew.current}/{scenario.crew.capacity}
              </button>
            </p>
            <p className="flex justify-between">
              <span>DATE:&nbsp;</span>
              <span>{currentTime.toFormat("dd-MM-yyyy")}</span>
            </p>
          </div>
          {availableViews.length > 1 && (
            <div className="flex flex-wrap gap-2 md:gap-4">
              {/* Table Tabs */}
              {scenario.tables &&
                scenario.tables.map((table, idx) => {
                  const Icon = tableIcons[table.icon ?? "DollarSign"];
                  return (
                    <Button
                      key={table.title}
                      variant="outline"
                      onClick={() => handleViewChange(`table-${idx}`)}
                      className={`text-xs md:text-sm px-2 py-1 h-auto border-primary hover:bg-primary hover:text-black whitespace-nowrap ${
                        currentView === `table-${idx}`
                          ? "bg-primary text-black"
                          : ""
                      }`}
                    >
                      <Icon className="mr-1 h-3 w-3 md:h-4 md:w-4" />
                      {table.title.toUpperCase()}
                    </Button>
                  );
                })}

              {availableViews.includes("interior") && (
                <Button
                  variant="outline"
                  onClick={() => handleViewChange("interior")}
                  className={`text-xs md:text-sm px-2 py-1 h-auto border-primary hover:bg-primary hover:text-black whitespace-nowrap ${
                    currentView === "interior" ? "bg-primary text-black" : ""
                  }`}
                >
                  <MapIcon className="mr-1 h-3 w-3 md:h-4 md:w-4" />
                  STATION MAP
                </Button>
              )}
              {availableViews.includes("interior-ascii") && (
                <Button
                  variant="outline"
                  onClick={() => handleViewChange("interior-ascii")}
                  className={`text-xs md:text-sm px-2 py-1 h-auto border-primary hover:bg-primary hover:text-black whitespace-nowrap ${
                    currentView === "interior-ascii"
                      ? "bg-primary text-black"
                      : ""
                  }`}
                >
                  <Terminal className="mr-1 h-3 w-3 md:h-4 md:w-4" />
                  INTERIOR VIEW
                </Button>
              )}
              {availableViews.includes("exterior") && (
                <Button
                  variant="outline"
                  onClick={() => handleViewChange("exterior")}
                  className={`text-xs md:text-sm px-2 py-1 h-auto border-primary hover:bg-primary hover:text-black whitespace-nowrap ${
                    currentView === "exterior" ? "bg-primary text-black" : ""
                  }`}
                >
                  <Radio className="mr-1 h-3 w-3 md:h-4 md:w-4" />
                  EXTERIOR VIEW
                </Button>
              )}
              {availableViews.includes("pcs") && (
                <Button
                  variant="outline"
                  onClick={() => handleViewChange("pcs")}
                  className={`text-xs md:text-sm px-2 py-1 h-auto border-primary hover:bg-primary hover:text-black whitespace-nowrap ${
                    currentView === "pcs" ? "bg-primary text-black" : ""
                  }`}
                >
                  <DollarSign className="mr-1 h-3 w-3 md:h-4 md:w-4" />
                  CREDITS
                </Button>
              )}
            </div>
          )}
        </div>
      </div>
      <ImageSelector
        isOpen={isImageSelectorOpen}
        onClose={() => setIsImageSelectorOpen(false)}
      />
    </header>
  );
}
