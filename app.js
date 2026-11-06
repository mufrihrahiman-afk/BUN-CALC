/**
 * Bun Recipe Calculator - Core Application Logic
 * Professional commercial bakery batch sizing system.
 */

// Fixed Base Recipe for exactly 1 KG Maida
const BASE_RECIPE = [
  {
    id: 'maida',
    name: 'Maida (Refined Flour)',
    shortName: 'Maida',
    baseAmount: 1, // in KG
    baseUnit: 'kg',
    isFlour: true,
    bakersPct: 100, // 100% flour basis
    category: 'Flour',
    icon: 'flour',
    note: 'Base ingredient (refined wheat flour)'
  },
  {
    id: 'sugar',
    name: 'Sugar',
    shortName: 'Sugar',
    baseAmount: 250, // in grams
    baseUnit: 'g',
    isFlour: false,
    bakersPct: 25.0,
    category: 'Sweetener',
    icon: 'sugar',
    note: 'Provides sweetness, browning & feeds yeast'
  },
  {
    id: 'yeast',
    name: 'Yeast',
    shortName: 'Yeast',
    baseAmount: 18, // in grams
    baseUnit: 'g',
    isFlour: false,
    bakersPct: 1.8,
    category: 'Leavening',
    icon: 'yeast',
    note: 'Active baker\'s yeast for dough rising'
  },
  {
    id: 'vanilla',
    name: 'Vanilla',
    shortName: 'Vanilla',
    baseAmount: 5, // in grams
    baseUnit: 'g',
    isFlour: false,
    bakersPct: 0.5,
    category: 'Flavor',
    icon: 'vanilla',
    note: 'Rich bakery aroma & flavor enhancement'
  },
  {
    id: 'milk_powder',
    name: 'Milk Powder',
    shortName: 'Milk Powder',
    baseAmount: 5, // in grams
    baseUnit: 'g',
    isFlour: false,
    bakersPct: 0.5,
    category: 'Dairy',
    icon: 'milk',
    note: 'Improves crust color, softness & nutrition'
  },
  {
    id: 'ghee',
    name: 'Ghee',
    shortName: 'Ghee',
    baseAmount: 50, // in grams
    baseUnit: 'g',
    isFlour: false,
    bakersPct: 5.0,
    category: 'Fat / Shortening',
    icon: 'ghee',
    note: 'Tenderizes crumb & enhances rich aroma'
  },
  {
    id: 'bread_improver',
    name: 'Bread Improver',
    shortName: 'Bread Improver',
    baseAmount: 2, // in grams
    baseUnit: 'g',
    isFlour: false,
    bakersPct: 0.2,
    category: 'Conditioner',
    icon: 'improver',
    note: 'Strengthens gluten structure & shelf life'
  },
  {
    id: 'calcium',
    name: 'Calcium',
    shortName: 'Calcium',
    baseAmount: 5, // in grams
    baseUnit: 'g',
    isFlour: false,
    bakersPct: 0.5,
    category: 'Preservative',
    icon: 'calcium',
    note: 'Calcium propionate mold inhibitor'
  }
];

