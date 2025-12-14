"use client";

import { useDiagnostics } from "@/src/context/diagnostics-context";
import { useEmergency } from "@/src/context/emergency-context";
import { useScenario } from "@/src/context/scenario-context";
import { useEncryption } from "@/src/context/encryption-context";
import type { DiagnosticMessage } from "@/src/models/station-graph-map";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { Button } from "@/src/components/button";
import { HORUS_SECRET_MESSAGES, formatSecretMessagesForDownload } from "@/src/data/horus-secret-log";

/**
 * Renders a view of the diagnostics of the station.
 *
 * Uses the scenario.map.diagnostics property to display the diagnostics.
 */
export function DiagnosticsView() {
  const router = useRouter();
  const { map, scenario } = useScenario();
  const { emergency } = useEmergency();
  const { hideDiagnostics, diagnosticsVisible, showDiagnostics } = useDiagnostics();
  const { addMessage, setShowEncryptedModal, messages, setOnDecryptSuccess, isDecrypted, initializeKeyForDiagnostics } = useEncryption();
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
      }, 1);

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
        console.log("🔓 Descriptografia concluída! Abrindo console...");
        console.log("Console visível?", diagnosticsVisible);
        console.log("Mensagens:", messages);
        
        // SEMPRE fechar e reabrir o console para garantir que as mensagens apareçam
        if (diagnosticsVisible) {
          console.log("Fechando console primeiro...");
          hideDiagnostics();
        }
        
        // Abrir console após um pequeno delay
        setTimeout(() => {
          console.log("Abrindo console com mensagens descriptografadas...");
          showDiagnostics();
          
          // Adicionar mensagens descriptografadas ao console
          setTimeout(() => {
            console.log("Adicionando mensagens descriptografadas ao console...");
            const decryptedMsgs: DiagnosticMessage[] = [
            {
              type: "summary" as const,
              message: "\n\n" + "═".repeat(70),
            },
            {
              type: "summary" as const,
              message: "║" + " ".repeat(68) + "║",
            },
            {
              type: "summary" as const,
              message: "║" + " ".repeat(10) + "MENSAGENS DESCRIPTOGRAFADAS COM SUCESSO" + " ".repeat(19) + "║",
            },
            {
              type: "summary" as const,
              message: "║" + " ".repeat(68) + "║",
            },
            {
              type: "summary" as const,
              message: "═".repeat(70) + "\n",
            },
            {
              type: "notice" as const,
              message: "NÍVEL DE CLASSIFICAÇÃO: OMEGA-ULTRA SECRETO",
            },
            {
              type: "notice" as const,
              message: "ACESSO AUTORIZADO: BASE HORUS // TAO-095",
            },
            {
              type: "notice" as const,
              message: "TOTAL DE TRANSMISSÕES: " + messages.length + "\n",
            },
          ];

          // Adicionar cada mensagem descriptografada
          messages.forEach((msg, index) => {
            if (msg.decryptedContent) {
              decryptedMsgs.push({
                type: "summary" as const,
                message: `\n━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━`,
              });
              decryptedMsgs.push({
                type: "notice" as const,
                message: `[TRANSMISSÃO #${index + 1}] - ${new Date(msg.timestamp).toLocaleString("pt-BR")}`,
              });
              decryptedMsgs.push({
                type: "summary" as const,
                message: `━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━\n`,
              });
              decryptedMsgs.push({
                type: "notice" as const,
                message: msg.decryptedContent,
              });
            }
          });

          decryptedMsgs.push({
            type: "summary" as const,
            message: "\n" + "═".repeat(60),
          });
          decryptedMsgs.push({
            type: "notice" as const,
            message: "\n✓ TODAS AS TRANSMISSÕES FORAM PROCESSADAS E LIBERADAS\n",
          });
          decryptedMsgs.push({
            type: "summary" as const,
            message: "═".repeat(60) + "\n",
          });

          // SUBSTITUIR as mensagens antigas pelas novas (mensagens descriptografadas)
          setVisibleMessages(decryptedMsgs);
          console.log("✅ Mensagens adicionadas ao console!");
        }, 300);
        }, 100);
      });
    }
  }, [isHorus, messages, setOnDecryptSuccess, diagnosticsVisible, showDiagnostics, hideDiagnostics]);

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
  const generateReport = async () => {
    if (!diagnostics || !map) return;

    // Build report content (log normal)
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

    // Download log normal
    const blob = new Blob([reportContent], { type: "text/plain" });
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.href = url;
    link.download = `relatorio_diagnostico_${Date.now()}.txt`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);

    // Se houver mensagens criptografadas no HORUS
    if (isHorus && messages.length > 0) {
      if (isDecrypted) {
        // ARQUIVO 1: HORUS-SECRET.txt - Conversas ultra secretas formatadas (TODAS as 30 mensagens)
        const secretLogContent = formatSecretMessagesForDownload(
          HORUS_SECRET_MESSAGES.map((msg, index) => ({
            ...msg,
            timestamp: new Date(Date.now() + index * 3600000).toISOString() // 1 hora entre cada mensagem
          }))
        );

        const secretBlob = new Blob([secretLogContent], { type: "text/plain; charset=utf-8" });
        const secretUrl = URL.createObjectURL(secretBlob);
        const secretLink = document.createElement("a");
        secretLink.href = secretUrl;
        secretLink.download = `HORUS-SECRET.txt`;
        document.body.appendChild(secretLink);
        secretLink.click();
        document.body.removeChild(secretLink);
        URL.revokeObjectURL(secretUrl);

        // ARQUIVO 2: Relatório sobre luas e base
        let relatorioLuasContent = "═══════════════════════════════════════════════════════════════\n";
        relatorioLuasContent += "           RELATÓRIO DE ANÁLISE - SISTEMA TAO-095\n";
        relatorioLuasContent += "═══════════════════════════════════════════════════════════════\n\n";
        relatorioLuasContent += "BASE: " + (scenario?.name || "HORUS") + "\n";
        relatorioLuasContent += "TIPO: " + (scenario?.type || "Base Científica/Militar") + "\n";
        relatorioLuasContent += "LOCALIZAÇÃO: Planeta TAO-095 (Classe-M)\n\n";
        relatorioLuasContent += "═══════════════════════════════════════════════════════════════\n\n";
        relatorioLuasContent += "ANÁLISE DAS LUAS DO SISTEMA:\n\n";
        relatorioLuasContent += "O sistema TAO-095 possui 7 luas em órbita, nomeadas após\n";
        relatorioLuasContent += "deidades egípcias:\n\n";
        relatorioLuasContent += "1. OSIRIS - Lua principal, órbita estável\n";
        relatorioLuasContent += "2. ISIS - Composição rica em minérios raros\n";
        relatorioLuasContent += "3. SETH - Atividade sísmica anômala detectada\n";
        relatorioLuasContent += "4. NEPHTHYS - Atmosfera rarefeita, sem anomalias\n";
        relatorioLuasContent += "5. ANUBIS - Presença de estruturas não identificadas\n";
        relatorioLuasContent += "6. SEKHMET - ⚠ ALERTA: Padrões de energia inexplicáveis\n";
        relatorioLuasContent += "7. BASTET - Menor lua, órbita irregular\n\n";
        relatorioLuasContent += "═══════════════════════════════════════════════════════════════\n\n";
        relatorioLuasContent += "DADOS DO DIAGNÓSTICO DA BASE:\n\n";
        relatorioLuasContent += reportContent;
        relatorioLuasContent += "\n\n═══════════════════════════════════════════════════════════════\n";
        relatorioLuasContent += "                    FIM DO RELATÓRIO\n";
        relatorioLuasContent += "═══════════════════════════════════════════════════════════════\n";

        const luasBlob = new Blob([relatorioLuasContent], { type: "text/plain; charset=utf-8" });
        const luasUrl = URL.createObjectURL(luasBlob);
        const luasLink = document.createElement("a");
        luasLink.href = luasUrl;
        luasLink.download = `RELATORIO_LUAS_BASE_${Date.now()}.txt`;
        document.body.appendChild(luasLink);
        luasLink.click();
        document.body.removeChild(luasLink);
        URL.revokeObjectURL(luasUrl);
      } else {
        // Se NÃO descriptografado, cria arquivos criptografados
        await downloadEncryptedZip();
      }
    }
  };

  // Função para criar e baixar ZIP protegido por senha
  const downloadEncryptedZip = async () => {
    // Gerar senha fragmentada
    const passwordFragments = [
      Math.random().toString(36).substring(2, 6).toUpperCase(),
      Math.random().toString(36).substring(2, 6).toUpperCase(),
      Math.random().toString(36).substring(2, 6).toUpperCase(),
      Math.random().toString(36).substring(2, 6).toUpperCase(),
    ];
    const password = passwordFragments.join("-");

    // Criar conteúdo do arquivo de senha fragmentado
    let passwordFileContent = "CHAVE DE ACESSO - FRAGMENTOS\n";
    passwordFileContent += "=".repeat(50) + "\n\n";
    passwordFileContent += "Para desbloquear o arquivo DADOS_CRIPTOGRAFADOS.zip,\n";
    passwordFileContent += "combine os fragmentos abaixo na ordem correta:\n\n";
    passwordFragments.forEach((frag, i) => {
      passwordFileContent += `FRAGMENTO ${i + 1}: ${frag}\n`;
    });
    passwordFileContent += "\nFormato: XXXX-XXXX-XXXX-XXXX\n";

    // Criar conteúdo criptografado
    let encryptedContent = "DADOS CRIPTOGRAFADOS - ACESSO RESTRITO\n";
    encryptedContent += "=".repeat(60) + "\n\n";
    encryptedContent += "⚠ AVISO: Conteúdo protegido por criptografia de nível HORUS-OMEGA\n\n";
    
    messages.forEach((msg, index) => {
      encryptedContent += `[TRANSMISSÃO #${index + 1}]\n`;
      encryptedContent += `Timestamp: ${new Date(msg.timestamp).toLocaleString("pt-BR")}\n`;
      encryptedContent += `Dados: ${msg.encryptedContent}\n`;
      encryptedContent += "-".repeat(60) + "\n\n";
    });
    encryptedContent += `\nSenha de acesso necessária: ${password}\n`;
    encryptedContent += "Consulte o arquivo CHAVE_FRAGMENTADA.txt\n";

    // Download arquivo de senha fragmentada
    const passBlob = new Blob([passwordFileContent], { type: "text/plain" });
    const passUrl = URL.createObjectURL(passBlob);
    const passLink = document.createElement("a");
    passLink.href = passUrl;
    passLink.download = `CHAVE_FRAGMENTADA_${Date.now()}.txt`;
    document.body.appendChild(passLink);
    passLink.click();
    document.body.removeChild(passLink);
    URL.revokeObjectURL(passUrl);

    // Download arquivo criptografado (simulando ZIP)
    // Nota: Navegadores não podem criar ZIPs reais com senha nativamente
    // Este arquivo simula um ZIP mostrando que precisa de senha
    const encBlob = new Blob([encryptedContent], { type: "text/plain" });
    const encUrl = URL.createObjectURL(encBlob);
    const encLink = document.createElement("a");
    encLink.href = encUrl;
    encLink.download = `DADOS_CRIPTOGRAFADOS_${Date.now()}.txt`;
    document.body.appendChild(encLink);
    encLink.click();
    document.body.removeChild(encLink);
    URL.revokeObjectURL(encUrl);

    // Mostrar alerta informando sobre os downloads
    alert(
      "📁 ARQUIVOS BAIXADOS:\n\n" +
      "1. relatorio_diagnostico.txt - Log de diagnóstico\n" +
      "2. DADOS_CRIPTOGRAFADOS.txt - Dados protegidos\n" +
      "3. CHAVE_FRAGMENTADA.txt - Senha de acesso\n\n" +
      "⚠ Os dados criptografados requerem senha.\n" +
      "Consulte CHAVE_FRAGMENTADA.txt para obter a senha."
    );
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
    
    // GERAR A CHAVE AGORA, quando o jogador fecha o terminal após executar diagnóstico
    if (isHorus) {
      initializeKeyForDiagnostics();
    }
    
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
      // Mudar para a view do mapa (interior-ascii) usando o ID correto do cenário
      const scenarioId = scenario?.id || "TAO-095";
      console.log("Redirecionando para:", `/${scenarioId}/interior-ascii`);
      router.push(`/${scenarioId}/interior-ascii`);
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
