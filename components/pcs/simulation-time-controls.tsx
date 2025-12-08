"use client";

import { useSimulationTime } from "@/lib/context/simulation-time-context";
import { Clock } from "lucide-react";
import { Button } from "../ui/button";

export function SimulationTimeControls() {
  const { advanceTime, reverseTime, reset } = useSimulationTime();

  return (
    <div className="p-2 md:p-4 border-t border-primary">
      <div className="flex items-center gap-2 mb-2 justify-between">
        <div className="flex items-center gap-2">
          <Clock className="h-4 w-4 text-primary" />
          <h2 className="text-lg md:text-xl font-bold ">DATE CONTROL</h2>
        </div>
        <Button onClick={reset} size="sm" className="h-5">
          RESET
        </Button>
      </div>
      <div className="space-y-2">
        <div className="grid grid-cols-4 gap-1">
          <Button
            variant="outline"
            onClick={() => advanceTime({ days: 1 })}
            size="sm"
            className="text-primary border-primary hover:bg-primary hover:text-black h-7 text-xs"
          >
            +1 DAY
          </Button>
          <Button
            variant="outline"
            onClick={() => advanceTime({ months: 1 })}
            size="sm"
            className="text-primary border-primary hover:bg-primary hover:text-black h-7 text-xs"
          >
            +1 MONTH
          </Button>
          <Button
            variant="outline"
            onClick={() => reverseTime({ days: 1 })}
            size="sm"
            className="text-primary border-primary hover:bg-primary hover:text-black h-7 text-xs"
          >
            -1 DAY
          </Button>
          <Button
            variant="outline"
            onClick={() => reverseTime({ months: 1 })}
            size="sm"
            className="text-primary border-primary hover:bg-primary hover:text-black h-7 text-xs"
          >
            -1 MONTH
          </Button>
        </div>
      </div>
    </div>
  );
}
