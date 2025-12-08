"use client";

import { CommandPalette } from "@/components/command-palette";
import { AdminProvider } from "@/lib/context/admin-context";
import { AudioProvider } from "@/lib/context/audio-context";
import { DiagnosticsProvider } from "@/lib/context/diagnostics-context";
import { EmergencyProvider } from "@/lib/context/emergency-context";
import { MarkerProvider } from "@/lib/context/marker-context";
import { PlayerProvider } from "@/lib/context/player-context";
import { PoiProvider } from "@/lib/context/poi-context";
import { ScenarioProvider } from "@/lib/context/scenario-context";
import { SimulationTimeProvider } from "@/lib/context/simulation-time-context";
import { TableSortProvider } from "@/lib/context/table-sort-context";
import { ThemeProvider } from "@/lib/context/theme-context";
import { TransactionProvider } from "@/lib/context/transaction-context";
import { ViewProvider } from "@/lib/context/view-context";
import { useParams } from "next/navigation";

export function ClientLayout({ children }: { children: React.ReactNode }) {
  const params = useParams();
  const mapId = params.mapId as string;
  const viewType = params.viewType as string;

  return (
    <AudioProvider>
      <ThemeProvider>
        <EmergencyProvider>
          <ScenarioProvider initialMapId={mapId}>
            <DiagnosticsProvider>
              <ViewProvider initialViewType={viewType}>
                <MarkerProvider>
                  <SimulationTimeProvider>
                    <AdminProvider>
                      <PoiProvider>
                        <TableSortProvider>
                          <TransactionProvider>
                            <PlayerProvider>
                              <div className="min-h-screen">
                                {children}
                                <CommandPalette />
                              </div>
                            </PlayerProvider>
                          </TransactionProvider>
                        </TableSortProvider>
                      </PoiProvider>
                    </AdminProvider>
                  </SimulationTimeProvider>
                </MarkerProvider>
              </ViewProvider>
            </DiagnosticsProvider>
          </ScenarioProvider>
        </EmergencyProvider>
      </ThemeProvider>
    </AudioProvider>
  );
}
