"use client";

import React, { createContext, useContext, useState, useEffect } from "react";

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
  decryptMessages: (key: string) => boolean;
  isDecrypted: boolean;
  showEncryptedModal: boolean;
  setShowEncryptedModal: (show: boolean) => void;
  keyCopied: boolean;
  keyFound: boolean;
  copyKeyToClipboard: () => void;
  randomRoom: string;
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

  // Gerar chave e sala aleatória na inicialização
  useEffect(() => {
    const key = generateRandomKey();
    setDecryptionKey(key);
    
    const room = possibleRooms[Math.floor(Math.random() * possibleRooms.length)];
    setRandomRoom(room);
    
    // Salvar no localStorage para persistência
    localStorage.setItem("horus_decryption_key", key);
    localStorage.setItem("horus_key_room", room);
  }, []);

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
    if (key.toUpperCase().replace(/\s/g, "") === decryptionKey) {
      // Descriptografar todas as mensagens
      const decryptedMsgs = messages.map((msg) => ({
        ...msg,
        decryptedContent: decryptContent(msg.encryptedContent),
      }));
      
      setMessages(decryptedMsgs);
      setIsDecrypted(true);
      localStorage.setItem("horus_decrypted", "true");
      
      // Fechar modal após um pequeno delay
      setTimeout(() => {
        setShowEncryptedModal(false);
      }, 500);
      
      // Chamar callback de sucesso se existir
      if (onDecryptSuccess) {
        setTimeout(() => {
          onDecryptSuccess();
        }, 600);
      }
      
      return true;
    }
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
  }, []);

  return (
    <EncryptionContext.Provider
      value={{
        messages,
        addMessage,
        decryptionKey,
        generateKey,
        decryptMessages,
        isDecrypted,
        showEncryptedModal,
        setShowEncryptedModal,
        keyCopied,
        keyFound,
        copyKeyToClipboard,
        randomRoom,
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
