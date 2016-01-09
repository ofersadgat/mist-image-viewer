
KARMA=node_modules/.bin/karma 
ESLINT=node_modules/.bin/eslint 
WEBPACK=node_modules/.bin/webpack
SOURCES=$(shell find src -name "*.js")

dist: $(WEBPACK) $(SOURCES) webpack.production.config.js package.json
	$(WEBPACK) --config webpack.production.config.js
	cp package.json dist

dev: $(WEBPACK) $(SOURCES) webpack.local.config.js
	$(WEBPACK) --config webpack.local.config.js

test: $(KARMA) karma.conf.js
	$(KARMA) start karma.conf.js

node_modules: package.json
	npm install




