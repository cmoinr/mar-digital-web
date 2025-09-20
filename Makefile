.PHONY: dev dev-web dev-back api-types format lint

dev: dev-back dev-web

dev-web:
	cd apps/web && pnpm dev

dev-back:
	cd apps/backend && uvicorn app.main:app --reload --port 8000

api-types:
	# Export OpenAPI schema
	curl -s http://localhost:8000/openapi.json -o apps/backend/openapi.json
	cd packages/api-client && pnpm run generate

lint:
	cd apps/web && pnpm run lint
	cd apps/backend && ruff check app

format:
	cd apps/web && pnpm run format
	cd apps/backend && ruff format app
