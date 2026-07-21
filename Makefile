# Domino — monorepo build
#
#   site/   Hugo sources    ->  dist/        (root of the deployed site)
#   book/   mdBook sources  ->  dist/book/   (served at /book/)
#
# Deploy the whole dist/ directory to the same origin (domino-prover.org).

.PHONY: all build site book clean serve-site serve-book help

all: build

## build: clean, then build the site and the guide into dist/
build: clean site book
	@echo "✓ built into ./dist  (deploy this directory)"

## site: build the Hugo marketing site into dist/ (also emits dist/nav.json)
site:
	cd site && hugo --minify

## book: build the mdBook guide into dist/book/
## Runs after `site` so Hugo never clobbers the book output.
book:
	cd book && mdbook build

## clean: remove the shared output directory
clean:
	rm -rf dist

## serve-site: live-reload the marketing site (http://localhost:1313)
serve-site:
	cd site && hugo server

## serve-book: live-reload the guide (http://localhost:3000)
serve-book:
	cd book && mdbook serve

## help: list targets
help:
	@grep -E '^## ' $(MAKEFILE_LIST) | sed 's/## //'
