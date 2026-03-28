// ============================================================================
// Pakistan Provinces Data Dashboard - Comprehensive Dataset
// Sources: Pakistan Bureau of Statistics (PBS) Census 2023, World Bank,
//          UNDP Human Development Reports, Planning Commission of Pakistan,
//          Provincial Education & Health Departments
// ============================================================================

const PAKISTAN_OVERVIEW = {
  name: "Islamic Republic of Pakistan",
  totalPopulation: 241490000, // PBS Census 2023 (preliminary)
  totalArea: 881913, // sq km
  gdpNominal: 374.7, // USD Billion (2023-24 est.)
  gdpPPP: 1512, // USD Billion (PPP, 2023 est.)
  gdpPerCapita: 1551, // USD Nominal
  overallLiteracy: 62.8, // % (PBS PSLM 2021-22)
  officialLanguages: ["Urdu", "English"],
  currency: "Pakistani Rupee (PKR)",
  capitalCity: "Islamabad",
  governmentType: "Federal Parliamentary Republic",
  totalDistricts: 170,
  economicSectors: {
    agriculture: 22.7,
    industry: 19.1,
    services: 58.2
  },
  exports: {
    textiles: 61,
    foodProducts: 14,
    chemicals: 6,
    leather: 4,
    other: 15
  },
  yearlyGDPGrowth: [
    { year: "2018-19", rate: 1.9 },
    { year: "2019-20", rate: -0.9 },
    { year: "2020-21", rate: 5.8 },
    { year: "2021-22", rate: 6.2 },
    { year: "2022-23", rate: -0.2 },
    { year: "2023-24", rate: 2.4 }
  ]
};

