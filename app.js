// ============================================================================
// Pakistan Provinces Data Dashboard - Application Logic
// ============================================================================

document.addEventListener('DOMContentLoaded', () => {
  initNavbar();
  renderHeroStats();
  renderIndicators();
  renderProvinceCards();
  renderComparisonTable();
  renderCharts();
  renderSources();
  initScrollAnimations();
  initModal();
});

// ---- Utility Functions ----
function formatNumber(n) {
  if (n >= 1e9) return (n / 1e9).toFixed(1) + 'B';
  if (n >= 1e6) return (n / 1e6).toFixed(1) + 'M';
  if (n >= 1e3) return (n / 1e3).toFixed(1) + 'K';
  return n.toLocaleString();
}

function formatFull(n) {
  return n.toLocaleString();
}

// ---- Navbar ----
function initNavbar() {
  const navbar = document.querySelector('.navbar');
  const toggle = document.querySelector('.nav-mobile-toggle');
  const links = document.querySelector('.nav-links');

  window.addEventListener('scroll', () => {
    navbar.classList.toggle('scrolled', window.scrollY > 50);
  });

  if (toggle) {
    toggle.addEventListener('click', () => {
      links.classList.toggle('mobile-open');
    });
  }

  // Smooth scroll for nav links
  document.querySelectorAll('.nav-links a').forEach(a => {
    a.addEventListener('click', (e) => {
      e.preventDefault();
      links.classList.remove('mobile-open');
      const target = document.querySelector(a.getAttribute('href'));
      if (target) target.scrollIntoView({ behavior: 'smooth', block: 'start' });
    });
  });
}

// ---- Hero Stats ----
function renderHeroStats() {
  const container = document.getElementById('hero-stats');
  const stats = [
    { value: formatNumber(PAKISTAN_OVERVIEW.totalPopulation), label: 'Population' },
    { value: `$${PAKISTAN_OVERVIEW.gdpNominal}B`, label: 'GDP (Nominal)' },
    { value: `${PAKISTAN_OVERVIEW.totalArea.toLocaleString()} km²`, label: 'Total Area' },
    { value: `${PAKISTAN_OVERVIEW.overallLiteracy}%`, label: 'Literacy Rate' }
  ];
  container.innerHTML = stats.map(s => `
    <div class="hero-stat">
      <div class="hero-stat-value">${s.value}</div>
      <div class="hero-stat-label">${s.label}</div>
    </div>
  `).join('');
}

// ---- Key Indicators ----
function renderIndicators() {
  const container = document.getElementById('indicators-grid');
  const indicators = [
    { icon: '👥', bg: 'rgba(59,130,246,0.15)', value: '7', label: 'Provinces & Territories', change: null },
    { icon: '🏙️', bg: 'rgba(168,85,247,0.15)', value: PAKISTAN_OVERVIEW.totalDistricts, label: 'Total Districts', change: null },
    { icon: '📈', bg: 'rgba(74,222,128,0.15)', value: `${PAKISTAN_OVERVIEW.yearlyGDPGrowth.at(-1).rate}%`, label: 'GDP Growth 2023-24', change: { text: '+2.6pp vs prior', positive: true } },
    { icon: '🎓', bg: 'rgba(251,191,36,0.15)', value: '187', label: 'Total Universities', change: null },
    { icon: '🏥', bg: 'rgba(248,113,113,0.15)', value: '8,130+', label: 'Hospitals & Clinics', change: null },
    { icon: '💰', bg: 'rgba(52,211,153,0.15)', value: `$${PAKISTAN_OVERVIEW.gdpPPP}B`, label: 'GDP (PPP)', change: null },
    { icon: '🌐', bg: 'rgba(96,165,250,0.15)', value: '62.8%', label: 'Overall Literacy', change: { text: '+2.1% from 2018', positive: true } },
    { icon: '🏭', bg: 'rgba(251,146,60,0.15)', value: '58.2%', label: 'Services Sector Share', change: null }
  ];

  container.innerHTML = indicators.map(ind => `
    <div class="indicator-card animate-in">
      <div class="indicator-icon" style="background:${ind.bg}">${ind.icon}</div>
      <div class="indicator-value">${ind.value}</div>
      <div class="indicator-label">${ind.label}</div>
      ${ind.change ? `<div class="indicator-change ${ind.change.positive ? 'positive' : 'negative'}">${ind.change.positive ? '↑' : '↓'} ${ind.change.text}</div>` : ''}
    </div>
  `).join('');
}

