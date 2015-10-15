/// <reference path="./index.d.ts" />
'use strict';

Object.defineProperty(exports, '__esModule', {
    value: true
});

var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ('value' in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError('Cannot call a class as a function'); } }

var _service = require('./service');

var trim = function trim(str) {
    if (typeof str === "string") {
        return str.replace(/^\s*/, '').replace(/\s*$/, '');
    }
    return str;
};

var Location = function Location(item) {
    _classCallCheck(this, Location);

    this.code = Number(item.code);
    this.city = trim(item.city);
    this.parent = trim(item.parent);
    this.agent = {
        code: Number(item.agent.code),
        name: trim(item.agent.name)
    };
};

var Calculation = function Calculation(item) {
    _classCallCheck(this, Calculation);

    this.city = trim(item.city);
    this.parent = trim(item.parent);
    this.cost = Number(item.cost);
    this.insurance = Number(item.insurance);
    this.time = Number(item.time);
};

var API = (function () {
    function API(user) {
        var pass = arguments.length <= 1 || arguments[1] === undefined ? null : arguments[1];

        _classCallCheck(this, API);

        this.clientName = user;
        this.service = new _service.Service({ url: 'http://couriernew.me-online.ru/Calculator.asmx?WSDL', user: user, pass: pass });
    }

    _createClass(API, [{
        key: 'getCities',
        value: function getCities() {
            return this.service.call('Citys').then(function (result) {
                var data = [];
                if (result.hasOwnProperty('CitysResult') == false || result.CitysResult.hasOwnProperty('diffgram') === false || result.CitysResult.diffgram.hasOwnProperty('DocumentElement') == false || result.CitysResult.diffgram.DocumentElement.hasOwnProperty('Cities') == false) {
                    return data;
                }
                var _iteratorNormalCompletion = true;
                var _didIteratorError = false;
                var _iteratorError = undefined;

                try {
                    for (var _iterator = result.CitysResult.diffgram.DocumentElement.Cities[Symbol.iterator](), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
                        var item = _step.value;

                        var city = /([а-яf-z0-9_\s\.-]+)\s*(\(([а-яf-z0-9_\s\.-]+)\))?/i.exec(item.CityRusName);
                        var agent = /([а-яf-z0-9_\s\.-]+)\s*/i.exec(item.AgentNameRus);
                        data.push(new Location({
                            code: item.CityCode,
                            city: city[1],
                            parent: city[3] || null,
                            agent: {
                                code: item.AgentCode,
                                name: agent[1]
                            }
                        }));
                    }
                } catch (err) {
                    _didIteratorError = true;
                    _iteratorError = err;
                } finally {
                    try {
                        if (!_iteratorNormalCompletion && _iterator['return']) {
                            _iterator['return']();
                        }
                    } finally {
                        if (_didIteratorError) {
                            throw _iteratorError;
                        }
                    }
                }

                return data;
            });
        }
    }, {
        key: 'calculate',
        value: function calculate(originCityCode, destinationCityCode) {
            var weight = arguments.length <= 2 || arguments[2] === undefined ? 1 : arguments[2];
            var cargoCost = arguments.length <= 3 || arguments[3] === undefined ? 0 : arguments[3];

            return this.service.call('Calc_tor', {
                ClientName: this.clientName,
                OrigCityCode: originCityCode,
                DestCityCode: destinationCityCode,
                Weight: weight,
                WBCost: cargoCost
            }).then(function (result) {
                var data = null;
                console.log(result.Calc_torResult.diffgram.DocumentElement);
                if (result.hasOwnProperty('Calc_torResult') == false || result.Calc_torResult.hasOwnProperty('diffgram') === false || result.Calc_torResult.diffgram.hasOwnProperty('DocumentElement') == false || result.Calc_torResult.diffgram.DocumentElement.hasOwnProperty('MEGA_SP_Tariff_Calc_Client') == false) {
                    return data;
                }
                var item = result.Calc_torResult.diffgram.DocumentElement.MEGA_SP_Tariff_Calc_Client;
                var city = /([а-яf-z0-9_\s\.-]+)\s*(\(([а-яf-z0-9_\s\.-]+)\))?/i.exec(item.CityRusName);
                data = new Calculation({
                    city: city[1],
                    parent: city[3] || null,
                    cost: item.fTariff,
                    time: item.fDelivtime,
                    insurance: item.fInsurance
                });
                return data;
            });
        }
    }]);

    return API;
})();