// SVG Icons Dictionary
const ICONS = {
  flour: `<svg viewBox="0 0 24 24"><path d="M19 6h-3.18C15.4 3.84 13.55 2 11.27 2c-2.48 0-4.5 2.02-4.5 4.5 0 .2.02.39.05.58C4.33 7.82 2.5 10.36 2.5 13.5 2.5 17.64 5.86 21 10 21h9c1.66 0 3-1.34 3-3s-1.34-3-3-3h-1.5c.83 0 1.5-.67 1.5-1.5S18.33 12 17.5 12H16c1.1 0 2-.9 2-2s-.9-2-2-2h3c.55 0 1-.45 1-1s-.45-1-1-1zm-9 13c-3.03 0-5.5-2.47-5.5-5.5 0-2.47 1.63-4.56 3.92-5.26l.89-.27.17-.93c.17-.97.74-2.54 1.79-2.54 1.38 0 2.5 1.12 2.5 2.5v.5h2.23C16.57 7.7 17 8.5 17 9.5c0 .65-.3 1.23-.78 1.62l-.72.58.91.17c.97.18 1.59 1.05 1.59 2.13 0 1.1-.9 2-2 2h-3v1c0 1.1-.9 2-2 2H10z"/></svg>`,
  sugar: `<svg viewBox="0 0 24 24"><path d="M19 10.5V8.8C19 6.7 17.3 5 15.2 5H8.8C6.7 5 5 6.7 5 8.8v1.7C3.8 11.2 3 12.5 3 14c0 2.2 1.8 4 4 4h10c2.2 0 4-1.8 4-4 0-1.5-.8-2.8-2-3.5zM8.8 7h6.4c1 0 1.8.8 1.8 1.8v1.2H7V8.8C7 7.8 7.8 7 8.8 7zm8.2 9H7c-1.1 0-2-.9-2-2 0-.9.6-1.7 1.5-1.9l.5-.1V12h10v.1l.5.1c.9.2 1.5 1 1.5 1.9 0 1.1-.9 1.9-2 1.9z"/><circle cx="9" cy="14" r="1"/><circle cx="12" cy="14" r="1"/><circle cx="15" cy="14" r="1"/></svg>`,
  yeast: `<svg viewBox="0 0 24 24"><circle cx="7" cy="8" r="3"/><circle cx="16" cy="7" r="2.5"/><circle cx="11" cy="14" r="3.5"/><circle cx="17.5" cy="15.5" r="2.5"/><circle cx="6" cy="17" r="2"/></svg>`,
  vanilla: `<svg viewBox="0 0 24 24"><path d="M12 2C6.5 2 2 6.5 2 12c0 3.6 1.9 6.8 4.8 8.5l1.2-2.1C5.7 17.1 4.2 14.7 4.2 12c0-4.3 3.5-7.8 7.8-7.8s7.8 3.5 7.8 7.8c0 2.7-1.4 5.1-3.6 6.4l1.2 2.1C20.1 18.8 22 15.6 22 12c0-5.5-4.5-10-10-10zm0 5c-2.8 0-5 2.2-5 5 0 1.8.9 3.3 2.3 4.2l1.2-1.9c-.9-.6-1.5-1.6-1.5-2.8 0-1.7 1.3-3 3-3s3 1.3 3 3c0 1.2-.6 2.2-1.5 2.8l1.2 1.9c1.4-.9 2.3-2.4 2.3-4.2 0-2.8-2.2-5-5-5z"/></svg>`,
  milk: `<svg viewBox="0 0 24 24"><path d="M12 2c-1.1 0-2 .9-2 2v1.17C7.61 6.07 6 8.35 6 11v8c0 1.66 1.34 3 3 3h6c1.66 0 3-1.34 3-3v-8c0-2.65-1.61-4.93-4-5.83V4c0-1.1-.9-2-2-2zm-1 3.9c.32-.05.65-.08 1-.08.35 0 .68.03 1 .08V7h-2V5.9zM16 11v1.5H8V11c0-2.21 1.79-4 4-4s4 1.79 4 4zm0 3.5V20H8v-5.5h8z"/></svg>`,
  ghee: `<svg viewBox="0 0 24 24"><path d="M5 19c0 1.66 1.34 3 3 3h8c1.66 0 3-1.34 3-3V10H5v9zm2-7h10v7c0 .55-.45 1-1 1H8c-.55 0-1-.45-1-1v-7zm12-4H5c-.55 0-1-.45-1-1s.45-1 1-1h3.17C8.58 4.84 10.15 4 12 4s3.42.84 3.83 2H19c.55 0 1 .45 1 1s-.45 1-1 1z"/></svg>`,
  improver: `<svg viewBox="0 0 24 24"><path d="M19.5 9.5c-1.03 0-1.9.62-2.29 1.5H15V6c0-.55-.45-1-1-1s-1 .45-1 1v5h-2V3c0-.55-.45-1-1-1s-1 .45-1 1v8H7.79c-.39-.88-1.26-1.5-2.29-1.5C4.12 9.5 3 10.62 3 12s1.12 2.5 2.5 2.5c1.03 0 1.9-.62 2.29-1.5H9v5c0 .55.45 1 1 1s1-.45 1-1v-5h2v3c0 .55.45 1 1 1s1-.45 1-1v-3h2.21c.39.88 1.26 1.5 2.29 1.5 1.38 0 2.5-1.12 2.5-2.5s-1.12-2.5-2.5-2.5z"/></svg>`,
  calcium: `<svg viewBox="0 0 24 24"><path d="M12 2L4 5v6.09c0 5.05 3.41 9.76 8 10.91 4.59-1.15 8-5.86 8-10.91V5l-8-3zm0 2.18l6 2.25v4.66c0 4.09-2.67 7.9-6 8.91-3.33-1.01-6-4.82-6-8.91V6.43l6-2.25zM11 7h2v6h-2V7zm0 8h2v2h-2v-2z"/></svg>`
};

