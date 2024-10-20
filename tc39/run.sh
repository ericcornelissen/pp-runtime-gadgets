#!/bin/bash

set -eo pipefail

LOG_FILE='../run.log'
JSON_FILE='../run.json'
SARIF_FILE='../run.sarif'

cd test262 || exit

echo '========= REWRITING =========='
find ./test/built-ins/ -type f -name "*.js" -exec node ../rewriter.js {} \;

echo
echo '========== RUNNING ==========='
find ./test/built-ins/ -type d -exec npx test262-harness '{}/*.js' \; | tee "${LOG_FILE}"

echo
echo '========= ANALYZING =========='
node ../analyze.js "${LOG_FILE}" "${JSON_FILE}"

echo
echo '====== GENERATING SARIF ======'
node ../to-sarif.js "${JSON_FILE}" "${SARIF_FILE}"

echo
echo '========= RESETTING =========='
cd test262
git reset --hard
cd ..
