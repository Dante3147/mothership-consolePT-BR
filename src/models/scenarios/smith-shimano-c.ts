import { POI_ID } from "../poi";
import type { Scenario } from "../scenario";
import { StationGraphMap } from "../station-graph-map";

/**
 * Centro Orbital de Pesquisa Smith-Shimano
 * 
 * Estação orbital em órbita baixa. Laboratórios avançados e centro de comunicações.
 */
export const smithShimanoOrbital = (): Scenario => {
  const orbitalMap = new StationGraphMap({
    levels: [
      {
        rooms: ["DOCKING_ALPHA", null, "DOCKING_BETA"],
      },
      {
        rooms: [
          {
            id: "AIRLOCK_ALPHA",
            type: "airlock",
            pressureLossRisk: true,
          },
          null,
          {
            id: "AIRLOCK_BETA",
            type: "airlock",
            pressureLossRisk: true,
          },
        ],
      },
      { rooms: [null, "CENTRO_COMANDO_ORB", null] },
      { rooms: ["LAB_XENOBIO_ORB", "LAB_MINERAL_ORB", "LAB_ARTEFATOS"] },
      { rooms: ["COMUNICACOES_ORB", "DATACENTER_ORB", "OBSERVATORIO"] },
      { rooms: ["ALOJAMENTOS_ORB", "REFEITORIO_ORB", "ENFERMARIA_ORB"] },
      { rooms: [null, "GERADORES_ORB", null] },
    ],
    layout: {
      gridSize: { columns: 3, rows: 7 },
      airlockSizeModifier: { width: 0.6, height: 0.9 },
      outerPadding: { top: 60 },
      roomPadding: { horizontal: 60, vertical: 10 },
    },
    connections: [
      { from: "DOCKING_ALPHA", to: "AIRLOCK_ALPHA", password: "SS-ORB-01" },
      { from: "DOCKING_BETA", to: "AIRLOCK_BETA", password: "SS-ORB-01" },
      { from: "AIRLOCK_ALPHA", to: "CENTRO_COMANDO_ORB" },
      { from: "AIRLOCK_BETA", to: "CENTRO_COMANDO_ORB" },
      { from: "CENTRO_COMANDO_ORB", to: "LAB_XENOBIO_ORB" },
      { from: "CENTRO_COMANDO_ORB", to: "LAB_MINERAL_ORB" },
      { from: "CENTRO_COMANDO_ORB", to: "LAB_ARTEFATOS" },
      { from: "LAB_XENOBIO_ORB", to: "LAB_MINERAL_ORB" },
      { from: "LAB_MINERAL_ORB", to: "LAB_ARTEFATOS" },
      { from: "LAB_XENOBIO_ORB", to: "COMUNICACOES_ORB" },
      { from: "LAB_MINERAL_ORB", to: "DATACENTER_ORB" },
      { from: "LAB_ARTEFATOS", to: "OBSERVATORIO" },
      { from: "COMUNICACOES_ORB", to: "DATACENTER_ORB" },
      { from: "DATACENTER_ORB", to: "OBSERVATORIO" },
      { from: "COMUNICACOES_ORB", to: "ALOJAMENTOS_ORB" },
      { from: "DATACENTER_ORB", to: "REFEITORIO_ORB" },
      { from: "OBSERVATORIO", to: "ENFERMARIA_ORB" },
      { from: "ALOJAMENTOS_ORB", to: "REFEITORIO_ORB" },
      { from: "REFEITORIO_ORB", to: "ENFERMARIA_ORB" },
      { from: "ALOJAMENTOS_ORB", to: "GERADORES_ORB" },
      { from: "REFEITORIO_ORB", to: "GERADORES_ORB" },
      { from: "ENFERMARIA_ORB", to: "GERADORES_ORB" },
    ],
    diagnostics: {
      title: "SISTEMA DE DIAGNÓSTICO - CENTRO ORBITAL SMITH-SHIMANO",
      messages: [
        { type: "notice" as const, message: "╔═══════════════════════════════════════════════════════════════════╗" },
        { type: "notice" as const, message: "║    CENTRO ORBITAL DE PESQUISA SMITH-SHIMANO - DIAGNÓSTICO       ║" },
        { type: "notice" as const, message: "╚═══════════════════════════════════════════════════════════════════╝" },
        { type: "notice" as const, message: "" },
        {
          type: "check" as const,
          message: ">>> INICIALIZANDO SISTEMAS ORBITAIS",
          status: "OK",
          delay: 2000,
        },
        { type: "notice" as const, message: "" },
        { type: "notice" as const, message: "┌─ STATUS OPERACIONAL ─────────────────────────────────────────────┐" },
        { type: "notice" as const, message: "│ 🛰 ÓRBITA: 450km - Estável                                      │" },
        { type: "notice" as const, message: "│ 👥 TRIPULAÇÃO: 450/450 cientistas - Capacidade: 100%            │" },
        { type: "notice" as const, message: "│ 🔬 LABORATÓRIOS: 3 ativos - Xenobio | Mineral | Artefatos      │" },
        { type: "notice" as const, message: "│ ⚡ ENERGIA: Reatores de fusão - Autonomia: 25 anos              │" },
        { type: "notice" as const, message: "└──────────────────────────────────────────────────────────────────┘" },
        { type: "notice" as const, message: "" },
        {
          type: "check" as const,
          message: ">> Sistemas de gravidade artificial",
          status: "NOMINAL",
          delay: 1500,
        },
        { type: "notice" as const, message: "   └─ GRAVIDADE: 1.0g - Ajustável: 0.2g a 1.5g" },
        { type: "notice" as const, message: "" },
        {
          type: "check" as const,
          message: ">> Sistemas de suporte vital",
          status: "ÓTIMO",
          delay: 1800,
        },
        { type: "notice" as const, message: "   ├─ OXIGÊNIO: 21% - Pressão: 1.0 atm" },
        { type: "notice" as const, message: "   ├─ TEMPERATURA: 22°C - Umidade: 45%" },
        { type: "notice" as const, message: "   └─ RECICLAGEM DE AR/ÁGUA: 99.8% eficiência" },
        { type: "notice" as const, message: "" },
        {
          type: "check" as const,
          message: ">> Comunicações quânticas",
          status: "ATIVO",
          delay: 2000,
        },
        { type: "notice" as const, message: "   ├─ UPLINK MATRIZ: CONECTADO" },
        { type: "notice" as const, message: "   ├─ DOWNLINK DELTA-369: ATIVO" },
        { type: "notice" as const, message: "   └─ LATÊNCIA: <1ms (comunicação quântica)" },
        { type: "notice" as const, message: "" },
        {
          type: "warning" as const,
          message: ">> Detritos orbitais",
          status: "ALERTA",
          delay: 2200,
        },
        { type: "warning" as const, message: "   ⚠ 247 objetos rastreados no raio de 10km" },
        { type: "warning" as const, message: "   ⚠ Escudos deflectores: ATIVOS" },
        { type: "notice" as const, message: "" },
        { type: "notice" as const, message: "┌─ PESQUISAS ATIVAS ───────────────────────────────────────────────┐" },
        { type: "notice" as const, message: "│ • Xenobiologia: 127 amostras em análise                         │" },
        { type: "notice" as const, message: "│ • Mineralogia: Espectrometria de terras raras                   │" },
        { type: "notice" as const, message: "│ • Artefatos: Estudo de fragmentos piramidais                    │" },
        { type: "notice" as const, message: "│ • Astronomia: Mapeamento de anomalias gravitacionais            │" },
        { type: "notice" as const, message: "└──────────────────────────────────────────────────────────────────┘" },
        { type: "notice" as const, message: "" },
        { type: "summary" as const, message: "════════════════════════════════════════════════════════════════════" },
        { type: "summary" as const, message: "DIAGNÓSTICO COMPLETO - TODOS OS SISTEMAS OPERACIONAIS" },
        { type: "summary" as const, message: "════════════════════════════════════════════════════════════════════" },
      ],
    },
  });

  const scenario: Scenario = {
    id: "ESTACAO-ESPACIAL-SHIMANO",
    name: "DELTA-369 // ESTAÇÃO ESPACIAL SHIMANO",
    type: "station",
    crew: { current: 450, capacity: 450 },
    adminCredentials: { username: "ORBITAL-ADMIN", password: "SS-ORB-2450" },
    charts: ["oxygen", "power"],
    stats: {
      "Altitude Orbital": "450 km",
      "Gravidade": "1.0g (artificial)",
      "Tripulação": "450 cientistas",
      "Laboratórios": "3 ativos",
      "Autonomia Energética": "25 anos",
      "Comunicação": "Quântica",
    },
    exteriorStats: [
      {
        type: "rotationSpeed",
        label: "VELOCIDADE ORBITAL",
        unit: "km/s",
        defaultValue: Array(30).fill(7.8),
        min: 7.7,
        max: 7.9,
        isArray: true,
      },
      {
        type: "surfaceTemp",
        label: "TEMPERATURA INTERNA",
        unit: "°C",
        defaultValue: Array(30).fill(22),
        min: 20,
        max: 24,
        isArray: true,
      },
    ],
    pointsOfInterest: [
      {
        id: POI_ID.STELLAR_BURN,
        user_facing_id: "01",
        name: "Doca de Atracação Alpha",
        description:
          "Porta principal para naves de transporte. Capacidade: 4 naves simultaneamente.",
      },
      {
        id: POI_ID.DRY_DOCK,
        user_facing_id: "02",
        name: "Doca de Atracação Beta",
        description: "Porta secundária. Acesso VIP e emergências. Taxa: 8kcr/semana.",
      },
      {
        id: POI_ID.CHOP_SHOP,
        user_facing_id: "03",
        name: "Laboratório de Xenobiologia",
        description:
          "Análise de amostras alienígenas. Nível de biossegurança 4. Capacidade: 127 amostras.",
      },
      {
        id: POI_ID.ICE_BOX,
        user_facing_id: "04",
        name: "Laboratório de Mineralogia",
        description:
          "Espectrometria de terras raras. Equipamento nanométrico. Pureza: 99.9%.",
      },
      {
        id: POI_ID.FARM,
        user_facing_id: "05",
        name: "Laboratório de Artefatos",
        description:
          "Estudo de fragmentos piramidais. Sala blindada. Radiação anômala detectada.",
      },
      {
        id: POI_ID.CANYON_HEAVY_MARKET,
        user_facing_id: "06",
        name: "Centro de Comunicações",
        description:
          "Sistema quântico. Uplink direto com matriz Smith-Shimano. Latência: <1ms.",
      },
      {
        id: POI_ID.COURT,
        user_facing_id: "07",
        name: "Observatório Astronômico",
        description:
          "Telescópios de longo alcance. Monitoramento de anomalias gravitacionais.",
      },
      {
        id: POI_ID.TEMPEST_HQ,
        user_facing_id: "08",
        name: "Módulo de Geradores",
        description:
          "Reatores de fusão compacta. Autonomia: 25 anos. Potência: 450 MW.",
      },
    ],
    map: orbitalMap,
    controlButtons: [
      {
        label: "LABORATÓRIOS",
        defaultState: true,
        restricted: false,
        type: "toggle",
        toggleStates: {
          true: "ATIVOS",
          false: "SUSPENSOS",
        },
        linkedRoom: "LAB_MINERAL_ORB",
      },
      {
        label: "GRAVIDADE ARTIFICIAL",
        defaultState: true,
        restricted: true,
        type: "toggle",
        toggleStates: {
          true: "1.0g",
          false: "0.0g",
        },
      },
      {
        label: "ESCUDOS DEFLECTORES",
        defaultState: true,
        restricted: false,
        type: "toggle",
        toggleStates: {
          true: "ATIVOS",
          false: "DESLIGADOS",
        },
      },
      {
        label: "COMUNICAÇÃO QUÂNTICA",
        defaultState: true,
        restricted: true,
        type: "toggle",
        toggleStates: {
          true: "CONECTADO",
          false: "OFFLINE",
        },
      },
      {
        label: "DOCA ALPHA",
        defaultState: false,
        restricted: true,
        type: "toggle",
        toggleStates: {
          true: "DESTRANCADA",
          false: "TRANCADA",
        },
        linkedRoom: "DOCKING_ALPHA",
      },
      {
        label: "DOCA BETA",
        defaultState: false,
        restricted: true,
        type: "toggle",
        toggleStates: {
          true: "DESTRANCADA",
          false: "TRANCADA",
        },
        linkedRoom: "DOCKING_BETA",
      },
    ],
    theme: "smith-shimano",
  };

  return scenario;
};