const PROVINCES = [
  {
    id: "punjab",
    name: "Punjab",
    capital: "Lahore",
    population: 127688922, // PBS Census 2023
    area: 205344, // sq km
    density: 622, // per sq km
    districts: 37,
    literacy: 66.3, // % (PSLM 2021-22)
    maleLiteracy: 74.2,
    femaleLiteracy: 58.0,
    gdpShare: 54.2, // % of national GDP
    gdpUSD: 202.5, // est. USD Billion
    hdi: 0.557, // UNDP subnational
    urbanization: 36.7, // %
    color: "#2E7D32",
    accentColor: "#4CAF50",
    majorCities: ["Lahore", "Faisalabad", "Rawalpindi", "Multan", "Gujranwala"],
    keyIndustries: ["Textiles", "Agriculture", "Manufacturing", "IT Services", "Automotive"],
    naturalResources: ["Fertile agricultural land", "Coal (Thar proximity)", "Salt (Khewra mines)", "Gypsum"],
    crops: ["Wheat", "Rice", "Cotton", "Sugarcane", "Maize"],
    universities: 65,
    hospitals: 3540,
    schools: 68837,
    schoolEnrollment: 72, // % (net primary)
    doctorRatio: "1:1,300",
    infantMortality: 63, // per 1000
    historicalSites: ["Lahore Fort", "Badshahi Mosque", "Harappa", "Taxila"],
    description: "Pakistan's most populous and economically dominant province, Punjab is the agricultural heartland and industrial backbone of the country. It contributes over half of national GDP and is home to major textile and manufacturing industries.",
    populationGrowth: 2.1,
    povertyRate: 24.3,
    electricityAccess: 96,
    internetPenetration: 38
  },
  {
    id: "sindh",
    name: "Sindh",
    capital: "Karachi",
    population: 55696149, // PBS Census 2023
    area: 140914, // sq km
    density: 395,
    districts: 30,
    literacy: 57.2,
    maleLiteracy: 68.1,
    femaleLiteracy: 45.2,
    gdpShare: 28.1,
    gdpUSD: 105.2,
    hdi: 0.513,
    urbanization: 52.0,
    color: "#1565C0",
    accentColor: "#42A5F5",
    majorCities: ["Karachi", "Hyderabad", "Sukkur", "Larkana", "Nawabshah"],
    keyIndustries: ["Finance & Banking", "Port & Trade", "Textiles", "Fishing", "Cement"],
    naturalResources: ["Natural gas (Sui)", "Oil reserves", "Coal (Thar)", "Fisheries", "Limestone"],
    crops: ["Rice", "Wheat", "Cotton", "Sugarcane", "Dates"],
    universities: 42,
    hospitals: 1820,
    schools: 49517,
    schoolEnrollment: 58,
    doctorRatio: "1:1,600",
    infantMortality: 74,
    historicalSites: ["Mohenjo-daro", "Makli Necropolis", "Ranikot Fort", "Shah Jahan Mosque"],
    description: "Home to Pakistan's financial capital Karachi and the ancient Indus Valley civilization, Sindh is the country's economic gateway. Karachi alone generates about 25% of Pakistan's GDP and handles 95% of foreign trade through its ports.",
    populationGrowth: 2.4,
    povertyRate: 33.4,
    electricityAccess: 89,
    internetPenetration: 42
  },
  {
    id: "kp",
    name: "Khyber Pakhtunkhwa",
    shortName: "KP",
    capital: "Peshawar",
    population: 40856097, // PBS Census 2023
    area: 101741, // sq km (including merged tribal areas)
    density: 402,
    districts: 35,
    literacy: 55.1,
    maleLiteracy: 72.3,
    femaleLiteracy: 37.5,
    gdpShare: 10.5,
    gdpUSD: 39.3,
    hdi: 0.489,
    urbanization: 18.8,
    color: "#D32F2F",
    accentColor: "#EF5350",
    majorCities: ["Peshawar", "Mardan", "Abbottabad", "Swat", "Mansehra"],
    keyIndustries: ["Tourism", "Hydropower", "Marble & Granite", "Tobacco", "Agriculture"],
    naturalResources: ["Hydropower potential", "Marble", "Gemstones", "Forests", "Minerals"],
    crops: ["Wheat", "Maize", "Tobacco", "Sugarcane", "Fruits"],
    universities: 35,
    hospitals: 1350,
    schools: 38250,
    schoolEnrollment: 62,
    doctorRatio: "1:1,800",
    infantMortality: 70,
    historicalSites: ["Peshawar Old City", "Takht-i-Bahi", "Swat Buddhist ruins", "Bala Hisar Fort"],
    description: "Rich in natural beauty and historical heritage, KP spans from the fertile Peshawar valley to the towering peaks of the Hindu Kush. The province has immense hydropower potential and is a gateway to Central Asia.",
    populationGrowth: 2.9,
    povertyRate: 37.2,
    electricityAccess: 91,
    internetPenetration: 28
  },
  {
    id: "balochistan",
    name: "Balochistan",
    capital: "Quetta",
    population: 14894456, // PBS Census 2023
    area: 347190, // sq km
    density: 43,
    districts: 35,
    literacy: 40.5,
    maleLiteracy: 55.3,
    femaleLiteracy: 24.1,
    gdpShare: 3.7,
    gdpUSD: 13.9,
    hdi: 0.411,
    urbanization: 27.6,
    color: "#F57F17",
    accentColor: "#FFB300",
    majorCities: ["Quetta", "Gwadar", "Turbat", "Khuzdar", "Hub"],
    keyIndustries: ["Mining", "Fishing", "Natural Gas", "CPEC/Gwadar Port", "Livestock"],
    naturalResources: ["Copper & Gold (Reko Diq)", "Natural Gas", "Coal", "Chromite", "Onyx marble"],
    crops: ["Fruits (Apple, Grapes, Dates)", "Wheat", "Rice", "Pulses"],
    universities: 12,
    hospitals: 620,
    schools: 15240,
    schoolEnrollment: 42,
    doctorRatio: "1:3,400",
    infantMortality: 97,
    historicalSites: ["Quaid-e-Azam Residency", "Hingol National Park", "Bolan Pass", "Mehrgarh"],
    description: "Pakistan's largest province by area, Balochistan is rich in untapped mineral wealth including the massive Reko Diq copper-gold deposits. The strategic Gwadar Port, a flagship CPEC project, promises to transform the province's economy.",
    populationGrowth: 3.4,
    povertyRate: 52.1,
    electricityAccess: 67,
    internetPenetration: 16
  },
  {
    id: "islamabad",
    name: "Islamabad Capital Territory",
    shortName: "ICT",
    capital: "Islamabad",
    population: 2363680, // PBS Census 2023
    area: 906, // sq km
    density: 2609,
    districts: 2,
    literacy: 88.3,
    maleLiteracy: 92.1,
    femaleLiteracy: 84.0,
    gdpShare: 1.8,
    gdpUSD: 6.7,
    hdi: 0.665,
    urbanization: 100,
    color: "#6A1B9A",
    accentColor: "#AB47BC",
    majorCities: ["Islamabad"],
    keyIndustries: ["Government & Administration", "IT & Telecom", "Education", "Diplomacy", "Services"],
    naturalResources: ["Margalla Hills biodiversity", "Limestone"],
    crops: [],
    universities: 22,
    hospitals: 280,
    schools: 1520,
    schoolEnrollment: 92,
    doctorRatio: "1:600",
    infantMortality: 38,
    historicalSites: ["Faisal Mosque", "Pakistan Monument", "Margalla Hills", "Lok Virsa Museum"],
    description: "The purpose-built federal capital, Islamabad is Pakistan's most developed and planned city. It boasts the highest literacy rate, best healthcare infrastructure, and is home to major government institutions, embassies, and top universities.",
    populationGrowth: 4.9,
    povertyRate: 8.2,
    electricityAccess: 100,
    internetPenetration: 68
  },
  {
    id: "gb",
    name: "Gilgit-Baltistan",
    shortName: "GB",
    capital: "Gilgit",
    population: 1492924, // PBS Census 2023 est.
    area: 72971, // sq km
    density: 20,
    districts: 10,
    literacy: 62.5,
    maleLiteracy: 74.8,
    femaleLiteracy: 50.0,
    gdpShare: 0.5,
    gdpUSD: 1.9,
    hdi: 0.502,
    urbanization: 12.4,
    color: "#00695C",
    accentColor: "#26A69A",
    majorCities: ["Gilgit", "Skardu", "Chilas", "Hunza", "Ghizer"],
    keyIndustries: ["Tourism", "Hydropower", "Gemstones", "Agriculture", "Handicrafts"],
    naturalResources: ["Gemstones (Ruby, Emerald)", "Gold", "Hydropower", "Glacial water", "Minerals"],
    crops: ["Apricots", "Cherries", "Apples", "Wheat", "Potatoes"],
    universities: 4,
    hospitals: 180,
    schools: 3820,
    schoolEnrollment: 68,
    doctorRatio: "1:4,200",
    infantMortality: 55,
    historicalSites: ["K2 Base Camp", "Hunza Valley", "Deosai National Park", "Baltit Fort"],
    description: "Home to five of the world's fourteen 8,000m+ peaks including K2, Gilgit-Baltistan is a mountaineer's paradise. The Karakoram Highway connects Pakistan to China, and the region's stunning valleys attract growing international tourism.",
    populationGrowth: 2.6,
    povertyRate: 28.5,
    electricityAccess: 78,
    internetPenetration: 22
  },
  {
    id: "ajk",
    name: "Azad Jammu & Kashmir",
    shortName: "AJK",
    capital: "Muzaffarabad",
    population: 4045366, // PBS Census 2023 est.
    area: 13297, // sq km
    density: 304,
    districts: 10,
    literacy: 74.1,
    maleLiteracy: 83.5,
    femaleLiteracy: 65.2,
    gdpShare: 1.2,
    gdpUSD: 4.5,
    hdi: 0.538,
    urbanization: 13.0,
    color: "#E65100",
    accentColor: "#FF7043",
    majorCities: ["Muzaffarabad", "Mirpur", "Rawalakot", "Kotli", "Bhimber"],
    keyIndustries: ["Hydropower", "Tourism", "Forestry", "Agriculture", "Remittances"],
    naturalResources: ["Hydropower", "Forests", "Minerals", "Freshwater resources"],
    crops: ["Maize", "Wheat", "Rice", "Fruits", "Vegetables"],
    universities: 7,
    hospitals: 340,
    schools: 8920,
    schoolEnrollment: 73,
    doctorRatio: "1:2,500",
    infantMortality: 58,
    historicalSites: ["Red Fort (Muzaffarabad)", "Neelum Valley", "Banjosa Lake", "Pir Chinasi"],
    description: "Azad Jammu & Kashmir is renowned for its lush green valleys, rivers, and natural beauty. With significant diaspora communities in the UK, it receives substantial remittances that drive local economic growth.",
    populationGrowth: 1.6,
    povertyRate: 19.8,
    electricityAccess: 94,
    internetPenetration: 32
  }
];