// ---- Province Cards ----
function renderProvinceCards() {
  const container = document.getElementById('provinces-grid');
  const sorted = [...PROVINCES].sort((a, b) => b.population - a.population);

  container.innerHTML = sorted.map((p, i) => `
    <div class="province-card animate-in" data-province="${p.id}" onclick="openModal('${p.id}')">
      <div class="province-card-header">
        <div class="province-card-title-group">
          <div class="province-indicator" style="background:${p.color}"></div>
          <div>
            <h3>${p.name}</h3>
            <div class="capital">Capital: ${p.capital}</div>
          </div>
        </div>
        <span class="province-rank">#${i + 1} by Population</span>
      </div>
      <div class="province-card-body">
        <p class="province-card-desc">${p.description}</p>
        <div class="province-stats-grid">
          <div class="province-mini-stat">
            <div class="value">${formatNumber(p.population)}</div>
            <div class="label">Population</div>
          </div>
          <div class="province-mini-stat">
            <div class="value">${p.literacy}%</div>
            <div class="label">Literacy</div>
          </div>
          <div class="province-mini-stat">
            <div class="value">${p.gdpShare}%</div>
            <div class="label">GDP Share</div>
          </div>
          <div class="province-mini-stat">
            <div class="value">${formatNumber(p.area)}</div>
            <div class="label">Area km²</div>
          </div>
          <div class="province-mini-stat">
            <div class="value">${p.hdi}</div>
            <div class="label">HDI</div>
          </div>
          <div class="province-mini-stat">
            <div class="value">${p.districts}</div>
            <div class="label">Districts</div>
          </div>
        </div>
      </div>
      <div class="province-card-footer">
        ${p.keyIndustries.slice(0, 4).map(ind => `<span class="province-tag">${ind}</span>`).join('')}
      </div>
    </div>
  `).join('');
}

// ---- Comparison Table ----
let currentSort = { key: 'population', dir: 'desc' };

function renderComparisonTable() {
  const tableHead = document.getElementById('table-head');
  const tableBody = document.getElementById('table-body');
  const searchInput = document.getElementById('table-search');

  const columns = [
    { key: 'name', label: 'Province' },
    ...COMPARISON_METRICS
  ];

  // Render headers
  tableHead.innerHTML = `<tr>${columns.map(col => {
    let cls = '';
    if (currentSort.key === col.key) cls = currentSort.dir === 'asc' ? 'sorted-asc' : 'sorted-desc';
    return `<th class="${cls}" data-sort="${col.key}">${col.label}</th>`;
  }).join('')}</tr>`;

  // Sort data
  let sorted = [...PROVINCES].sort((a, b) => {
    const aVal = a[currentSort.key];
    const bVal = b[currentSort.key];
    if (typeof aVal === 'string') return currentSort.dir === 'asc' ? aVal.localeCompare(bVal) : bVal.localeCompare(aVal);
    return currentSort.dir === 'asc' ? aVal - bVal : bVal - aVal;
  });

  // Filter
  const query = searchInput ? searchInput.value.toLowerCase() : '';
  if (query) {
    sorted = sorted.filter(p => p.name.toLowerCase().includes(query));
  }

  // Render rows
  tableBody.innerHTML = sorted.map(p => {
    const cells = columns.map(col => {
      if (col.key === 'name') {
        return `<td><div class="province-name-cell"><span class="table-dot" style="background:${p.color}"></span>${p.name}</div></td>`;
      }
      const val = p[col.key];
      if (col.format === 'number') return `<td>${formatFull(val)}</td>`;
      if (col.format === 'percent') return `<td>${val}%</td>`;
      if (col.format === 'decimal') return `<td>${val}</td>`;
      return `<td>${val}</td>`;
    });
    return `<tr>${cells.join('')}</tr>`;
  }).join('');

  // Sort listeners
  tableHead.querySelectorAll('th').forEach(th => {
    th.addEventListener('click', () => {
      const key = th.dataset.sort;
      if (currentSort.key === key) {
        currentSort.dir = currentSort.dir === 'asc' ? 'desc' : 'asc';
      } else {
        currentSort = { key, dir: 'desc' };
      }
      renderComparisonTable();
    });
  });

  // Search listener
  if (searchInput && !searchInput._bound) {
    searchInput.addEventListener('input', () => renderComparisonTable());
    searchInput._bound = true;
  }
}

