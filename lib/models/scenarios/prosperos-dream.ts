import { Duration } from "luxon";
import { Credit } from "../credit";
import { Image } from "../image";
import { PeriodicPayment } from "../periodic-payment";
import { POI_ID, Scenario, Table } from "../scenario";

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

  const stellarBurnTable: Table = {
    title: "Stellar Burn",
    icon: "Wine",
    description:
      "A selection of pleasures and services available at The Stellar Burn. Prices in credits (cr).",
    columns: [
      { key: "category", label: "Category" },
      { key: "name", label: "Name" },
      { key: "price", label: "Price", type: "currency" },
      { key: "effect", label: "Effect" },
    ],
    rows: [
      {
        category: "DRINK",
        name: "CHATTER",
        price: new Credit(15),
        effect: "Adzuki beans, Chat grubs, Corn.",
      },
      {
        category: "DRINK",
        name: "MOLOKO+",
        price: new Credit(25),
        effect:
          "Milk, Synthemesc, Hallucinogen. (Body Save or hallucinate (all rolls at [-] for 1d10 hours)).",
      },
      {
        category: "DRINK",
        name: "AMBROSIA",
        price: new Credit(20),
        effect: "Midori, Blue curacao, Lime juice.",
      },
      {
        category: "DRINK",
        name: "VICTORY GIN",
        price: new Credit(12),
        effect: "Sickly, Oily smelling, Acidic.",
      },
      {
        category: "DRINK",
        name: "VESPER",
        price: new Credit(30),
        effect:
          "Three measures gin to one measure vodka, half measure Lillet, Shaken, Lemon peel.",
      },
      {
        category: "DRINK",
        name: "CADRE COLA",
        price: new Credit(1),
        effect: "Caffeinated cola beverage.",
      },
      {
        category: "DRINK",
        name: "SMOKEY",
        price: new Credit(15),
        effect: "Mescal margarita, Dry.",
      },
      {
        category: "DRINK",
        name: "WELL DRINK",
        price: new Credit(10),
        effect:
          "Blood Mary, Gin & Tonic, Long Island Iced Tea, Margarita, Rum & Coke, etc",
      },
      {
        category: "DRINK",
        name: "CALL DRINK",
        price: new Credit(50),
        effect: "Mixed drink with particular brand of liquor requested.",
      },
      {
        category: "DRINK",
        name: "BEER",
        price: new Credit(5),
        effect: "Can or bottle.",
      },
      {
        category: "DRUG",
        name: "SYCORAX",
        price: new Credit(1000),
        effect: "Neon pink pill. Strong sense of euphoria for cybermod users.",
      },
      {
        category: "RENTAL",
        name: "PRIVATE VIP BOOTH",
        price: new Credit(250),
        effect: "Complete sonic muting and dynamic privacy tinting.",
      },
      {
        category: "RENTAL",
        name: "BALCONY ACCESS",
        price: new Credit(50),
        effect: "Semi-private booths with a balcony view of the dance floor.",
      },
      {
        category: "---",
        name: '"THE ECSTASY" Cover Charge',
        price: new Credit(100),
        effect: "Required payment to gain access.",
      },
      {
        category: "ECSTASY SERVICE",
        name: "PRIVATE DANCE",
        price: new Credit(20),
        effect: "A dance in a private soundproof booth. Reduce 1d5 Stress [-].",
      },
      {
        category: "ECSTASY SERVICE",
        name: "HOURLY RATE",
        price: new Credit(100),
        effect: "An hour alone in a private room. Reduce 1d5 Stress [+].",
      },
      {
        category: "ECSTASY SERVICE",
        name: "OVERNIGHT",
        price: new Credit(1500),
        effect: "Companionship for an evening out or in. Reduce 1d10 Stress.",
      },
      {
        category: "ECSTASY SERVICE",
        name: "OWN XP SLICK",
        price: new PeriodicPayment(
          new Credit(40),
          Duration.fromObject({ hours: 1 })
        ),
        effect: "Recording of time with companion.",
      },
      {
        category: "ECSTASY SERVICE",
        name: "OTHER XP SLICK",
        price: new PeriodicPayment(
          new Credit(5000),
          Duration.fromObject({ hours: 1 })
        ),
        effect: "Someone else's recording of time with companion.",
      },
    ],
  };

  const chopShopTable: Table = {
    title: "Chop Shop",
    icon: "Slice",
    description:
      "Cyberware available for installation or purchase at the Chop Shop. Prices in credits (cr). Slots = Strength/10 (rounded down)",
    columns: [
      { key: "name", label: "Name" },
      { key: "price", label: "Price", type: "currency" },
      { key: "slots", label: "Slots" },
      { key: "description", label: "Description" },
      { key: "requires", label: "Requires" },
    ],
    rows: [
      {
        name: "Big Switch",
        price: new Credit(18000),
        slots: "1",
        description:
          "Allows the user to change their primary sexual characteristics. Takes 1 hour and a mental trigger.",
        requires: "",
      },
      {
        name: "Black Box",
        price: new Credit(200000),
        slots: "1",
        description:
          "Eidetic memory backup. Memories can be watched with an OGRE or projected with a Holoprojector. Only saves complete memories from the time of installation onward. Also stores any uploaded data or slickware.",
        requires: "Slicksocket",
      },
      {
        name: "Cloakskin",
        price: new Credit(200000),
        slots: "1",
        description:
          "Near-invisibility for 5 minutes once per day. If a Wound is gained during use there is a 30% chance condition is permanent.",
        requires: "",
      },
      {
        name: "Deadswitch",
        price: new Credit(5000),
        slots: "1",
        description:
          "Feigns death for 2 weeks. Every time the switch is used there's a cumulative 5% chance the condition is permanent.",
        requires: "Black Box",
      },
      {
        name: "Fangs",
        price: new Credit(2000),
        slots: "0",
        description:
          "Hollow cybernetic fangs. 2d10 DMG. Can store up to 3 doses of poison, medicine or any other drug.",
        requires: "",
      },
      {
        name: "Handcannon",
        price: "6kcr + Weapon*10",
        slots: "Varies",
        description:
          "Conceals a weapon inside a prosthetic limb. Slots and price are based on the weapon used. Slots for Weapons: Handguns: 1. Rifles: 2. Larger than Rifle: 3+ (laser cutter, flamethrower, grenade launcher, etc). Price for Weapons: 10x more than their regular price.",
        requires: "",
      },
      {
        name: "Holoprojector",
        price: new Credit(750),
        slots: "1",
        description:
          "Holographically project stored data (collected via OGRE, Installed Body Cam, Black Box, Slicksocket, etc).",
        requires: "OGRE",
      },
      {
        name: "Hotswap",
        price: new Credit(5000),
        slots: "0",
        description: "Allows a 1 turn changing of cyberware.",
        requires: "",
      },
      {
        name: "Huntershot",
        price: new Credit(4500),
        slots: "1",
        description:
          "Holds 1 dart which can be fired on command, upon death or unconsciousness. 2d10 DMG.",
        requires: "OGRE",
      },
      {
        name: "Little Switch",
        price: new Credit(8000),
        slots: "0",
        description:
          "Allows the user to smooth or roughen their appearance. Takes 1 day and a mental trigger.",
        requires: "",
      },
      {
        name: "Loudmouth",
        price: new Credit(500),
        slots: "0",
        description:
          "Allows for recording and playback of audio. Maximum volume equivalent to that of a flashbang.",
        requires: "",
      },
      {
        name: "Lumatat",
        price: new Credit(200),
        slots: "0",
        description:
          "Cosmetic, color changing, animated or luminescent tattoos.",
        requires: "",
      },
      {
        name: "OGRE",
        price: new Credit(24000),
        slots: "1",
        description:
          "Occular Graphic Rendering Engine. A Heads-Up Display implanted in the optical nerve which projects directly into user's field of vision.",
        requires: "",
      },
      {
        name: "Panic Button",
        price: new Credit(10000),
        slots: "1",
        description:
          "When triggered (on purpose or upon death) violently detonates hidden explosives. Everyone within Close Range must make a Body Save or take 3d10 DMG. If knocked unconscious there is a 5% chance this will trigger automatically.",
        requires: "",
      },
      {
        name: "Panzefist",
        price: new Credit(5000000),
        slots: "3",
        description:
          "A miniaturized missile launcher hidden inside a prosthetic. Extreme Range, 2d10x10 DMG Shots: 2. Wound: Fire/Explosion [+] Reloading takes a round. Without a Spinal Rig user must make a Body Save [-] or be flung backwards. Takes 2 rounds to fire.",
        requires: "Prosthetic",
      },
      {
        name: "Prosthetic",
        price: new Credit(2000),
        slots: "0",
        description:
          "Artificial hand, foot, arm or leg. Prosthetic organs can also replace any damaged organs, though at 10x the price.",
        requires: "",
      },
      {
        name: "Remote Uplink",
        price: new Credit(2000000),
        slots: "1",
        description:
          "Once per day sends a PDGP encrypted broadcast of user's Black Box data to a secure backup site for future retrieval (or resleeving). Many services require an authorized next-of-kin.",
        requires: "Black Box",
      },
      {
        name: "Retractable Nanoblade",
        price: new Credit(80000),
        slots: "1",
        description:
          "Retractable 9'' blade which can cut through almost anything. 2d10 DMG.",
        requires: "",
      },
      {
        name: "Revenant Protocol",
        price: new Credit(20000),
        slots: "1",
        description:
          "If triggered within 2 rounds of death, allows the user to continue fighting for 2d10 rounds after death. If there are no remaining enemies, user must roll randomly for targets.",
        requires: "",
      },
      {
        name: "Scapegoat System",
        price: new Credit(10000),
        slots: "1",
        description:
          "For every 10 DMG user takes, Scapegoat System gains 1 Charge. Charges can be released via touch for 2d10 DMG. Holds 3 charges.",
        requires: "",
      },
      {
        name: "Slicksocket",
        price: new Credit(500),
        slots: "1",
        description:
          "Cranial input jack which allows slickware to be installed.",
        requires: "",
      },
      {
        name: "Sockpuppet",
        price: "1mcr+Weapon",
        slots: "1",
        description:
          "Allows the user to install a weapon which can fire on its own once per round using the user's Combat Stat.",
        requires: "Spinal Rig",
      },
      {
        name: "Spider Mount",
        price: new Credit(250000),
        slots: "0",
        description: "Grants +1 slot. Can only be installed once.",
        requires: "Spinal Rig",
      },
      {
        name: "Spinal Rig",
        price: new Credit(150000),
        slots: "1",
        description:
          "Mechanical rig built for assisted heavy-lifting. User gains 10 Strength (and 1 slot). Can only be installed once.",
        requires: "",
      },
      {
        name: "Subdermal Armor",
        price: new Credit(5000000),
        slots: "1",
        description:
          "Grants user a layer of rechargeable armor (5 AP) beneath their skin. Takes 2 weeks to regrow if used.",
        requires: "",
      },
      {
        name: "Tattletale",
        price: new Credit(2000),
        slots: "0",
        description:
          "Detachable audio surveillance bug which can be traced up to 100km to within a 100m area.",
        requires: "",
      },
      {
        name: "Terminal Jack",
        price: new Credit(750),
        slots: "1",
        description:
          "Port allowing interface with terminals, smartlink weapons, and vehicles. Can download data from linked systems or upload information from a Black Box.",
        requires: "",
      },
      {
        name: "Whiplash Injector",
        price: new Credit(4000000),
        slots: "1",
        description:
          "Single Use. Automatically restores 1 Wound upon user's death. Reduce Body Save by 1d10 [-] after use.",
        requires: "",
      },
    ],
  };

  const iceBoxSlickwareTable: Table = {
    title: "Slickware",
    icon: "Brain",
    description:
      "Slickware available for installation at the Ice Box. Prices in credits (cr). Slots = Intellect/10 (rounded down)",
    columns: [
      { key: "name", label: "Name" },
      { key: "price", label: "Price", type: "currency" },
      { key: "slots", label: "Slots" },
      { key: "description", label: "Description" },
      { key: "requires", label: "Requires" },
    ],
    rows: [
      {
        name: "God Mode",
        price: new Credit(10000),
        slots: "1",
        description:
          "Gives [+] on Hacking Checks when jacked into a terminal. On failure: Gain 2 Stress.",
        requires: "Slicksocket, Terminal Jack",
      },
      {
        name: "Espernetic Feedback Loop",
        price: new Credit(36000),
        slots: "1",
        description:
          "Psionic attack that overloads targeted electronics (including androids, cybernetics, etc). Make a Sanity Save [+]. If successful deal damage equal to the amount rolled. On failure take 1 DMG and gain 1 Stress as per usual.",
        requires: "Slicksocket",
      },
      {
        name: "Holopet",
        price: new Credit(24000),
        slots: "0",
        description:
          "Projects a medium sized holographic AI pet which can run around within Close Range. When Resting, relieve +1 Stress. Panic Check at [-] if the Holopet slickware is ever destroyed.",
        requires: "Slicksocket",
      },
      {
        name: "Looky-loo",
        price: new Credit(550),
        slots: "0",
        description: "Picks up transmissions on all non-encrypted bands.",
        requires: "Slicksocket",
      },
      {
        name: "Machine Code",
        price: new Credit(350000),
        slots: "4",
        description:
          "Can converse with powerful AI at a level the AI finds comfortable. Requires Sanity Save: if successful gain 1 Stress per hour spent conversing. If failed gain 1 per minute.",
        requires: "Slicksocket, Black Box, Terminal Jack",
      },
      {
        name: "Sentinel System",
        price: new Credit(120000),
        slots: "2",
        description:
          "Doubles effectiveness of stimpaks, Rest and Medical Treatment.",
        requires: "Slicksocket",
      },
      {
        name: "SkillSlick (Trained)",
        price: new Credit(50000),
        slots: "1",
        description:
          "The user gains the purchased Skill for as long as the SkillSlick remains installed. The selection and supply of SkillSlicks is very limited and closely guarded.",
        requires: "Slicksocket",
      },
      {
        name: "SkillSlick (Expert)",
        price: new Credit(500000),
        slots: "2",
        description:
          "The user gains the purchased Skill for as long as the SkillSlick remains installed. The selection and supply of SkillSlicks is very limited and closely guarded.",
        requires: "Slicksocket",
      },
      {
        name: "SkillSlick (Master)",
        price: new Credit(1000000),
        slots: "3",
        description:
          "The user gains the purchased Skill for as long as the SkillSlick remains installed. The selection and supply of SkillSlicks is very limited and closely guarded.",
        requires: "Slicksocket",
      },
      {
        name: "Twitch Booster",
        price: new Credit(4000),
        slots: "1",
        description:
          "When activated, the user gains [+] on Speed Checks for 3 rounds and takes 1 DMG as their nerve endings burn.",
        requires: "Slicksocket",
      },
      {
        name: "Vox Box",
        price: new Credit(24000),
        slots: "1",
        description:
          "Can perfectly mimic any voice after 10 minutes of speaking to the target. Stores up to 3 voices.",
        requires: "Loudmouth",
      },
    ],
  };

  const iceBoxServicesTable: Table = {
    title: "Ice Box",
    icon: "Database",
    description:
      "Resleeving and memory services available at the Ice Box. Prices in credits (cr).",
    columns: [
      { key: "name", label: "Name" },
      { key: "price", label: "Price", type: "currency" },
      { key: "description", label: "Description" },
    ],
    rows: [
      {
        name: "Reclamation Sleeve",
        price: new Credit(300000),
        description:
          "Built by memory wiping prisoners. Reroll stats. 10% chance of learning a random skill. 10% chance of gaining someone else's memories.",
      },
      {
        name: "Model-A Series Sleeve",
        price: new Credit(500000),
        description:
          "Bulk issue. Ten different physical models (A1–A10). Reduce all Stats and Saves by 5. Heavily discriminated against.",
      },
      {
        name: "Atlas X Premium Sleeve",
        price: new Credit(3000000),
        description:
          "Custom designed. +5 Strength, Speed, and Body. Recovery only takes 48hrs.",
      },
      {
        name: "Narcissus-1 Sleeve",
        price: new Credit(50000000),
        description:
          "Luxury designed. All new Stats. Spend 240 points between Strength, Intellect, Combat and Speed. Recovery only takes 12hrs.",
      },
      {
        name: "Sleeve Backup",
        price: new Credit(50000),
        description:
          "Download memories in the NeMo Machine. Takes 24 hours. Sanity Save or forget the last 1d10 days. Critical Failure results in a Panic Check and total amnesia.",
      },
      {
        name: "Sleeve Storage (1mo)",
        price: new PeriodicPayment(
          new Credit(500),
          Duration.fromObject({ months: 1 })
        ),
        description: "Sleeve storage fees.",
      },
      {
        name: "Slickbay (1hr)",
        price: new PeriodicPayment(
          new Credit(5),
          Duration.fromObject({ hours: 1 })
        ),
        description: "Enough time to install a slick.",
      },
      {
        name: "Slickworld (1mo)",
        price: new PeriodicPayment(
          new Credit(100),
          Duration.fromObject({ months: 1 })
        ),
        description: "DIY or join a Clan Server.",
      },
    ],
  };

  const theFarmDrugsTable: Table = {
    title: "Farm",
    icon: "Tractor",
    description:
      "A selection of drugs available at The Farm. Prices in credits (cr)",
    columns: [
      { key: "name", label: "Name" },
      { key: "price", label: "Price", type: "currency" },
      { key: "effect", label: "Effect & Comedown" },
    ],
    rows: [
      {
        name: "Method",
        effect: "Complete and total eidetic memory for 2d10min.",
        price: new Credit(80),
      },
      {
        name: "Liquid Sword",
        effect: "[+] on Combat Checks for 1d5 turns. Take 2d10 DMG after.",
        price: new Credit(200),
      },
      {
        name: "Daytona",
        effect:
          "Gain an extra action for 1d10 turns. Reduce Speed by 1d10 after.",
        price: new Credit(150),
      },
      {
        name: "Triumph",
        effect:
          "Grants [+] on the next 1d10 rolls. 1d5 Stress. Permanently reduce Max Health by 1d5.",
        price: new Credit(300),
      },
      {
        name: "Soma",
        effect:
          "Don't gain Stress for 1d10 hours. [-] on Speed Checks for the next 1d10 days. +1 Minimum Stress.",
        price: new Credit(125),
      },
      {
        name: "Ruckus",
        effect: "+1d10 Strength. -1d10 Sanity.",
        price: new Credit(100),
      },
      {
        name: "Seed",
        effect:
          "Gain a new Skill for 1d10 days. Lower a random Skill's bonus by 5 [1d10: (1-5) Trained. (6-9) Expert (10) Master]. A Skill reduced below 0 is forgotten completely.",
        price: new Credit(350),
      },
      {
        name: "Stimpsice",
        effect:
          "Grants the ability to read target's mind for 1d10 minutes. Gain 1d5 Stress.",
        price: new Credit(500),
      },
      {
        name: "Slug",
        effect:
          "Mentally visit a virtual world shared by everyone taking Slug at that exact moment. Last 1d10 hours. Sanity Save.",
        price: new Credit(25),
      },
      {
        name: "Sycorax",
        effect:
          "Grants +20 to Body Saves made when installing cybermods. Heals Xd10 DMG where X is equal to the number of slots of cybermods and slickware installed. May come with side effects.",
        price: new Credit(750),
      },
    ],
  };

  const canyonHeavyMarketTable: Table = {
    title: "CANYONHEAVY.market",
    icon: "Terminal",
    description:
      "A selection of black market tech and devices available at CANYONHEAVY.market. Prices in credits (cr).",
    columns: [
      { key: "thing", label: "Name" },
      { key: "price", label: "Price", type: "currency" },
      { key: "whatDo", label: "Description" },
    ],
    rows: [
      {
        thing: "TrashKid",
        whatDo:
          "Portable device preconfigured to generate believable iconography and attack patterns for a fictitious cyber-gang, leading investigators astray.",
        price: new Credit(5000),
      },
      {
        thing: "Splintermask",
        whatDo:
          "Transparent, flexible balaclava whose outer surface transmits harsh jagged noise-patterns, defeating conventional and IR cameras. Stressful to Androids/AI systems.",
        price: new Credit(3000),
      },
      {
        thing: "Racketball",
        whatDo:
          "Bundle of transmitters, speakers, LEDs and suspicious cabling which aggressively output noise on all spectrums, destroying any delicate sensors within 30m and stunning standard sensors for 1d10min.",
        price: new Credit(4500),
      },
      {
        thing: "Office Assistant",
        whatDo:
          "A large suitcase or backpack containing blank Android personality storage and several I/O cables. A willing android can download a copy of their personality into the device which if then connected to an unwilling android (Sanity Save to resist) can control this new body, locking the original personality out.",
        price: new Credit(55000),
      },
      {
        thing: "Moebius Strip",
        whatDo:
          "If connected to a camera, endlessly replays 30 seconds of selected footage while increasing the timestamp accordingly.",
        price: new Credit(3500),
      },
      {
        thing: "Doorstop",
        whatDo:
          "Small siphon-circuit which traps any open/close signal output by a door, meaning no notification of door operation is reported to the network.",
        price: new Credit(500),
      },
      {
        thing: "Remote Autohacker",
        whatDo:
          "A radio operated, preprogrammable output device allows for remote input (allowing the player to make a remote Hacking Check). Long Range.",
        price: new Credit(250000),
      },
      {
        thing: "Slaveshot",
        whatDo:
          "Close Range dart gun which on hit injects malicious code into a cybermod, allowing the hacker remote access within Long Range (Body Save to resist).",
        price: new Credit(15000),
      },
      {
        thing: "Socketsnake",
        whatDo:
          "An inert, lifeless bundle of cables with a set of adaptors. Once connected to a device any further input causes the snake to thrash wildly, dealing 2d10 DMG to the user.",
        price: new Credit(750),
      },
      {
        thing: "Mommybird",
        whatDo:
          "A heavy black cylinder filled with a huge bank of capacitors. When connected the device siphons power into the capacitors before outputting all of this charge back into the device. This takes 60 seconds.",
        price: new Credit(75000),
      },
    ],
  };

  const baseCostsTable: Table = {
    title: "Base Costs",
    icon: "Anchor",
    description:
      "Basic costs for existing on the station. Shore leave takes 4 days, reduces stress to 0 and converts some of the stress into saves.",
    columns: [
      { key: "name", label: "Name" },
      { key: "category", label: "Category" },
      { key: "price", label: "Price", type: "currency" },
      { key: "description", label: "Description" },
    ],
    rows: [
      {
        name: "Docking Fee",
        category: "SERVICE",
        price: new PeriodicPayment(
          new Credit(10000),
          Duration.fromObject({ weeks: 1 })
        ),
        description:
          "Impounded vehicles fine: Ship Class x 1kcr per day impounded.",
      },
      {
        name: "Oxygen Tax",
        category: "SERVICE",
        price: new PeriodicPayment(
          new Credit(10),
          Duration.fromObject({ days: 1 })
        ),
        description:
          "50cr/day/person during major events that require more O2.",
      },
      {
        name: "Seller's License",
        category: "SERVICE",
        price: new Credit(2000),
        description: "Allows the selling of goods aboard The Dream.",
      },
      {
        name: "Weapon Locker",
        category: "SERVICE",
        price: new PeriodicPayment(
          new Credit(1),
          Duration.fromObject({ days: 1 })
        ),
        description: "All hull-breachable weapons must be placed in a locker.",
      },
      {
        name: "Living in Squalor",
        category: "ABSTRACTION",
        price: new PeriodicPayment(
          new Credit(10),
          Duration.fromObject({ days: 1 })
        ),
        description: "Tempest Co will throw you in The Choke if they find you.",
      },
      {
        name: "Borderline",
        category: "ABSTRACTION",
        price: new PeriodicPayment(
          new Credit(50),
          Duration.fromObject({ days: 1 })
        ),
        description: "Can eat, breath, sleep.",
      },
      {
        name: "Citizen",
        category: "ABSTRACTION",
        price: new PeriodicPayment(
          new Credit(100),
          Duration.fromObject({ days: 1 })
        ),
        description: "Move about comfortably.",
      },
      {
        name: "Decadent",
        category: "ABSTRACTION",
        price: new PeriodicPayment(
          new Credit(300),
          Duration.fromObject({ days: 1 })
        ),
        description: "Go wherever you want, do whatever you want.",
      },
      {
        name: "C-CLASS",
        category: "SHORE LEAVE",
        price: "2d10 x 100cr (200cr - 2kcr)",
        description:
          "Convert 1d5 stress. Calm days of relaxation. Lone time with your thoughts.",
      },
      {
        name: "B-CLASS",
        category: "SHORE LEAVE",
        price: "2d10 x 1kcr (2kcr - 20kcr)",
        description:
          "Convert 1d10 stress. Days filled with moderate luxuries. Nice dinners, massages, etc",
      },
      {
        name: "A-CLASS",
        category: "SHORE LEAVE",
        price: "2d10 x 10kcr (20kcr - 200kcr)",
        description:
          "Convert 2d10 stress. Days filled with expensive luxuries. All night parties, all inclusive resorts, etc",
      },
      {
        name: "X-CLASS",
        category: "SHORE LEAVE",
        price: "1d100 x 10kcr (10kcr - 1mcr)",
        description:
          "Convert 2d10 [+] stress. Endulgence in criminal luxuries. Drugs, gambling, raves, etc",
      },
      {
        name: "S-CLASS",
        category: "SHORE LEAVE",
        price: "2d10 x 100kcr (200kcr - 2mcr)",
        description:
          "Convert all stress. Endulgence in any and all luxuries imaginable. Anything your twisted mind can dream up",
      },
    ],
  };

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
    tables: [
      stellarBurnTable,
      chopShopTable,
      iceBoxSlickwareTable,
      iceBoxServicesTable,
      theFarmDrugsTable,
      canyonHeavyMarketTable,
      baseCostsTable,
    ],
    images: images,
    theme: "pink",
  };
  return scenario;
};
