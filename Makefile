.DEFAULT_GOAL := help

E2E_DIR := e2e-tests
API_DIR := packages/applications-service-api
API_ENV_FILE := $(API_DIR)/.env
API_ENV_TEMPLATE := $(API_DIR)/.env.development
BROWSER ?= chrome
TAGS ?= not (@wip or @ignore)
SPEC ?=
BASE_URL ?= http://localhost:9004

.PHONY: help
help:
	@printf "\nApplications Service helper targets\n\n"
	@printf "Dependencies:\n"
	@printf "  make install           Install root and E2E dependencies\n"
	@printf "  make install-root      Install root dependencies\n"
	@printf "  make install-e2e       Install E2E dependencies\n\n"
	@printf "Environment:\n"
	@printf "  make api-env           Create API .env from .env.development if missing\n\n"
	@printf "Database:\n"
	@printf "  make db-up             Start the SQL Server container needed for Prisma\n"
	@printf "  make db-setup          Generate client, migrate, and seed the database\n"
	@printf "  make db-generate       Generate Prisma client\n"
	@printf "  make db-migrate        Run local DB migrations\n"
	@printf "  make db-seed           Seed the local DB\n"
	@printf "  make db-reset          Reset the local DB\n\n"
	@printf "App:\n"
	@printf "  make dev              Start the local stack\n"
	@printf "  make dev-api          Start only the API service\n"
	@printf "  make dev-web          Start only the web service\n"
	@printf "  make down             Stop docker compose services\n\n"
	@printf "Cypress:\n"
	@printf "  make e2e-open         Open Cypress UI in Chrome by default\n"
	@printf "  make e2e              Run default E2E suite\n"
	@printf "  make e2e-demo         Run headed E2E suite with demo delay\n"
	@printf "  make e2e-smoke        Run smoke tests with BASE_URL override support\n"
	@printf "  make e2e-report       Generate HTML report from cucumber JSON\n"
	@printf "  make e2e-tags TAGS='@registration and @myself'\n"
	@printf "  make e2e-spec SPEC='cypress/e2e/some.feature'\n"
	@printf "  make e2e-dir SPEC='cypress/e2e/registration/myself/**/*.feature'\n\n"

.PHONY: install install-root install-e2e
install: install-root install-e2e

install-root:
	npm ci

install-e2e:
	npm --prefix $(E2E_DIR) ci

.PHONY: api-env
api-env:
	@if [ -f "$(API_ENV_FILE)" ]; then \
		echo "API env already present at $(API_ENV_FILE)"; \
	elif [ -f "$(API_ENV_TEMPLATE)" ]; then \
		cp "$(API_ENV_TEMPLATE)" "$(API_ENV_FILE)"; \
		echo "Created $(API_ENV_FILE) from $(API_ENV_TEMPLATE)"; \
	else \
		echo "Missing API env template: $(API_ENV_TEMPLATE)"; \
		exit 1; \
	fi

.PHONY: db-up db-setup db-generate db-migrate db-seed db-reset
db-up:
	docker compose up -d mssql

db-setup: api-env db-generate db-migrate db-seed

db-generate:
	npm run db:generate

db-migrate:
	npm run db:migrate:dev

db-seed:
	npm run db:seed

db-reset:
	npm run db:reset

.PHONY: dev dev-api dev-web down
dev:
	npm run dev

dev-api:
	npm run dev:api

dev-web:
	npm run dev:web

down:
	docker compose down

.PHONY: e2e-open e2e e2e-demo e2e-smoke e2e-report e2e-tags e2e-spec e2e-dir
e2e-open: install-e2e
	cd $(E2E_DIR) && demoDelay=1000 npx cypress open --browser $(BROWSER)

e2e:
	npm --prefix $(E2E_DIR) run test:e2e

e2e-demo:
	npm --prefix $(E2E_DIR) run test:e2e:demo

e2e-smoke:
	BASEURL=$(BASE_URL) npm --prefix $(E2E_DIR) run test:e2e:smoke

e2e-report:
	npm --prefix $(E2E_DIR) run test:e2e:postprocess

e2e-tags:
	cd $(E2E_DIR) && npx cypress-tags run -b chrome --env TAGS="$(TAGS)"

e2e-spec:
	cd $(E2E_DIR) && npx cypress-tags run -b chrome --env TAGS="$(TAGS)" --spec "$(SPEC)"

e2e-dir:
	cd $(E2E_DIR) && npx cypress-tags run -b chrome --env TAGS="$(TAGS)" --spec "$(SPEC)"
