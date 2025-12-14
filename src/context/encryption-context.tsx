"use client";

import React, { createContext, useContext, useState, useEffect } from "react";
import { HORUS_SECRET_MESSAGES } from "@/src/data/horus-secret-log";

interface EncryptedMessage {
  id: string;
  timestamp: string;
  encryptedContent: string;
  decryptedContent?: string;
}

interface EncryptionContextType {
  messages: EncryptedMessage[];
  addMessage: (content: string) => void;
  decryptionKey: string;
  generateKey: () => void;
  initializeKeyForDiagnostics: () => void;
  decryptMessages: (key: string) => boolean;
  isDecrypted: boolean;
  showEncryptedModal: boolean;
  setShowEncryptedModal: (show: boolean) => void;
  keyCopied: boolean;
  keyFound: boolean;
  copyKeyToClipboard: () => void;
  randomRoom: string;
  diagnosticsExecuted: boolean;
  onDecryptSuccess?: () => void;
  setOnDecryptSuccess: (callback: (() => void) | undefined) => void;
}

const EncryptionContext = createContext<EncryptionContextType | undefined>(
  undefined
);

// Função para criptografar (Caesar cipher simples + base64)
function encryptContent(content: string, shift: number = 7): string {
  const shifted = content
    .split("")
    .map((char) => {
      const code = char.charCodeAt(0);
      if (code >= 65 && code <= 90) {
        return String.fromCharCode(((code - 65 + shift) % 26) + 65);
      }
      if (code >= 97 && code <= 122) {
        return String.fromCharCode(((code - 97 + shift) % 26) + 97);
      }
      return char;
    })
    .join("");
  
  return Buffer.from(shifted).toString("base64");
}

// Função para descriptografar
function decryptContent(encrypted: string, shift: number = 7): string {
  try {
    const decoded = Buffer.from(encrypted, "base64").toString("utf-8");
    return decoded
      .split("")
      .map((char) => {
        const code = char.charCodeAt(0);
        if (code >= 65 && code <= 90) {
          return String.fromCharCode(((code - 65 - shift + 26) % 26) + 65);
        }
        if (code >= 97 && code <= 122) {
          return String.fromCharCode(((code - 97 - shift + 26) % 26) + 97);
        }
        return char;
      })
      .join("");
  } catch {
    return "[ERRO DE DECODIFICAÇÃO]";
  }
}

// Gerar chave aleatória
function generateRandomKey(): string {
  const chars = "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789";
  const segments = [];
  for (let i = 0; i < 4; i++) {
    let segment = "";
    for (let j = 0; j < 4; j++) {
      segment += chars.charAt(Math.floor(Math.random() * chars.length));
    }
    segments.push(segment);
  }
  return segments.join("-");
}

