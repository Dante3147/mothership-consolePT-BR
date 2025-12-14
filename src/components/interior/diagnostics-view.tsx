"use client";

import { useDiagnostics } from "@/src/context/diagnostics-context";
import { useEmergency } from "@/src/context/emergency-context";
import { useScenario } from "@/src/context/scenario-context";
import { useEncryption } from "@/src/context/encryption-context";
import type { DiagnosticMessage } from "@/src/models/station-graph-map";
import { useEffect, useState } from "react";
import { Button } from "@/src/components/button";

/**
 * Renders a view of the diagnostics of the station.
 *
 * Uses the scenario.map.diagnostics property to display the diagnostics.
 */
export function DiagnosticsView() {
  const { map, scenario } = useScenario();
  const { emergency } = useEmergency();
  const { hideDiagnostics } = useDiagnostics();
  const { addMessage, setShowEncryptedModal, messages, setOnDecryptSuccess, isDecrypted } = useEncryption();
  const diagnostics = map?.diagnostics;
  const isHorus = scenario?.id === "TAO-095";
  const [visibleMessages, setVisibleMessages] = useState<DiagnosticMessage[]>(
    []
  );
  const [currentMessageIndex, setCurrentMessageIndex] = useState(0);
  const [currentText, setCurrentText] = useState("");
  const [currentCharIndex, setCurrentCharIndex] = useState(0);
  const [isTyping, setIsTyping] = useState(false);
  const [isDelaying, setIsDelaying] = useState(false);
  const [loadingDashes, setLoadingDashes] = useState("");
  const [currentMessage, setCurrentMessage] =
    useState<DiagnosticMessage | null>(null);
  const [isClosing, setIsClosing] = useState(false);

  // Start displaying messages one by one with delays
  useEffect(() => {
    if (!diagnostics || currentMessageIndex >= diagnostics.messages.length)
      return;

    const message = diagnostics.messages[currentMessageIndex];
    setCurrentMessage(message);
    setIsTyping(true);
    setCurrentText("");
    setCurrentCharIndex(0);
    setIsDelaying(false);
    setLoadingDashes("");

    // If it's a check message with delay, start the delay after typing
    if (message.type === "check" && message.delay) {
      const delay = message.delay;

      // Start the delay timer
      const delayTimer = setTimeout(() => {
        setIsDelaying(true);
        setLoadingDashes("");

        // Animate loading dashes
        const dashInterval = setInterval(() => {
          setLoadingDashes((prev) => {
            if (prev.length >= 30) return "";
            return prev + ".";
          });
        }, 100);

        // End the delay after the specified time
        const endDelayTimer = setTimeout(() => {
          clearInterval(dashInterval);
          setIsDelaying(false);
          // Add the completed check message with DONE
          setVisibleMessages((prev) => [
            ...prev,
            {
              ...message,
              message: `${message.message}\t${".".repeat(40)} DONE`,
            },
          ]);
          setCurrentMessageIndex((prev) => prev + 1);
        }, delay);

        return () => {
          clearTimeout(endDelayTimer);
          clearInterval(dashInterval);
        };
      }, message.message.length * 0.1 + 10); // Time to type + small buffer

      return () => clearTimeout(delayTimer);
    }
  }, [diagnostics, currentMessageIndex]);

  // Type out the current message character by character
  useEffect(() => {
    if (!isTyping || !currentMessage) return;

    if (currentCharIndex < currentMessage.message.length) {
      const timer = setTimeout(() => {
        setCurrentText(
          (prev) => prev + currentMessage.message[currentCharIndex]
        );
        setCurrentCharIndex((prev) => prev + 1);
      }, 0.1);

      return () => clearTimeout(timer);
    } else {
      // Message is complete
      if (currentMessage.type !== "check" || !currentMessage.delay) {
        setVisibleMessages((prev) => [
          ...prev,
          { ...currentMessage, message: currentText },
        ]);
        setCurrentMessageIndex((prev) => prev + 1);
      }
      // Don't set isTyping to false for check messages with delay
      if (currentMessage.type !== "check" || !currentMessage.delay) {
        setIsTyping(false);
      }
    }
  }, [isTyping, currentCharIndex, currentMessage]);

  // Registrar callback para quando descriptografar com sucesso
  useEffect(() => {
    if (isHorus) {
      setOnDecryptSuccess(() => () => {
        // Mostrar mensagem de sucesso
        alert("✓ DESCRIPTOGRAFIA CONCLUÍDA COM SUCESSO\n\nTodas as conversas criptografadas foram liberadas!");
        
        // Opcional: Adicionar mensagens descriptografadas ao console
        const decryptedMsgs: DiagnosticMessage[] = [
          {
            type: "summary" as const,
            message: "\n\n╔════════════════════════════════════════════╗",
          },
          {
            type: "notice" as const,
            message: "║ DESCRIPTOGRAFIA CONCLUÍDA COM SUCESSO ║",
          },
          {
            type: "summary" as const,
            message: "╚════════════════════════════════════════════╝\n",
          },
        ];

        // Adicionar cada mensagem descriptografada
        messages.forEach((msg, index) => {
          if (msg.decryptedContent) {
            decryptedMsgs.push({
              type: "summary" as const,
              message: `\n━━━ TRANSMISSÃO #${index + 1} ━━━`,
            });
            decryptedMsgs.push({
              type: "notice" as const,
              message: msg.decryptedContent,
            });
          }
        });

        decryptedMsgs.push({
          type: "summary" as const,
          message: "\n" + "═".repeat(60) + "\n",
        });

        // Adicionar ao console existente
        setVisibleMessages((prev) => [...prev, ...decryptedMsgs]);
      });
    }
  }, [isHorus, messages, setOnDecryptSuccess]);

  // Handle keyboard input to close when complete
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        hideDiagnostics();
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, []);

  // Generate report file
  const generateReport = () => {
    if (!diagnostics || !map) return;

    // Build report content
    let reportContent = `${diagnostics.title.toUpperCase()}\n`;
    reportContent += `${"=".repeat(50)}\n\n`;

    // Add all visible messages
    visibleMessages.forEach((msg) => {
      reportContent += `${msg.message}\n`;
    });

    // Add 6 random numeric sequences at the end
    reportContent += `\n${"=".repeat(50)}\n`;
    reportContent += `SEQUÊNCIAS DE VERIFICAÇÃO:\n\n`;
    for (let i = 0; i < 6; i++) {
      const sequence = Array.from({ length: 16 }, () =>
        Math.floor(Math.random() * 16).toString(16)
      ).join("");
      reportContent += `${i + 1}. ${sequence.toUpperCase()}\n`;
    }

    // Create and download file
    const blob = new Blob([reportContent], { type: "text/plain" });
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.href = url;
    link.download = `relatorio_diagnostico_${Date.now()}.txt`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
  };

  // Render a message based on its type
  const renderMessage = (message: DiagnosticMessage, index: number) => {
    const baseClasses = "my-2";
    const typeClasses = {
      separator: "text-primary",
      check: "text-primary",
      warning: "text-red-500",
      notice: "text-primary",
      summary: "text-green-500",
    };

    return (
      <div
        key={index}
        className={`${baseClasses} ${typeClasses[message.type]}`}
      >
        {message.message}
      </div>
    );
  };

  const isComplete =
    currentMessageIndex >= (diagnostics?.messages.length || 0) &&
    !isTyping &&
    !isDelaying;

  // Função para encerrar o terminal
  const handleCloseTerminal = () => {
    setIsClosing(true);
    
    // Adicionar mensagem de encerramento
    setVisibleMessages((prev) => [
      ...prev,
      {
        type: "notice" as const,
        message: "\n\nEncerrando Console...",
      },
    ]);

    // Aguardar 1.5 segundos antes de fechar e redirecionar
    setTimeout(() => {
      hideDiagnostics();
      // Mudar para a view do mapa (interior-ascii)
      if (scenario?.id) {
        window.location.href = `/${scenario.id}/interior-ascii`;
      }
    }, 1500);
  };

  return (
    <div
      className={`border border-primary p-4 h-[900px] md:h-[1400px] relative flex flex-col bg-black overflow-y-auto custom-scrollbar ${
        emergency.active ? "text-red-500" : "text-primary"
      }`}
    >
      <div className="font-mono text-2xl mb-6">
        {diagnostics?.title || "Diagnostics"}
      </div>

      <div className="font-mono whitespace-pre-wrap flex-1">
        {visibleMessages.map(renderMessage)}

        {/* Currently typing message or check message in loading state */}
        {(isTyping || isDelaying) && currentMessage && (
          <div
            className={`my-2 ${
              currentMessage.type === "warning"
                ? "text-red-500"
                : "text-primary"
            }`}
          >
            {currentText}
            {isDelaying && `\t${loadingDashes}`}
            <span className="animate-pulse">_</span>
          </div>
        )}
      </div>

      {/* Print Report and Close Terminal Buttons */}
      {isComplete && !isClosing && (
        <div className="flex justify-end gap-3 mt-4 pb-4">
          <Button
            onClick={generateReport}
            className="font-mono text-xs tracking-wider px-4 py-2 animate-pulse border-2 border-primary shadow-[0_0_10px_rgba(245,158,11,0.5)] hover:shadow-[0_0_20px_rgba(245,158,11,0.8)]"
          >
            DOWNLOAD
          </Button>
          {isHorus && (
            <Button
              onClick={handleCloseTerminal}
              className="font-mono text-xs tracking-wider px-4 py-2 animate-pulse border-2 border-red-500 text-red-500 shadow-[0_0_10px_rgba(239,68,68,0.5)] hover:shadow-[0_0_20px_rgba(239,68,68,0.8)]"
            >
              ENCERRAR-TERMINAL
            </Button>
          )}
        </div>
      )}

    </div>
  );
}
