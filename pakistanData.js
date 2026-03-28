/**
 * Pakistan Provinces & Territories — Comprehensive Data
 * =====================================================
 *
 * Sources:
 *   - Pakistan Bureau of Statistics (PBS), 7th Population & Housing Census 2023
 *     https://www.pbs.gov.pk/content/announcement-results-7th-population-and-housing-census-2023-digital-census
 *   - Pakistan Economic Survey 2024-25, Ministry of Finance
 *     https://www.finance.gov.pk/survey_2025.html
 *   - UNDP Human Development Report 2025 (HDI based on 2023 data)
 *     https://hdr.undp.org/data-center/country-insights
 *   - Higher Education Commission (HEC) Pakistan
 *     https://www.hec.gov.pk/english/universities/pages/recognised.aspx
 *   - uniRank 2025 — https://www.unirank.org/pk/a-z/
 *   - World Bank Open Data — https://data.worldbank.org/
 *   - Wikipedia (various administrative & economic pages, cross-referenced)
 *   - GOV.UK Country Policy: Healthcare, Pakistan (July 2024)
 *   - UNICEF MICS reports for GB & AJK
 *   - Gallup Pakistan, ProPakistani, Dawn, The Nation (literacy reporting)
 *
 * Data vintage: most figures reflect 2023-2025 where available.
 * Provincial GDP figures are economist estimates — Pakistan does not officially
 * publish granular province-level GDP in its Economic Survey.
 *
 * Last updated: 2026-03-28
 */

