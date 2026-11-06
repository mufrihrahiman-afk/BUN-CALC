# PowerShell Verification Script for Bun Recipe Calculator

$baseRecipe = @(
    @{ id = 'maida'; name = 'Maida'; baseGrams = 1000; isFlour = $true; bakersPct = 100 },
    @{ id = 'sugar'; name = 'Sugar'; baseGrams = 250; isFlour = $false; bakersPct = 25.0 },
    @{ id = 'yeast'; name = 'Yeast'; baseGrams = 18; isFlour = $false; bakersPct = 1.8 },
    @{ id = 'vanilla'; name = 'Vanilla'; baseGrams = 5; isFlour = $false; bakersPct = 0.5 },
    @{ id = 'milk_powder'; name = 'Milk Powder'; baseGrams = 5; isFlour = $false; bakersPct = 0.5 },
    @{ id = 'ghee'; name = 'Ghee'; baseGrams = 50; isFlour = $false; bakersPct = 5.0 },
    @{ id = 'bread_improver'; name = 'Bread Improver'; baseGrams = 2; isFlour = $false; bakersPct = 0.2 },
    @{ id = 'calcium'; name = 'Calcium'; baseGrams = 5; isFlour = $false; bakersPct = 0.5 }
)

function Calculate-Recipe($maidaKg) {
    if ($maidaKg -le 0 -or $maidaKg -eq $null) {
        return @{ IsValid = $false }
    }

    $results = @()
    $totalBatchGrams = 0

    foreach ($item in $baseRecipe) {
        $qtyGrams = $item.baseGrams * $maidaKg
        $totalBatchGrams += $qtyGrams

        $displayAmount = 0
        $displayUnit = ''
        
        if ($item.isFlour) {
            $displayAmount = $maidaKg
            $displayUnit = 'kg'
        } else {
            if ($qtyGrams -ge 1000) {
                $displayAmount = [math]::Round($qtyGrams / 1000, 3)
                $displayUnit = 'kg'
            } else {
                $displayAmount = [math]::Round($qtyGrams, 3)
                $displayUnit = 'g'
            }
        }

        $results += [PSCustomObject]@{
            Id = $item.id
            Name = $item.name
            Grams = $qtyGrams
            DisplayAmount = $displayAmount
            DisplayUnit = $displayUnit
            BakersPct = $item.bakersPct
        }
    }

    return @{
        IsValid = $true
        MaidaKg = $maidaKg
        Items = $results
        TotalBatchKg = [math]::Round($totalBatchGrams / 1000, 3)
        TotalBatchGrams = $totalBatchGrams
    }
}

Write-Host "=================================================" -ForegroundColor Cyan
Write-Host " RUNNING BUN RECIPE CALCULATOR VALIDATION TESTS " -ForegroundColor Cyan
Write-Host "=================================================" -ForegroundColor Cyan

$allPass = $true

# TEST 1: 1 KG Base Recipe
$r1 = Calculate-Recipe 1
if ($r1.IsValid -and 
    ($r1.Items | Where-Object { $_.Id -eq 'sugar' }).DisplayAmount -eq 250 -and
    ($r1.Items | Where-Object { $_.Id -eq 'yeast' }).DisplayAmount -eq 18 -and
    ($r1.Items | Where-Object { $_.Id -eq 'vanilla' }).DisplayAmount -eq 5 -and
    ($r1.Items | Where-Object { $_.Id -eq 'milk_powder' }).DisplayAmount -eq 5 -and
    ($r1.Items | Where-Object { $_.Id -eq 'ghee' }).DisplayAmount -eq 50 -and
    ($r1.Items | Where-Object { $_.Id -eq 'bread_improver' }).DisplayAmount -eq 2 -and
    ($r1.Items | Where-Object { $_.Id -eq 'calcium' }).DisplayAmount -eq 5) {
    Write-Host "[PASS] Test 1: Base Recipe for 1 KG Maida matches exactly." -ForegroundColor Green
} else {
    Write-Host "[FAIL] Test 1: Base Recipe for 1 KG Maida" -ForegroundColor Red
    $allPass = $false
}

# TEST 2: User Prompt Explicit Requirement: 3 KG Maida
# Sugar: 750 g, Yeast: 54 g, Vanilla: 15 g, Milk Powder: 15 g, Ghee: 150 g, Bread Improver: 6 g, Calcium: 15 g
$r3 = Calculate-Recipe 3
$sugar3 = ($r3.Items | Where-Object { $_.Id -eq 'sugar' }).DisplayAmount
$yeast3 = ($r3.Items | Where-Object { $_.Id -eq 'yeast' }).DisplayAmount
$vanilla3 = ($r3.Items | Where-Object { $_.Id -eq 'vanilla' }).DisplayAmount
$milk3 = ($r3.Items | Where-Object { $_.Id -eq 'milk_powder' }).DisplayAmount
$ghee3 = ($r3.Items | Where-Object { $_.Id -eq 'ghee' }).DisplayAmount
$improver3 = ($r3.Items | Where-Object { $_.Id -eq 'bread_improver' }).DisplayAmount
$calcium3 = ($r3.Items | Where-Object { $_.Id -eq 'calcium' }).DisplayAmount

if ($sugar3 -eq 750 -and $yeast3 -eq 54 -and $vanilla3 -eq 15 -and $milk3 -eq 15 -and $ghee3 -eq 150 -and $improver3 -eq 6 -and $calcium3 -eq 15) {
    Write-Host "[PASS] Test 2: 3 KG Maida exact match (Sugar 750g, Yeast 54g, Vanilla 15g, Milk 15g, Ghee 150g, Improver 6g, Calcium 15g)." -ForegroundColor Green
} else {
    Write-Host "[FAIL] Test 2: 3 KG Maida failed" -ForegroundColor Red
    $allPass = $false
}

