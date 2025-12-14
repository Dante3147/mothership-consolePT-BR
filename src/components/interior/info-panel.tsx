"use client";

import { useAdmin } from "@/src/context/admin-context";
import { useScenario } from "@/src/context/scenario-context";
import { Activity, Terminal, Wrench } from "lucide-react";
import { AdminLoginModal } from "../admin-login-modal";
import { InteriorCharts } from "./interior-charts";
import { StationControls } from "./station-controls";

/**
 * Renders a panel of information about the station.
 *
 * Uses the scenario.charts, scenario.controlButtons, and scenario.systemLogs properties to display the information.
 */
export function InfoPanel() {
  const { scenario } = useScenario();
  const { isLoginVisible } = useAdmin();

  return (
    <div className="border border-primary h-full flex flex-col">
      <div className="p-4 flex-grow">
        <div className="flex items-center gap-2 mb-4">
          <Activity className="h-4 w-4 text-primary" />
          <h3 className="font-bold">MÉTRICAS DA ESTAÇÃO</h3>
        </div>
        <InteriorCharts chartTypes={scenario.charts} />
      </div>

      {scenario.controlButtons && (
        <div className="p-4 border-t border-primary">
          <div className="flex items-center gap-2 mb-4">
            <Wrench className="h-4 w-4 text-primary" />
            <h3 className="font-bold">CONTROLES</h3>
          </div>
          <StationControls />
        </div>
      )}

      {isLoginVisible && <AdminLoginModal />}

      {scenario.systemLogs && (
        <div className="p-4 border-t border-primary">
          <div className="flex items-center gap-2 mb-2">
            <Terminal className="h-4 w-4 text-primary" />
            <h3 className="font-bold">REGISTROS DO SISTEMA</h3>
          </div>
          <div className="space-y-1 text-xs text-primary/70 max-h-48 overflow-y-auto custom-scrollbar pr-2">
            {scenario?.systemLogs?.map((log, index) => (
              <div key={index} className="flex gap-2 log-entry">
                <span className="text-primary">[{log.time}]</span>
                <span>{log.message}</span>
              </div>
            ))}
            <div className="flex gap-2 log-entry" style={{ animationDelay: `${Math.min(scenario?.systemLogs?.length || 0, 10) * 0.05 + 0.1}s` }}>
              <span className="text-primary/50">SISTEMA&gt;</span>
              <span className="terminal-cursor"></span>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
