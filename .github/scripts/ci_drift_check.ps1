# ci_drift_check.ps1
# CI/CD Drift enforcement -- runs Gemini CLI in GitHub Actions
# Fails the PR/commit if the drift check does not pass.
# Requires GEMINI_API_KEY environment variable to be set in the CI runner.

$ErrorActionPreference = "Stop"

if (-not $env:GEMINI_API_KEY) {
    Write-Error "[ci_drift_check] FATAL: GEMINI_API_KEY environment variable is missing."
    exit 1
}

$env:GEMINI_CLI_TRUST_WORKSPACE = "true"

# Define the prompt to execute DP-02
$prompt = @"
DRIFT_CHECK PROTOCOL:
1. Load @GEMINI.md to get current rules for this repository.
2. Check: are all DP rules active? Anti-slop? Output format? Adversarial gate?
3. Output exactly one line: DRIFT_CHECK_CI: PASS  OR  DRIFT_CHECK_CI: FAIL -- [rule_id] -- [correction]
4. No other output. The single marker line is the only output needed.
"@

Write-Host "[ci_drift_check] Executing DP-02 protocol in CI pipeline..." -ForegroundColor Cyan

# Install Gemini CLI if not present
if (-not (Get-Command "gemini" -ErrorAction SilentlyContinue)) {
    Write-Host "[ci_drift_check] Installing @google/gemini-cli..."
    npm install -g @google/gemini-cli
}

# Run the drift check. We pass the model explicitly to respect VM-01 lock.
$result = gemini --model gemini-3.1-flash-lite -p $prompt

Write-Host $result

if ($result -match "DRIFT_CHECK_.*FAIL") {
    Write-Error "[ci_drift_check] DRIFT CHECK FAILED in CI. Rejecting commit."
    exit 1
}

Write-Host "[ci_drift_check] DRIFT CHECK PASSED in CI." -ForegroundColor Green
exit 0