export function EncryptionProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const [messages, setMessages] = useState<EncryptedMessage[]>([]);
  const [decryptionKey, setDecryptionKey] = useState<string>("");
  const [isDecrypted, setIsDecrypted] = useState(false);
  const [showEncryptedModal, setShowEncryptedModal] = useState(false);
  const [keyCopied, setKeyCopied] = useState(false);
  const [keyFound, setKeyFound] = useState(false);
  const [randomRoom, setRandomRoom] = useState<string>("");
  const [diagnosticsExecuted, setDiagnosticsExecuted] = useState(false);
  const [onDecryptSuccess, setOnDecryptSuccess] = useState<(() => void) | undefined>(undefined);

  // Lista de salas possíveis para esconder a chave
  const possibleRooms = [
    "COMANDO",
    "OBSERVATORIO",
    "SALA_OPS",
    "LAB_PRINCIPAL",
    "ARMORY",
    "SALA_CONTROLE",
    "NUCLEO_REATOR",
    "SUBTERRANEO",
  ];

  // Função para inicializar a chave quando o jogador fecha o terminal
  const initializeKeyForDiagnostics = () => {
    // Só gerar se ainda não foi executado
    if (diagnosticsExecuted) return;
    
    const key = generateRandomKey();
    setDecryptionKey(key);
    
    const room = possibleRooms[Math.floor(Math.random() * possibleRooms.length)];
    setRandomRoom(room);
    
    setDiagnosticsExecuted(true);
    
    // Criar mensagens criptografadas secretas usando o arquivo HORUS-SECRET-LOG
    const newMessages = HORUS_SECRET_MESSAGES.map((msg, index) => {
      const formattedContent = `[${msg.sender}] ${msg.content}`;
      const encrypted = encryptContent(formattedContent);
      return {
        id: msg.id,
        timestamp: new Date(Date.now() + index * 1000).toISOString(),
        encryptedContent: encrypted,
      };
    });

    setMessages(newMessages);
    localStorage.setItem("horus_encrypted_messages", JSON.stringify(newMessages));
    
    // Salvar no localStorage para persistência
    localStorage.setItem("horus_decryption_key", key);
    localStorage.setItem("horus_key_room", room);
    localStorage.setItem("horus_diagnostics_executed", "true");
  };

  const addMessage = (content: string) => {
    const encrypted = encryptContent(content);
    const newMessage: EncryptedMessage = {
      id: `msg_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`,
      timestamp: new Date().toISOString(),
      encryptedContent: encrypted,
    };

    setMessages((prev) => {
      const updated = [...prev, newMessage];
      // Salvar no localStorage
      localStorage.setItem("horus_encrypted_messages", JSON.stringify(updated));
      return updated;
    });
  };

  const generateKey = () => {
    const key = generateRandomKey();
    setDecryptionKey(key);
    localStorage.setItem("horus_decryption_key", key);
  };

  const decryptMessages = (key: string): boolean => {
    console.log("🔑 Tentando descriptografar...");
    console.log("Chave inserida:", key.toUpperCase().replace(/\s/g, ""));
    console.log("Chave esperada:", decryptionKey);
    
    if (key.toUpperCase().replace(/\s/g, "") === decryptionKey) {
      console.log("✅ Chave correta! Descriptografando...");
      
      // Descriptografar todas as mensagens
      const decryptedMsgs = messages.map((msg) => ({
        ...msg,
        decryptedContent: decryptContent(msg.encryptedContent),
      }));
      
      console.log("Mensagens descriptografadas:", decryptedMsgs);
      
      setMessages(decryptedMsgs);
      setIsDecrypted(true);
      localStorage.setItem("horus_decrypted", "true");
      
      // Fechar modal após um pequeno delay
      setTimeout(() => {
        console.log("Fechando modal...");
        setShowEncryptedModal(false);
      }, 500);
      
      // Chamar callback de sucesso se existir
      if (onDecryptSuccess) {
        console.log("Callback existe! Chamando em 600ms...");
        setTimeout(() => {
          console.log("Executando callback onDecryptSuccess...");
          onDecryptSuccess();
        }, 600);
      } else {
        console.warn("⚠️ Callback onDecryptSuccess NÃO existe!");
      }
      
      return true;
    }
    console.log("❌ Chave incorreta!");
    return false;
  };

  const copyKeyToClipboard = async () => {
    try {
      await navigator.clipboard.writeText(decryptionKey);
      setKeyCopied(true);
      setKeyFound(true);
      localStorage.setItem("horus_key_copied", "true");
      localStorage.setItem("horus_key_found", "true");
    } catch (error) {
      console.error("Erro ao copiar chave:", error);
    }
  };

  // Carregar do localStorage
  useEffect(() => {
    const savedMessages = localStorage.getItem("horus_encrypted_messages");
    const savedKey = localStorage.getItem("horus_decryption_key");
    const savedRoom = localStorage.getItem("horus_key_room");
    const isAlreadyDecrypted = localStorage.getItem("horus_decrypted");
    const isKeyFound = localStorage.getItem("horus_key_found");
    const isKeyCopied = localStorage.getItem("horus_key_copied");
    const wasDiagnosticsExecuted = localStorage.getItem("horus_diagnostics_executed");

    if (savedMessages) {
      setMessages(JSON.parse(savedMessages));
    }
    if (savedKey) {
      setDecryptionKey(savedKey);
    }
    if (savedRoom) {
      setRandomRoom(savedRoom);
    }
    if (isAlreadyDecrypted === "true") {
      setIsDecrypted(true);
    }
    if (isKeyFound === "true") {
      setKeyFound(true);
    }
    if (isKeyCopied === "true") {
      setKeyCopied(true);
    }
    if (wasDiagnosticsExecuted === "true") {
      setDiagnosticsExecuted(true);
    }
  }, []);

  return (
    <EncryptionContext.Provider
      value={{
        messages,
        addMessage,
        decryptionKey,
        generateKey,
        initializeKeyForDiagnostics,
        decryptMessages,
        isDecrypted,
        showEncryptedModal,
        setShowEncryptedModal,
        keyCopied,
        keyFound,
        copyKeyToClipboard,
        randomRoom,
        diagnosticsExecuted,
        onDecryptSuccess,
        setOnDecryptSuccess,
      }}
    >
      {children}
    </EncryptionContext.Provider>
  );
}

export function useEncryption() {
  const context = useContext(EncryptionContext);
  if (!context) {
    throw new Error("useEncryption must be used within EncryptionProvider");
  }
  return context;
}
