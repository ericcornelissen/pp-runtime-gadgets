test-node:
	@echo "== RUNTIME =="
	@node --version
	@echo
	@echo "== RESULTS =="
	@node ./runners/node.js

test-deno:
	@echo "== RUNTIME =="
	@deno --version
	@echo
	@echo "== RESULTS =="
	@deno run ./runners/node.js

deploy-web:
	@rm -rf ./_site/
	@mkdir ./_site/
	@cp -r ./pocs ./_site/pocs
	@cp -r ./runners ./_site/runners
	@cp ./web/index.html ./_site/index.html

test-web: deploy-web
	@cd ./_site/ && python3 -m http.server 8080