exports['default'] = API;
module.exports = exports['default'];
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uL3NyYy9pbmRleC50cyJdLCJuYW1lcyI6WyJMb2NhdGlvbiIsIkxvY2F0aW9uLmNvbnN0cnVjdG9yIiwiQ2FsY3VsYXRpb24iLCJDYWxjdWxhdGlvbi5jb25zdHJ1Y3RvciIsIkFQSSIsIkFQSS5jb25zdHJ1Y3RvciIsIkFQSS5nZXRDaXRpZXMiLCJBUEkuY2FsY3VsYXRlIl0sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozt1QkFFc0IsV0FBVzs7QUFFakMsSUFBTSxJQUFJLEdBQUcsU0FBUCxJQUFJLENBQUksR0FBVSxFQUFBO0FBQ3BCLFFBQUksT0FBTyxHQUFHLEtBQUssUUFBUSxFQUFFO0FBQ3pCLGVBQU8sR0FBRyxDQUFDLE9BQU8sQ0FBQyxNQUFNLEVBQUUsRUFBRSxDQUFDLENBQUMsT0FBTyxDQUFDLE1BQU0sRUFBRSxFQUFFLENBQUMsQ0FBQTtLQUNyRDtBQUVELFdBQU8sR0FBRyxDQUFDO0NBQ2QsQ0FBQzs7SUFFRixRQUFBLEdBU0lBLFNBVEosUUFBQSxDQVNnQkEsSUFBUUEsRUFBQUE7MEJBVHhCLFFBQUE7O0FBVVFDLFFBQUlBLENBQUNBLElBQUlBLEdBQUdBLE1BQU1BLENBQUNBLElBQUlBLENBQUNBLElBQUlBLENBQUNBLENBQUNBO0FBQzlCQSxRQUFJQSxDQUFDQSxJQUFJQSxHQUFHQSxJQUFJQSxDQUFDQSxJQUFJQSxDQUFDQSxJQUFJQSxDQUFDQSxDQUFDQTtBQUM1QkEsUUFBSUEsQ0FBQ0EsTUFBTUEsR0FBR0EsSUFBSUEsQ0FBQ0EsSUFBSUEsQ0FBQ0EsTUFBTUEsQ0FBQ0EsQ0FBQ0E7QUFDaENBLFFBQUlBLENBQUNBLEtBQUtBLEdBQUdBO0FBQ1RBLFlBQUlBLEVBQUVBLE1BQU1BLENBQUNBLElBQUlBLENBQUNBLEtBQUtBLENBQUNBLElBQUlBLENBQUNBO0FBQzdCQSxZQUFJQSxFQUFFQSxJQUFJQSxDQUFDQSxJQUFJQSxDQUFDQSxLQUFLQSxDQUFDQSxJQUFJQSxDQUFDQTtLQUM5QkEsQ0FBQUE7Q0FDSkE7O0lBR0wsV0FBQSxH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Q0EsUUFBUUEsQ0FBQ0EsZUFBZUEsQ0FBQ0EsMEJBQTBCQSxDQUFDQTtBQUNyRkEsb0JBQUlBLElBQUlBLEdBQUdBLHFEQUFxREEsQ0FBQ0EsSUFBSUEsQ0FBQ0EsSUFBSUEsQ0FBQ0EsV0FBV0EsQ0FBQ0EsQ0FBQ0E7QUFDeEZBLG9CQUFJQSxHQUFHQSxJQUFJQSxXQUFXQSxDQUFDQTtBQUNuQkEsd0JBQUlBLEVBQUVBLElBQUlBLENBQUNBLENBQUNBLENBQUNBO0FBQ2JBLDBCQUFNQSxFQUFFQSxJQUFJQSxDQUFDQSxDQUFDQSxDQUFDQSxJQUFJQSxJQUFJQTtBQUN2QkEsd0JBQUlBLEVBQUVBLElBQUlBLENBQUNBLE9BQU9BO0FBQ2xCQSx3QkFBSUEsRUFBRUEsSUFBSUEsQ0FBQ0EsVUFBVUE7QUFDckJBLDZCQUFTQSxFQUFFQSxJQUFJQSxDQUFDQSxVQUFVQTtpQkFDN0JBLENBQUNBLENBQUNBO0FBRUhBLHVCQUFPQSxJQUFJQSxDQUFDQTthQUNmQSxDQUFDQSxDQUFDQTtTQUNOQTs7O1dBNUVMLEdBQUE7OztxQkFBQSxHQUFBIiwiZmlsZSI6ImluZGV4LmpzIiwic291cmNlc0NvbnRlbnQiOlsiLy8vIDxyZWZlcmVuY2UgcGF0aD1cIi4vaW5kZXguZC50c1wiIC8+XHJcblxyXG5pbXBvcnQge1NlcnZpY2V9IGZyb20gJy4vc2VydmljZSc7XHJcblxyXG5jb25zdCB0cmltID0gKHN0cjpzdHJpbmcpOnN0cmluZyA9PiB7XHJcbiAgICBpZiAodHlwZW9mIHN0ciA9PT0gXCJzdHJpbmdcIikge1xyXG4gICAgICAgIHJldHVybiBzdHIucmVwbGFjZSgvXlxccyovLCAnJykucmVwbGFjZSgvXFxzKiQvLCAnJylcclxuICAgIH1cclxuXHJcbiAgICByZXR1cm4gc3RyO1xyXG59O1xyXG5cclxuY2xhc3MgTG9jYXRpb24ge1xyXG4gICAgY29kZTpudW1iZXI7XHJcbiAgICBjaXR5OnN0cmluZztcclxuICAgIHBhcmVudDpzdHJpbmc7XHJcbiAgICBhZ2VudDp7XHJcbiAgICAgICAgY29kZTpudW1iZXI7XHJcbiAgICAgICAgbmFtZTpzdHJpbmc7XHJcbiAgICB9O1xyXG5cclxuICAgIGNvbnN0cnVjdG9yKGl0ZW06YW55KSB7XHJcbiAgICAgICAgdGhpcy5jb2RlID0gTnVtYmVyKGl0ZW0uY29kZSk7XHJcbiAgICAgICAgdGhpcy5jaXR5ID0gdHJpbShpdGVtLmNpdHkpO1xyXG4gICAgICAgIHRoaXMucGFyZW50ID0gdHJpbShpdGVtLnBhcmVudCk7XHJcbiAgICAgICAgdGhpcy5hZ2VudCA9IHtcclxuICAgICAgICAgICAgY29kZTogTnVtYmVyKGl0ZW0uYWdlbnQuY29kZSksXHJcbiAgICAgICAgICAgIG5hbWU6IHRyaW0oaXRlbS5hZ2VudC5uYW1lKVxyXG4gICAgICAgIH1cclxuICAgIH1cclxufVxyXG5cclxuY2xhc3MgQ2FsY3VsYXRpb24ge1xyXG4gICAgY2l0eTpzdHJpbmc7XHJcbiAgICBwYXJlbnQ6c3RyaW5nO1xyXG4gICAgY29zdDpudW1iZXI7XHJcbiAgICBpbnN1cmFuY2U6bnVtYmVyO1xyXG4gICAgdGltZTpudW1iZXI7XHJcblxyXG4gICAgY29uc3RydWN0b3IoaXRlbTphbnkpIHtcclxuICAgICAgICB0aGlzLmNpdHkgPSB0cmltKGl0ZW0uY2l0eSk7XHJcbiAgICAgICAgdGhpcy5wYXJlbnQgPSB0cmltKGl0ZW0ucGFyZW50KTtcclxuICAgICAgICB0aGlzLmNvc3QgPSBOdW1iZXIoaXRlbS5jb3N0KTtcclxuICAgICAgICB0aGlzLmluc3VyYW5jZSA9IE51bWJlcihpdGVtLmluc3VyYW5jZSk7XHJcbiAgICAgICAgdGhpcy50aW1lID0gTnVtYmVyKGl0ZW0udGltZSk7XHJcbiAgICB9XHJcbn1cclxuXHJcbmV4cG9ydCBkZWZhdWx0IGNsYXNzIEFQSSB7XHJcbiAgICBzZXJ2aWNlOlNlcnZpY2U7XHJcbiAgICBjbGllbnROYW1lOnN0cmluZztcclxuXHJcbiAgICBjb25zdHJ1Y3Rvcih1c2VyOnN0cmluZywgcGFzczpzdHJpbmcgPSBudWxsKSB7XHJcbiAgICAgICAgdGhpcy5jbGllbnROYW1lID0gdXNlcjtcclxuICAgICAgICB0aGlzLnNlcnZpY2UgPSBuZXcgU2VydmljZSh7dXJsOiAnaHR0cDovL2NvdXJpZXJuZXcubWUtb25saW5lLnJ1L0NhbGN1bGF0b3IuYXNteD9XU0RMJywgdXNlciwgcGFzc30pO1xyXG4gICAgfVxyXG5cclxuICAgIC8qKlxyXG4gICAgICogQHJldHVybnMge1Byb21pc2U8TG9jYXRpb25bXT59XHJcbiAgICAgKi9cclxuICAgIGdldENpdGllcygpOlByb21pc2U8TG9jYXRpb25bXT4ge1xyXG4gICAgICAgIHJldHVybiB0aGlzLnNlcnZpY2UuY2FsbDxDaXR5TGlzdE1lc3NhZ2U+KCdDaXR5cycpLnRoZW4ocmVzdWx0ID0+IHtcclxuICAgICAgICAgICAgbGV0IGRhdGEgPSBbXTtcclxuICAgICAgICAgICAgaWYgKHJlc3VsdC5oYXNPd25Qcm9wZXJ0eSgnQ2l0eXNSZXN1bHQnKSA9PSBmYWxzZVxyXG4gICAgICAgICAgICAgICAgfHwgcmVzdWx0LkNpdHlzUmVzdWx0Lmhhc093blByb3BlcnR5KCdkaWZmZ3JhbScpID09PSBmYWxzZVxyXG4gICAgICAgICAgICAgICAgfHwgcmVzdWx0LkNpdHlzUmVzdWx0LmRpZmZncmFtLmhhc093blByb3BlcnR5KCdEb2N1bWVudEVsZW1lbnQnKSA9PSBmYWxzZVxyXG4gICAgICAgICAgICAgICAgfHwgcmVzdWx0LkNpdHlzUmVzdWx0LmRpZmZncmFtLkRvY3VtZW50RWxlbWVudC5oYXNPd25Qcm9wZXJ0eSgnQ2l0aWVzJykgPT0gZmFsc2UpIHtcclxuICAgICAgICAgICAgICAgIHJldHVybiBkYXRhO1xyXG4gICAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgICBmb3IgKGxldCBpdGVtIG9mIHJlc3VsdC5DaXR5c1Jlc3VsdC5kaWZmZ3JhbS5Eb2N1bWVudEVsZW1lbnQuQ2l0aWVzKSB7XHJcbiAgICAgICAgICAgICAgICBsZXQgY2l0eSA9IC8oW9CwLdGPZi16MC05X1xcc1xcLi1dKylcXHMqKFxcKChb0LAt0Y9mLXowLTlfXFxzXFwuLV0rKVxcKSk/L2kuZXhlYyhpdGVtLkNpdHlSdXNOYW1lKTtcclxuICAgICAgICAgICAgICAgIGxldCBhZ2VudCA9IC8oW9CwLdGPZi16MC05X1xcc1xcLi1dKylcXHMqL2kuZXhlYyhpdGVtLkFnZW50TmFtZVJ1cyk7XHJcbiAgICAgICAgICAgICAgICBkYXRhLnB1c2gobmV3IExvY2F0aW9uKHtcclxuICAgICAgICAgICAgICAgICAgICBjb2RlOiBpdGVtLkNpdHlDb2RlLFxyXG4gICAgICAgICAgICAgICAgICAgIGNpdHk6IGNpdHlbMV0sXHJcbiAgICAgICAgICAgICAgICAgICAgcGFyZW50OiBjaXR5WzNdIHx8IG51bGwsXHJcbiAgICAgICAgICAgICAgICAgICAgYWdlbnQ6IHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgY29kZTogaXRlbS5BZ2VudENvZGUsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIG5hbWU6IGFnZW50WzFdXHJcbiAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgfSkpO1xyXG4gICAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgICByZXR1cm4gZGF0YTtcclxuICAgICAgICB9KTtcclxuICAgIH1cclxuXHJcbiAgICAvKipcclxuICAgICAqIEBwYXJhbSBvcmlnaW5DaXR5Q29kZVxyXG4gICAgICogQHBhcmFtIGRlc3RpbmF0aW9uQ2l0eUNvZGVcclxuICAgICAqIEBwYXJhbSB3ZWlnaHRcclxuICAgICAqIEBwYXJhbSBjYXJnb0Nvc3RcclxuICAgICAqIEByZXR1cm5zIHtQcm9taXNlPFQ+fVxyXG4gICAgICovXHJcbiAgICBjYWxjdWxhdGUob3JpZ2luQ2l0eUNvZGU6bnVtYmVyLCBkZXN0aW5hdGlvbkNpdHlDb2RlOm51bWJlciwgd2VpZ2h0Om51bWJlciA9IDEsIGNhcmdvQ29zdDpudW1iZXIgPSAwKTpQcm9taXNlPENhbGN1bGF0aW9uPiB7XHJcbiAgICAgICAgcmV0dXJuIHRoaXMuc2VydmljZS5jYWxsPENhbGN1bGF0ZU1lc3NhZ2U+KCdDYWxjX3RvcicsIHtcclxuICAgICAgICAgICAgQ2xpZW50TmFtZTogdGhpcy5jbGllbnROYW1lLFxyXG4gICAgICAgICAgICBPcmlnQ2l0eUNvZGU6IG9yaWdpbkNpdHlDb2RlLFxyXG4gICAgICAgICAgICBEZXN0Q2l0eUNvZGU6IGRlc3RpbmF0aW9uQ2l0eUNvZGUsXHJcbiAgICAgICAgICAgIFdlaWdodDogd2VpZ2h0LFxyXG4gICAgICAgICAgICBXQkNvc3Q6IGNhcmdvQ29zdFxyXG4gICAgICAgIH0pLnRoZW4ocmVzdWx0ID0+IHtcclxuICAgICAgICAgICAgdmFyIGRhdGEgPSBudWxsO1xyXG4gICAgICAgICAgICBjb25zb2xlLmxvZyhyZXN1bHQuQ2FsY190b3JSZXN1bHQuZGlmZmdyYW0uRG9jdW1lbnRFbGVtZW50KTtcclxuICAgICAgICAgICAgaWYgKHJlc3VsdC5oYXNPd25Qcm9wZXJ0eSgnQ2FsY190b3JSZXN1bHQnKSA9PSBmYWxzZVxyXG4gICAgICAgICAgICAgICAgfHwgcmVzdWx0LkNhbGNfdG9yUmVzdWx0Lmhhc093blByb3BlcnR5KCdkaWZmZ3JhbScpID09PSBmYWxzZVxyXG4gICAgICAgICAgICAgICAgfHwgcmVzdWx0LkNhbGNfdG9yUmVzdWx0LmRpZmZncmFtLmhhc093blByb3BlcnR5KCdEb2N1bWVudEVsZW1lbnQnKSA9PSBmYWxzZVxyXG4gICAgICAgICAgICAgICAgfHwgcmVzdWx0LkNhbGNfdG9yUmVzdWx0LmRpZmZncmFtLkRvY3VtZW50RWxlbWVudC5oYXNPd25Qcm9wZXJ0eSgnTUVHQV9TUF9UYXJpZmZfQ2FsY19DbGllbnQnKSA9PSBmYWxzZSkge1xyXG4gICAgICAgICAgICAgICAgcmV0dXJuIGRhdGE7XHJcbiAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICAgIGxldCBpdGVtID0gcmVzdWx0LkNhbGNfdG9yUmVzdWx0LmRpZmZncmFtLkRvY3VtZW50RWxlbWVudC5NRUdBX1NQX1RhcmlmZl9DYWxjX0NsaWVudDtcclxuICAgICAgICAgICAgbGV0IGNpdHkgPSAvKFvQsC3Rj2YtejAtOV9cXHNcXC4tXSspXFxzKihcXCgoW9CwLdGPZi16MC05X1xcc1xcLi1dKylcXCkpPy9pLmV4ZWMoaXRlbS5DaXR5UnVzTmFtZSk7XHJcbiAgICAgICAgICAgIGRhdGEgPSBuZXcgQ2FsY3VsYXRpb24oe1xyXG4gICAgICAgICAgICAgICAgY2l0eTogY2l0eVsxXSxcclxuICAgICAgICAgICAgICAgIHBhcmVudDogY2l0eVszXSB8fCBudWxsLFxyXG4gICAgICAgICAgICAgICAgY29zdDogaXRlbS5mVGFyaWZmLFxyXG4gICAgICAgICAgICAgICAgdGltZTogaXRlbS5mRGVsaXZ0aW1lLFxyXG4gICAgICAgICAgICAgICAgaW5zdXJhbmNlOiBpdGVtLmZJbnN1cmFuY2VcclxuICAgICAgICAgICAgfSk7XHJcblxyXG4gICAgICAgICAgICByZXR1cm4gZGF0YTtcclxuICAgICAgICB9KTtcclxuICAgIH1cclxufVxyXG4iXSwic291cmNlUm9vdCI6ImU6XFx3d3dcXGRlbGl2ZXJ5XFxtYWpvcmV4cHJlc3NcXGJ1aWxkLXRzIn0=
