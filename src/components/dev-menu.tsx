"use client";

import { useEffect, useState } from "react";

export function DevMenu() {
  const [isOpen, setIsOpen] = useState(false);
  const [showConfirmPurge, setShowConfirmPurge] = useState(false);
  const [confirmInput, setConfirmInput] = useState("");
  const [confirmError, setConfirmError] = useState(false);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      // Ctrl + Alt + Z
      if (e.ctrlKey && e.altKey && e.key === "z") {
        e.preventDefault();
        setIsOpen((prev) => !prev);
      }

      // ESC para fechar
      if (e.key === "Escape") {
        if (showConfirmPurge) {
          setShowConfirmPurge(false);
          setConfirmInput("");
          setConfirmError(false);
        } else if (isOpen) {
          setIsOpen(false);
        }
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [isOpen, showConfirmPurge]);

  const handleResetMinigame = () => {
    const keysToRemove = [
      "horus_encrypted_messages",
      "horus_decryption_key",
      "horus_key_room",
      "horus_decrypted",
      "horus_key_copied",
      "horus_key_found",
      "horus_diagnostics_executed",
    ];

    keysToRemove.forEach((key) => localStorage.removeItem(key));
    window.location.reload();
  };

  const handleOpenPurgeConfirm = () => {
    setShowConfirmPurge(true);
    setConfirmInput("");
    setConfirmError(false);
  };

  const handleConfirmPurge = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (confirmInput === "CONFIRMAR LIMPEZA TOTAL") {
      localStorage.clear();
      window.location.reload();
    } else {
      setConfirmError(true);
      setTimeout(() => setConfirmError(false), 2000);
    }
  };

  const handleReloadPage = () => {
    window.location.reload();
  };

  if (!isOpen) return null;

  return (
    <>
      {/* Overlay */}
      <div
        className="fixed inset-0 bg-black/80 backdrop-blur-sm z-50 animate-in fade-in duration-200"
        onClick={() => setIsOpen(false)}
      />

      {/* Menu Terminal */}
      <div className="fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-50 animate-in fade-in zoom-in-95 duration-200">
        <div className="bg-black border-2 border-primary p-0 w-[600px] shadow-2xl shadow-primary/20">
          {/* Header */}
          <div className="bg-primary/10 border-b-2 border-primary px-4 py-3 flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-3 h-3 bg-primary animate-pulse" />
              <span className="font-mono text-primary text-lg font-bold tracking-wider">
                DEVELOPER_ACCESS.SYS
              </span>
            </div>
            <button
              onClick={() => setIsOpen(false)}
              className="text-primary hover:bg-primary hover:text-black w-6 h-6 flex items-center justify-center font-bold transition-colors"
            >
              ×
            </button>
          </div>

          {/* Content */}
          <div className="p-6 font-mono text-primary">
            {/* Info */}
            <div className="mb-6 text-sm opacity-70">
              <div className="flex items-center gap-2 mb-1">
                <span className="text-primary">►</span>
                <span>ATALHO: [CTRL + ALT + Z]</span>
              </div>
              <div className="flex items-center gap-2">
                <span className="text-primary">►</span>
                <span>FECHAR: [ESC]</span>
              </div>
            </div>

            {/* Divider */}
            <div className="border-t border-primary/30 mb-6" />

            {/* Commands */}
            <div className="space-y-3">
              {/* Reset Minigame */}
              <button
                onClick={handleResetMinigame}
                className="w-full text-left border border-primary/40 hover:border-primary hover:bg-primary/10 p-4 transition-all group"
              >
                <div className="flex items-start gap-3">
                  <span className="text-primary group-hover:animate-pulse">■</span>
                  <div className="flex-1">
                    <div className="font-bold mb-1">RESET_MINIGAME.EXE</div>
                    <div className="text-xs opacity-60">
                      Limpar estados: chave_descriptografia | sala_aleatoria | criptografia_status
                    </div>
                  </div>
                </div>
              </button>

              {/* Reload Page */}
              <button
                onClick={handleReloadPage}
                className="w-full text-left border border-primary/40 hover:border-primary hover:bg-primary/10 p-4 transition-all group"
              >
                <div className="flex items-start gap-3">
                  <span className="text-primary group-hover:animate-pulse">■</span>
                  <div className="flex-1">
                    <div className="font-bold mb-1">RELOAD_SYSTEM.EXE</div>
                    <div className="text-xs opacity-60">
                      Reiniciar aplicação | refresh_completo
                    </div>
                  </div>
                </div>
              </button>

              {/* Clear All Storage */}
              <button
                onClick={handleOpenPurgeConfirm}
                className="w-full text-left border border-red-500/40 hover:border-red-500 hover:bg-red-500/10 p-4 transition-all group"
              >
                <div className="flex items-start gap-3">
                  <span className="text-red-500 group-hover:animate-pulse">▲</span>
                  <div className="flex-1">
                    <div className="font-bold mb-1 text-red-500">PURGE_ALL_DATA.EXE</div>
                    <div className="text-xs opacity-60 text-red-400">
                      ⚠ PERIGO: Remove TODOS os dados do localStorage | requer_confirmacao
                    </div>
                  </div>
                </div>
              </button>
            </div>

            {/* Divider */}
            <div className="border-t border-primary/30 mt-6 mb-4" />

            {/* Footer */}
            <div className="text-xs opacity-50 text-center">
              MOTHERSHIP_TERMINAL © DEVELOPER_MODE_ENABLED
            </div>
          </div>
        </div>
      </div>

      {/* Confirmation Modal for Purge */}
      {showConfirmPurge && (
        <>
          {/* Secondary Overlay */}
          <div className="fixed inset-0 bg-black/90 backdrop-blur-md z-[60] animate-in fade-in duration-200" />

          {/* Confirmation Panel */}
          <div className="fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-[60] animate-in fade-in zoom-in-95 duration-200">
            <div className="bg-black border-2 border-red-500 w-[500px] shadow-2xl shadow-red-500/30">
              {/* Header */}
              <div className="bg-red-500/20 border-b-2 border-red-500 px-4 py-3 flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="w-3 h-3 bg-red-500 animate-pulse" />
                  <span className="font-mono text-red-500 text-lg font-bold tracking-wider">
                    ⚠ CONFIRMAÇÃO REQUERIDA
                  </span>
                </div>
                <button
                  onClick={() => {
                    setShowConfirmPurge(false);
                    setConfirmInput("");
                    setConfirmError(false);
                  }}
                  className="text-red-500 hover:bg-red-500 hover:text-black w-6 h-6 flex items-center justify-center font-bold transition-colors"
                >
                  ×
                </button>
              </div>

              {/* Content */}
              <div className="p-6 font-mono text-red-500">
                {/* Warning */}
                <div className="mb-6 space-y-3">
                  <div className="flex items-center gap-2 text-lg font-bold">
                    <span className="animate-pulse">▲</span>
                    <span>AVISO CRÍTICO</span>
                  </div>
                  
                  <div className="text-sm space-y-2 opacity-90">
                    <p>Esta operação irá:</p>
                    <ul className="space-y-1 ml-4">
                      <li>► Remover TODOS os dados do localStorage</li>
                      <li>► Resetar todas as configurações</li>
                      <li>► Apagar todo o progresso salvo</li>
                      <li>► Limpar estados de admin e emergência</li>
                    </ul>
                  </div>

                  <div className="text-xs opacity-70 mt-3 border-l-2 border-red-500 pl-3">
                    Esta ação é IRREVERSÍVEL e NÃO PODE ser desfeita.
                  </div>
                </div>

                {/* Divider */}
                <div className="border-t border-red-500/30 mb-6" />

                {/* Form */}
                <form onSubmit={handleConfirmPurge}>
                  <div className="mb-4">
                    <label className="block text-sm mb-2 opacity-90">
                      Digite exatamente para confirmar:
                    </label>
                    <div className="bg-red-500/10 border border-red-500/50 px-3 py-2 mb-3">
                      <code className="text-red-400 font-bold">CONFIRMAR LIMPEZA TOTAL</code>
                    </div>
                    <input
                      type="text"
                      value={confirmInput}
                      onChange={(e) => setConfirmInput(e.target.value)}
                      autoFocus
                      className={`w-full bg-black border-2 ${
                        confirmError ? 'border-red-500 animate-pulse' : 'border-red-500/50'
                      } px-3 py-2 text-red-500 font-mono focus:outline-none focus:border-red-500 transition-colors`}
                      placeholder="Digite aqui..."
                    />
                    {confirmError && (
                      <p className="text-xs mt-2 text-red-500 animate-pulse">
                        ✗ TEXTO INCORRETO - Tente novamente
                      </p>
                    )}
                  </div>

                  {/* Actions */}
                  <div className="flex gap-3 mt-6">
                    <button
                      type="button"
                      onClick={() => {
                        setShowConfirmPurge(false);
                        setConfirmInput("");
                        setConfirmError(false);
                      }}
                      className="flex-1 border border-red-500/50 hover:border-red-500 hover:bg-red-500/10 py-3 transition-all font-bold"
                    >
                      CANCELAR [ESC]
                    </button>
                    <button
                      type="submit"
                      className="flex-1 border-2 border-red-500 bg-red-500/20 hover:bg-red-500 hover:text-black py-3 transition-all font-bold"
                    >
                      EXECUTAR PURGE
                    </button>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </>
      )}
    </>
  );
}
