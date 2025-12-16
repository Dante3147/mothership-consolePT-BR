/**
 * Tela de carregamento com console integrado para manter a estética retro.
 */
export default function Loading() {
  const logs = [
    "[BOOT] Inicializando sistemas principais...",
    "[NET] Estabelecendo uplink com terminal orbital...",
    "[DIAG] Calibrando matriz sensorial...",
    "[SEC] Verificando credenciais do Warden...",
    "[SYS] Carregando assets e cenários...",
  ];

  return (
    <div className="min-h-screen bg-black text-primary flex items-center justify-center px-4">
      <div className="w-full max-w-3xl border border-primary/40 bg-black/80 shadow-[0_0_20px_rgba(0,255,200,0.15)] p-6">
        <div className="flex items-center justify-between mb-4 text-xs md:text-sm">
          <span>CONSOLE // BOOT SEQUENCE</span>
          <span className="text-primary/70">LINK: ACTIVE</span>
        </div>

        <div className="font-mono text-[12px] md:text-sm bg-black/60 border border-primary/20 p-4 space-y-2 min-h-[200px]">
          {logs.map((line, idx) => (
            <div key={idx} className="text-primary/90">
              {line}
            </div>
          ))}
          <div className="flex items-center">
            <span>{">"} AGUARDANDO...</span>
            <span
              aria-hidden="true"
              className="inline-block w-2 h-4 bg-primary animate-pulse ml-2"
            ></span>
          </div>
        </div>

        <div className="mt-4">
          <div className="flex justify-between text-[11px] md:text-xs text-primary/70 mb-1">
            <span>INICIALIZANDO SISTEMAS</span>
            <span>CARREGANDO</span>
          </div>
          <div className="w-full h-2 bg-primary/10 overflow-hidden">
            <div className="h-full bg-gradient-to-r from-primary/40 via-primary to-primary/60 animate-pulse"></div>
          </div>
        </div>
      </div>
    </div>
  );
}