// Application State
const state = {
  maidaKg: 1, // default 1 kg
  activePreset: 1,
  viewMode: 'cards', // 'cards' | 'table'
  checklist: {}, // { [ingredientId]: boolean }
  checklistEnabled: false,
  bunWeightGrams: 60 // 60 grams per bun
};

// DOM Elements references (assigned upon DOM readiness)
let maidaInput, clearInputBtn, inputFeedback, presetChips, stepBtns,
    ingredientsGrid, ingredientsTableBody, tableViewWrapper,
    viewToggleCards, viewToggleTable, summaryMaidaBadge, summaryMaidaText,
    summaryTotalBatchWeight, summaryEstBuns, resetBtn, copyBtn, printBtn,
    toastContainer, printDateTime,
    detailBunCount, detailBunRate, detailDryMix, detailWater, detailTotalDough, detailDoughGrams,
    weightPills, printBunCount;

function initDOM() {
  maidaInput = document.getElementById('maidaInput');
  clearInputBtn = document.getElementById('clearInputBtn');
  inputFeedback = document.getElementById('inputFeedback');
  presetChips = document.querySelectorAll('.preset-chip');
  stepBtns = document.querySelectorAll('[data-step]');
  ingredientsGrid = document.getElementById('ingredientsGrid');
  ingredientsTableBody = document.getElementById('ingredientsTableBody');
  tableViewWrapper = document.getElementById('tableViewWrapper');
  viewToggleCards = document.getElementById('viewToggleCards');
  viewToggleTable = document.getElementById('viewToggleTable');
  summaryMaidaBadge = document.getElementById('summaryMaidaBadge');
  summaryMaidaText = document.getElementById('summaryMaidaText');
  summaryTotalBatchWeight = document.getElementById('summaryTotalBatchWeight');
  summaryEstBuns = document.getElementById('summaryEstBuns');
  resetBtn = document.getElementById('resetBtn');
  copyBtn = document.getElementById('copyBtn');
  printBtn = document.getElementById('printBtn');
  toastContainer = document.getElementById('toastContainer');
  printDateTime = document.getElementById('printDateTime');
  
  // Bun Yield Sizing Elements
  detailBunCount = document.getElementById('detailBunCount');
  detailBunRate = document.getElementById('detailBunRate');
  detailDryMix = document.getElementById('detailDryMix');
  detailWater = document.getElementById('detailWater');
  detailTotalDough = document.getElementById('detailTotalDough');
  detailDoughGrams = document.getElementById('detailDoughGrams');
  weightPills = document.querySelectorAll('.weight-pill');
  printBunCount = document.getElementById('printBunCount');
}

/**
 * Format a number cleanly without float precision artifacts.
 * e.g., 15.000000000000002 -> 15
 * 1.250 -> 1.25
 */
function cleanNumber(num) {
  if (num === null || num === undefined || isNaN(num)) return '0';
  // Round to 3 decimal places to eliminate IEEE 754 float glitches
  const rounded = Math.round(num * 1000) / 1000;
  return Number(rounded.toFixed(3)).toLocaleString('en-US', {
    maximumFractionDigits: 3
  });
}

