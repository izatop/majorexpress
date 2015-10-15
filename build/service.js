/// <reference path="../typings/tsd.d.ts" />
/// <reference path="./index.d.ts" />
'use strict';

Object.defineProperty(exports, '__esModule', {
    value: true
});

var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ('value' in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj['default'] = obj; return newObj; } }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError('Cannot call a class as a function'); } }

var _soap = require('soap');

var SOAP = _interopRequireWildcard(_soap);

var Service = (function () {
    function Service(options) {
        _classCallCheck(this, Service);

        this.options = options;
    }

    _createClass(Service, [{
        key: 'createClient',
        value: function createClient() {
            var _this = this;

            return new Promise(function (resolve, reject) {
                if (_this.client) {
                    return resolve(_this.client);
                }
                SOAP.createClient(_this.options.url, function (error, client) {
                    if (error) {
                        return reject(error);
                    }
                    _this.client = client;
                    resolve(client);
                });
            });
        }
    }, {
        key: 'call',
        value: function call(method, parameters) {
            var _this2 = this;

            return new Promise(function (resolve, reject) {
                _this2.createClient().then(function (client) {
                    console.log(require('util').inspect(client.describe(), { depth: Infinity }));
                    if (client.hasOwnProperty(method)) {
                        if (!parameters) {
                            parameters = {};
                        }
                        return client[method].call(client, parameters, function (error, result) {
                            if (error) {
                                return reject(error);
                            }
                            resolve(result);
                        });
                    } else {
                        reject(new Error('Method ' + method + ' has not found'));
                    }
                })['catch'](reject);
            });
        }
    }]);

    return Service;
})();