/**
 * Smith-Shimano Mega-Planet C
 * 
 * Um mega planeta com dois sóis (vermelho e amarelo) e satélites em órbita.
 * Conhecido por suas misteriosas estruturas piramidais e ruínas antigas.
 */
export const smithShimanoC = (): Scenario => {
  const baseMap = new StationGraphMap({
    levels: [
      {
        rooms: ["PORTO_ALPHA", null, "PORTO_BETA"],
      },
      {
        rooms: [
          {
            id: "AIRLOCK_NORTE",
            type: "airlock",
            pressureLossRisk: false,
          },
          null,
          {
            id: "AIRLOCK_SUL",
            type: "airlock",
            pressureLossRisk: false,
          },
        ],
      },
      { rooms: ["CENTRO_COMANDO", "CORREDOR_PRINCIPAL", "COMUNICACOES"] },
      { rooms: ["XENOBIOLOGIA", "DATACENTER", "ARQUEOLOGIA"] },
      { rooms: ["ALOJAMENTOS_EXEC", "ATRIUM_CENTRAL", "ALOJAMENTOS_TECH"] },
      { rooms: ["MINERACAO_HQ", "REFEITORIO", "LABORATORIO_RAROS"] },
      { rooms: ["DEPOSITO_MINERAL", "HANGAR_MINERACAO", "ENFERMARIA"] },
      { rooms: ["GERADORES", "SALA_CONTROLE", "PIRAMIDE_SETHOS"] },
      { rooms: [null, "SITIO_OMEGA7", null] },
    ],
    layout: {
      gridSize: { columns: 3, rows: 9 },
      airlockSizeModifier: { width: 0.6, height: 0.9 },
      outerPadding: { top: 60 },
      roomPadding: { horizontal: 60, vertical: 10 },
    },
    connections: [
      { from: "PORTO_ALPHA", to: "AIRLOCK_NORTE", password: "SS-2450" },
      { from: "PORTO_BETA", to: "AIRLOCK_SUL", password: "SS-2450" },
      { from: "AIRLOCK_NORTE", to: "CORREDOR_PRINCIPAL" },
      { from: "AIRLOCK_SUL", to: "CORREDOR_PRINCIPAL" },
      { from: "CORREDOR_PRINCIPAL", to: "CENTRO_COMANDO" },
      { from: "CORREDOR_PRINCIPAL", to: "COMUNICACOES" },
      { from: "CENTRO_COMANDO", to: "XENOBIOLOGIA" },
      { from: "CORREDOR_PRINCIPAL", to: "DATACENTER" },
      { from: "COMUNICACOES", to: "ARQUEOLOGIA" },
      { from: "XENOBIOLOGIA", to: "DATACENTER" },
      { from: "DATACENTER", to: "ARQUEOLOGIA" },
      { from: "XENOBIOLOGIA", to: "ALOJAMENTOS_EXEC" },
      { from: "DATACENTER", to: "ATRIUM_CENTRAL" },
      { from: "ARQUEOLOGIA", to: "ALOJAMENTOS_TECH" },
      { from: "ALOJAMENTOS_EXEC", to: "ATRIUM_CENTRAL" },
      { from: "ATRIUM_CENTRAL", to: "ALOJAMENTOS_TECH" },
      { from: "ALOJAMENTOS_EXEC", to: "MINERACAO_HQ" },
      { from: "ATRIUM_CENTRAL", to: "REFEITORIO" },
      { from: "ALOJAMENTOS_TECH", to: "LABORATORIO_RAROS" },
      { from: "MINERACAO_HQ", to: "REFEITORIO" },
      { from: "REFEITORIO", to: "LABORATORIO_RAROS" },
      { from: "MINERACAO_HQ", to: "DEPOSITO_MINERAL" },
      { from: "REFEITORIO", to: "HANGAR_MINERACAO" },
      { from: "LABORATORIO_RAROS", to: "ENFERMARIA" },
      { from: "DEPOSITO_MINERAL", to: "HANGAR_MINERACAO" },
      { from: "HANGAR_MINERACAO", to: "ENFERMARIA" },
      { from: "DEPOSITO_MINERAL", to: "GERADORES" },
      { from: "HANGAR_MINERACAO", to: "SALA_CONTROLE" },
      { from: "ENFERMARIA", to: "PIRAMIDE_SETHOS" },
      { from: "GERADORES", to: "SALA_CONTROLE" },
      { from: "SALA_CONTROLE", to: "PIRAMIDE_SETHOS" },
      { from: "PIRAMIDE_SETHOS", to: "SITIO_OMEGA7", password: "SS-2450" },
    ],
    diagnostics: {
      title: "SISTEMA DE DIAGNÓSTICO - DELTA-369 SMITH-SHIMANO",
      messages: [
        { type: "notice" as const, message: "╔═══════════════════════════════════════════════════════════════════╗" },
        { type: "notice" as const, message: "║        SISTEMA DE DIAGNÓSTICO - DELTA-369 v2.1                   ║" },
        { type: "notice" as const, message: "║           SMITH-SHIMANO CORPORATION - MEGA-PLANET                ║" },
        { type: "notice" as const, message: "╚═══════════════════════════════════════════════════════════════════╝" },
        { type: "notice" as const, message: "" },
        {
          type: "check" as const,
          message: ">>> INICIALIZANDO SISTEMAS DA COLÔNIA",
          status: "OK",
          delay: 2000,
        },
        { type: "notice" as const, message: "" },
        { type: "notice" as const, message: "┌─ STATUS OPERACIONAL ─────────────────────────────────────────────┐" },
        { type: "notice" as const, message: "│ ⚙ MINERAÇÃO: 850 ton/dia - NEODYMIUM: 68% | DYSPROSIUM: 22%    │" },
        { type: "notice" as const, message: "│ 🏛 ARQUEOLOGIA: 23 sítios ativos - Pirâmide Sethos: ENERGIZADA  │" },
        { type: "notice" as const, message: "│ 🔬 XENOBIOLOGIA: 4,783 amostras - 14 espécies nativas ativas   │" },
        { type: "notice" as const, message: "│ 👥 POPULAÇÃO: 2,450 operários - Capacidade: 49%                 │" },
        { type: "notice" as const, message: "└──────────────────────────────────────────────────────────────────┘" },
        { type: "notice" as const, message: "" },
        {
          type: "check" as const,
          message: ">> Sistemas de sóis binários",
          status: "ESTÁVEL",
          delay: 1500,
        },
        { type: "notice" as const, message: "   ├─ SOL VERMELHO ALPHA: Classe M - 3,200K - Radiação: Normal" },
        { type: "notice" as const, message: "   └─ SOL AMARELO BETA: Classe G - 5,800K - Radiação: Nominal" },
        { type: "notice" as const, message: "" },
        {
          type: "check" as const,
          message: ">> Satélites em órbita",
          status: "TRACKING",
          delay: 1800,
        },
        { type: "notice" as const, message: "   ├─ LUAS NATURAIS: 7 corpos celestes" },
        { type: "notice" as const, message: "   └─ SATÉLITES ARTIFICIAIS: KRONOS | TITAN | ORBITAL-HUB" },
        { type: "notice" as const, message: "" },
        {
          type: "warning" as const,
          message: ">> Estruturas piramidais",
          status: "ANOMALIA",
          delay: 2000,
        },
        { type: "warning" as const, message: "   ⚠ 12,847 estruturas catalogadas" },
        { type: "warning" as const, message: "   ⚠ PIRÂMIDE SETHOS: Fonte de energia ativa - 2.8km altura" },
        { type: "warning" as const, message: "   ⚠ Material desconhecido - Não detectado no espectro" },
        { type: "warning" as const, message: "   ⚠ Idade estimada: 2.5 milhões de anos" },
        { type: "notice" as const, message: "" },
        { type: "notice" as const, message: "┌─ DEPÓSITOS DE TERRAS RARAS ──────────────────────────────────────┐" },
        { type: "notice" as const, message: "│ 💎 CONCENTRAÇÃO: ULTRA-ALTA (87% pureza média)                  │" },
        { type: "notice" as const, message: "│ 📊 NEODYMIUM: 68% | DYSPROSIUM: 22% | YTTRIUM: 10%             │" },
        { type: "notice" as const, message: "│ 📈 VALOR DE MERCADO: 2.4 trilhões de créditos/ano              │" },
        { type: "notice" as const, message: "│ ⛏ RESERVAS ESTIMADAS: 450 anos de extração contínua            │" },
        { type: "notice" as const, message: "└──────────────────────────────────────────────────────────────────┘" },
        { type: "notice" as const, message: "" },
        {
          type: "check" as const,
          message: ">> Sistemas de comunicação",
          status: "NOMINAL",
          delay: 1500,
        },
        { type: "notice" as const, message: "   └─ Uplink para HQ Smith-Shimano: CONECTADO" },
        { type: "notice" as const, message: "" },
        { type: "notice" as const, message: "┌─ LEMA CORPORATIVO ───────────────────────────────────────────────┐" },
        { type: "notice" as const, message: "│ [SMITH-SHIMANO]: 'Progress Through Power. Discovery Through     │" },
        { type: "notice" as const, message: "│                   Risk. Profit Through Innovation.'              │" },
        { type: "notice" as const, message: "└──────────────────────────────────────────────────────────────────┘" },
        { type: "notice" as const, message: "" },
        { type: "summary" as const, message: "════════════════════════════════════════════════════════════════════" },
        { type: "summary" as const, message: "DIAGNÓSTICO COMPLETO - TODOS OS SISTEMAS OPERACIONAIS" },
        { type: "summary" as const, message: "════════════════════════════════════════════════════════════════════" },
      ],
    },
  });

  const scenario: Scenario = {
    id: "DELTA-369",
    name: "DELTA-369 - SMITH-SHIMANO MEGA-PLANET",
    type: "smith-shimano",
    crew: { current: 2450, capacity: 5000 },
    adminCredentials: { username: "SMITH-ADMIN", password: "SHIMANO-CORP" },
    charts: ["oxygen", "power", "rare-earth"],
    stats: {
      "Diâmetro": "78.945 km",
      "Classe Planetária": "MEGA-TERRA",
      "Sóis Binários": "Anã Vermelha α / Gigante Amarela β",
      "Período Orbital": "847 dias terrestres",
      "Gravidade Superficial": "2,4g",
      "Pressão Atmosférica": "3,2 atm",
      "Faixa de Temperatura": "-45°C a 62°C",
      "Satélites": "7 naturais + 3 artificiais",
      "Estruturas Piramidais": "12.847 detectadas",
      "Sítios Arqueológicos": "Ativos",
    },
    exteriorStats: [
      {
        type: "rotationSpeed",
        label: "ROTAÇÃO PLANETÁRIA",
        unit: "rpm",
        defaultValue: Array(30).fill(0.3),
        min: 0.28,
        max: 0.32,
        isArray: true,
      },
      {
        type: "surfaceTemp",
        label: "TEMPERATURA DA SUPERFÍCIE",
        unit: "°C",
        defaultValue: Array(30).fill(18),
        min: -45,
        max: 62,
        isArray: true,
      },
    ],
    pointsOfInterest: [
      {
        id: POI_ID.STELLAR_BURN,
        user_facing_id: "01",
        name: "Base Central Smith-Shimano",
        description:
          "Sede corporativa e centro de comando. Operações de mineração e pesquisa arqueológica.",
      },
      {
        id: POI_ID.DRY_DOCK,
        user_facing_id: "02",
        name: "Porto Espacial Alpha",
        description: "Docking para naves de grande porte. Taxa: 5kcr/semana.",
      },
      {
        id: POI_ID.FARM,
        user_facing_id: "03",
        name: "Complexo Piramidal Sethos",
        description:
          "Maior estrutura piramidal. 2.8km de altura. Fonte de energia desconhecida ativa.",
      },
      {
        id: POI_ID.CHOP_SHOP,
        user_facing_id: "04",
        name: "Sítio Arqueológico Omega-7",
        description:
          "Ruínas antigas com tecnologia alienígena. Acesso restrito - Nível 5.",
      },
      {
        id: POI_ID.ICE_BOX,
        user_facing_id: "05",
        name: "Laboratório de Xenobiologia",
        description:
          "Pesquisa de formas de vida nativas. Amostras: 4,783 catalogadas.",
      },
      {
        id: POI_ID.CANYON_HEAVY_MARKET,
        user_facing_id: "06",
        name: "Centro Médico Shimano",
        description: "Tratamento avançado. Gravidade ajustável: 0.8g-2.4g.",
      },
      {
        id: POI_ID.COURT,
        user_facing_id: "07",
        name: "Estação de Mineração Titan-9",
        description:
          "Extração de metais raros. Produção: 850 toneladas/dia.",
      },
      {
        id: POI_ID.TEMPEST_HQ,
        user_facing_id: "08",
        name: "Vale das Mil Pirâmides",
        description:
          "Concentração de 1,247 pirâmides. Anomalias gravitacionais detectadas.",
      },
      {
        id: POI_ID.SMITH_SHIMANO_ORBITAL_STATION,
        user_facing_id: "09",
        name: "Centro Orbital de Pesquisa Smith-Shimano",
        description:
          "Estação orbital em órbita baixa. Laboratórios avançados e centro de comunicações. Capacidade: 450 cientistas.",
      },
    ],
    map: baseMap,
    controlButtons: [
      {
        label: "EXTRAÇÃO MINERAL",
        defaultState: true,
        restricted: false,
        type: "toggle",
        toggleStates: {
          true: "ATIVA",
          false: "PAUSADA",
        },
        linkedRoom: "MINERACAO_HQ",
      },
      {
        label: "PESQUISA ARQUEOLÓGICA",
        defaultState: true,
        restricted: true,
        type: "toggle",
        toggleStates: {
          true: "ATIVA",
          false: "SUSPENSA",
        },
        linkedRoom: "ARQUEOLOGIA",
      },
      {
        label: "DADOS-ESTAÇÃO",
        defaultState: false,
        restricted: false,
        type: "action",
      },

      {
        label: "ENERGIA PIRÂMIDE",
        defaultState: true,
        restricted: true,
        type: "toggle",
        toggleStates: {
          true: "CAPTANDO",
          false: "OFFLINE",
        },
        linkedRoom: "PIRAMIDE_SETHOS",
      },
      {
        label: "PORTO ALPHA",
        defaultState: false,
        restricted: true,
        type: "toggle",
        toggleStates: {
          true: "DESTRANCADO",
          false: "TRANCADO",
        },
        linkedRoom: "PORTO_ALPHA",
      },
      {
        label: "SÍTIO OMEGA-7",
        defaultState: false,
        restricted: true,
        type: "toggle",
        toggleStates: {
          true: "ACESSO LIBERADO",
          false: "BLOQUEADO - NÍVEL 5",
        },
        linkedRoom: "SITIO_OMEGA7",
      },
      {
        label: "QUARENTENA XENO",
        defaultState: false,
        restricted: true,
        type: "action",
      },
      {
        label: "DADOS-COLÔNIA",
        defaultState: false,
        restricted: false,
        type: "action",
      },
    ],
    theme: "smith-shimano",
  };

  return scenario;
};

