"use client";

import { Button } from "@/src/components/button";
import { Dialog, DialogContent } from "@/src/components/dialog";
import { useState } from "react";
import Image from "next/image";

interface StationDataModalProps {
  open: boolean;
  onClose: () => void;
}

export function StationDataModal({ open, onClose }: StationDataModalProps) {
  const [lider, setLider] = useState("Comandante Sarah Chen");
  const [motivo, setMotivo] = useState("Operação de mineração de rotina");
  const [ultimoRelatorio, setUltimoRelatorio] = useState(
    "Sistema de suporte à vida apresentando falhas intermitentes. Filtros de ar requerem substituição urgente."
  );
  const [ultimaGravacao, setUltimaGravacao] = useState(
    "13.12.9000 - 22:47 - Detectados sons anômalos vindos dos túneis da mina. Investigação pendente."
  );
  const [imageError, setImageError] = useState(false);

  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent className="bg-black border-2 border-primary max-w-4xl max-h-[90vh] overflow-y-auto">
        <div className="font-mono text-primary p-6">
          <div className="flex items-start gap-6 mb-6 border-b border-primary pb-4">
            {/* Foto do Comandante */}
            <div className="flex-shrink-0">
              <div className="w-32 h-32 border-2 border-primary overflow-hidden bg-black flex items-center justify-center">
                {!imageError ? (
                  <Image
                    src="/images/station/LIDER.jpg"
                    alt="Comandante"
                    width={128}
                    height={128}
                    className="w-full h-full object-cover"
                    onError={() => setImageError(true)}
                  />
                ) : (
                  <div className="text-xs text-center p-2">
                    <div className="text-primary mb-1">SEM FOTO</div>
                    <div className="text-[10px] text-primary/60">
                      Adicione LIDER.jpg em public/images/station/
                    </div>
                  </div>
                )}
              </div>
            </div>
            
            {/* Título */}
            <div className="flex-1">
              <h2 className="text-2xl">
                DADOS DA ESTAÇÃO - YPSILON 14
              </h2>
            </div>
          </div>

          <div className="space-y-6">
            {/* Líder */}
            <div className="space-y-2">
              <label className="text-sm font-bold block">LÍDER:</label>
              <input
                type="text"
                value={lider}
                onChange={(e) => setLider(e.target.value)}
                className="w-full bg-black border border-primary p-3 text-primary font-mono focus:outline-none focus:border-amber-500 focus:shadow-[0_0_10px_rgba(245,158,11,0.3)]"
              />
            </div>

            {/* Motivo */}
            <div className="space-y-2">
              <label className="text-sm font-bold block">MOTIVO:</label>
              <input
                type="text"
                value={motivo}
                onChange={(e) => setMotivo(e.target.value)}
                className="w-full bg-black border border-primary p-3 text-primary font-mono focus:outline-none focus:border-amber-500 focus:shadow-[0_0_10px_rgba(245,158,11,0.3)]"
              />
            </div>

            {/* Último Relatório */}
            <div className="space-y-2">
              <label className="text-sm font-bold block">ÚLTIMO RELATÓRIO:</label>
              <textarea
                value={ultimoRelatorio}
                onChange={(e) => setUltimoRelatorio(e.target.value)}
                rows={4}
                className="w-full bg-black border border-primary p-3 text-primary font-mono focus:outline-none focus:border-amber-500 focus:shadow-[0_0_10px_rgba(245,158,11,0.3)] resize-none"
              />
            </div>

            {/* Última Gravação */}
            <div className="space-y-2">
              <label className="text-sm font-bold block">ÚLTIMA GRAVAÇÃO:</label>
              <textarea
                value={ultimaGravacao}
                onChange={(e) => setUltimaGravacao(e.target.value)}
                rows={4}
                className="w-full bg-black border border-primary p-3 text-primary font-mono focus:outline-none focus:border-amber-500 focus:shadow-[0_0_10px_rgba(245,158,11,0.3)] resize-none"
              />
            </div>
          </div>

          {/* Botões */}
          <div className="flex gap-4 mt-8 pt-6 border-t border-primary">
            <Button
              onClick={onClose}
              className="flex-1 font-mono tracking-wider"
            >
              FECHAR
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}