/**
 * Calculate all recipe ingredients based on entered maida in KG.
 * Formula: Required Quantity = Base Quantity * Entered Maida Quantity
 * Automatic Conversion: Grams >= 1000 are converted to KG.
 */
function calculateRecipe(maidaKg) {
  if (isNaN(maidaKg) || maidaKg <= 0) {
    return {
      isValid: false,
      items: [],
      totalBatchGrams: 0,
      totalBatchKg: 0
    };
  }

  let totalBatchGrams = 0;

  const items = BASE_RECIPE.map(item => {
    let quantityGrams;
    let displayAmount;
    let displayUnit;
    let formattedDisplay;
    let secondaryNote = '';
    let isConvertedToKg = false;

    if (item.isFlour) {
      // Maida is entered in KG
      quantityGrams = maidaKg * 1000;
      displayAmount = maidaKg;
      displayUnit = 'kg';
      formattedDisplay = `${cleanNumber(maidaKg)} kg`;
      if (maidaKg < 1) {
        secondaryNote = `(${cleanNumber(quantityGrams)} g)`;
      }
    } else {
      // Formula: Base Amount (grams) * Entered Maida Quantity (kg)
      quantityGrams = item.baseAmount * maidaKg;

      // RULE: Automatically convert grams into kilograms when quantities reach 1000 grams or more.
      if (quantityGrams >= 1000) {
        isConvertedToKg = true;
        const kgVal = quantityGrams / 1000;
        displayAmount = kgVal;
        displayUnit = 'kg';
        formattedDisplay = `${cleanNumber(kgVal)} kg`;
        // Dual verification for bakers with gram scales
        secondaryNote = `(${cleanNumber(quantityGrams)} g)`;
      } else {
        displayAmount = quantityGrams;
        displayUnit = 'g';
        formattedDisplay = `${cleanNumber(quantityGrams)} g`;
      }
    }

    totalBatchGrams += quantityGrams;

    return {
      ...item,
      quantityGrams,
      displayAmount,
      displayUnit,
      formattedDisplay,
      secondaryNote,
      isConvertedToKg,
      isChecked: !!state.checklist[item.id]
    };
  });

  const totalBatchKg = totalBatchGrams / 1000;

  return {
    isValid: true,
    maidaKg,
    items,
    totalBatchGrams,
    totalBatchKg
  };
}

/**
 * Render the calculated recipe to both Card View and Table View.
 */
function renderRecipe() {
  const inputValue = maidaInput.value.trim();
  const numVal = parseFloat(inputValue);

  // Validate Input
  if (inputValue === '' || isNaN(numVal)) {
    showEmptyState('Please enter a valid Maida quantity in KG above.');
    updateBannerState(0, 0, false);
    updateActivePresetHighlight(null);
    return;
  }

  if (numVal < 0) {
    showErrorState('Negative values are not permitted. Please enter a positive number.');
    updateBannerState(0, 0, false);
    updateActivePresetHighlight(null);
    return;
  }

  if (numVal === 0) {
    showEmptyState('Please enter a Maida quantity greater than 0 kg.');
    updateBannerState(0, 0, false);
    updateActivePresetHighlight(null);
    return;
  }

  // Clear feedback error
  clearFeedback();

  // Run calculation
  const recipe = calculateRecipe(numVal);
  if (!recipe.isValid) return;

  state.maidaKg = numVal;

  // Update Summary Banner
  updateBannerState(numVal, recipe.totalBatchKg, true);

  // Update Preset Buttons Active State
  updateActivePresetHighlight(numVal);

  // Render Cards View
  renderCards(recipe.items);

  // Render Table View
  renderTable(recipe.items);
}

/**
 * Render Cards Grid
 */
