# connect-logger-statsd
connect-logger-statsd is a middleware layer for [Connect](https://github.com/senchalabs/connect) (running on node.js) that sends request log info to [statsd](http://codeascraft.etsy.com/2011/02/15/measure-anything-measure-everything/).

## Purpose
If you're running a web service in production, you want to know about your traffic load. Instead of scraping log files, this middleware will send some request log statistics to statsd (which you can feed into carbon/graphite, monitoring tools, etc).

As of now, we record the request time (as a statsd "timer") and request rates, broken down by response code.

## Installation

    $ npm install connect-logger-statsd

## Usage

Require the module:

    var logger_statsd = require("connect-logger-statsd");

And register the middleware:

    app.use(logger_statsd({
      host: "statsd.example.org",
      port: 8125,
      prefix: "example."
    }));

## Options

   - `host`     hostname or IP of statsd server (default "localhost")
   - `port`     port of statsd server (default 8125)
   - `prefix`   statsd metric name prefix. include the trailing "."
                (default "")

## License

MPL 1.1/GPL 2.0/LGPL 2.1
