"use client";

import { CommandPalette } from "@/components/command-palette";
import { AdminProvider } from "@/lib/context/admin-context";
import { AudioProvider } from "@/lib/context/audio-context";
import { DiagnosticsProvider } from "@/lib/context/diagnostics-context";
import { EmergencyProvider } from "@/lib/context/emergency-context";
import { MarkerProvider } from "@/lib/context/marker-context";
import { PoiProvider } from "@/lib/context/poi-context";
import { ScenarioProvider } from "@/lib/context/scenario-context";
import { TableSortProvider } from "@/lib/context/table-sort-context";
import { ThemeProvider } from "@/lib/context/theme-context";
import { ViewProvider } from "@/lib/context/view-context";
import { useParams } from "next/navigation";

export function ProviderRegistry({ children }: { children: React.ReactNode }) {
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
                  <AdminProvider>
                    <PoiProvider>
                      <TableSortProvider>
                        <div className="min-h-screen">
                          {children}
                          <CommandPalette />
                        </div>
                      </TableSortProvider>
                    </PoiProvider>
                  </AdminProvider>
                </MarkerProvider>
              </ViewProvider>
            </DiagnosticsProvider>
          </ScenarioProvider>
        </EmergencyProvider>
      </ThemeProvider>
    </AudioProvider>
  );
}
