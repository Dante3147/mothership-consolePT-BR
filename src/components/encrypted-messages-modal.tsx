"use client";

import { useEncryption } from "@/src/context/encryption-context";
import { useState } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "./dialog";
import { Button } from "./button";

export function EncryptedMessagesModal() {
  const {
    showEncryptedModal,
    setShowEncryptedModal,
    decryptMessages,
  } = useEncryption();

  const [keyInput, setKeyInput] = useState("");
  const [error, setError] = useState(false);

  const handleConfirm = () => {
    const success = decryptMessages(keyInput);
    if (!success) {
      setError(true);
      setTimeout(() => setError(false), 2000);
    } else {
      setKeyInput("");
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Enter") {
      handleConfirm();
    }
  };

  return (
    <Dialog open={showEncryptedModal} onOpenChange={setShowEncryptedModal}>
      <DialogContent className="max-w-md bg-black border-2 border-horus text-horus">
        <DialogHeader>
          <DialogTitle className="text-xl font-mono text-center text-horus">
            ╔════════════════════════════════╗
            <br />
            ║  SISTEMA DE DESCRIPTOGRAFIA  ║
            <br />
            ╚════════════════════════════════╝
          </DialogTitle>
        </DialogHeader>

        <div className="space-y-6 font-mono">
          {/* Aviso */}
          <div className="border border-horus p-4 bg-horus/5 text-center">
            <p className="text-amber-400 text-sm">
              ⚠ ACESSO RESTRITO ⚠
            </p>
            <p className="mt-2 text-xs opacity-70">
              INSIRA O CÓDIGO DE DESCRIPTOGRAFIA
            </p>
          </div>

          {/* Campo de entrada do código */}
          <div className="space-y-3">
            <label className="block text-sm text-center">
              CÓDIGO DE ACESSO:
            </label>
            <input
              type="text"
              value={keyInput}
              onChange={(e) => setKeyInput(e.target.value.toUpperCase())}
              onKeyDown={handleKeyDown}
              placeholder="XXXX-XXXX-XXXX-XXXX"
              className="w-full bg-black border-2 border-horus px-4 py-3 font-mono text-horus text-center text-lg focus:outline-none focus:border-amber-400 tracking-wider"
              maxLength={19}
              autoFocus
            />
            
            {error && (
              <p className="text-red-500 text-xs animate-pulse text-center">
                ⚠ CÓDIGO INVÁLIDO - ACESSO NEGADO ⚠
              </p>
            )}

            <Button
              onClick={handleConfirm}
              className="w-full bg-horus hover:bg-horus/80 text-black font-bold py-3 text-lg"
            >
              CONFIRMAR
            </Button>

            <p className="text-xs opacity-50 text-center mt-4">
              Procure por &quot;CHAVE-DESCRIPTOGRAFIA&quot; no mapa da base...
            </p>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}
