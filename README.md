# 🍞 Bun Recipe Calculator

A professional, responsive, and lightweight web application built for commercial bakeries and artisan bakers. The application calculates the exact quantities of all required ingredients dynamically based on the quantity of Maida (refined wheat flour) entered by the user.

---

## 🎯 Purpose & Production Formulation

In commercial bakery operations, recipes are formulated based on the **Baker's Percentage** system, anchored to the weight of flour (Maida = 100%).

The calculator uses a **fixed base recipe for every 1 kilogram (1 KG) of Maida**:

| # | Ingredient | Base Quantity (1 KG Maida) | Baker's % | Role in Dough |
|---|---|---|---|---|
| 1 | **Maida (Refined Flour)** | **1 kg** | 100% | Base gluten structure & volume |
| 2 | **Sugar** | **250 grams** | 25.0% | Sweetness, browning & yeast feed |
| 3 | **Yeast** | **18 grams** | 1.8% | Fermentation & leavening |
| 4 | **Vanilla** | **5 grams** | 0.5% | Bakery aroma & flavor |
| 5 | **Milk Powder** | **5 grams** | 0.5% | Soft crumb, tenderness & crust color |
| 6 | **Ghee** | **50 grams** | 5.0% | Richness, moisture & crumb softness |
| 7 | **Bread Improver** | **2 grams** | 0.2% | Gluten conditioning & dough tolerance |
| 8 | **Calcium** | **5 grams** | 0.5% | Shelf-life & mold inhibitor |

---

## 📐 Calculation Formula

Every ingredient quantity scales dynamically using:

$$\text{Required Ingredient Quantity} = \text{Base Ingredient Quantity} \times \text{Entered Maida Quantity (KG)}$$

### Example: User Enters `3 KG` of Maida
* **Maida:** `3 kg`
* **Sugar:** $250 \times 3 = 750\text{ g}$
* **Yeast:** $18 \times 3 = 54\text{ g}$
* **Vanilla:** $5 \times 3 = 15\text{ g}$
* **Milk Powder:** $5 \times 3 = 15\text{ g}$
* **Ghee:** $50 \times 3 = 150\text{ g}$
* **Bread Improver:** $2 \times 3 = 6\text{ g}$
* **Calcium:** $5 \times 3 = 15\text{ g}$

### Automatic Unit Conversion (1,000g+ → KG)
When any calculated ingredient quantity reaches **1,000 grams or higher**, the app automatically converts and displays the quantity in **kilograms (kg)** for easy weighing on bulk scales:
* At `5 kg` Maida: Sugar ($1,250\text{ g}$) $\rightarrow$ displayed as **`1.25 kg`** (with secondary reference `(1,250 g)`).
* At `25 kg` Maida (standard commercial bag):
  * Sugar ($6,250\text{ g}$) $\rightarrow$ **`6.25 kg`**
  * Ghee ($1,250\text{ g}$) $\rightarrow$ **`1.25 kg`**
  * Yeast ($450\text{ g}$) $\rightarrow$ **`450 g`**

### Bun Yield Calculation (60g Standard Bun)
Commercial bun dough is calculated using standard hydration (~48% water on flour weight = 480 ml per 1 kg Maida):
* **Total Dough per 1 KG Maida:** $1,335\text{ g (recipe mix)} + 480\text{ g (water)} = 1,815\text{ g total dough}$
* **Yield @ 60g per bun:** $\frac{1,815\text{ g}}{60\text{ g}} \approx \mathbf{30\text{ buns / kg Maida}}$
* **Examples:**
  * **1 KG Maida:** $\approx \mathbf{30\text{ buns}}$
  * **3 KG Maida:** $\approx \mathbf{91\text{ buns}}$ ($5.445\text{ kg}$ total dough)
  * **5 KG Maida:** $\approx \mathbf{151\text{ buns}}$ ($9.075\text{ kg}$ total dough)
  * **10 KG Maida:** $\approx \mathbf{303\text{ buns}}$ ($18.15\text{ kg}$ total dough)
  * **25 KG Maida:** $\approx \mathbf{756\text{ buns}}$ ($45.375\text{ kg}$ total dough)
  * **50 KG Maida:** $\approx \mathbf{1,513\text{ buns}}$ ($90.75\text{ kg}$ total dough)
*(The app also includes 50g, 55g, 60g, 65g, and 70g weight selector pills to accommodate different bakery bun sizes).*

---

## ✨ Features

1. **Instant Real-Time Calculation:**
   - Calculations update automatically as you type or adjust presets. No "Calculate" button click required.
2. **Prominent Batch Summary Display:**
   - Displays `MAIDA: X KG` prominently in the header banner.
   - Shows total dry and fat batch weight (e.g. `4.005 kg` for 3 kg Maida).
   - Shows estimated bun yield.
3. **Quick Selection Preset Buttons:**
   - One-tap buttons for standard commercial batches: `1 kg`, `2 kg`, `3 kg`, `5 kg`, `10 kg`, `25 kg` (1 bag), and `50 kg`.
4. **Touch-Friendly Stepper Buttons:**
   - Easily fine-tune with `+1`, `-1`, `+½`, and `-½` kg controls.
5. **Decimal Value Support:**
   - Fully supports decimal quantities such as `1.5 kg`, `2.5 kg`, `7.5 kg`, etc. with clean rounding (no floating-point glitches).
6. **Input Validation & Safety:**
   - Prevents negative inputs, invalid characters, and zero states with immediate feedback.
7. **Copy Results Button (`Alt + C`):**
   - Copies a cleanly formatted recipe slip to the clipboard with one click.
8. **Print Recipe Button (`Alt + P`):**
   - Launches a print-optimized bakery production slip (`@media print`) complete with checkboxes, timestamp, and signature lines for head baker sign-off.
9. **Weighing Checklist Mode:**
   - Interactive checkoff buttons on cards and tables so bakers can tick off each ingredient as it is weighed.
10. **Dual View Options:**
    - **Cards Grid View:** Visual, icon-rich view with large digits for distant reading on kitchen counters.
    - **Table View:** Compact, tabular layout tailored for fast multi-batch weighing.
11. **Bakery-Themed Aesthetic:**
    - Warm cream, rich artisan brown, and golden honey color palette with subtle bakery styling.
    - 100% responsive for smartphones, tablets, laptops, and large bakery POS monitors.
12. **Zero Dependencies & Blazing Fast:**
    - Pure HTML5, modern CSS3, and vanilla ES6 JavaScript. Works offline anywhere.

---

## 🚀 How to Run the App

Simply open the `index.html` file in any modern web browser:

```powershell
# In PowerShell:
Start-Process "C:\Users\Admin\.gemini\antigravity\scratch\bun-recipe-calculator\index.html"
```
Or open via File Explorer by double-clicking `index.html`.

---

## 🧪 Automated Testing

A PowerShell test suite is included at `test-calculator.ps1`. To run tests:

```powershell
powershell -ExecutionPolicy Bypass -File "C:\Users\Admin\.gemini\antigravity\scratch\bun-recipe-calculator\test-calculator.ps1"
```

All 7 test suites verify:
- Exact 1 KG base recipe values
- 3 KG Maida example match
- Gram to Kilogram conversion threshold (≥ 1,000g)
- Commercial bag scaling (25 KG & 50 KG)
- Decimal input handling (1.5 KG, 2.5 KG)
- Total batch weights
- Negative and invalid input blocking
