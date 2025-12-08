import { usePlayers } from "@/lib/context/player-context";
import { useSimulationTime } from "@/lib/context/simulation-time-context";
import { useTransactions } from "@/lib/context/transaction-context";
import { Credit } from "@/lib/models/credit";
import { DollarSign } from "lucide-react";
import { useEffect, useState } from "react";

interface CreditProjectionChartProps {
  playerId: string;
}

export function CreditProjectionChart({
  playerId,
}: CreditProjectionChartProps) {
  const { transactions, periodicPayments, getPlayerBalance } =
    useTransactions();
  const [projectedCredits, setProjectedCredits] = useState<number[]>([]);
  const { players } = usePlayers();
  const { currentTime } = useSimulationTime();
  const currentCredits = getPlayerBalance(playerId, currentTime);
  const chartColor = "hsl(var(--primary))";
  const zeroLineColor = "hsl(var(--red-400))";

  // Calculate credit projections based on streamed data (same as PlayerRow)
  useEffect(() => {
    if (!currentCredits) return;

    const calculateProjections = () => {
      const endDate = currentTime.plus({ days: 59 });
      const numDays = Math.round(endDate.diff(currentTime, "days").days) + 1;

      // Create an array to store credit values for each day
      const projections = new Array(numDays).fill(currentCredits);

      // Add future transactions (using streamed data, not async calls)
      const futureTransactions = transactions.filter(
        (t) =>
          t.playerId === playerId && t.date > currentTime && t.date <= endDate
      );

      futureTransactions.forEach((transaction) => {
        const daysSinceTransaction = Math.floor(
          transaction.date.diff(currentTime, "days").days
        );
        // Clamp to valid range
        if (
          daysSinceTransaction >= 0 &&
          daysSinceTransaction < projections.length
        ) {
          for (
            let day = daysSinceTransaction;
            day < projections.length;
            day++
          ) {
            projections[day] += transaction.credits.numeric;
          }
        }
      });

      // Add periodic payments impact (using streamed data)
      const playerPayments = periodicPayments.filter(
        (p) => p.playerId === playerId && p.isActive(currentTime)
      );

      playerPayments.forEach((payment) => {
        const paymentDates = payment.getPaymentsBetween(currentTime, endDate);
        paymentDates.forEach((date) => {
          const daysSinceStart = Math.floor(
            date.diff(currentTime, "days").days
          );
          if (daysSinceStart >= 0 && daysSinceStart < projections.length) {
            for (let day = daysSinceStart; day < projections.length; day++) {
              projections[day] -= payment.payment.getAmount().numeric;
            }
          }
        });
      });

      // Ensure all values are numbers (no NaN)
      for (let i = 0; i < projections.length; i++) {
        if (typeof projections[i] !== "number" || isNaN(projections[i])) {
          projections[i] = 0;
        }
      }

      setProjectedCredits(projections);
    };

    calculateProjections();
  }, [playerId, currentCredits, transactions, periodicPayments, currentTime]);

  // If no current credits or projections not ready, don't render the chart
  if (!currentCredits || projectedCredits.length === 0) return null;

  // Calculate min and max for the chart
  let max = currentCredits; // Current balance at the top
  let min = projectedCredits[projectedCredits.length - 1]; // Final projected balance at the bottom

  // If max and min are equal, add a buffer so the chart renders correctly
  if (max === min) {
    max = max + 1;
    min = min - 1;
  }

  // If min is greater than max (shouldn't happen, but just in case), swap them
  if (min > max) {
    const temp = max;
    max = min;
    min = temp;
  }

  // Prevent division by zero
  const range = max - min === 0 ? 1 : max - min;

  // Calculate value positions for grid lines (5 equal divisions)
  const valuePositions = Array.from(
    { length: 5 },
    (_, i) => max - i * (range / 4)
  );

  // Calculate x-axis label positions (5 equal divisions)
  const xAxisLabels = Array.from({ length: 5 }, (_, i) =>
    Math.floor((i * projectedCredits.length) / 4)
  );

  // Calculate the y position for the zero line
  const zeroLineY = 100 - ((0 - min) / range) * 100;

  return (
    <div>
      <div className="flex justify-between mb-1">
        <div className="flex items-center gap-1">
          <DollarSign className="h-4 w-4 text-primary" />
          CREDIT PROJECTION:{" "}
          {players.find((p) => p.id === playerId)?.name.toUpperCase()}
        </div>
      </div>
      <div className="h-40 border border-primary/50 relative bg-black">
        <svg
          className="w-full h-full"
          viewBox="0 0 100 100"
          preserveAspectRatio="none"
        >
          {/* Grid lines */}
          <line
            x1="0"
            y1="20"
            x2="100"
            y2="20"
            stroke={chartColor}
            strokeWidth="0.3"
            strokeDasharray="1,1"
          />
          <line
            x1="0"
            y1="40"
            x2="100"
            y2="40"
            stroke={chartColor}
            strokeWidth="0.3"
            strokeDasharray="1,1"
          />
          <line
            x1="0"
            y1="60"
            x2="100"
            y2="60"
            stroke={chartColor}
            strokeWidth="0.3"
            strokeDasharray="1,1"
          />
          <line
            x1="0"
            y1="80"
            x2="100"
            y2="80"
            stroke={chartColor}
            strokeWidth="0.3"
            strokeDasharray="1,1"
          />

          {/* Zero line */}
          <line
            x1="0"
            y1={zeroLineY}
            x2="100"
            y2={zeroLineY}
            stroke={zeroLineColor}
            strokeWidth="1"
          />

          {/* Step line */}
          <polyline
            points={projectedCredits
              .map(
                (value, index) =>
                  `${(index / (projectedCredits.length - 1)) * 100}, ${
                    100 - ((value - min) / (max - min)) * 100
                  }`
              )
              .join(" ")}
            fill="none"
            stroke={chartColor}
            strokeWidth=".4"
          />
        </svg>
        <div className="absolute top-0 right-0 bottom-0 left-0 flex flex-col justify-between pointer-events-none px-1 py-1 text-xs text-primary/80">
          {valuePositions.map((value, index) => (
            <span key={index}>{new Credit(value).toString()}</span>
          ))}
        </div>
      </div>
      <div className="flex justify-between text-primary/80 mt-0.5 text-[10px]">
        <div className="flex justify-between w-full">
          {xAxisLabels.map((day, index) => (
            <span key={index}>Day {day}</span>
          ))}
        </div>
      </div>
    </div>
  );
}
