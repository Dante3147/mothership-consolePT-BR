/**
 * HORUS-SECRET-LOG
 * 
 * Conversas secretas criptografadas entre os membros da tripulação da Base HORUS.
 * Estas mensagens são descriptografadas quando o jogador encontra e usa a chave de descriptografia.
 * 
 * Personagens:
 * - DR. THOTH: Cientista chefe, pesquisador de anomalias
 * - CDR. ANUBIS: Comandante da base, conhecimento classificado
 * - TECH. HATHOR: Técnica de sistemas, especialista em hackeamento
 */

export interface SecretMessage {
  id: string;
  sender: "DR. THOTH" | "CDR. ANUBIS" | "TECH. HATHOR";
  content: string;
  timestamp?: string;
}

/**
 * Mensagens secretas criptografadas.
 * Customize estas mensagens para criar sua própria narrativa!
 */
export const HORUS_SECRET_MESSAGES: SecretMessage[] = [
  {
    id: "msg_001",
    sender: "DR. THOTH",
    content: "As anomalias nas leituras de ÍON continuam. Não posso mais ignorar os padrões.",
  },
  {
    id: "msg_002",
    sender: "CDR. ANUBIS",
    content: "Recebi seu relatório. A Corporação não pode saber sobre isso ainda.",
  },
  {
    id: "msg_003",
    sender: "DR. THOTH",
    content: "As luas... elas estão se movendo. Não naturalmente. É intencional.",
  },
  {
    id: "msg_004",
    sender: "TECH. HATHOR",
    content: "Hackeei os logs antigos. Encontrei transmissões anteriores. Eles SABIAM.",
  },
  {
    id: "msg_005",
    sender: "CDR. ANUBIS",
    content: "Mantenham isso classificado. Nível OMEGA. Apenas entre nós três.",
  },
  {
    id: "msg_006",
    sender: "DR. THOTH",
    content: "As estruturas na superfície de SEKHMET não são formações naturais...",
  },
  {
    id: "msg_007",
    sender: "TECH. HATHOR",
    content: "Decodifiquei os sinais. Não é aleatório. É uma mensagem. Eles estão nos observando.",
  },
  {
    id: "msg_008",
    sender: "CDR. ANUBIS",
    content: "Se a Corporação descobrir antes de entendermos, todos seremos descartados.",
  },
  {
    id: "msg_009",
    sender: "DR. THOTH",
    content: "Proposta: Expedição à SEKHMET. Precisamos de evidências físicas.",
  },
  {
    id: "msg_010",
    sender: "TECH. HATHOR",
    content: "URGENTE: Detectei ativação de sistemas antigos no subsolo da base.",
  },
  {
    id: "msg_011",
    sender: "CDR. ANUBIS",
    content: "Relatórios indicam presença de energia nos túneis subterrâneos. Investigação autorizada.",
  },
  {
    id: "msg_012",
    sender: "DR. THOTH",
    content: "Os artefatos que encontramos... não são de origem humana. Análise confirma.",
  },
  {
    id: "msg_013",
    sender: "TECH. HATHOR",
    content: "Sistema de defesa antigo está online. Não fomos nós que ativamos.",
  },
  {
    id: "msg_014",
    sender: "CDR. ANUBIS",
    content: "Preparar protocolo de evacuação. Silenciosamente. Sem alarmar a tripulação ainda.",
  },
  {
    id: "msg_015",
    sender: "DR. THOTH",
    content: "A lua OSIRIS mudou de órbita 3.7 graus. Isso não é possível naturalmente.",
  },
  {
    id: "msg_016",
    sender: "TECH. HATHOR",
    content: "Análise espectral de SEKHMET revelou assinaturas de energia não catalogadas. Origem: estruturas subterrâneas.",
  },
  {
    id: "msg_017",
    sender: "CDR. ANUBIS",
    content: "Corporação solicitou relatório completo sobre 'anomalias orbitais'. Respondi que são flutuações naturais. Mentira aceita.",
  },
  {
    id: "msg_018",
    sender: "DR. THOTH",
    content: "Descobri inscrições nas estruturas de ANUBIS. Não são humanas. Não são de NENHUMA raça conhecida.",
  },
  {
    id: "msg_019",
    sender: "TECH. HATHOR",
    content: "Os padrões de sinal se repetem a cada 47 horas, 23 minutos e 11 segundos. Precisão absoluta. Artificial.",
  },
  {
    id: "msg_020",
    sender: "CDR. ANUBIS",
    content: "Detectei movimento não autorizado nos sensores. Algo está observando A NÓS. Mas de onde?",
  },
  {
    id: "msg_021",
    sender: "DR. THOTH",
    content: "As luas não são luas. São estações. Antigas. Muito antigas. Pré-humanidade.",
  },
  {
    id: "msg_022",
    sender: "TECH. HATHOR",
    content: "Hackeei arquivos corporativos NÍVEL OMEGA. Eles sempre souberam. A Corporação ENVIOU A GENTE AQUI PROPOSITALMENTE.",
  },
  {
    id: "msg_023",
    sender: "CDR. ANUBIS",
    content: "Se o que Hathor descobriu é verdade, somos cobaias. Experimento controlado. Protocolo de descarte já deve estar ativo.",
  },
  {
    id: "msg_024",
    sender: "DR. THOTH",
    content: "Traduzi 3% das inscrições. Palavras-chave: 'Guardiões', 'Despertar', 'Julgamento'. Não gosto disso.",
  },
  {
    id: "msg_025",
    sender: "TECH. HATHOR",
    content: "Sistema de comunicação foi comprometido. Alguém - ou algo - está interceptando nossas transmissões há MESES.",
  },
  {
    id: "msg_026",
    sender: "CDR. ANUBIS",
    content: "Ordem executiva: Preparar cápsulas de fuga. Silenciosamente. Somente nós três. Perdão aos outros.",
  },
  {
    id: "msg_027",
    sender: "DR. THOTH",
    content: "As estruturas estão ATIVAS agora. Emitindo pulsos cada vez mais fortes. Como se estivessem... ligando.",
  },
  {
    id: "msg_028",
    sender: "TECH. HATHOR",
    content: "CRÍTICO: Sistemas da base começaram a responder a comandos externos. NÃO SOMOS NÓS. Perdi controle do núcleo.",
  },
  {
    id: "msg_029",
    sender: "CDR. ANUBIS",
    content: "Isto é uma ordem: DESTRUAM TODOS OS BACKUPS. Se a Corporação achar isto, vamos todos 'desaparecer'.",
  },
  {
    id: "msg_030",
    sender: "DR. THOTH",
    content: "Última transmissão: As luas se alinharam. Todas as sete. Primeira vez em 10.000 anos segundo meus cálculos. Que os deuses nos protejam.",
  },
];