exports.Service = Service;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uL3NyYy9zZXJ2aWNlLnRzIl0sIm5hbWVzIjpbIlNlcnZpY2UiLCJTZXJ2aWNlLmNvbnN0cnVjdG9yIiwiU2VydmljZS5jcmVhdGVDbGllbnQiLCJTZXJ2aWNlLmNhbGwiXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozs7O29CQUdzQixNQUFNOztJQUFoQixJQUFJOztJQUVoQixPQUFBO0FBSUlBLGFBSkosT0FBQSxDQUlnQkEsT0FBOENBLEVBQUFBOzhCQUo5RCxPQUFBOztBQUtRQyxZQUFJQSxDQUFDQSxPQUFPQSxHQUFHQSxPQUFPQSxDQUFDQTtLQUMxQkE7O2lCQU5MLE9BQUE7O2VBV2dCRCx3QkFBQUE7OztBQUNSRSxtQkFBT0EsSUFBSUEsT0FBT0EsQ0FBQ0EsVUFBQ0EsT0FBT0EsRUFBRUEsTUFBTUEsRUFBQUE7QUFDL0JBLG9CQUFJQSxNQUFLQSxNQUFNQSxFQUFFQTtBQUNiQSwyQkFBT0EsT0FBT0EsQ0FBQ0EsTUFBS0EsTUFBTUEsQ0FBQ0EsQ0FBQ0E7aUJBQy9CQTtBQUVEQSxvQkFBSUEsQ0FBQ0EsWUFBWUEsQ0FBQ0EsTUFBS0EsT0FBT0EsQ0FBQ0EsR0FBR0EsRUFBRUEsVUFBQ0EsS0FBS0EsRUFBRUEsTUFBc0JBLEVBQUFBO0FBQzlEQSx3QkFBSUEsS0FBS0EsRUFBRUE7QUFDUEEsK0JBQU9BLE1BQU1BLENBQUNBLEtBQUtBLENBQUNBLENBQUNBO3FCQUN4QkE7QUFFREEsMEJBQUtBLE1BQU1BLEdBQUdBLE1BQU1BLENBQUNBO0FBQ3JCQSwyQkFBT0EsQ0FBQ0EsTUFBTUEsQ0FBQ0EsQ0FBQ0E7aUJBQ25CQSxDQUFDQSxDQUFDQTthQUNOQSxDQUFDQSxDQUFDQTtTQUNOQTs7O2VBU0dGLGNBQUlBLE1BQWFBLEVBQUVBLFVBQTJCQSxFQUFBQTs7O0FBQzlDRyxtQkFBT0EsSUFBSUEsT0FBT0EsQ0FBQ0EsVUFBQ0EsT0FBT0EsRUFBRUEsTUFBTUEsRUFBQUE7QUFDL0JBLHVCQUFLQSxZQUFZQSxFQUFFQSxDQUFDQSxJQUFJQSxDQUFDQSxVQUFDQSxNQUFNQSxFQUFBQTtBQUU1QkEsMkJBQU9BLENBQUNBLEdBQUdBLENBQUNBLE9BQU9BLENBQUNBLE1BQU1BLENBQUNBLENBQUNBLE9BQU9BLENBQUNBLE1BQU1BLENBQUNBLFFBQVFBLEVBQUVBLEVBQUVBLEVBQUNBLEtBQUtBLEVBQUVBLFFBQVFBLEVBQUNBLENBQUNBLENBQUNBLENBQUNBO0FBQzNFQSx3QkFBSUEsTUFBTUEsQ0FBQ0EsY0FBY0EsQ0FBQ0EsTUFBTUEsQ0FBQ0EsRUFBRUE7QUFDL0JBLDRCQUFJQSxDQUFDQSxVQUFVQSxFQUFFQTtBQUNiQSxzQ0FBVUEsR0FBR0EsRUFBRUEsQ0FBQ0E7eUJBQ25CQTtBQUVEQSwrQkFBT0EsTUFBTUEsQ0FBQ0EsTUFBTUEsQ0FBQ0EsQ0FBQ0EsSUFBSUEsQ0FBQ0EsTUFBTUEsRUFBRUEsVUFBVUEsRUFBRUEsVUFBQ0EsS0FBS0EsRUFBRUEsTUFBTUEsRUFBQUE7QUFDekRBLGdDQUFJQSxLQUFLQSxFQUFFQTtBQUNQQSx1Q0FBT0EsTUFBTUEsQ0FBQ0EsS0FBS0EsQ0FBQ0EsQ0FBQ0E7NkJBQ3hCQTtBQUVEQSxtQ0FBT0EsQ0FBQ0EsTUFBTUEsQ0FBQ0EsQ0FBQ0E7eUJBQ25CQSxDQUFDQSxDQUFDQTtxQkFDTkEsTUFBTUE7QUFDSEEsOEJBQU1BLENBQUNBLElBQUlBLEtBQUtBLGFBQVdBLE1BQU1BLG9CQUFpQkEsQ0FBQ0EsQ0FBQ0E7cUJBQ3ZEQTtpQkFDSkEsQ0FBQ0EsU0FDSUEsQ0FBQ0EsTUFBTUEsQ0FBQ0EsQ0FBQ0E7YUFDbEJBLENBQUNBLENBQUNBO1NBQ05BOzs7V0ExREwsT0FBQSIsImZpbGUiOiJzZXJ2aWNlLmpzIiwic291cmNlc0NvbnRlbnQiOlsiLy8vIDxyZWZlcmVuY2UgcGF0aD1cIi4uL3R5cGluZ3MvdHNkLmQudHNcIiAvPlxyXG4vLy8gPHJlZmVyZW5jZSBwYXRoPVwiLi9pbmRleC5kLnRzXCIgLz5cclxuXHJcbmltcG9ydCAqIGFzIFNPQVAgZnJvbSAnc29hcCc7XHJcblxyXG5leHBvcnQgY2xhc3MgU2VydmljZSB7XHJcbiAgICBvcHRpb25zOnt1cmw6c3RyaW5nLCB1c2VyOnN0cmluZywgcGFzczpzdHJpbmd9O1xyXG4gICAgY2xpZW50OlNPQVAuU09BUENsaWVudDtcclxuXHJcbiAgICBjb25zdHJ1Y3RvcihvcHRpb25zOnt1cmw6c3RyaW5nLCB1c2VyOnN0cmluZywgcGFzczpzdHJpbmd9KSB7XHJcbiAgICAgICAgdGhpcy5vcHRpb25zID0gb3B0aW9ucztcclxuICAgIH1cclxuXHJcbiAgICAvKipcclxuICAgICAqIERlZmVycmVkIGNyZWF0aW9uLlxyXG4gICAgICovXHJcbiAgICBjcmVhdGVDbGllbnQoKTpQcm9taXNlPFNPQVAuU09BUENsaWVudD4ge1xyXG4gICAgICAgIHJldHVybiBuZXcgUHJvbWlzZSgocmVzb2x2ZSwgcmVqZWN0KSA9PiB7XHJcbiAgICAgICAgICAgIGlmICh0aGlzLmNsaWVudCkge1xyXG4gICAgICAgICAgICAgICAgcmV0dXJuIHJlc29sdmUodGhpcy5jbGllbnQpO1xyXG4gICAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgICBTT0FQLmNyZWF0ZUNsaWVudCh0aGlzLm9wdGlvbnMudXJsLCAoZXJyb3IsIGNsaWVudDpTT0FQLlNPQVBDbGllbnQpID0+IHtcclxuICAgICAgICAgICAgICAgIGlmIChlcnJvcikge1xyXG4gICAgICAgICAgICAgICAgICAgIHJldHVybiByZWplY3QoZXJyb3IpO1xyXG4gICAgICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICAgICAgICAgIHRoaXMuY2xpZW50ID0gY2xpZW50O1xyXG4gICAgICAgICAgICAgICAgcmVzb2x2ZShjbGllbnQpO1xyXG4gICAgICAgICAgICB9KTtcclxuICAgICAgICB9KTtcclxuICAgIH1cclxuXHJcbiAgICAvKipcclxuICAgICAqIFRoaXMgZnVuY3Rpb24gY2FsbHMgdGhlIHNlcnZpY2Ugb3duIG1ldGhvZHMuXHJcbiAgICAgKlxyXG4gICAgICogQHBhcmFtIG1ldGhvZCAgICAgICAgU2VydmljZSdzIG1ldGhvZCBuYW1lXHJcbiAgICAgKiBAcGFyYW0gcGFyYW1ldGVycyAgICBNZXRob2QncyBwYXJhbWV0ZXJzXHJcbiAgICAgKiBAcmV0dXJucyB7UHJvbWlzZTxUPn1cclxuICAgICAqL1xyXG4gICAgY2FsbDxUPihtZXRob2Q6c3RyaW5nLCBwYXJhbWV0ZXJzOntbeDpzdHJpbmddOmFueX0pOlByb21pc2U8VD4ge1xyXG4gICAgICAgIHJldHVybiBuZXcgUHJvbWlzZSgocmVzb2x2ZSwgcmVqZWN0KSA9PiB7XHJcbiAgICAgICAgICAgIHRoaXMuY3JlYXRlQ2xpZW50KCkudGhlbigoY2xpZW50KSA9PiB7XHJcblxyXG4gICAgICAgICAgICAgICAgY29uc29sZS5sb2cocmVxdWlyZSgndXRpbCcpLmluc3BlY3QoY2xpZW50LmRlc2NyaWJlKCksIHtkZXB0aDogSW5maW5pdHl9KSk7XHJcbiAgICAgICAgICAgICAgICBpZiAoY2xpZW50Lmhhc093blByb3BlcnR5KG1ldGhvZCkpIHtcclxuICAgICAgICAgICAgICAgICAgICBpZiAoIXBhcmFtZXRlcnMpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgcGFyYW1ldGVycyA9IHt9O1xyXG4gICAgICAgICAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuIGNsaWVudFttZXRob2RdLmNhbGwoY2xpZW50LCBwYXJhbWV0ZXJzLCAoZXJyb3IsIHJlc3VsdCkgPT4ge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBpZiAoZXJyb3IpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHJldHVybiByZWplY3QoZXJyb3IpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgICAgICAgICAgICAgICByZXNvbHZlKHJlc3VsdCk7XHJcbiAgICAgICAgICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICAgICAgICAgIHJlamVjdChuZXcgRXJyb3IoYE1ldGhvZCAke21ldGhvZH0gaGFzIG5vdCBmb3VuZGApKTtcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgfSlcclxuICAgICAgICAgICAgLmNhdGNoKHJlamVjdCk7XHJcbiAgICAgICAgfSk7XHJcbiAgICB9XHJcbn1cclxuXHJcblxyXG4iXSwic291cmNlUm9vdCI6ImU6XFx3d3dcXGRlbGl2ZXJ5XFxtYWpvcmV4cHJlc3NcXGJ1aWxkLXRzIn0=
