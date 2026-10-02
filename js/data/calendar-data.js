/* ===================================================================
   🌾 RYTHUMITRA — Crop Calendar Growth Stages & Actionable Tasks
   =================================================================== */

window.RYTHU_CALENDAR_DATA = {
  groundnut: [
    {
      stageNumber: 1,
      stageNameEn: "Sowing & Seed Treatment",
      stageNameTe: "విత్తనం నాటడం & విత్తనశుద్ధి",
      dayRange: "Day 0 - 5",
      icon: "🌱",
      status: "completed",
      descriptionEn: "Treat seed kernels with Trichoderma viride (4g/kg) and Rhizobium culture. Ensure adequate soil moisture before sowing at 5cm depth.",
      descriptionTe: "ట్రైకోడెర్మా విరిడే (4 గ్రా/కిలో) మరియు రైజోబియం కల్చర్‌తో విత్తనశుద్ధి చేయండి. 5 సెం.మీ లోతులో విత్తుకోండి.",
      criticalTask: "Seed germination count inspection on Day 5",
      criticalTaskTe: "5వ రోజున మొలక శాతాన్ని పరిశీలించండి"
    },
    {
      stageNumber: 2,
      stageNameEn: "Germination & Emergence",
      stageNameTe: "మొలక దశ & వెలికితీత",
      dayRange: "Day 6 - 15",
      icon: "🌿",
      status: "completed",
      descriptionEn: "Seedlings emerge uniformly. Gap filling should be carried out within 10 days if patches are missing.",
      descriptionTe: "మొక్కలు ఒకేరీతిగా మొలకెత్తుతాయి. మొలవని చోట్ల 10 రోజుల్లోపు తిరిగి విత్తనాలు నాటుకోవాలి.",
      criticalTask: "Gap filling and check for collar rot disease",
      criticalTaskTe: "మొక్కలు లేనిచోట తిరిగి నాటడం మరియు కాండం కుళ్లును గమనించడం"
    },
    {
      stageNumber: 3,
      stageNameEn: "Vegetative Growth & Weeding",
      stageNameTe: "శాకీయ ఎదుగుదల & కలుపు తీత",
      dayRange: "Day 16 - 35",
      icon: "🌾",
      status: "active",
      descriptionEn: "Intercultivation with blade harrows to control weeds and loosen soil. First light weeding before flowering starts.",
      descriptionTe: "గుంటుకలతో అంతరకృషి చేసి కలుపు నివారించాలి. పూత దశ ప్రారంభం కావడానికి ముందే కలుపు తీయడం పూర్తి చేయాలి.",
      criticalTask: "Apply basal NPK topdressing and intercultivation",
      criticalTaskTe: "మొదటి విడత ఎరువులు వేసి అంతరకృషి చేయడం"
    },
    {
      stageNumber: 4,
      stageNameEn: "Flowering & Pegging Stage",
      stageNameTe: "పూత దశ & ఊడలు దిగే దశ",
      dayRange: "Day 36 - 55",
      icon: "🌼",
      status: "pending",
      descriptionEn: "Golden yellow flowers bloom and pegs penetrate into the ground. CRITICAL: Stop all intercultivation tools now to avoid breaking delicate pegs.",
      descriptionTe: "పసుపు పూలు పూసి ఊడలు నేలలోకి దిగుతాయి. అత్యంత ముఖ్యం: ఊడలు తెగిపోకుండా ఉండటానికి ఎటువంటి గుంటుకలు తోలరాదు!",
      criticalTask: "Apply Gypsum @ 200 kg/acre and maintain optimum moisture",
      criticalTaskTe: "ఎకరాకు 200 కిలోల జిప్సం వేసి తేలికపాటి తడి ఇవ్వాలి"
    },
    {
      stageNumber: 5,
      stageNameEn: "Pod Development & Grain Filling",
      stageNameTe: "కాయ ఏర్పడే దశ & గింజ ఊరే దశ",
      dayRange: "Day 56 - 85",
      icon: "🥜",
      status: "pending",
      descriptionEn: "Pods expand underground and kernels fill with edible oil. Monitor for Tikka leaf spot and spodoptera defoliators.",
      descriptionTe: "నేల లోపల కాయలు పరిమాణం పెంచుకొని గింజలు ఊరుతాయి. ఆకుమచ్చ తెగులు రాకుండా తగిన మందులు పిచికారీ చేయాలి.",
      criticalTask: "Spray Saaf/Contaf if leaf spot appears",
      criticalTaskTe: "తిక్క ఆకుమచ్చ కనిపిస్తే సాఫ్ లేదా కాంటాఫ్ పిచికారీ చేయాలి"
    },
    {
      stageNumber: 6,
      stageNameEn: "Maturity & Harvesting",
      stageNameTe: "పక్వానికి రావడం & పంట కోత",
      dayRange: "Day 90 - 115",
      icon: "🚜",
      status: "pending",
      descriptionEn: "Inside shell of pods turns dark brownish-black and foliage turns yellow. Pull vines with tractor lifter or manual labor.",
      descriptionTe: "కాయ లోపలి భాగం ముదురు నలుపుకు మారుతుంది. మొక్కలను పెకలించి ఎండలో ఆరబెట్టాలి.",
      criticalTask: "Sun dry pods to 8% moisture for safe godown storage",
      criticalTaskTe: "8% తేమ వచ్చేవరకు కాయలను ఎండబెట్టి నిల్వ చేయాలి"
    }
  ],
  paddy: [
    {
      stageNumber: 1,
      stageNameEn: "Nursery & Transplanting",
      stageNameTe: "నారుమడి & నాట్లు వేయడం",
      dayRange: "Day 0 - 25",
      icon: "🌱",
      status: "completed",
      descriptionEn: "Puddle field well. Transplant 25-day-old vigorous seedlings at 2-3 seedlings per hill.",
      descriptionTe: "పొలాన్ని బాగా దమ్ము చేసి 25 రోజుల ఆరోగ్యకరమైన నారును కుదురుకు 2-3 మొక్కలు చొప్పున నాటాలి.",
      criticalTask: "Maintain 2cm water level and apply weedicide within 3 days",
      criticalTaskTe: "2 సెం.మీ నీరు ఉంచి నాటిన 3 రోజుల్లో కలుపు మందు చల్లాలి"
    },
    {
      stageNumber: 2,
      stageNameEn: "Active Tillering Stage",
      stageNameTe: "పిలకలు పెట్టే దశ",
      dayRange: "Day 26 - 50",
      icon: "🌾",
      status: "active",
      descriptionEn: "Rice plants produce multiple productive tillers. First top dressing of Urea + Potash.",
      descriptionTe: "మొక్కలు ఎక్కువగా పిలకలు వేస్తాయి. మొదటి విడత యూరియా, పొటాష్ ఎరువులు అందించాలి.",
      criticalTask: "Alternate wetting and drying (AWD) to strengthen root anchorage",
      criticalTaskTe: "వేర్లు దృఢపడేందుకు ఆరుతడి పద్ధతిని పాటించాలి"
    },
    {
      stageNumber: 3,
      stageNameEn: "Panicle Initiation & Flowering",
      stageNameTe: "వెన్ను పుట్టే దశ & పూత దశ",
      dayRange: "Day 51 - 85",
      icon: "🌾",
      status: "pending",
      descriptionEn: "Panicle forms inside stem boot and emerges. High water sensitivity. Monitor for stem borer and blast.",
      descriptionTe: "చిరుపొట్ట దశ మరియు వెన్నులు బయటకు వస్తాయి. ఈ సమయంలో నీటి ఎద్దడి రాకుండా చూడాలి.",
      criticalTask: "Apply second split of Nitrogen and monitor for blast/BPH",
      criticalTaskTe: "రెండో విడత ఎరువులు వేసి సుడిదోమ, అగ్గితెగులు గమనించాలి"
    },
    {
      stageNumber: 4,
      stageNameEn: "Grain Milking & Dough Stage",
      stageNameTe: "పాలుపోసుకునే & గింజ గట్టిపడే దశ",
      dayRange: "Day 86 - 110",
      icon: "🌾",
      status: "pending",
      descriptionEn: "Grains fill with starch turning from milky liquid to firm dough. Drain water 10 days before harvest.",
      descriptionTe: "గింజలు పాలుపోసుకొని క్రమంగా గట్టిపడతాయి. కోతకు 10 రోజుల ముందు పొలంలోని నీటిని తీసివేయాలి.",
      criticalTask: "Stop pesticide sprays and begin draining water",
      criticalTaskTe: "మందుల పిచికారీ ఆపివేసి పొలాన్ని ఆరబెట్టాలి"
    },
    {
      stageNumber: 5,
      stageNameEn: "Harvesting & Threshing",
      stageNameTe: "పంట కోత & నూర్పిడి",
      dayRange: "Day 115 - 135",
      icon: "🚜",
      status: "pending",
      descriptionEn: "Harvest when 85% panicles are golden straw colored. Combine harvester or manual reapers.",
      descriptionTe: "85% వెన్నులు బంగారు రంగుకు మారినప్పుడు కోసి నూర్పిడి చేయాలి.",
      criticalTask: "Dry paddy grain to 14% moisture before selling at MSP",
      criticalTaskTe: "మద్దతు ధరకు అమ్మేందుకు ధాన్యాన్ని 14% తేమకు ఆరబెట్టాలి"
    }
  ]
};