const COMPARISON_METRICS = [
  { key: "population", label: "Population", format: "number" },
  { key: "area", label: "Area (sq km)", format: "number" },
  { key: "density", label: "Pop. Density (/km²)", format: "number" },
  { key: "literacy", label: "Literacy Rate (%)", format: "percent" },
  { key: "gdpShare", label: "GDP Share (%)", format: "percent" },
  { key: "hdi", label: "HDI Score", format: "decimal" },
  { key: "urbanization", label: "Urbanization (%)", format: "percent" },
  { key: "infantMortality", label: "Infant Mortality (‰)", format: "number" },
  { key: "universities", label: "Universities", format: "number" },
  { key: "hospitals", label: "Hospitals", format: "number" },
  { key: "povertyRate", label: "Poverty Rate (%)", format: "percent" },
  { key: "internetPenetration", label: "Internet Access (%)", format: "percent" }
];

const DATA_SOURCES = [
  {
    name: "Pakistan Bureau of Statistics (PBS)",
    description: "7th Population & Housing Census 2023 (Preliminary Results)",
    url: "https://www.pbs.gov.pk",
    dataUsed: "Population, area, demographics, literacy"
  },
  {
    name: "State Bank of Pakistan (SBP)",
    description: "Annual Report 2023-24 & Economic Statistics",
    url: "https://www.sbp.org.pk",
    dataUsed: "GDP, economic indicators, financial data"
  },
  {
    name: "UNDP Pakistan",
    description: "Human Development Index Reports & Multidimensional Poverty Index",
    url: "https://www.undp.org/pakistan",
    dataUsed: "HDI scores, poverty rates, development indicators"
  },
  {
    name: "Pakistan Economic Survey 2023-24",
    description: "Ministry of Finance, Government of Pakistan",
    url: "https://www.finance.gov.pk",
    dataUsed: "GDP sectoral breakdown, growth rates, economic indicators"
  },
  {
    name: "Pakistan Social & Living Standards Measurement (PSLM)",
    description: "PBS Survey 2021-22",
    url: "https://www.pbs.gov.pk",
    dataUsed: "Literacy rates, school enrollment, health indicators"
  },
  {
    name: "World Bank - Pakistan",
    description: "Development Indicators & Country Profile",
    url: "https://data.worldbank.org/country/pakistan",
    dataUsed: "GDP (PPP), comparative economic data"
  },
  {
    name: "Provincial Health & Education Departments",
    description: "Annual Development Reviews & Sector Reports",
    url: "",
    dataUsed: "Hospitals, schools, universities, doctor ratios"
  }
];