function renderCards(items) {
  ingredientsGrid.innerHTML = items.map(item => {
    const checkedClass = item.isChecked ? 'is-checked' : '';
    const flourClass = item.isFlour ? 'is-flour' : '';
    const iconSvg = ICONS[item.icon] || ICONS.flour;

    return `
      <div class="ingredient-card ${checkedClass} ${flourClass}" data-id="${item.id}">
        <div class="card-top">
          <div class="card-header-icon" title="${item.category}">
            ${iconSvg}
          </div>
          <div style="display: flex; align-items: center; gap: 0.35rem;">
            <span class="card-bakers-pct" title="Baker's percentage">${item.bakersPct}% Baker's</span>
            <button class="card-check-toggle" data-check-id="${item.id}" title="Toggle checked when weighed" aria-label="Mark ${item.name} as weighed">
              <svg viewBox="0 0 24 24"><polyline points="20 6 9 17 4 12"></polyline></svg>
            </button>
          </div>
        </div>

        <div class="card-title">
          ${item.name}
        </div>

        <div class="card-quantity-wrapper">
          <span class="card-quantity">${cleanNumber(item.displayAmount)}</span>
          <span class="card-unit">${item.displayUnit}</span>
        </div>

        ${item.secondaryNote ? `<div class="card-secondary-converted">${item.secondaryNote}</div>` : ''}

        <div class="card-meta">
          <span>${item.note}</span>
          <span style="font-weight: 600;">Base: ${item.isFlour ? '1 kg' : item.baseAmount + ' g'}</span>
        </div>
      </div>
    `;
  }).join('');

  // Attach check toggle events
  ingredientsGrid.querySelectorAll('.card-check-toggle').forEach(btn => {
    btn.addEventListener('click', (e) => {
      e.stopPropagation();
      const id = btn.getAttribute('data-check-id');
      toggleCheckItem(id);
    });
  });
}

/**
 * Render Table Rows
 */
function renderTable(items) {
  ingredientsTableBody.innerHTML = items.map((item, index) => {
    const iconSvg = ICONS[item.icon] || ICONS.flour;
    const isChecked = item.isChecked;

    return `
      <tr class="${isChecked ? 'is-checked-row' : ''}">
        <td style="font-weight: 700; color: var(--brown-500); width: 40px;">#${index + 1}</td>
        <td>
          <div class="table-ingredient-cell">
            <div class="table-icon">${iconSvg}</div>
            <div>
              <div>${item.name}</div>
              <div style="font-size: 0.75rem; color: var(--brown-500); font-weight: normal;">
                ${item.note} • Base: ${item.isFlour ? '1 kg' : item.baseAmount + ' g'}
              </div>
            </div>
          </div>
        </td>
        <td>
          <span class="table-qty-cell">${cleanNumber(item.displayAmount)}</span>
          <span class="table-qty-unit">${item.displayUnit}</span>
          ${item.secondaryNote ? `<span style="font-size: 0.8rem; color: var(--brown-500); margin-left: 0.4rem;">${item.secondaryNote}</span>` : ''}
        </td>
        <td style="font-weight: 700; color: var(--brown-600);">${item.bakersPct}%</td>
        <td class="print-checkbox-col" style="text-align: center;">
          <div class="print-box"></div>
          <button class="card-check-toggle no-print" data-check-id="${item.id}" style="margin: 0 auto;">
            <svg viewBox="0 0 24 24"><polyline points="20 6 9 17 4 12"></polyline></svg>
          </button>
        </td>
      </tr>
    `;
  }).join('');

  // Attach check toggle events in table
  ingredientsTableBody.querySelectorAll('.card-check-toggle').forEach(btn => {
    btn.addEventListener('click', (e) => {
      e.stopPropagation();
      const id = btn.getAttribute('data-check-id');
      toggleCheckItem(id);
    });
  });
}

/**
 * Toggle check status for an ingredient
 */
function toggleCheckItem(id) {
  state.checklist[id] = !state.checklist[id];
  renderRecipe();
}

/**
 * Update Prominent Total Recipe Display Banner & Bun Yield Sizing
 */