// ---- Charts ----
function renderCharts() {
  renderPopulationChart();
  renderLiteracyChart();
  renderGDPPieChart();
  renderGDPGrowthChart();
  renderHDIChart();
  renderSectorChart();
}

function getChartDefaults() {
  return {
    color: '#94A3B8',
    gridColor: 'rgba(255,255,255,0.06)',
    font: { family: 'Inter, sans-serif' }
  };
}

function renderPopulationChart() {
  const ctx = document.getElementById('chart-population');
  if (!ctx) return;
  const sorted = [...PROVINCES].sort((a, b) => b.population - a.population);
  const d = getChartDefaults();

  new Chart(ctx, {
    type: 'bar',
    data: {
      labels: sorted.map(p => p.shortName || p.name),
      datasets: [{
        label: 'Population',
        data: sorted.map(p => p.population),
        backgroundColor: sorted.map(p => p.color + 'CC'),
        borderColor: sorted.map(p => p.color),
        borderWidth: 1,
        borderRadius: 6,
        barPercentage: 0.7
      }]
    },
    options: {
      responsive: true,
      maintainAspectRatio: false,
      plugins: {
        legend: { display: false },
        tooltip: {
          callbacks: {
            label: (ctx) => `Population: ${formatFull(ctx.raw)}`
          }
        }
      },
      scales: {
        x: { ticks: { color: d.color, font: d.font }, grid: { display: false } },
        y: {
          ticks: {
            color: d.color,
            font: d.font,
            callback: v => formatNumber(v)
          },
          grid: { color: d.gridColor }
        }
      }
    }
  });
}

function renderLiteracyChart() {
  const ctx = document.getElementById('chart-literacy');
  if (!ctx) return;
  const sorted = [...PROVINCES].sort((a, b) => b.literacy - a.literacy);
  const d = getChartDefaults();

  new Chart(ctx, {
    type: 'bar',
    data: {
      labels: sorted.map(p => p.shortName || p.name),
      datasets: [
        {
          label: 'Male',
          data: sorted.map(p => p.maleLiteracy),
          backgroundColor: 'rgba(59, 130, 246, 0.7)',
          borderRadius: 4,
          barPercentage: 0.8,
          categoryPercentage: 0.7
        },
        {
          label: 'Female',
          data: sorted.map(p => p.femaleLiteracy),
          backgroundColor: 'rgba(244, 114, 182, 0.7)',
          borderRadius: 4,
          barPercentage: 0.8,
          categoryPercentage: 0.7
        }
      ]
    },
    options: {
      responsive: true,
      maintainAspectRatio: false,
      plugins: {
        legend: {
          labels: { color: d.color, font: d.font, usePointStyle: true, pointStyle: 'circle' }
        },
        tooltip: {
          callbacks: { label: (ctx) => `${ctx.dataset.label}: ${ctx.raw}%` }
        }
      },
      scales: {
        x: { ticks: { color: d.color, font: d.font }, grid: { display: false } },
        y: {
          max: 100,
          ticks: { color: d.color, font: d.font, callback: v => v + '%' },
          grid: { color: d.gridColor }
        }
      }
    }
  });
}

