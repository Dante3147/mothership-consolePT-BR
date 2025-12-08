import { useSimulationTime } from "@/lib/context/simulation-time-context";
import { useTransactions } from "@/lib/context/transaction-context";
import { Credit } from "@/lib/models/credit";
import React, { memo, useMemo } from "react";

interface PlayerRowProps {
  player: {
    id: string;
    name: string;
  };
  onContextMenu: (e: React.MouseEvent, playerId: string) => void;
}

// Memoized PlayerRow component to prevent unnecessary re-renders
export const PlayerRow = memo(function PlayerRow({
  player,
  onContextMenu,
}: PlayerRowProps) {
  const {
    removePeriodicPayment,
    endPeriodicPayment,
    getPeriodicPayments,
    getPlayerBalance,
    getPlayerTimeToZero,
  } = useTransactions();

  const { currentTime } = useSimulationTime();

  // Memoize expensive calculations
  const playerData = useMemo(() => {
    const currentBalance = getPlayerBalance(player.id, currentTime);
    const timeToZero = getPlayerTimeToZero(player.id, currentTime);
    const closeToZero = timeToZero && timeToZero < 10;
    const timeToZeroString = timeToZero
      ? `${timeToZero} days till destitute`.toUpperCase()
      : null;
    const periodicPayments = getPeriodicPayments(player.id);

    return {
      currentBalance,
      timeToZero,
      closeToZero,
      timeToZeroString,
      periodicPayments,
    };
  }, [
    player.id,
    currentTime,
    getPlayerBalance,
    getPlayerTimeToZero,
    getPeriodicPayments,
  ]);

  const handlePaymentContextMenu = React.useCallback(
    (e: React.MouseEvent, paymentId: string) => {
      e.preventDefault();
      e.stopPropagation();

      const contextMenu = document.createElement("div");
      contextMenu.className =
        "fixed bg-card border border-primary/20 rounded-md shadow-lg z-50 py-1 min-w-[120px]";
      contextMenu.style.left = `${e.clientX}px`;
      contextMenu.style.top = `${e.clientY}px`;

      const menuItems = [
        {
          label: "End Payment",
          action: () => endPeriodicPayment(paymentId),
          className: "text-orange-400 hover:text-orange-300",
        },
        {
          label: "Remove Payment",
          action: () => removePeriodicPayment(paymentId),
          className: "text-red-400 hover:text-red-300",
        },
      ];

      menuItems.forEach((item) => {
        const button = document.createElement("button");
        button.className = `block w-full text-left px-3 py-2 text-sm hover:bg-primary/10 transition-colors ${item.className}`;
        button.textContent = item.label;
        button.onclick = async () => {
          await item.action();
          document.body.removeChild(contextMenu);
        };
        contextMenu.appendChild(button);
      });

      document.body.appendChild(contextMenu);

      const closeMenu = () => {
        if (document.body.contains(contextMenu)) {
          document.body.removeChild(contextMenu);
        }
        document.removeEventListener("click", closeMenu);
      };

      setTimeout(() => {
        document.addEventListener("click", closeMenu);
      }, 0);
    },
    [endPeriodicPayment, removePeriodicPayment]
  );

  const handlePlayerContextMenu = React.useCallback(
    (e: React.MouseEvent) => {
      e.preventDefault();
      e.stopPropagation();
      onContextMenu(e, player.id);
    },
    [onContextMenu, player.id]
  );

  return (
    <div>
      {/* Main Player Info - Aligned with Header Grid */}
      <div
        className="grid grid-cols-2 px-4 py-3 hover:bg-primary/10 transition-colors border-b border-primary/20"
        onContextMenu={handlePlayerContextMenu}
      >
        {/* Player Name and Time Left Column */}
        <div className="flex flex-col gap-1">
          <div className="text-white text-lg font-bold">
            {player.name.toUpperCase()}
          </div>
          {playerData.timeToZeroString && (
            <div
              className={`text-sm font-medium ${
                playerData.closeToZero ? "text-red-400" : "text-orange-400"
              }`}
            >
              {playerData.timeToZeroString}
            </div>
          )}
        </div>

        {/* Credits Column */}
        <div className="flex items-center justify-end">
          <div className="text-white text-lg font-semibold">
            <span
              className={
                playerData.currentBalance < 0
                  ? "text-red-400"
                  : "text-green-400"
              }
            >
              {new Credit(playerData.currentBalance).toString()}
            </span>
          </div>
        </div>
      </div>

      {/* Periodic Payments List */}
      {playerData.periodicPayments.length > 0 && (
        <div className="bg-black/20 border-b border-primary/20">
          {playerData.periodicPayments.map((payment) => (
            <div
              key={payment.id}
              className="px-4 py-2 text-sm text-primary/70 hover:text-primary hover:bg-primary/5 transition-colors cursor-pointer"
              onContextMenu={(e) => handlePaymentContextMenu(e, payment.id)}
            >
              <div className="flex justify-between items-center">
                <span>{payment.name}</span>
                <span className="text-red-400">
                  -{payment.payment.getAmount().toString()}/
                  {payment.payment.getDuration().toHuman()}
                </span>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
});