function updateBannerState(maidaKg, totalBatchKg, isValid) {
  if (!isValid) {
    summaryMaidaBadge.textContent = 'MAIDA: -- KG';
    summaryMaidaText.textContent = 'Enter Maida quantity to calculate recipe';
    summaryTotalBatchWeight.textContent = '--';
    summaryEstBuns.textContent = '--';
    if (detailBunCount) detailBunCount.textContent = '--';
    if (detailBunRate) detailBunRate.textContent = '--';
    if (detailDryMix) detailDryMix.textContent = '--';
    if (detailWater) detailWater.textContent = '--';
    if (detailTotalDough) detailTotalDough.textContent = '--';
    if (detailDoughGrams) detailDoughGrams.textContent = '--';
    return;
  }

  // Exact Prominent Display specified in requirement: "MAIDA: X KG"
  summaryMaidaBadge.textContent = `MAIDA: ${cleanNumber(maidaKg)} KG`;
  summaryMaidaText.textContent = `Full batch formulation for ${cleanNumber(maidaKg)} kg maida`;
  
  // Total Batch Weight (Dry + Ghee)
  if (totalBatchKg >= 1) {
    summaryTotalBatchWeight.textContent = `${cleanNumber(totalBatchKg)} kg`;
  } else {
    summaryTotalBatchWeight.textContent = `${cleanNumber(totalBatchKg * 1000)} g`;
  }

  // Commercial Bun Yield Calculation:
  // 1 Bun weighs 60 grams (target dough piece)
  // Standard bun dough hydration = ~48% water on flour weight (480g water per 1kg maida)
  const totalDryGrams = totalBatchKg * 1000;
  const waterGrams = maidaKg * 480;
  const totalDoughGrams = totalDryGrams + waterGrams;
  const totalDoughKg = totalDoughGrams / 1000;
  
  const bunWeight = state.bunWeightGrams || 60;
  const bunCount = Math.round(totalDoughGrams / bunWeight);
  const bunRate = Math.round(1815 / bunWeight);

  // Update Summary Banner
  summaryEstBuns.textContent = `~${cleanNumber(bunCount)} buns`;

  // Update Detailed Yield Panel
  if (detailBunCount) detailBunCount.textContent = `~${cleanNumber(bunCount)} Buns`;
  if (detailBunRate) detailBunRate.textContent = `~${bunRate} buns per 1 kg maida (@ ${bunWeight}g)`;
  if (detailDryMix) detailDryMix.textContent = `${cleanNumber(totalBatchKg)} kg`;
  if (detailWater) detailWater.textContent = `${cleanNumber(Math.round(waterGrams))} ml`;
  if (detailTotalDough) detailTotalDough.textContent = `${cleanNumber(Math.round(totalDoughKg * 1000) / 1000)} kg`;
  if (detailDoughGrams) detailDoughGrams.textContent = `${cleanNumber(Math.round(totalDoughGrams))} g mixed dough`;

  // Update Print Slip Meta
  if (printBunCount) {
    printBunCount.textContent = `Single Bun Weight: ${bunWeight}g | Total Bun Yield: ~${cleanNumber(bunCount)} buns | Dough: ~${cleanNumber(totalDoughKg)} kg`;
  }
}

/**
 * Highlight matching preset button
 */
function updateActivePresetHighlight(currentVal) {
  presetChips.forEach(chip => {
    const chipVal = parseFloat(chip.getAttribute('data-preset'));
    if (currentVal !== null && chipVal === currentVal) {
      chip.classList.add('active');
    } else {
      chip.classList.remove('active');
    }
  });
}

/**
 * Show Empty State message
 */
function showEmptyState(msg) {
  ingredientsGrid.innerHTML = `
    <div style="grid-column: 1 / -1; text-align: center; padding: 3rem 1rem; background: var(--bg-surface); border-radius: var(--radius-md); border: 1px dashed var(--border-color);">
      <div style="font-size: 2.5rem; margin-bottom: 0.5rem;">🥖</div>
      <div style="font-size: 1.15rem; font-weight: 700; color: var(--brown-800); margin-bottom: 0.35rem;">No Flour Quantity Entered</div>
      <div style="color: var(--brown-500); font-size: 0.9rem;">${msg}</div>
    </div>
  `;
  ingredientsTableBody.innerHTML = `
    <tr><td colspan="5" style="text-align: center; padding: 2.5rem; color: var(--brown-500);">${msg}</td></tr>
  `;
}

/**
 * Show Error State message
 */