const PAKISTAN_DATA = {
  // =========================================================================
  // NATIONAL AGGREGATE
  // =========================================================================
  national: {
    name: "Pakistan",
    totalPopulation: 241499431, // PBS Census 2023 (excl. GB & AJK)
    totalPopulationIncludingAll: 249000000, // approx. including GB & AJK
    populationGrowthRate: 2.55, // % per annum (Census 2023)
    urbanPopulationPct: 38.82,
    ruralPopulationPct: 61.18,
    totalArea_sqKm: 881913,
    capital: "Islamabad",

    gdp: {
      nominal_USD_billion: 373.07, // 2024, World Bank
      nominal_USD_billion_2025_IMF: 410.5, // IMF 2025 estimate
      ppp_USD_billion: 1996, // 2024, World Economics
      perCapita_nominal_USD: 1546, // approx. 2024
      globalRank_nominal: 41,
      globalRank_PPP: 26,
    },

    economicSectors: {
      agriculture: { pctOfGDP: 23.5, pctOfLabour: 37.4, note: "Includes crops, livestock, forestry, fishing" },
      industry: { pctOfGDP: 21.0, subSectors: { manufacturing: 19, miningAndConstruction: 5 } },
      services: { pctOfGDP: 53.0, subSectors: { publicAdmin: 18, wholesaleRetail: 17, transport: 10 } },
      source: "Pakistan Economic Survey 2024-25; World Bank 2024",
    },

    literacy: {
      overall: 62.3, // % (Economic Survey 2024-25 / PBS)
      male: 73.4,
      female: 51.9,
      source: "Pakistan Economic Survey 2024-25",
    },

    hdi: {
      value: 0.544, // UNDP HDR 2025 (data year 2023)
      globalRank: 168,
      category: "Low",
      ihdi: 0.364, // inequality-adjusted
      gii: 0.536, // Gender Inequality Index
      source: "UNDP Human Development Report 2025",
    },

    healthcare: {
      totalHospitals: 1900, // ~1200 public + ~700 private (2024 est.)
      doctorsPer1000: 1.16,
      doctorToPatientRatio: "1:1300",
      nursesPer1000: 0.51,
      hospitalBedsPer1000: 0.64,
      healthExpenditurePctGDP: 2.95,
      healthExpenditurePerCapita_USD: 38.18,
      lifeExpectancy: 67.94,
      haqIndex: 124, // out of 195 countries
      source: "World Bank; GOV.UK Pakistan Healthcare 2024; WHO",
    },

    education: {
      totalUniversities: 262, // HEC 2024
      childrenOutOfSchool_million: 22.8,
      grossEnrollmentPrimary_pct: 62, // approx (38% not enrolled)
      source: "HEC; Pakistan Economic Survey 2024-25",
    },
  },

  // =========================================================================
  // PROVINCES & TERRITORIES
  // =========================================================================
  regions: [
    // -----------------------------------------------------------------------
    // PUNJAB
    // -----------------------------------------------------------------------
    {
      id: "punjab",
      name: "Punjab",
      capital: "Lahore",
      population: 127600000, // Census 2023
      area_sqKm: 205344,
      populationDensity_perSqKm: 621,
      districts: 41,
      divisions: 10,

      gdp: {
        sharePct: 54.0, // estimated range 54-60%
        nominal_USD_billion: 201, // est. based on share of national GDP
        note: "Largest provincial economy; estimates vary 54-60%",
      },

      literacy: {
        overall: 66.0,
        male: null,
        female: null,
        source: "Pakistan Economic Survey 2024-25",
      },

      hdi: {
        value: 0.567,
        category: "Medium",
        source: "UNDP subnational estimates / Wikipedia",
      },

      majorCities: ["Lahore", "Faisalabad", "Rawalpindi", "Multan", "Gujranwala"],

      keyIndustries: [
        "Textiles & garments",
        "Agriculture (wheat, rice, cotton, sugarcane)",
        "Manufacturing (steel, cement, chemicals)",
        "IT & software services",
        "Livestock & dairy",
      ],

      healthcare: {
        hospitals: 600, // approx public hospitals
        doctorToPatientRatio: "1:1200",
        note: "Best-served province; includes major teaching hospitals in Lahore, Rawalpindi, Faisalabad",
      },

      education: {
        universities: 92, // uniRank 2025
        schoolEnrollment_pct: 68,
        note: "Highest number of HEC-recognised universities in any province",
      },
    },

    // -----------------------------------------------------------------------
    // SINDH
    // -----------------------------------------------------------------------
    {
      id: "sindh",
      name: "Sindh",
      capital: "Karachi",
      population: 55600000, // Census 2023
      area_sqKm: 140914,
      populationDensity_perSqKm: 395,
      districts: 30,
      divisions: 6,

      gdp: {
        sharePct: 23.7,
        nominal_USD_billion: 88, // est.
        note: "Economy heavily influenced by Karachi (financial capital)",
      },

      literacy: {
        overall: 57.0,
        male: null,
        female: null,
        source: "Pakistan Economic Survey 2024-25",
      },

      hdi: {
        value: 0.535,
        category: "Low",
        source: "UNDP subnational estimates / Wikipedia",
      },

      majorCities: ["Karachi", "Hyderabad", "Sukkur", "Larkana", "Nawabshah"],

      keyIndustries: [
        "Finance & banking (Karachi)",
        "Port & shipping (Port Qasim, Karachi Port)",
        "Petrochemicals & oil refining",
        "Agriculture (rice, wheat, cotton, sugarcane)",
        "Fisheries",
        "Textiles",
      ],

      healthcare: {
        hospitals: 400, // approx
        doctorToPatientRatio: "1:1400",
        note: "Karachi has major private & public hospitals; rural Sindh underserved",
      },

      education: {
        universities: 74, // uniRank 2025
        schoolEnrollment_pct: 55,
        note: "Significant urban-rural gap in enrollment",
      },
    },

    // -----------------------------------------------------------------------
    // KHYBER PAKHTUNKHWA (KP)
    // -----------------------------------------------------------------------
    {
      id: "kp",
      name: "Khyber Pakhtunkhwa",
      abbreviation: "KP",
      capital: "Peshawar",
      population: 40800000, // Census 2023
      area_sqKm: 101741,
      populationDensity_perSqKm: 401,
      districts: 38, // includes merged tribal districts (ex-FATA)
      divisions: 7,

      gdp: {
        sharePct: 10.5,
        nominal_USD_billion: 39, // est.
        note: "Includes merged tribal areas since 2018 (ex-FATA)",
      },

      literacy: {
        overall: 51.0,
        male: null,
        female: null,
        source: "Pakistan Economic Survey 2024-25",
      },

      hdi: {
        value: 0.51,
        category: "Low",
        source: "UNDP subnational estimates / Wikipedia",
      },

      majorCities: ["Peshawar", "Mardan", "Abbottabad", "Mingora", "Kohat"],

      keyIndustries: [
        "Hydropower & energy",
        "Agriculture (tobacco, maize, wheat, fruits)",
        "Forestry & timber",
        "Marble & gemstones mining",
        "Tourism (Swat, Chitral, Naran-Kaghan)",
        "Remittances (large overseas diaspora)",
      ],

      healthcare: {
        hospitals: 250, // approx
        doctorToPatientRatio: "1:1500",
        note: "Pioneer of Sehat Sahulat (universal health insurance) since 2019",
      },

      education: {
        universities: 40, // uniRank 2025
        schoolEnrollment_pct: 52,
        note: "85% rural population; gender gap in enrollment is significant",
      },
    },

    // -----------------------------------------------------------------------
    // BALOCHISTAN
    // -----------------------------------------------------------------------
    {
      id: "balochistan",
      name: "Balochistan",
      capital: "Quetta",
      population: 14800000, // Census 2023
      area_sqKm: 347190,
      populationDensity_perSqKm: 43,
      districts: 36,
      divisions: 8,

      gdp: {
        sharePct: 3.7,
        nominal_USD_billion: 14, // est.
        note: "Richest province in natural resources, poorest in economic output",
      },

      literacy: {
        overall: 42.0,
        male: 69.5,
        female: 36.8,
        source: "Pakistan Economic Survey 2024-25",
      },

      hdi: {
        value: 0.42,
        category: "Low",
        source: "UNDP subnational estimates / Wikipedia",
      },

      majorCities: ["Quetta", "Gwadar", "Turbat", "Khuzdar", "Hub"],

      keyIndustries: [
        "Mining (coal, copper-gold at Reko Diq, chromite, marble)",
        "Natural gas (Sui gas field)",
        "Fishing & seafood (Gwadar, Makran coast)",
        "Livestock & animal husbandry",
        "CPEC / Gwadar Port development",
        "Agriculture (fruits — apples, grapes, dates)",
      ],

      healthcare: {
        hospitals: 100, // approx
        doctorToPatientRatio: "1:2000+",
        note: "Highest maternal mortality rate in Pakistan; most underserved province",
      },

      education: {
        universities: 11, // uniRank 2025
        schoolEnrollment_pct: 40,
        note: "Lowest enrollment and literacy; major gender disparity",
      },
    },

    // -----------------------------------------------------------------------
    // ISLAMABAD CAPITAL TERRITORY (ICT)
    // -----------------------------------------------------------------------
    {
      id: "ict",
      name: "Islamabad Capital Territory",
      abbreviation: "ICT",
      capital: "Islamabad",
      population: 2360000, // Census 2023 (up from 2.01M in 2017)
      area_sqKm: 906,
      populationDensity_perSqKm: 2604,
      districts: 1,
      divisions: null,

      gdp: {
        sharePct: 1.5,
        nominal_USD_billion: 6, // est.
        note: "High per-capita income; federal government & services hub",
      },

      literacy: {
        overall: 88.0,
        male: null,
        female: null,
        source: "PBS Census 2023",
      },

      hdi: {
        value: 0.7,
        category: "High",
        source: "UNDP subnational estimates / Wikipedia",
      },

      majorCities: ["Islamabad"],

      keyIndustries: [
        "Federal government & public administration",
        "IT & telecom",
        "Diplomacy & international organisations",
        "Education & research",
        "Real estate & construction",
        "Services sector",
      ],

      healthcare: {
        hospitals: 30, // includes PIMS, Shifa, Federal Govt hospitals
        doctorToPatientRatio: "1:500",
        note: "Best healthcare access in the country; multiple tertiary-care hospitals",
      },

      education: {
        universities: 23, // uniRank 2025 (includes federal universities + COMSATS, NUST, QAU, IIUI, etc.)
        schoolEnrollment_pct: 90,
        note: "Highest literacy & enrollment; hosts major federal universities",
      },
    },

    // -----------------------------------------------------------------------
    // GILGIT-BALTISTAN (GB)
    // -----------------------------------------------------------------------
    {
      id: "gb",
      name: "Gilgit-Baltistan",
      abbreviation: "GB",
      capital: "Gilgit",
      population: 1492924, // Census 2017 (2023 census not yet approved for GB)
      populationEstimate2024: 1800000,
      area_sqKm: 72971,
      populationDensity_perSqKm: 20,
      districts: 14,
      divisions: 3,

      gdp: {
        nominal_USD_billion: 2.28, // GSP est. 2021
        note: "Tourism contributes over 17% of regional GDP; IT freelancing growing",
      },

      literacy: {
        overall: 72.0,
        male: null,
        female: null,
        source: "GB Planning & Development Dept; UNICEF MICS 2016-17",
        note: "Hunza highest (~72%), Diamer lowest (~37%)",
      },

      hdi: {
        value: null,
        category: "Data limited",
        note: "Not included in standard UNDP national HDI breakdown; estimated ~0.50",
      },

      majorCities: ["Gilgit", "Skardu", "Chilas", "Hunza (Karimabad)", "Ghanche"],

      keyIndustries: [
        "Tourism & mountaineering (K2, Karakoram, Deosai)",
        "Agriculture (apricots, cherries, potatoes, wheat)",
        "Gemstones & mineral mining (rubies, emeralds, aquamarine)",
        "Hydropower potential",
        "Handicrafts & traditional crafts",
        "IT freelancing (growing sector)",
      ],

      healthcare: {
        hospitals: 15, // approx public hospitals
        doctorToPatientRatio: "1:3000+",
        note: "Limited healthcare infrastructure; Aga Khan Health Services supplements govt facilities",
      },

      education: {
        universities: 2, // Karakoram International University, University of Baltistan
        colleges: 29, // 13 intermediate + 14 degree + 2 cadet
        schools: 3229, // 2028 primary + 615 middle + 451 high + 135 higher secondary
        schoolEnrollment_pct: 55,
        note: "Aga Khan Education Service plays significant role in GB education",
      },
    },

    // -----------------------------------------------------------------------
    // AZAD JAMMU & KASHMIR (AJK)
    // -----------------------------------------------------------------------
    {
      id: "ajk",
      name: "Azad Jammu & Kashmir",
      abbreviation: "AJK",
      capital: "Muzaffarabad",
      population: 4045000, // Census 2017 preliminary
      populationEstimate2024: 4460000,
      area_sqKm: 13297,
      populationDensity_perSqKm: 335,
      districts: 10,
      divisions: 3,

      gdp: {
        nominal_USD_billion: null,
        note: "Data not widely published; economy dependent on agriculture, remittances & federal transfers",
      },

      literacy: {
        overall: 74.0,
        male: null,
        female: null,
        source: "AJK Government official website",
        note: "Primary enrollment 98% boys, 90% girls",
      },

      hdi: {
        value: null,
        category: "Data limited",
        note: "Not included in standard UNDP national HDI breakdown; estimated ~0.52-0.55",
      },

      majorCities: ["Muzaffarabad", "Mirpur", "Rawalakot", "Kotli", "Bagh"],

      keyIndustries: [
        "Remittances (large UK-based diaspora, especially from Mirpur)",
        "Agriculture (maize, wheat, rice, fruits)",
        "Hydropower (Mangla Dam, Neelum-Jhelum)",
        "Forestry & timber",
        "Tourism (Neelum Valley, Rawalakot, Banjosa Lake)",
        "Handicrafts & carpet weaving",
      ],

      healthcare: {
        hospitals: 20, // approx
        doctorToPatientRatio: "1:2500+",
        note: "Limited specialist care; patients often referred to Rawalpindi/Islamabad",
      },

      education: {
        universities: 7, // uniRank 2025 (incl. University of AJK, MUST, etc.)
        schoolEnrollment_pct: 72,
        note: "Higher enrollment than several provinces; influenced by diaspora investment",
      },
    },
  ],

  // =========================================================================
  // METADATA
  // =========================================================================
  metadata: {
    lastUpdated: "2026-03-28",
    censusYear: 2023,
    economicSurveyYear: "2024-25",
    hdrYear: 2025,
    notes: [
      "Population figures for GB and AJK are from 2017 census; 2023 census for these regions not yet approved by CCI.",
      "Provincial GDP shares are economist estimates — Pakistan does not officially publish province-level GDP.",
      "HDI subnational values are approximate, sourced from UNDP subnational studies and secondary analysis.",
      "University counts use uniRank 2025 figures which may differ slightly from HEC official lists.",
      "Healthcare data is approximate; comprehensive province-level hospital/doctor statistics are not centrally published.",
      "Literacy rates from Pakistan Economic Survey 2024-25; district-level data from PBS Census 2023.",
    ],
    sources: [
      { name: "Pakistan Bureau of Statistics (PBS) — Census 2023", url: "https://www.pbs.gov.pk/content/population-census" },
      { name: "Pakistan Economic Survey 2024-25", url: "https://www.finance.gov.pk/survey_2025.html" },
      { name: "UNDP Human Development Report 2025", url: "https://hdr.undp.org/data-center/human-development-index" },
      { name: "Higher Education Commission (HEC)", url: "https://www.hec.gov.pk/english/universities/pages/recognised.aspx" },
      { name: "uniRank Pakistan Universities 2025", url: "https://www.unirank.org/pk/a-z/" },
      { name: "World Bank — Pakistan", url: "https://data.worldbank.org/?locations=PK" },
      { name: "IMF World Economic Outlook", url: "https://www.imf.org/external/datamapper/PPPGDP@WEO/PAK" },
      { name: "Wikipedia — Administrative units by GSP", url: "https://en.wikipedia.org/wiki/List_of_Pakistani_administrative_units_by_gross_state_product" },
      { name: "Wikipedia — Pakistan HDI by province", url: "https://en.wikipedia.org/wiki/List_of_administrative_units_of_Pakistan_by_Human_Development_Index" },
      { name: "GOV.UK — Healthcare Pakistan (July 2024)", url: "https://www.gov.uk/government/publications/pakistan-country-policy-and-information-notes/country-policy-and-information-note-healthcare-and-medical-treatment-pakistan-july-2024-accessible" },
      { name: "Gallup Pakistan — Literacy Rate Census 2023", url: "https://gallup.com.pk/post/37337" },
      { name: "ProPakistani — Province Literacy Breakdown", url: "https://propakistani.pk/2024/01/05/breakdown-of-literacy-rates-of-all-provinces/" },
      { name: "The Nation — Pakistan literacy 60%", url: "https://www.nation.com.pk/09-Jun-2025/pakistan-s-literacy-rate-hits-60-percent-economic-survey-2024-25" },
    ],
  },
};

// ES module export
export default PAKISTAN_DATA;

// Also support CommonJS
// module.exports = PAKISTAN_DATA;
