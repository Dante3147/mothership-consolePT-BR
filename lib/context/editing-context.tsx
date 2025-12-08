import React, { createContext, useContext, useState } from "react";

interface EditingContextType {
  editingPlayerId: string | null;
  editingAmount: string;
  isAdding: boolean;
  isSetting: boolean;
  isEditingTotal: boolean;
  showPaymentForm: string | null;
  setEditingAmount: (amount: string) => void;
  startEditing: (
    playerId: string | null,
    mode: "add" | "remove" | "set"
  ) => void;
  cancelEditing: () => void;
  setShowPaymentForm: (playerId: string | null) => void;
}

const EditingContext = createContext<EditingContextType | null>(null);

export function EditingProvider({ children }: { children: React.ReactNode }) {
  const [editingPlayerId, setEditingPlayerId] = useState<string | null>(null);
  const [editingAmount, setEditingAmount] = useState("");
  const [isAdding, setIsAdding] = useState(false);
  const [isSetting, setIsSetting] = useState(false);
  const [isEditingTotal, setIsEditingTotal] = useState(false);
  const [showPaymentForm, setShowPaymentForm] = useState<string | null>(null);

  const startEditing = (
    playerId: string | null,
    mode: "add" | "remove" | "set"
  ) => {
    setEditingPlayerId(playerId);
    setEditingAmount("");
    setIsAdding(mode === "add");
    setIsSetting(mode === "set");
    setIsEditingTotal(playerId === null);
  };

  const cancelEditing = () => {
    setEditingPlayerId(null);
    setEditingAmount("");
    setIsAdding(false);
    setIsSetting(false);
    setIsEditingTotal(false);
  };

  return (
    <EditingContext.Provider
      value={{
        editingPlayerId,
        editingAmount,
        isAdding,
        isSetting,
        isEditingTotal,
        showPaymentForm,
        setEditingAmount,
        startEditing,
        cancelEditing,
        setShowPaymentForm,
      }}
    >
      {children}
    </EditingContext.Provider>
  );
}

export function useEditing() {
  const context = useContext(EditingContext);
  if (!context) {
    throw new Error("useEditing must be used within an EditingProvider");
  }
  return context;
}