function renderGDPPieChart() {
  const ctx = document.getElementById('chart-gdp-share');
  if (!ctx) return;

  new Chart(ctx, {
    type: 'doughnut',
    data: {
      labels: PROVINCES.map(p => p.shortName || p.name),
      datasets: [{
        data: PROVINCES.map(p => p.gdpShare),
        backgroundColor: PROVINCES.map(p => p.color + 'CC'),
        borderColor: PROVINCES.map(p => p.color),
        borderWidth: 2,
        hoverOffset: 8
      }]
    },
    options: {
      responsive: true,
      maintainAspectRatio: false,
      cutout: '55%',
      plugins: {
        legend: {
          position: 'right',
          labels: {
            color: '#94A3B8',
            font: { family: 'Inter, sans-serif', size: 11 },
            usePointStyle: true,
            pointStyle: 'circle',
            padding: 12
          }
        },
        tooltip: {
          callbacks: {
            label: (ctx) => `${ctx.label}: ${ctx.raw}% of GDP`
          }
        }
      }
    }
  });
}

function renderGDPGrowthChart() {
  const ctx = document.getElementById('chart-gdp-growth');
  if (!ctx) return;
  const d = getChartDefaults();
  const data = PAKISTAN_OVERVIEW.yearlyGDPGrowth;

  new Chart(ctx, {
    type: 'line',
    data: {
      labels: data.map(d => d.year),
      datasets: [{
        label: 'GDP Growth Rate',
        data: data.map(d => d.rate),
        borderColor: '#4ADE80',
        backgroundColor: 'rgba(74, 222, 128, 0.1)',
        fill: true,
        tension: 0.4,
        pointBackgroundColor: '#4ADE80',
        pointBorderColor: '#fff',
        pointBorderWidth: 2,
        pointRadius: 5
      }]
    },
    options: {
      responsive: true,
      maintainAspectRatio: false,
      plugins: {
        legend: { display: false },
        tooltip: {
          callbacks: { label: (ctx) => `Growth: ${ctx.raw}%` }
        }
      },
      scales: {
        x: { ticks: { color: d.color, font: d.font }, grid: { display: false } },
        y: {
          ticks: { color: d.color, font: d.font, callback: v => v + '%' },
          grid: { color: d.gridColor }
        }
      }
    }
  });
}

function renderHDIChart() {
  const ctx = document.getElementById('chart-hdi');
  if (!ctx) return;
  const sorted = [...PROVINCES].sort((a, b) => b.hdi - a.hdi);
  const d = getChartDefaults();

  new Chart(ctx, {
    type: 'bar',
    data: {
      labels: sorted.map(p => p.shortName || p.name),
      datasets: [{
        label: 'HDI Score',
        data: sorted.map(p => p.hdi),
        backgroundColor: sorted.map(p => {
          if (p.hdi >= 0.6) return 'rgba(74, 222, 128, 0.7)';
          if (p.hdi >= 0.5) return 'rgba(251, 191, 36, 0.7)';
          return 'rgba(248, 113, 113, 0.7)';
        }),
        borderRadius: 6,
        barPercentage: 0.65
      }]
    },
    options: {
      indexAxis: 'y',
      responsive: true,
      maintainAspectRatio: false,
      plugins: { legend: { display: false } },
      scales: {
        x: {
          min: 0, max: 0.8,
          ticks: { color: d.color, font: d.font },
          grid: { color: d.gridColor }
        },
        y: {
          ticks: { color: d.color, font: d.font },
          grid: { display: false }
        }
      }
    }
  });
}

