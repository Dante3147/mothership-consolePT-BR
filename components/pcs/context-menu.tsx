import { useSimulationTime } from "@/lib/context/simulation-time-context";
import { useTransactions } from "@/lib/context/transaction-context";
import { Credit } from "@/lib/models/credit";
import React from "react";
import { CreditEditDialog } from "./credit-edit-dialog";
import { PeriodicPaymentDialog } from "./periodic-payment-dialog";

interface ContextMenuProps {
  visible: boolean;
  x: number;
  y: number;
  playerId: string;
  playerName: string;
  onClose: () => void;
  onAddPlayer: () => void;
  isPlayerContext: boolean;
  onRemovePlayer: () => void;
}

export function ContextMenu({
  visible,
  x,
  y,
  playerId,
  playerName,
  onClose,
  onAddPlayer,
  isPlayerContext,
  onRemovePlayer,
}: ContextMenuProps) {
  const { getPlayerBalance } = useTransactions();
  const { currentTime } = useSimulationTime();
  const currentBalance = getPlayerBalance(playerId, currentTime);
  const [editMode, setEditMode] = React.useState<
    "add" | "remove" | "set" | null
  >(null);
  const [showPaymentDialog, setShowPaymentDialog] = React.useState(false);

  if (!visible) return null;

  const handleClick = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
  };

  const handleDialogClose = () => {
    setEditMode(null);
    setShowPaymentDialog(false);
    onClose();
  };

  return (
    <>
      <div
        className="fixed bg-black border border-primary shadow-lg z-50"
        style={{
          left: x,
          top: y,
        }}
        onClick={handleClick}
        onContextMenu={handleClick}
      >
        {isPlayerContext ? (
          <>
            <button
              onClick={(e) => {
                e.preventDefault();
                e.stopPropagation();
                setEditMode("add");
              }}
              className="block w-full text-left px-4 py-2 text-white hover:bg-primary/20 transition-colors"
            >
              Add Credits
            </button>
            <button
              onClick={(e) => {
                e.preventDefault();
                e.stopPropagation();
                setEditMode("remove");
              }}
              className="block w-full text-left px-4 py-2 text-white hover:bg-primary/20 transition-colors"
            >
              Remove Credits
            </button>
            <button
              onClick={(e) => {
                e.preventDefault();
                e.stopPropagation();
                setEditMode("set");
              }}
              className="block w-full text-left px-4 py-2 text-white hover:bg-primary/20 transition-colors"
            >
              Set Credits ({new Credit(currentBalance).toString()})
            </button>
            <button
              onClick={(e) => {
                e.preventDefault();
                e.stopPropagation();
                setShowPaymentDialog(true);
              }}
              className="block w-full text-left px-4 py-2 text-white hover:bg-primary/20 transition-colors"
            >
              Recurring Payment
            </button>
            <button
              onClick={(e) => {
                e.preventDefault();
                e.stopPropagation();
                onRemovePlayer();
              }}
              className="block w-full text-left px-4 py-2 text-white hover:bg-primary/20 transition-colors"
            >
              Remove Player
            </button>
          </>
        ) : (
          <button
            onClick={(e) => {
              e.preventDefault();
              e.stopPropagation();
              onAddPlayer();
            }}
            className="block w-full text-left px-4 py-2 text-white hover:bg-primary/20 transition-colors"
          >
            Add Player
          </button>
        )}
      </div>
      {editMode && (
        <CreditEditDialog
          playerId={playerId}
          playerName={playerName}
          mode={editMode}
          onClose={handleDialogClose}
        />
      )}
      {showPaymentDialog && (
        <PeriodicPaymentDialog
          playerId={playerId}
          playerName={playerName}
          onClose={handleDialogClose}
        />
      )}
    </>
  );
}
