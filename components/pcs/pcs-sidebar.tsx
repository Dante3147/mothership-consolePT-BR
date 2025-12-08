import { usePlayers } from "@/lib/context/player-context";
import { CreditProjectionChart } from "./credit-projection-chart";
import { SimulationTimeControls } from "./simulation-time-controls";

export function PCsSidebar() {
  const { players } = usePlayers();

  return (
    <div className="border border-primary h-full flex flex-col">
      {/* Credit Projections */}
      <div className="p-2 md:p-4 flex-grow overflow-auto">
        <div className="space-y-4">
          {players.map((player) => (
            <CreditProjectionChart key={player.id} playerId={player.id} />
          ))}
        </div>
      </div>

      {/* Simulation Time Controls */}
      <SimulationTimeControls />
    </div>
  );
}
