import { Image } from "../image";
import { POI_ID, Scenario } from "../scenario";

export const prosperosDream = (): Scenario => {
  const images: Image[] = [
    {
      title: "Loshe",
      path: "/imgs/loshe.png",
      description: "Head of the Dry Dock",
    },
    {
      title: "Decontamination Robot",
      path: "/imgs/robo.png",
    },
    {
      title: "Officer 805",
      path: "/imgs/officer.png",
      description: "Officer of the Tempest CO",
    },
    {
      title: "Sam",
      path: "/imgs/sam.png",
      description: "Owner of the Stellar Brun",
    },
    {
      title: "Commander Cutter",
      path: "/imgs/cutter.png",
      description: "Commander of the Tempest CO",
    },
    {
      title: "Babushka",
      path: "/imgs/babushka.png",
      description: "Runs the Chop shop",
    },
    {
      title: "Zhenya",
      path: "/imgs/zhenya.png",
      description: "Helping hand at the Chop shop",
    },
    {
      title: "Able",
      path: "/imgs/able.png",
      description: "Priest of the Solarian Church",
    },
    {
      title: "Ukko",
      path: "/imgs/ukko.png",
      description: "Head of the Solarian Church",
    },
    {
      title: "Imogen Cane",
      path: "/imgs/cane.png",
      description: "Leader of the Hunglungs",
    },
    {
      title: "Dr Bancali",
      path: "/imgs/bancali.png",
      description: "Dr. in the Choke",
    },
    {
      title: "Dr. Selene Korrin",
      path: "/imgs/selene.png",
      description: "Head of Tempest Co. Labs",
    },
    {
      title: "Super Soldiers V1",
      path: "/imgs/ss1.png",
      description: "First Generation Tempest Co. Super Soldiers",
    },
  ];

  const scenario: Scenario = {
    id: "PROSPEROS DREAM",
    name: "PROSPERO'S DREAM",
    type: "prosperos",
    crew: { current: 8258000, capacity: 6000000 },
    adminCredentials: { username: "ADMIN", password: "ADMIN" },
    charts: ["oxygen", "power"],
    showPcView: true,
    stats: {
      Diameter: "12.98km",
      Circumference: "40.77km",
      "Ships Currently Docked": "83",
      "Port Classification": "CLASS XXX",
    },
    exteriorStats: [
      {
        type: "rotationSpeed",
        label: "ROTATION RATE",
        unit: "rpm",
        defaultValue: Array(30).fill(0.8),
        min: 0.79,
        max: 0.81,
        isArray: true,
      },
      {
        type: "surfaceTemp",
        label: "EXTERNAL HULL TEMP",
        unit: "°C",
        defaultValue: Array(30).fill(-120),
        min: -150,
        max: -90,
        isArray: true,
      },
    ],
    pointsOfInterest: [
      {
        id: POI_ID.DRY_DOCK,
        user_facing_id: "01",
        name: "Dry Dock",
        description:
          "Docking and repairs. Docking fee: 1kcr + 10kcr/week. O2 tax: 10cr/day/person.",
      },
      {
        id: POI_ID.STELLAR_BURN,
        user_facing_id: "02",
        name: "Stellar Burn",
        description: "Catering to ANY any and all physical delights.",
      },
      {
        id: POI_ID.CHOP_SHOP,
        user_facing_id: "03",
        name: "Chop Shop",
        description:
          "Cybermod installation and repair by Zhenya and The Babushka.",
      },
      {
        id: POI_ID.ICE_BOX,
        user_facing_id: "04",
        name: "The Ice Box",
        description: "Slickware installation and resleeving facility.",
      },
      {
        id: POI_ID.FARM,
        user_facing_id: "05",
        name: "The Farm",
        description: "Food supply. Operated by the Solarian Church.",
      },
      {
        id: POI_ID.CANYON_HEAVY_MARKET,
        user_facing_id: "06",
        name: "CANYONHEAVY.market",
        description: "Information broker.",
      },
      {
        id: POI_ID.COURT,
        user_facing_id: "07",
        name: "The Court",
        description: "Disputes resolved and justice served.",
      },
      {
        id: POI_ID.TEMPEST_HQ,
        user_facing_id: "08",
        name: "Tempest Co. HQ",
        description: "Mercenary company. Security onboard The Dream.",
      },
      {
        id: POI_ID.DOPTOWN,
        user_facing_id: "09",
        name: "Doptown",
        description:
          "De-oxygenated people's town. Heavily guarded debtors' prison for those who can't pay the O2 tax.",
      },
      {
        id: POI_ID.CHOKE,
        user_facing_id: "10",
        name: "The Choke",
        description: "Abandoned, quarantined wasteland.",
      },
    ],
    images: images,
    theme: "pink",
  };
  return scenario;
};