function showErrorState(msg) {
  inputFeedback.className = 'input-feedback error';
  inputFeedback.textContent = msg;
  showEmptyState(msg);
}

/**
 * Clear Feedback message
 */
function clearFeedback() {
  inputFeedback.className = 'input-feedback hint';
  inputFeedback.textContent = 'Calculates instantly as you type • Grams auto-convert to KG at 1000g+';
}

/**
 * Copy Formatted Recipe Results to Clipboard
 */
async function copyRecipeResults() {
  const numVal = parseFloat(maidaInput.value);
  if (isNaN(numVal) || numVal <= 0) {
    showToast('Please enter a valid Maida quantity before copying.', 'error');
    return;
  }

  const recipe = calculateRecipe(numVal);
  if (!recipe.isValid) return;

  const now = new Date();
  const dateStr = now.toLocaleDateString('en-US', {
    weekday: 'short',
    year: 'numeric',
    month: 'short',
    day: 'numeric',
    hour: '2-digit',
    minute: '2-digit'
  });

  let text = `=================================\n`;
  text += `🍞 BUN RECIPE CALCULATOR\n`;
  text += `MAIDA QUANTITY: ${cleanNumber(numVal)} KG\n`;
  text += `Calculated: ${dateStr}\n`;
  text += `=================================\n\n`;

  text += `REQUIRED INGREDIENTS:\n`;
  recipe.items.forEach(item => {
    const sec = item.secondaryNote ? ` ${item.secondaryNote}` : '';
    text += `• ${item.name.padEnd(24, ' ')} : ${cleanNumber(item.displayAmount)} ${item.displayUnit}${sec}\n`;
  });

  const bunWeight = state.bunWeightGrams || 60;
  const totalDoughGrams = (recipe.totalBatchGrams) + (numVal * 480);
  const bunCount = Math.round(totalDoughGrams / bunWeight);

  text += `\n---------------------------------\n`;
  text += `Total Batch Weight (Dry + Ghee) : ${cleanNumber(recipe.totalBatchKg)} kg (${cleanNumber(recipe.totalBatchGrams)} g)\n`;
  text += `Water to Add (~48% Hydration)   : ${cleanNumber(Math.round(numVal * 480))} ml\n`;
  text += `Total Mixed Dough Weight        : ${cleanNumber(Math.round(totalDoughGrams) / 1000)} kg\n`;
  text += `Estimated Bun Count (@ ${bunWeight}g each): ~${cleanNumber(bunCount)} buns\n`;
  text += `Base Formulation Ratio         : 1 KG Maida Standard\n`;
  text += `=================================`;

  try {
    if (navigator.clipboard && window.isSecureContext) {
      await navigator.clipboard.writeText(text);
    } else {
      // Fallback for non-https/legacy
      const textArea = document.createElement('textarea');
      textArea.value = text;
      textArea.style.position = 'fixed';
      textArea.style.opacity = '0';
      document.body.appendChild(textArea);
      textArea.focus();
      textArea.select();
      document.execCommand('copy');
      document.body.removeChild(textArea);
    }
    showToast('✓ Recipe copied to clipboard successfully!', 'success');
  } catch (err) {
    console.error('Failed to copy', err);
    showToast('Failed to copy to clipboard.', 'error');
  }
}

/**
 * Trigger Recipe Printing
 */
function printRecipe() {
  const numVal = parseFloat(maidaInput.value);
  if (isNaN(numVal) || numVal <= 0) {
    showToast('Please enter a valid Maida quantity before printing.', 'error');
    return;
  }

  // Update print timestamp
  const now = new Date();
  if (printDateTime) {
    printDateTime.textContent = now.toLocaleString();
  }

  window.print();
}

/**
 * Toast Notification Helper
 */