/**
 * Formata as mensagens para exibição no console
 */
export function formatSecretMessagesForConsole(messages: SecretMessage[]): string {
  let output = "\n╔══════════════════════════════════════════════════════════╗\n";
  output += "║         CONVERSAS SECRETAS DESCRIPTOGRAFADAS         ║\n";
  output += "╚══════════════════════════════════════════════════════════╝\n\n";
  
  messages.forEach((msg, index) => {
    output += `\n[TRANSMISSÃO #${String(index + 1).padStart(2, '0')}]\n`;
    output += `━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━\n`;
    output += `REMETENTE: ${msg.sender}\n`;
    if (msg.timestamp) {
      output += `TIMESTAMP: ${msg.timestamp}\n`;
    }
    output += `\nMENSAGEM:\n${msg.content}\n`;
    output += `━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━\n`;
  });
  
  output += "\n\n[FIM DAS TRANSMISSÕES SECRETAS]\n";
  
  return output;
}

/**
 * Formata as mensagens para download em arquivo TXT
 */
export function formatSecretMessagesForDownload(messages: SecretMessage[]): string {
  let output = "═══════════════════════════════════════════════════════════════\n";
  output += "                  HORUS SECRET LOG - NÍVEL OMEGA\n";
  output += "═══════════════════════════════════════════════════════════════\n\n";
  output += "⚠ CLASSIFICAÇÃO: ULTRA SECRETO - ACESSO RESTRITO ⚠\n";
  output += "BASE: HORUS | PLANETA: TAO-095\n";
  output += "PROTOCOLO: OMEGA-CLEARANCE ONLY\n\n";
  output += "═══════════════════════════════════════════════════════════════\n\n";
  
  messages.forEach((msg, index) => {
    output += `\n[ENTRADA ${String(index + 1).padStart(3, '0')}]\n`;
    output += `${"─".repeat(60)}\n`;
    output += `DE: ${msg.sender}\n`;
    if (msg.timestamp) {
      output += `DATA/HORA: ${new Date(msg.timestamp).toLocaleString("pt-BR")}\n`;
    }
    output += `\nCONTEÚDO DA TRANSMISSÃO:\n`;
    output += `${msg.content}\n`;
    output += `${"─".repeat(60)}\n`;
  });
  
  output += "\n\n═══════════════════════════════════════════════════════════════\n";
  output += "               FIM DO LOG SECRETO - HORUS\n";
  output += "═══════════════════════════════════════════════════════════════\n";
  output += "\n⚠ ESTE DOCUMENTO CONTÉM INFORMAÇÕES CLASSIFICADAS ⚠\n";
  output += "Divulgação não autorizada pode resultar em:\n";
  output += "- Rescisão imediata de contrato\n";
  output += "- Sanções legais corporativas\n";
  output += "- [DADOS REDATADOS]\n";
  
  return output;
}
