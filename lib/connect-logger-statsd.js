/*!
* connect logger-statsd middleware
*
* @author Pete Fritchman <petef@databits.net>
* MPL 1.1/GPL 2.0/LGPL 2.1
*/

/*
 * Required modules.
 */
var StatsD = require("node-statsd").StatsD;

/*
 * Generate statsd updates for each request.
 *
 * - statsd counters named "response.$code" (e.g. response.200)
 * - a statsd timer named "response_time"
 *
 * Options:
 *   - `host`     hostname or IP of statsd server (default "localhost")
 *   - `port`     port of statsd server (default 8125)
 *   - `prefix`   statsd metric name prefix. include the trailing "."
 *                (default "")
 *
 * @param {Object} options
 * @api public
 */
module.exports = function(options) {
  var statsd_client;
  if (options == null) {
      options = {};
  }
  options["host"] = options["host"] || "localhost";
  options["port"] = options["port"] || 8125;

  statsd_client = new StatsD(options["host"], options["port"]);

  return function(req, res, next){
    req._stats_startTime = new Date;

    var end = res.end;
    res.end = function(chunk, encoding) {
      var reqTime = new Date - req._stats_startTime;

      end.call(res, chunk, encoding);

      /* request time */
      statsd_client.timing(options["prefix"] + "response_time", reqTime);

      /* responses by status code */
      statsd_client.increment(options["prefix"] + "response." + res.statusCode);
    };

    next();
  };
}
