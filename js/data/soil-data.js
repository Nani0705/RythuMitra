/* ===================================================================
   🌾 RYTHUMITRA — Soil Health & Testing Data
   =================================================================== */

window.RYTHU_SOIL_DATA = {
  types: [
    {
      id: "red-soil",
      nameEn: "Red Sandy Loam Soil (ఎర్ర నేలలు)",
      nameTe: "ఎర్ర ఇసుక గరప నేలలు",
      phRange: "6.0 - 7.5 (Slightly Acidic to Neutral)",
      phTe: "6.0 - 7.5 (మితమైన ఆమ్లత్వం)",
      characteristicsEn: "Porous, rich in iron oxides, light texture, low water retention. Excellent for Groundnut, Maize, Pulses, Castor, Mango.",
      characteristicsTe: "ఇనుప ఖనిజం ఎక్కువగా ఉండి నీరు త్వరగా ఇంకిపోయే తేలికపాటి నేలలు. వేరుశనగ, మొక్కజొన్న, అపరాలు, పండ్ల తోటలకు అనుకూలం.",
      nutrientStatusEn: "Deficient in Nitrogen, Phosphorus, and Organic Carbon. Good in Potash.",
      nutrientStatusTe: "నత్రజని, భాస్వరం మరియు సేంద్రియ కర్బనం తక్కువగా ఉంటాయి. పొటాష్ సాధారణ స్థాయిలో ఉంటుంది.",
      managementTipsEn: "Apply 5-8 tons of well-rotted Farm Yard Manure (FYM) or vermicompost per acre. Incorporate green manure crops like Sunnhemp / Daincha."
    },
    {
      id: "black-soil",
      nameEn: "Black Cotton Soil / Regur (నల్లరేగడి నేలలు)",
      nameTe: "నల్లరేగడి నేలలు",
      phRange: "7.5 - 8.5 (Moderately Alkaline)",
      phTe: "7.5 - 8.5 (క్షార స్వభావం)",
      characteristicsEn: "Deep montmorillonite clay, high swelling and shrinking, rich water holding capacity. Ideal for Cotton, Chilli, Bengal Gram, Tobacco.",
      characteristicsTe: "అధిక బంకమట్టి శాతం కలిగి ఎక్కువ కాలం తేమను నిలుపుకుంటాయి. పత్తి, మిరప, శనగ, పొగాకు పంటలకు అత్యుత్తమం.",
      nutrientStatusEn: "High in Calcium, Magnesium, Potassium; Low to medium in Nitrogen and Phosphorus.",
      nutrientStatusTe: "కాల్షియం, మెగ్నీషియం పుష్కలంగా ఉంటాయి. నత్రజని, భాస్వరం తక్కువ.",
      managementTipsEn: "Deep summer ploughing to prevent soil cracking. Adopt broad bed and furrow (BBF) system for drainage during heavy rains."
    },
    {
      id: "alluvial-soil",
      nameEn: "Alluvial Soil (ఒండ్రు నేలలు)",
      nameTe: "ఒండ్రు / డెల్టా నేలలు",
      phRange: "6.5 - 7.8 (Neutral)",
      phTe: "6.5 - 7.8 (సమతుల్యం)",
      characteristicsEn: "Deposited by Krishna & Godavari rivers. Highly fertile, balanced silt and clay. Ideal for Paddy, Sugarcane, Banana, Vegetables.",
      characteristicsTe: "నదీ పరీవాహక ప్రాంతాల్లోని అత్యంత సారవంతమైన నేలలు. వరి, చెరకు, అరటి పంటలకు అనుకూలం.",
      nutrientStatusEn: "Rich in Potash and Phosphoric acid; moderately supplied with Nitrogen and organic matter.",
      nutrientStatusTe: "పొటాష్, భాస్వరం మంచి స్థాయిలో ఉంటాయి.",
      managementTipsEn: "Rotate with leguminous green manure crops to preserve natural microbial balance and prevent salinity."
    }
  ],
  testingSteps: [
    {
      step: 1,
      titleEn: "Sampling Strategy",
      titleTe: "నమూనా సేకరణ విధానం",
      descEn: "Walk in a zigzag pattern across the field. Collect samples from 10 to 15 different spots per acre.",
      descTe: "పొలంలో 'Z' ఆకారంలో నడుస్తూ ఎకరాకు 10-15 వేర్వేరు చోట్ల మట్టి నమూనా సేకరించాలి."
    },
    {
      step: 2,
      titleEn: "V-Shape Cut",
      titleTe: "V-ఆకారపు గొయ్యి తీయడం",
      descEn: "Remove surface litter. Dig a 'V' shape pit up to 15 cm (plough layer) for field crops or 30 cm for horticulture.",
      descTe: "పైపై చెత్తను తొలగించి, పారతో 15 సెం.మీ లోతు వరకు 'V' ఆకారంలో గుంత తీయాలి."
    },
    {
      step: 3,
      titleEn: "Quartering Method",
      titleTe: "నమూనా మిశ్రమం చేయడం",
      descEn: "Mix all collected soil on clean plastic sheet. Divide into 4 quarters, discard opposite quarters until 500 grams remain.",
      descTe: "సేకరించిన మట్టిని బాగా కలిపి నాలుగు భాగాలు చేసి, అరకిలో మట్టి మిగిలే వరకు తగ్గించాలి."
    },
    {
      step: 4,
      titleEn: "Submit at Local RBK",
      titleTe: "రైతు భరోసా కేంద్రంలో ఇవ్వడం",
      descEn: "Pack in clean cloth bag with farmer name, survey number, and date. Submit at village RBK for automated Soil Health Card test.",
      descTe: "రైతు పేరు, సర్వే నంబర్ రాసిన కాగితం ఉంచి ఆర్బీకే వ్యవసాయ అధికారికి అందజేయాలి."
    }
  ]
};
