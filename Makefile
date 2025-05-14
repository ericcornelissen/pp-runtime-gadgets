# SPDX-License-Identifier: MIT-0

test-node:
	@echo "== RUNTIME =="
	@node --version
	@echo
	@echo "== RESULTS =="
	@node ./runners/node.js

DOCKER_NODE_VERSION=24.0.1
test-node-docker:
	@echo "== RUNTIME =="
	@docker pull node:$(DOCKER_NODE_VERSION)-alpine
	@echo
	@echo "== RESULTS =="
	@docker run -it --rm -v $(PWD):/app node:$(DOCKER_NODE_VERSION)-alpine /app/runners/node.js

test-deno:
	@echo "== RUNTIME =="
	@deno --version
	@echo
	@echo "== RESULTS =="
	@deno run ./runners/node.js

DOCKER_DENO_VERSION=2.3.1
test-deno-docker:
	@echo "== RUNTIME =="
	@docker pull denoland/deno:$(DOCKER_DENO_VERSION)
	@echo
	@echo "== RESULTS =="
	@docker run -it --rm -v $(PWD):/app denoland/deno:$(DOCKER_DENO_VERSION) run /app/runners/node.js

deploy-web:
	@rm -rf ./_site/
	@mkdir ./_site/
	@cp -r ./pocs/ ./_site/pocs
	@cp -r ./runners/ ./_site/runners
	@cp ./web/* ./_site/
	@cp ./LICENSE.md ./_site/LICENSE

test-web: deploy-web
	@cd ./_site/ && python3 -m http.server 8080

clean:
	@git clean -fx \
		_site/