/**
 * Versão com map e diagnostics do Smith-Shimano (para futura implementação)
 */
export const smithShimanoCWithMap = (): Scenario => {
  const baseMap = new StationGraphMap({
    levels: [
      { rooms: ["BASE_CENTRAL"] },
    ],
    connections: [],
    layout: {
      gridSize: { columns: 3, rows: 1 },
      airlockSizeModifier: { width: 0.6, height: 0.9 },
      outerPadding: { top: 60 },
      roomPadding: { horizontal: 60, vertical: 10 },
    },
    diagnostics: {
      title: "DELTA-369 - SMITH-SHIMANO MEGA-PLANET - DIAGNÓSTICO PLANETÁRIO",
      messages: [
          {
            type: "check",
            message: "Inicializando sistemas de monitoramento planetário",
            delay: 1500,
          },
          {
            type: "check",
            message: "Verificando integridade das estruturas piramidais",
            delay: 2000,
          },
          {
            type: "check",
            message: "Analisando assinaturas energéticas",
            delay: 1800,
          },
          { type: "notice", message: "" },
          { type: "notice", message: "╔══════════════════════════════════════════════════════════════╗" },
          { type: "notice", message: "║        SMITH-SHIMANO CORPORATION - DELTA-369                 ║" },
          { type: "notice", message: "║              RELATÓRIO DE STATUS PLANETÁRIO                  ║" },
          { type: "notice", message: "╚══════════════════════════════════════════════════════════════╝" },
          { type: "notice", message: "" },
          { type: "notice", message: "│ SISTEMA DE SÓIS BINÁRIOS:" },
          { type: "notice", message: "│   • Sol Vermelho Alpha: Classe M - Temperatura: 3,200K" },
          { type: "notice", message: "│   • Sol Amarelo Beta: Classe G - Temperatura: 5,800K" },
          { type: "notice", message: "│   • Período Orbital: 847 dias terrestres" },
          { type: "notice", message: "" },
          { type: "notice", message: "│ SATÉLITES EM ÓRBITA:" },
          { type: "notice", message: "│   • Naturais: 7 (SELENE-1 a SELENE-7)" },
          { type: "notice", message: "│   • Artificiais: 3 (ESTAÇÃO KRONOS, OUTPOST TITAN, HUB ORBITAL)" },
          { type: "notice", message: "" },
          { type: "warning", message: "│ ESTRUTURAS PIRAMIDAIS DETECTADAS:" },
          { type: "warning", message: "│   • Total catalogado: 12,847 estruturas" },
          { type: "warning", message: "│   • Material: Desconhecido (não detectado no espectro conhecido)" },
          { type: "warning", message: "│   • Idade estimada: 2.5 milhões de anos" },
          { type: "warning", message: "│   • Maior estrutura: Pirâmide Sethos - 2.8km altura" },
          { type: "notice", message: "" },
          { type: "warning", message: "│ ANOMALIAS DETECTADAS:" },
          { type: "warning", message: "│   ⚠ Flutuações gravitacionais no Vale das Mil Pirâmides" },
          { type: "warning", message: "│   ⚠ Fonte de energia desconhecida - Pirâmide Sethos ATIVA" },
          { type: "warning", message: "│   ⚠ Sinais eletromagnéticos não identificados - Setor 7" },
          { type: "warning", message: "│   ⚠ Distorções temporais menores detectadas próximo a ruínas" },
          { type: "notice", message: "" },
          { type: "notice", message: "│ OPERAÇÕES SMITH-SHIMANO:" },
          { type: "notice", message: "│   • Mineração: OPERACIONAL - 850 ton/dia" },
          { type: "notice", message: "│   • Pesquisa Arqueológica: ATIVA - 23 sítios em escavação" },
          { type: "notice", message: "│   • Xenobiologia: 4,783 amostras catalogadas" },
          { type: "notice", message: "│   • Pessoal: 2,450/5,000 (49% capacidade)" },
          { type: "notice", message: "" },
          { type: "notice", message: "│ [SMITH-SHIMANO]: \"Progress Through Power. Discovery Through Risk.\"" },
          { type: "notice", message: "" },
          { type: "notice", message: "╔══════════════════════════════════════════════════════════════╗" },
          { type: "notice", message: "║               DIAGNÓSTICO CONCLUÍDO COM SUCESSO              ║" },
          { type: "notice", message: "║          Todos os sistemas operacionais nominais             ║" },
          { type: "notice", message: "╚══════════════════════════════════════════════════════════════╝" },
          { type: "notice", message: "" },
        ],
    },
  });

  const scenario: Scenario = {
    id: "DELTA-369-MAP",
    name: "DELTA-369 - SMITH-SHIMANO MEGA-PLANET (WITH MAP)",
    type: "smith-shimano",
    crew: { current: 2450, capacity: 5000 },
    adminCredentials: { username: "SS-ADMIN", password: "SHIMANO-C" },
    charts: ["oxygen", "power"],
    stats: {
      "Diâmetro": "78.945 km",
      "Classe Planetária": "MEGA-TERRA",
      "Sóis Binários": "Anã Vermelha α / Gigante Amarela β",
    },
    exteriorStats: [],
    pointsOfInterest: [],
    map: baseMap,
    theme: "smith-shimano",
  };

  return scenario;
};
