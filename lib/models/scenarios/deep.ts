import { Image } from "../image";
import { POI_ID, Scenario } from "../scenario";

export const bellStation = (): Scenario => {
  const images: Image[] = [
    {
      title: "Arkady",
      path: "/imgs/ARKADY.png",
      description: "The first Diver",
    },
    {
      title: "Noriko",
      path: "/imgs/NORIKO.png",
      description: "Wittness of something great and terrible",
    },
    {
      title: "Ghost Eater",
      path: "/imgs/ghost-eater.png",
      description: "Veteran Cyborg Diver",
    },
  ];

  const scenario: Scenario = {
    id: "BELL STATION",
    name: "BELL STATION",
    type: "bell",
    crew: { current: 3, capacity: 5 },
    adminCredentials: { username: "ADMIN", password: "ADMIN" },
    charts: ["oxygen", "power"],
    stats: {
      "Energy Usage": "30%",
      "Oxygen Level": "95%",
      "Signal Strength": "50%",
      "Operational Status": "Operational",
      Captain: "Arkady",
    },
    exteriorStats: [
      {
        type: "composition",
        label: "STATION INTEGRITY",
      },
      {
        type: "radiationLevel",
        label: "RADIATION SHIELD",
        unit: "%",
        defaultValue: 98,
        isAlert: true,
        alertThreshold: 50,
        min: 0,
        max: 100,
      },
      {
        type: "surfaceTemp",
        label: "EXTERNAL TEMPERATURE",
        unit: "°C",
        defaultValue: Array(30).fill(-270),
        min: -273,
        max: -260,
        isArray: true,
      },
      {
        type: "windSpeed",
        label: "SOLAR WIND",
        unit: "km/s",
        defaultValue: Array(30).fill(400),
        min: 350,
        max: 800,
        isArray: true,
      },
      {
        type: "researchProgress",
        label: "COMMS UPLINK",
        unit: "%",
        defaultValue: 87,
      },
    ],
    images: images,
    theme: "cyan",
  };

  return scenario;
};

export const deepStation = (): Scenario => {
  const images: Image[] = [
    {
      title: "The Chosen",
      path: "/imgs/chosen.png",
      description: "Chosen by Monarch",
    },
    {
      title: "The Chosen King",
      path: "/imgs/chosen-king.png",
      description: "Chosen by the chosen",
    },
    {
      title: "The Minotaur",
      path: "/imgs/minitour.png",
      pathAlt: "/imgs/minitour-2.png",
      description: "???",
    },
    {
      title: "The Mind Thief",
      path: "/imgs/mind-thief.png",
      description: "An escaped Child-Android from HEL",
    },
    {
      title: "Lettuce Helmet",
      path: "/imgs/helm.png",
    },
    {
      title: "Exibition Hall",
      path: "/imgs/exibition.png",
    },
    {
      title: "The Furnace",
      path: "/imgs/furnace.png",
    },
    {
      title: "The Labyrinth",
      path: "/imgs/maze.png",
    },
    {
      title: "The Hanger",
      path: "/imgs/hanger.png",
    },
    {
      title: "Monarch",
      path: "/imgs/monarch.png",
      description: "The heart of the Deep",
    },
    {
      title: "Chimera Tank",
      path: "/imgs/chimera-tank.jpg",
      description: "Cloudbank's prize winning engine of war",
    },
  ];

  const scenario: Scenario = {
    id: "DEEP STATION",
    name: "THE DEEP",
    type: "deep",
    crew: { current: 120, capacity: 5500 },
    adminCredentials: { username: "ADMIN", password: "ADMIN" },
    charts: ["oxygen", "power"],
    stats: {
      "Energy Usage": "87%",
      Owner: "CLOUDBANK",
    },
    exteriorStats: [
      {
        type: "windSpeed",
        label: "SOLAR WIND",
        unit: "km/s",
        defaultValue: Array(30).fill(400),
        min: 350,
        max: 800,
        isArray: true,
      },
      {
        type: "surfaceTemp",
        label: "CORE TEMPERATURE",
        unit: "°C",
        defaultValue: Array(30).fill(350),
        min: 300,
        max: 400,
        isArray: true,
      },
    ],
    pointsOfInterest: [
      {
        id: POI_ID.DEEP_RECEPTION_LANDING,
        user_facing_id: "1",
        name: "Reception",
        description: "Primary landing and reception area for arrivals.",
      },
      {
        id: POI_ID.DEEP_EXEC_LOUNGE,
        user_facing_id: "2",
        name: "Exec Lounge & Events",
        description: "VIP executive lounge and events platform.",
      },
      {
        id: POI_ID.DEEP_MAINTAINANCE,
        user_facing_id: "3.1",
        name: "Maintainance",
        description: "Central pillar maintainance hub.",
      },
      {
        id: POI_ID.DEEP_SKELETON_WORKS,
        user_facing_id: "3.2",
        name: "Skeleton Works",
        description: "Ring sector for structural frameworks manufacturing.",
      },
      {
        id: POI_ID.DEEP_PSEUDOFLESH_FARMS,
        user_facing_id: "3.3",
        name: "Pseudoflesh Farms",
        description: "Ring sector dedicated to synthetic tissue cultivation.",
      },
      {
        id: POI_ID.DEEP_BRAIN_CONSTRUCTION,
        user_facing_id: "3.4",
        name: "Brain Construction",
        description: "Ring sector for neural assembly.",
      },
      {
        id: POI_ID.DEEP_DIS_ASSEMBLY,
        user_facing_id: "3.5",
        name: "Dis/Assembly",
        description: "Ring sector for dismantling and recycling operations.",
      },
      {
        id: POI_ID.DEEP_STORAGE,
        user_facing_id: "3.6",
        name: "Storage",
        description: "Bulk storage facility beneath the ring.",
      },
      {
        id: POI_ID.DEEP_QA,
        user_facing_id: "3.7",
        name: "Quality Assurance",
        description: "Ring sector focused on testing and QA.",
      },
      {
        id: POI_ID.DEEP_HUMAN_EMULATION_LAB,
        user_facing_id: "4",
        name: "Human Emulation Lab",
        description: "Laboratory for human emulation research.",
      },

      {
        id: POI_ID.DEEP_AI_CORE,
        user_facing_id: "5",
        name: "AI Core",
        description: "Secondary pillar housing the central AI core.",
      },
      {
        id: POI_ID.DEEP_ENGINEERING_AND_SUPPORT,
        user_facing_id: "6",
        name: "Engineering & Support",
        description: "Engineering and support services.",
      },
    ],
    images: images,
    theme: "cyan",
  };

  return scenario;
};
