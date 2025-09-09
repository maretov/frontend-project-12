install:
	npm ci

start-frontend:
	make -C frontend develop

start-backend:
	npx start-server -s ./frontend/dist

build:
	rm -rf frontend/dist
	npm run build

start:
	make start-backend

develop:
	make start-backend & make start-frontend