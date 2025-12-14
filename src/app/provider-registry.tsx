"use client";

import { CommandPalette } from "@/src/components/command_palette/command-palette";
import { DevMenu } from "@/src/components/dev-menu";
import { AdminProvider } from "@/src/context/admin-context";
import { AudioProvider } from "@/src/context/audio-context";
import { DiagnosticsProvider } from "@/src/context/diagnostics-context";
import { EmergencyProvider } from "@/src/context/emergency-context";
import { EncryptionProvider } from "@/src/context/encryption-context";
import { PoiProvider } from "@/src/context/poi-context";
import { ScenarioProvider } from "@/src/context/scenario-context";
import { TableSortProvider } from "@/src/context/table-sort-context";
import { ThemeProvider } from "@/src/context/theme-context";
import { ViewProvider } from "@/src/context/view-context";
import { useParams } from "next/navigation";

/**
 * Provider registry for the application.
 *
 * Provides the global providers for the application.
 */
export function ProviderRegistry({ children }: { children: React.ReactNode }) {
  const params = useParams();
  const scenario = params.scenario as string;
  const viewType = params.view as string;

  return (
    <AudioProvider>
      <ThemeProvider>
        <EmergencyProvider>
          <ScenarioProvider initialMapId={scenario}>
            <EncryptionProvider>
              <DiagnosticsProvider>
                <ViewProvider initialViewType={viewType}>
                  <AdminProvider>
                    <PoiProvider>
                      <TableSortProvider>
                        <div className="min-h-screen">
                          {children}
                          <CommandPalette />
                          <DevMenu />
                        </div>
                      </TableSortProvider>
                    </PoiProvider>
                  </AdminProvider>
                </ViewProvider>
              </DiagnosticsProvider>
            </EncryptionProvider>
          </ScenarioProvider>
        </EmergencyProvider>
      </ThemeProvider>
    </AudioProvider>
  );
}