function renderSectorChart() {
  const ctx = document.getElementById('chart-sectors');
  if (!ctx) return;

  const sectors = PAKISTAN_OVERVIEW.economicSectors;
  new Chart(ctx, {
    type: 'doughnut',
    data: {
      labels: ['Agriculture', 'Industry', 'Services'],
      datasets: [{
        data: [sectors.agriculture, sectors.industry, sectors.services],
        backgroundColor: ['rgba(74, 222, 128, 0.8)', 'rgba(59, 130, 246, 0.8)', 'rgba(168, 85, 247, 0.8)'],
        borderColor: ['#4ADE80', '#3B82F6', '#A855F7'],
        borderWidth: 2,
        hoverOffset: 8
      }]
    },
    options: {
      responsive: true,
      maintainAspectRatio: false,
      cutout: '60%',
      plugins: {
        legend: {
          position: 'bottom',
          labels: {
            color: '#94A3B8',
            font: { family: 'Inter, sans-serif', size: 12 },
            usePointStyle: true,
            padding: 16
          }
        },
        tooltip: {
          callbacks: { label: (ctx) => `${ctx.label}: ${ctx.raw}%` }
        }
      }
    }
  });
}

// ---- Sources ----
function renderSources() {
  const container = document.getElementById('sources-grid');
  if (!container) return;

  container.innerHTML = DATA_SOURCES.map(src => `
    <div class="source-card">
      <h4>${src.name}</h4>
      <p>${src.description}</p>
      ${src.url ? `<a href="${src.url}" target="_blank" rel="noopener">${src.url}</a>` : ''}
      <div class="data-used">Data used: ${src.dataUsed}</div>
    </div>
  `).join('');
}

// ---- Modal ----
function initModal() {
  const overlay = document.getElementById('modal-overlay');
  overlay.addEventListener('click', (e) => {
    if (e.target === overlay) closeModal();
  });
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') closeModal();
  });
}