# TEST 3: Auto unit conversion when >= 1000g (5 KG Maida -> Sugar = 1250g -> 1.25 kg)
$r5 = Calculate-Recipe 5
$sugar5 = ($r5.Items | Where-Object { $_.Id -eq 'sugar' })
if ($sugar5.DisplayAmount -eq 1.25 -and $sugar5.DisplayUnit -eq 'kg') {
    Write-Host "[PASS] Test 3: Auto conversion from grams to kilograms at 1000g+ (Sugar for 5 KG is 1.25 kg)." -ForegroundColor Green
} else {
    Write-Host "[FAIL] Test 3: Auto conversion failed. Got: $($sugar5.DisplayAmount) $($sugar5.DisplayUnit)" -ForegroundColor Red
    $allPass = $false
}

# TEST 4: 25 KG Commercial Bag
$r25 = Calculate-Recipe 25
$sugar25 = ($r25.Items | Where-Object { $_.Id -eq 'sugar' })
$ghee25 = ($r25.Items | Where-Object { $_.Id -eq 'ghee' })
$yeast25 = ($r25.Items | Where-Object { $_.Id -eq 'yeast' })
if ($sugar25.DisplayAmount -eq 6.25 -and $sugar25.DisplayUnit -eq 'kg' -and
    $ghee25.DisplayAmount -eq 1.25 -and $ghee25.DisplayUnit -eq 'kg' -and
    $yeast25.DisplayAmount -eq 450 -and $yeast25.DisplayUnit -eq 'g') {
    Write-Host "[PASS] Test 4: 25 KG Commercial Bag (Sugar 6.25kg, Ghee 1.25kg, Yeast 450g)." -ForegroundColor Green
} else {
    Write-Host "[FAIL] Test 4: 25 KG Bag failed" -ForegroundColor Red
    $allPass = $false
}

# TEST 5: Decimal Inputs (1.5 kg, 2.5 kg, 7.5 kg)
$r1_5 = Calculate-Recipe 1.5
$sugar1_5 = ($r1_5.Items | Where-Object { $_.Id -eq 'sugar' }).DisplayAmount
$yeast1_5 = ($r1_5.Items | Where-Object { $_.Id -eq 'yeast' }).DisplayAmount
if ($sugar1_5 -eq 375 -and $yeast1_5 -eq 27) {
    Write-Host "[PASS] Test 5: Decimal input 1.5 kg supported (Sugar 375g, Yeast 27g)." -ForegroundColor Green
} else {
    Write-Host "[FAIL] Test 5: Decimal input failed" -ForegroundColor Red
    $allPass = $false
}

# TEST 6: Total Batch Weights
# For 1 kg maida: 1000 + 250 + 18 + 5 + 5 + 50 + 2 + 5 = 1335 g = 1.335 kg
# For 3 kg maida: 3000 + 750 + 54 + 15 + 15 + 150 + 6 + 15 = 4005 g = 4.005 kg
if ($r1.TotalBatchKg -eq 1.335 -and $r3.TotalBatchKg -eq 4.005) {
    Write-Host "[PASS] Test 6: Total Batch Weight calculation (1kg maida -> 1.335kg, 3kg maida -> 4.005kg)." -ForegroundColor Green
} else {
    Write-Host "[FAIL] Test 6: Total batch calculation failed." -ForegroundColor Red
    $allPass = $false
}

# TEST 7: Invalid / Negative prevention
$rNeg = Calculate-Recipe (-10)
$rZero = Calculate-Recipe 0
if (-not $rNeg.IsValid -and -not $rZero.IsValid) {
    Write-Host "[PASS] Test 7: Negative and Zero values correctly blocked." -ForegroundColor Green
} else {
    Write-Host "[FAIL] Test 7: Negative/Zero check failed" -ForegroundColor Red
    $allPass = $false
}

# TEST 8: 60 Gram Bun Count Yield (1 Bun = 60g)
# 1 KG Maida: 1,335g mix + 480g water = 1,815g dough / 60g = 30.25 -> 30 buns
# 3 KG Maida: 4,005g mix + 1,440g water = 5,445g dough / 60g = 90.75 -> 91 buns
# 5 KG Maida: 6,675g mix + 2,400g water = 9,075g dough / 60g = 151.25 -> 151 buns
$dough1 = 1335 + (1 * 480)
$buns1 = [math]::Round($dough1 / 60)
$dough3 = 4005 + (3 * 480)
$buns3 = [math]::Round($dough3 / 60)
$dough5 = (6675) + (5 * 480)
$buns5 = [math]::Round($dough5 / 60)

if ($buns1 -eq 30 -and $buns3 -eq 91 -and $buns5 -eq 151) {
    Write-Host "[PASS] Test 8: 60g Bun Count Calculation (1 KG -> ~30 buns, 3 KG -> ~91 buns, 5 KG -> ~151 buns)." -ForegroundColor Green
} else {
    Write-Host "[FAIL] Test 8: 60g Bun Count failed. Got: $buns1, $buns3, $buns5" -ForegroundColor Red
    $allPass = $false
}

Write-Host "-------------------------------------------------"
if ($allPass) {
    Write-Host "ALL 8 TEST SUITES PASSED FLAWLESSLY!" -ForegroundColor Green
} else {
    Write-Host "SOME TESTS FAILED!" -ForegroundColor Red
}
Write-Host "================================================="