function showToast(message, type = 'info') {
  const toast = document.createElement('div');
  toast.className = `toast toast-${type}`;
  
  const icon = type === 'success' 
    ? `<svg viewBox="0 0 24 24"><path d="M9 16.17L4.83 12l-1.42 1.41L9 19 21 7l-1.41-1.41z"/></svg>`
    : `<svg viewBox="0 0 24 24"><path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm1 15h-2v-2h2v2zm0-4h-2V7h2v6z"/></svg>`;

  toast.innerHTML = `${icon}<span>${message}</span>`;
  toastContainer.appendChild(toast);

  setTimeout(() => {
    toast.style.opacity = '0';
    toast.style.transform = 'translateX(20px)';
    setTimeout(() => {
      if (toast.parentNode) {
        toast.parentNode.removeChild(toast);
      }
    }, 250);
  }, 2600);
}

/**
 * Reset App to Default State
 */
function resetApp() {
  maidaInput.value = '';
  state.checklist = {};
  renderRecipe();
  maidaInput.focus();
  showToast('Calculator reset. Ready for new batch.', 'info');
}

/**
 * Event Listeners Initializer
 */
function initEvents() {
  // Input event triggers automatic instant calculation
  maidaInput.addEventListener('input', () => {
    renderRecipe();
  });

  // Handle enter key
  maidaInput.addEventListener('keydown', (e) => {
    if (e.key === 'Enter') {
      maidaInput.blur();
    }
  });

  // Clear button
  clearInputBtn.addEventListener('click', () => {
    maidaInput.value = '';
    renderRecipe();
    maidaInput.focus();
  });

  // Quick Preset Chips (1, 5, 10, 25, 50 kg)
  presetChips.forEach(chip => {
    chip.addEventListener('click', () => {
      const val = chip.getAttribute('data-preset');
      maidaInput.value = val;
      renderRecipe();
    });
  });

  // Stepper increment/decrement buttons (+1, -1, +0.5, -0.5)
  stepBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      const step = parseFloat(btn.getAttribute('data-step'));
      const current = parseFloat(maidaInput.value) || 0;
      let next = Math.max(0, current + step);
      // Clean float
      next = Math.round(next * 100) / 100;
      maidaInput.value = next;
      renderRecipe();
    });
  });

  // Action Buttons
  resetBtn.addEventListener('click', resetApp);
  copyBtn.addEventListener('click', copyRecipeResults);
  printBtn.addEventListener('click', printRecipe);

  // Bun Weight Selector Pills (50g, 55g, 60g, 65g, 70g)
  if (weightPills) {
    weightPills.forEach(pill => {
      pill.addEventListener('click', () => {
        const weight = parseFloat(pill.getAttribute('data-weight')) || 60;
        state.bunWeightGrams = weight;
        weightPills.forEach(p => p.classList.remove('active'));
        pill.classList.add('active');
        renderRecipe();
        showToast(`Bun dough weight set to ${weight}g`, 'info');
      });
    });
  }

  // View Mode Toggles (Cards vs Table)
  viewToggleCards.addEventListener('click', () => {
    state.viewMode = 'cards';
    viewToggleCards.classList.add('active');
    viewToggleTable.classList.remove('active');
    ingredientsGrid.style.display = 'grid';
    tableViewWrapper.style.display = 'none';
  });

  viewToggleTable.addEventListener('click', () => {
    state.viewMode = 'table';
    viewToggleTable.classList.add('active');
    viewToggleCards.classList.remove('active');
    ingredientsGrid.style.display = 'none';
    tableViewWrapper.style.display = 'block';
  });

  // Keyboard Shortcuts: Alt+C (Copy), Alt+P (Print), Alt+R (Reset)
  window.addEventListener('keydown', (e) => {
    if (e.altKey && (e.key === 'c' || e.key === 'C')) {
      e.preventDefault();
      copyRecipeResults();
    } else if (e.altKey && (e.key === 'p' || e.key === 'P')) {
      e.preventDefault();
      printRecipe();
    } else if (e.altKey && (e.key === 'r' || e.key === 'R')) {
      e.preventDefault();
      resetApp();
    }
  });
}

// Initial Launch
document.addEventListener('DOMContentLoaded', () => {
  initDOM();
  initEvents();
  // Default to 1 kg to immediately demonstrate the live calculator and formula
  if (maidaInput) {
    maidaInput.value = '1';
    renderRecipe();
  }
});
