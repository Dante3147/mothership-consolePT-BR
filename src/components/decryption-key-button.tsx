"use client";

import { useEncryption } from "@/src/context/encryption-context";
import { useState } from "react";

export function DecryptionKeyButton() {
  const { copyKeyToClipboard, keyCopied, diagnosticsExecuted, decryptionKey } = useEncryption();
  const [showButton, setShowButton] = useState(false);
  
  // Não renderizar NADA se o diagnóstico não foi executado ou se não há chave gerada
  if (!diagnosticsExecuted || !decryptionKey) {
    return null;
  }

  return (
    <div 
      className="relative inline-block w-full h-full flex items-center justify-center"
      onMouseEnter={() => setShowButton(true)}
      onMouseLeave={() => setShowButton(false)}
    >
      {/* Botão que aparece apenas no hover */}
      {showButton && !keyCopied && (
        <button
          onClick={copyKeyToClipboard}
          className="px-3 py-2 border-2 border-horus bg-black text-horus font-mono text-sm font-bold animate-pulse hover:bg-horus hover:text-black transition-all duration-300"
        >
          CHAVE-DESCRIPTOGRAFIA
        </button>
      )}

      {/* Animação de check quando copiar - mesma estética do botão */}
      {keyCopied && (
        <div className="px-3 py-2 border-2 border-horus bg-horus text-black font-mono text-sm font-bold flex items-center gap-2 animate-pulse">
          <svg
            className="w-4 h-4"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={3}
              d="M5 13l4 4L19 7"
            />
          </svg>
          CÓDIGO COPIADO
        </div>
      )}
    </div>
  );
}
