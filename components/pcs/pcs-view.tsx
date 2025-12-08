"use client";

import { EditingProvider } from "@/lib/context/editing-context";
import { usePlayers } from "@/lib/context/player-context";
import { useTransactions } from "@/lib/context/transaction-context";
import React, { useState } from "react";
import { AddPlayerDialog } from "./add-player-dialog";
import { ContextMenu } from "./context-menu";
import { PlayerRow } from "./player-row";
import { TotalCredits } from "./total-credits";

interface ContextMenuState {
  visible: boolean;
  x: number;
  y: number;
  playerId: string | null;
}

export function PCsView() {
  const { players, removePlayer } = usePlayers();
  const { getPlayerBalance } = useTransactions();
  const [contextMenu, setContextMenu] = useState<ContextMenuState>({
    visible: false,
    x: 0,
    y: 0,
    playerId: null,
  });
  const [showAddPlayer, setShowAddPlayer] = useState(false);

  const totalCredits = players.reduce((sum, player) => {
    return sum + getPlayerBalance(player.id);
  }, 0);

  const handleContextMenu = (e: React.MouseEvent, playerId: string | null) => {
    e.preventDefault();
    e.stopPropagation();
    setContextMenu({
      visible: true,
      x: e.clientX,
      y: e.clientY,
      playerId,
    });
  };

  const handleContextMenuClose = () => {
    setContextMenu({
      visible: false,
      x: 0,
      y: 0,
      playerId: null,
    });
  };

  // Add click handler to close context menu when clicking outside
  React.useEffect(() => {
    const handleClick = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      const isDialog = target.closest(".fixed.inset-0");
      const isContextMenu = target.closest(
        ".fixed.bg-black.border.border-primary"
      );

      if (contextMenu.visible && !isDialog && !isContextMenu) {
        handleContextMenuClose();
      }
    };

    document.addEventListener("click", handleClick);
    return () => {
      document.removeEventListener("click", handleClick);
    };
  }, [contextMenu.visible]);

  return (
    <EditingProvider>
      <div
        className="w-full h-full bg-black"
        onContextMenu={(e) => handleContextMenu(e, null)}
      >
        <div className="h-full flex flex-col">
          <div className="border-t border-l border-r border-primary p-4">
            <div className="flex justify-between items-center">
              <div>
                <h2 className="text-lg md:text-2xl font-bold text-primary">
                  PLAYER CREDITS
                </h2>
                <p className="text-primary text-xs md:text-base">
                  Track and manage player finances
                </p>
              </div>
            </div>
          </div>

          <div className="flex-1 flex">
            {/* Player List */}
            <div className="flex-1 border border-primary">
              <div className="h-full flex flex-col">
                <div className="grid grid-cols-2 border-b border-primary/80 px-4 py-2">
                  <div className="text-sm font-semibold text-primary">
                    PLAYER
                  </div>
                  <div className="text-sm font-semibold text-primary text-right">
                    CREDITS
                  </div>
                </div>

                <div className="flex-1 overflow-auto">
                  <div className="divide-y divide-primary/40">
                    {players.map((player) => (
                      <PlayerRow
                        key={player.id}
                        player={player}
                        onContextMenu={handleContextMenu}
                      />
                    ))}
                  </div>
                </div>

                <TotalCredits totalCredits={totalCredits} />
              </div>
            </div>
          </div>
        </div>

        {contextMenu.visible && (
          <ContextMenu
            visible={contextMenu.visible}
            x={contextMenu.x}
            y={contextMenu.y}
            playerId={contextMenu.playerId || ""}
            playerName={
              players.find((p) => p.id === contextMenu.playerId)?.name || ""
            }
            onClose={handleContextMenuClose}
            onAddPlayer={() => {
              setShowAddPlayer(true);
              handleContextMenuClose();
            }}
            isPlayerContext={!!contextMenu.playerId}
            onRemovePlayer={async () => {
              if (contextMenu.playerId) {
                await removePlayer(contextMenu.playerId);
                handleContextMenuClose();
              }
            }}
          />
        )}
        {showAddPlayer && (
          <AddPlayerDialog onClose={() => setShowAddPlayer(false)} />
        )}
      </div>
    </EditingProvider>
  );
}
