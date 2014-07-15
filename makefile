MOCHA?=node_modules/.bin/mocha
REPORTER?=spec
GROWL?=--growl
EXTRA?=
BAIL=--bail
FLAGS=$(GROWL) --reporter $(REPORTER) --colors $(BAIL) $(EXTRA)
COVERAGE=--require blanket -R html-cov

develop: build config

deploy: clean build-production

config:
	@if [ ! -e config/default.yml ]; then cp config/default.example.yml config/default.yml; fi;

clean:
	@echo "-----> remove node_modules folder"
	@rm -rf node_modules || true
	@echo "       node_modules removed"

build-production:
	@echo "-----> npm install --production"
	@npm install --silent --production
	@echo "       npm install complete"

build:
	@npm install

test:
	@NODE_ENV="test" \
	$(MOCHA) $(FLAGS)

.PHONY: test config
