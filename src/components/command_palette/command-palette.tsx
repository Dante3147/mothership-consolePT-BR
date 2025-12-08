"use client";

import {
  CommandDialog,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "@/src/components/command_palette/command";
import { DialogTitle } from "@/src/components/dialog";
import { useScenario } from "@/src/context/scenario-context";
import { allThemes, useTheme } from "@/src/context/theme-context";
import { useView } from "@/src/context/view-context";
import { allScenarios } from "@/src/models/scenario";
import { useParams, useRouter } from "next/navigation";
import { useEffect, useState } from "react";

/**
 * Command palette for the application.
 *
 * Offers a list of commands to navigate to different views and scenarios.
 * Can be opened with the "Cmd+P" or "Ctrl+P" key.
 */
export function CommandPalette() {
  const [open, setOpen] = useState(false);
  const router = useRouter();
  const { theme, setTheme } = useTheme();
  const { scenario } = useScenario();
  const { currentView, setCurrentView } = useView();

  const params = useParams();
  const scenarioId = params.scenario as string;

  // Determine which views are actually supported for the current scenario
  const hasExteriorView =
    Array.isArray(scenario.exteriorStats) && scenario.exteriorStats.length > 0;
  const hasInteriorView = !!scenario.map;
  const hasAsciiInteriorView = !!scenario.asciiMap;

  useEffect(() => {
    const down = (e: KeyboardEvent) => {
      if (e.key === "p" && (e.metaKey || e.ctrlKey)) {
        e.preventDefault();
        setOpen((open) => !open);
      }
    };

    document.addEventListener("keydown", down);
    return () => document.removeEventListener("keydown", down);
  }, []);

  const runCommand = (command: () => void) => {
    setOpen(false);
    command();
  };

  return (
    <>
      <CommandDialog open={open} onOpenChange={setOpen}>
        <DialogTitle className="sr-only">Command Palette</DialogTitle>
        <CommandInput
          placeholder="Type a command or search..."
          className="text-white"
        />
        <CommandList>
          <CommandEmpty>No results found.</CommandEmpty>
          <CommandGroup heading="Navigation">
            {hasExteriorView && (
              <CommandItem
                onSelect={() =>
                  runCommand(() => {
                    setCurrentView("exterior");
                    router.push(`/${scenarioId}/exterior`);
                  })
                }
              >
                Navigation: Exterior
              </CommandItem>
            )}
            {hasInteriorView && (
              <CommandItem
                onSelect={() =>
                  runCommand(() => {
                    setCurrentView("interior");
                    router.push(`/${scenarioId}/interior`);
                  })
                }
              >
                Navigation: Interior
              </CommandItem>
            )}
            {hasAsciiInteriorView && (
              <CommandItem
                onSelect={() =>
                  runCommand(() => {
                    setCurrentView("interior-ascii");
                    router.push(`/${scenarioId}/interior-ascii`);
                  })
                }
              >
                Navigation: ASCII Interior
              </CommandItem>
            )}
          </CommandGroup>

          <CommandGroup heading="Scenarios">
            {allScenarios.map((map, index) => (
              <CommandItem
                key={map.id}
                onSelect={() =>
                  runCommand(() => {
                    router.push(`/${index}/${currentView}`);
                  })
                }
                className={`${
                  map.id === scenario.id ? "bg-primary/20" : "text-primary"
                }`}
              >
                Scenario: {map.id.toUpperCase()}
              </CommandItem>
            ))}
          </CommandGroup>
          <CommandGroup heading="Theme">
            {allThemes.map((themeOption) => (
              <CommandItem
                key={themeOption}
                onSelect={() => runCommand(() => setTheme(themeOption))}
                className={`${themeOption} ${
                  themeOption === theme ? "bg-primary/20" : "text-primary"
                }`}
              >
                Theme: {themeOption.toUpperCase()}
              </CommandItem>
            ))}
          </CommandGroup>
        </CommandList>
      </CommandDialog>
    </>
  );
}
