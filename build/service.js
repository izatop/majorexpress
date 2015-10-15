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
        value: function call(method) {
            var _this2 = this;

            var parameters = arguments.length <= 1 || arguments[1] === undefined ? {} : arguments[1];

            return new Promise(function (resolve, reject) {
                _this2.createClient().then(function (client) {
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uL3NyYy9zZXJ2aWNlLnRzIl0sIm5hbWVzIjpbIlNlcnZpY2UiLCJTZXJ2aWNlLmNvbnN0cnVjdG9yIiwiU2VydmljZS5jcmVhdGVDbGllbnQiLCJTZXJ2aWNlLmNhbGwiXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozs7O29CQUdzQixNQUFNOztJQUFoQixJQUFJOztJQUVoQixPQUFBO0FBSUlBLGFBSkosT0FBQSxDQUlnQkEsT0FBK0NBLEVBQUFBOzhCQUovRCxPQUFBOztBQUtRQyxZQUFJQSxDQUFDQSxPQUFPQSxHQUFHQSxPQUFPQSxDQUFDQTtLQUMxQkE7O2lCQU5MLE9BQUE7O2VBV2dCRCx3QkFBQUE7OztBQUNSRSxtQkFBT0EsSUFBSUEsT0FBT0EsQ0FBQ0EsVUFBQ0EsT0FBT0EsRUFBRUEsTUFBTUEsRUFBQUE7QUFDL0JBLG9CQUFJQSxNQUFLQSxNQUFNQSxFQUFFQTtBQUNiQSwyQkFBT0EsT0FBT0EsQ0FBQ0EsTUFBS0EsTUFBTUEsQ0FBQ0EsQ0FBQ0E7aUJBQy9CQTtBQUVEQSxvQkFBSUEsQ0FBQ0EsWUFBWUEsQ0FBQ0EsTUFBS0EsT0FBT0EsQ0FBQ0EsR0FBR0EsRUFBRUEsVUFBQ0EsS0FBS0EsRUFBRUEsTUFBc0JBLEVBQUFBO0FBQzlEQSx3QkFBSUEsS0FBS0EsRUFBRUE7QUFDUEEsK0JBQU9BLE1BQU1BLENBQUNBLEtBQUtBLENBQUNBLENBQUNBO3FCQUN4QkE7QUFFREEsMEJBQUtBLE1BQU1BLEdBQUdBLE1BQU1BLENBQUNBO0FBQ3JCQSwyQkFBT0EsQ0FBQ0EsTUFBTUEsQ0FBQ0EsQ0FBQ0E7aUJBQ25CQSxDQUFDQSxDQUFDQTthQUNOQSxDQUFDQSxDQUFDQTtTQUNOQTs7O2VBU0dGLGNBQUlBLE1BQWFBLEVBQWtDQTs7O2dCQUFoQ0EsVUFBVUEseURBQW9CQSxFQUFFQTs7QUFDbkRHLG1CQUFPQSxJQUFJQSxPQUFPQSxDQUFDQSxVQUFDQSxPQUFPQSxFQUFFQSxNQUFNQSxFQUFBQTtBQUMvQkEsdUJBQUtBLFlBQVlBLEVBQUVBLENBQUNBLElBQUlBLENBQUNBLFVBQUNBLE1BQU1BLEVBQUFBO0FBQzVCQSx3QkFBSUEsTUFBTUEsQ0FBQ0EsY0FBY0EsQ0FBQ0EsTUFBTUEsQ0FBQ0EsRUFBRUE7QUFDL0JBLDRCQUFJQSxDQUFDQSxVQUFVQSxFQUFFQTtBQUNiQSxzQ0FBVUEsR0FBR0EsRUFBRUEsQ0FBQ0E7eUJBQ25CQTtBQUVEQSwrQkFBT0EsTUFBTUEsQ0FBQ0EsTUFBTUEsQ0FBQ0EsQ0FBQ0EsSUFBSUEsQ0FBQ0EsTUFBTUEsRUFBRUEsVUFBVUEsRUFBRUEsVUFBQ0EsS0FBS0EsRUFBRUEsTUFBTUEsRUFBQUE7QUFDekRBLGdDQUFJQSxLQUFLQSxFQUFFQTtBQUNQQSx1Q0FBT0EsTUFBTUEsQ0FBQ0EsS0FBS0EsQ0FBQ0EsQ0FBQ0E7NkJBQ3hCQTtBQUVEQSxtQ0FBT0EsQ0FBQ0EsTUFBTUEsQ0FBQ0EsQ0FBQ0E7eUJBQ25CQSxDQUFDQSxDQUFDQTtxQkFDTkEsTUFBTUE7QUFDSEEsOEJBQU1BLENBQUNBLElBQUlBLEtBQUtBLGFBQVdBLE1BQU1BLG9CQUFpQkEsQ0FBQ0EsQ0FBQ0E7cUJBQ3ZEQTtpQkFDSkEsQ0FBQ0EsU0FDSUEsQ0FBQ0EsTUFBTUEsQ0FBQ0EsQ0FBQ0E7YUFDbEJBLENBQUNBLENBQUNBO1NBQ05BOzs7V0F4REwsT0FBQSIsImZpbGUiOiJzZXJ2aWNlLmpzIiwic291cmNlc0NvbnRlbnQiOlsiLy8vIDxyZWZlcmVuY2UgcGF0aD1cIi4uL3R5cGluZ3MvdHNkLmQudHNcIiAvPlxyXG4vLy8gPHJlZmVyZW5jZSBwYXRoPVwiLi9pbmRleC5kLnRzXCIgLz5cclxuXHJcbmltcG9ydCAqIGFzIFNPQVAgZnJvbSAnc29hcCc7XHJcblxyXG5leHBvcnQgY2xhc3MgU2VydmljZSB7XHJcbiAgICBvcHRpb25zOnt1cmw6c3RyaW5nLCB1c2VyOnN0cmluZywgcGFzcz86c3RyaW5nfTtcclxuICAgIGNsaWVudDpTT0FQLlNPQVBDbGllbnQ7XHJcblxyXG4gICAgY29uc3RydWN0b3Iob3B0aW9uczp7dXJsOnN0cmluZywgdXNlcjpzdHJpbmcsIHBhc3M/OnN0cmluZ30pIHtcclxuICAgICAgICB0aGlzLm9wdGlvbnMgPSBvcHRpb25zO1xyXG4gICAgfVxyXG5cclxuICAgIC8qKlxyXG4gICAgICogRGVmZXJyZWQgY3JlYXRpb24uXHJcbiAgICAgKi9cclxuICAgIGNyZWF0ZUNsaWVudCgpOlByb21pc2U8U09BUC5TT0FQQ2xpZW50PiB7XHJcbiAgICAgICAgcmV0dXJuIG5ldyBQcm9taXNlKChyZXNvbHZlLCByZWplY3QpID0+IHtcclxuICAgICAgICAgICAgaWYgKHRoaXMuY2xpZW50KSB7XHJcbiAgICAgICAgICAgICAgICByZXR1cm4gcmVzb2x2ZSh0aGlzLmNsaWVudCk7XHJcbiAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICAgIFNPQVAuY3JlYXRlQ2xpZW50KHRoaXMub3B0aW9ucy51cmwsIChlcnJvciwgY2xpZW50OlNPQVAuU09BUENsaWVudCkgPT4ge1xyXG4gICAgICAgICAgICAgICAgaWYgKGVycm9yKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuIHJlamVjdChlcnJvcik7XHJcbiAgICAgICAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgICAgICAgdGhpcy5jbGllbnQgPSBjbGllbnQ7XHJcbiAgICAgICAgICAgICAgICByZXNvbHZlKGNsaWVudCk7XHJcbiAgICAgICAgICAgIH0pO1xyXG4gICAgICAgIH0pO1xyXG4gICAgfVxyXG5cclxuICAgIC8qKlxyXG4gICAgICogVGhpcyBmdW5jdGlvbiBjYWxscyB0aGUgc2VydmljZSBvd24gbWV0aG9kcy5cclxuICAgICAqXHJcbiAgICAgKiBAcGFyYW0gbWV0aG9kICAgICAgICBTZXJ2aWNlJ3MgbWV0aG9kIG5hbWVcclxuICAgICAqIEBwYXJhbSBwYXJhbWV0ZXJzICAgIE1ldGhvZCdzIHBhcmFtZXRlcnNcclxuICAgICAqIEByZXR1cm5zIHtQcm9taXNlPFQ+fVxyXG4gICAgICovXHJcbiAgICBjYWxsPFQ+KG1ldGhvZDpzdHJpbmcsIHBhcmFtZXRlcnM6e1t4OnN0cmluZ106YW55fSA9IHt9KTpQcm9taXNlPFQ+IHtcclxuICAgICAgICByZXR1cm4gbmV3IFByb21pc2UoKHJlc29sdmUsIHJlamVjdCkgPT4ge1xyXG4gICAgICAgICAgICB0aGlzLmNyZWF0ZUNsaWVudCgpLnRoZW4oKGNsaWVudCkgPT4ge1xyXG4gICAgICAgICAgICAgICAgaWYgKGNsaWVudC5oYXNPd25Qcm9wZXJ0eShtZXRob2QpKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgaWYgKCFwYXJhbWV0ZXJzKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHBhcmFtZXRlcnMgPSB7fTtcclxuICAgICAgICAgICAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgICAgICAgICAgIHJldHVybiBjbGllbnRbbWV0aG9kXS5jYWxsKGNsaWVudCwgcGFyYW1ldGVycywgKGVycm9yLCByZXN1bHQpID0+IHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgaWYgKGVycm9yKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICByZXR1cm4gcmVqZWN0KGVycm9yKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICAgICAgICAgICAgICAgICAgcmVzb2x2ZShyZXN1bHQpO1xyXG4gICAgICAgICAgICAgICAgICAgIH0pO1xyXG4gICAgICAgICAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgICAgICAgICByZWplY3QobmV3IEVycm9yKGBNZXRob2QgJHttZXRob2R9IGhhcyBub3QgZm91bmRgKSk7XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIH0pXHJcbiAgICAgICAgICAgIC5jYXRjaChyZWplY3QpO1xyXG4gICAgICAgIH0pO1xyXG4gICAgfVxyXG59XHJcblxyXG5cclxuIl0sInNvdXJjZVJvb3QiOiJlOlxcd3d3XFxkZWxpdmVyeVxcbWFqb3JleHByZXNzXFxidWlsZC10cyJ9