function openModal(provinceId) {
  const province = PROVINCES.find(p => p.id === provinceId);
  if (!province) return;

  const overlay = document.getElementById('modal-overlay');
  const content = document.getElementById('modal-content');

  content.innerHTML = `
    <div class="modal-header">
      <div>
        <h2>${province.name}</h2>
        <div class="modal-subtitle">Capital: ${province.capital} · ${province.districts} Districts · Est. Area: ${formatFull(province.area)} km²</div>
      </div>
      <button class="modal-close" onclick="closeModal()">✕</button>
    </div>
    <div class="modal-body">
      <p class="modal-desc">${province.description}</p>

      <div class="modal-stats-grid">
        <div class="modal-stat-card">
          <div class="icon">👥</div>
          <div class="value">${formatNumber(province.population)}</div>
          <div class="label">Population</div>
        </div>
        <div class="modal-stat-card">
          <div class="icon">📊</div>
          <div class="value">${province.gdpShare}%</div>
          <div class="label">GDP Share</div>
        </div>
        <div class="modal-stat-card">
          <div class="icon">📖</div>
          <div class="value">${province.literacy}%</div>
          <div class="label">Literacy</div>
        </div>
        <div class="modal-stat-card">
          <div class="icon">🏙️</div>
          <div class="value">${province.urbanization}%</div>
          <div class="label">Urban Pop.</div>
        </div>
        <div class="modal-stat-card">
          <div class="icon">🎓</div>
          <div class="value">${province.universities}</div>
          <div class="label">Universities</div>
        </div>
        <div class="modal-stat-card">
          <div class="icon">🏥</div>
          <div class="value">${formatNumber(province.hospitals)}</div>
          <div class="label">Hospitals</div>
        </div>
        <div class="modal-stat-card">
          <div class="icon">🏫</div>
          <div class="value">${formatNumber(province.schools)}</div>
          <div class="label">Schools</div>
        </div>
        <div class="modal-stat-card">
          <div class="icon">👶</div>
          <div class="value">${province.infantMortality}‰</div>
          <div class="label">Infant Mortality</div>
        </div>
      </div>

      <div class="modal-section-title">Development Indicators</div>
      <div class="modal-progress-group">
        <div class="progress-item">
          <div class="progress-item-header">
            <span class="label">Literacy Rate</span>
            <span class="value">${province.literacy}%</span>
          </div>
          <div class="progress-bar"><div class="progress-fill" style="width:${province.literacy}%;background:${province.color}"></div></div>
        </div>
        <div class="progress-item">
          <div class="progress-item-header">
            <span class="label">HDI Score</span>
            <span class="value">${province.hdi}</span>
          </div>
          <div class="progress-bar"><div class="progress-fill" style="width:${province.hdi * 100}%;background:${province.hdi >= 0.6 ? '#4ADE80' : province.hdi >= 0.5 ? '#FBBF24' : '#F87171'}"></div></div>
        </div>
        <div class="progress-item">
          <div class="progress-item-header">
            <span class="label">Electricity Access</span>
            <span class="value">${province.electricityAccess}%</span>
          </div>
          <div class="progress-bar"><div class="progress-fill" style="width:${province.electricityAccess}%;background:#3B82F6"></div></div>
        </div>
        <div class="progress-item">
          <div class="progress-item-header">
            <span class="label">Internet Penetration</span>
            <span class="value">${province.internetPenetration}%</span>
          </div>
          <div class="progress-bar"><div class="progress-fill" style="width:${province.internetPenetration}%;background:#A855F7"></div></div>
        </div>
        <div class="progress-item">
          <div class="progress-item-header">
            <span class="label">School Enrollment (Primary Net)</span>
            <span class="value">${province.schoolEnrollment}%</span>
          </div>
          <div class="progress-bar"><div class="progress-fill" style="width:${province.schoolEnrollment}%;background:#F59E0B"></div></div>
        </div>
      </div>

      <div class="modal-section-title">Major Cities</div>
      <div class="modal-list">
        ${province.majorCities.map(c => `<span class="modal-list-item">${c}</span>`).join('')}
      </div>

      <div class="modal-section-title">Key Industries</div>
      <div class="modal-list">
        ${province.keyIndustries.map(i => `<span class="modal-list-item">${i}</span>`).join('')}
      </div>

      <div class="modal-section-title">Natural Resources</div>
      <div class="modal-list">
        ${province.naturalResources.map(r => `<span class="modal-list-item">${r}</span>`).join('')}
      </div>

      ${province.crops && province.crops.length ? `
        <div class="modal-section-title">Major Crops</div>
        <div class="modal-list">
          ${province.crops.map(c => `<span class="modal-list-item">${c}</span>`).join('')}
        </div>
      ` : ''}

      ${province.historicalSites && province.historicalSites.length ? `
        <div class="modal-section-title">Historical & Tourist Sites</div>
        <div class="modal-list">
          ${province.historicalSites.map(s => `<span class="modal-list-item">${s}</span>`).join('')}
        </div>
      ` : ''}

      <div style="margin-top:1rem;padding:1rem;background:rgba(255,255,255,0.03);border-radius:8px;display:flex;flex-wrap:wrap;gap:1.5rem;">
        <div><span style="color:var(--text-muted);font-size:0.75rem;">Doctor Ratio</span><br><strong>${province.doctorRatio}</strong></div>
        <div><span style="color:var(--text-muted);font-size:0.75rem;">Poverty Rate</span><br><strong>${province.povertyRate}%</strong></div>
        <div><span style="color:var(--text-muted);font-size:0.75rem;">Pop. Growth</span><br><strong>${province.populationGrowth}%/yr</strong></div>
        <div><span style="color:var(--text-muted);font-size:0.75rem;">Pop. Density</span><br><strong>${formatFull(province.density)}/km²</strong></div>
      </div>
    </div>
  `;

  overlay.classList.add('active');
  document.body.style.overflow = 'hidden';
}

function closeModal() {
  document.getElementById('modal-overlay').classList.remove('active');
  document.body.style.overflow = '';
}

// ---- Scroll Animations ----
function initScrollAnimations() {
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
      }
    });
  }, { threshold: 0.1, rootMargin: '0px 0px -50px 0px' });

  document.querySelectorAll('.animate-in').forEach(el => observer.observe(el));
}
