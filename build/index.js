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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uL3NyYy9pbmRleC50cyJdLCJuYW1lcyI6WyJMb2NhdGlvbiIsIkxvY2F0aW9uLmNvbnN0cnVjdG9yIiwiQ2FsY3VsYXRpb24iLCJDYWxjdWxhdGlvbi5jb25zdHJ1Y3RvciIsIkFQSSIsIkFQSS5jb25zdHJ1Y3RvciIsIkFQSS5nZXRDaXRpZXMiLCJBUEkuY2FsY3VsYXRlIl0sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozt1QkFFc0IsV0FBVzs7QUFFakMsSUFBTSxJQUFJLEdBQUcsU0FBUCxJQUFJLENBQUksR0FBVSxFQUFBO0FBQ3BCLFFBQUksT0FBTyxHQUFHLEtBQUssUUFBUSxFQUFFO0FBQ3pCLGVBQU8sR0FBRyxDQUFDLE9BQU8sQ0FBQyxNQUFNLEVBQUUsRUFBRSxDQUFDLENBQUMsT0FBTyxDQUFDLE1BQU0sRUFBRSxFQUFFLENBQUMsQ0FBQTtLQUNyRDtBQUVELFdBQU8sR0FBRyxDQUFDO0NBQ2QsQ0FBQzs7SUFFRixRQUFBLEdBU0lBLFNBVEosUUFBQSxDQVNnQkEsSUFBUUEsRUFBQUE7MEJBVHhCLFFBQUE7O0FBVVFDLFFBQUlBLENBQUNBLElBQUlBLEdBQUdBLE1BQU1BLENBQUNBLElBQUlBLENBQUNBLElBQUlBLENBQUNBLENBQUNBO0FBQzlCQSxRQUFJQSxDQUFDQSxJQUFJQSxHQUFHQSxJQUFJQSxDQUFDQSxJQUFJQSxDQUFDQSxJQUFJQSxDQUFDQSxDQUFDQTtBQUM1QkEsUUFBSUEsQ0FBQ0EsTUFBTUEsR0FBR0EsSUFBSUEsQ0FBQ0EsSUFBSUEsQ0FBQ0EsTUFBTUEsQ0FBQ0EsQ0FBQ0E7QUFDaENBLFFBQUlBLENBQUNBLEtBQUtBLEdBQUdBO0FBQ1RBLFlBQUlBLEVBQUVBLE1BQU1BLENBQUNBLElBQUlBLENBQUNBLEtBQUtBLENBQUNBLElBQUlBLENBQUNBO0FBQzdCQSxZQUFJQSxFQUFFQSxJQUFJQSxDQUFDQSxJQUFJQSxDQUFDQSxLQUFLQSxDQUFDQSxJQUFJQSxDQUFDQTtLQUM5QkEsQ0FBQUE7Q0FDSkE7O0lBR0wsV0FBQSxH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LENBQUNBLElBQUlBLENBQUNBLFdBQVdBLENBQUNBLENBQUNBO0FBQ3hGQSxvQkFBSUEsR0FBR0EsSUFBSUEsV0FBV0EsQ0FBQ0E7QUFDbkJBLHdCQUFJQSxFQUFFQSxJQUFJQSxDQUFDQSxDQUFDQSxDQUFDQTtBQUNiQSwwQkFBTUEsRUFBRUEsSUFBSUEsQ0FBQ0EsQ0FBQ0EsQ0FBQ0EsSUFBSUEsSUFBSUE7QUFDdkJBLHdCQUFJQSxFQUFFQSxJQUFJQSxDQUFDQSxPQUFPQTtBQUNsQkEsd0JBQUlBLEVBQUVBLElBQUlBLENBQUNBLFVBQVVBO0FBQ3JCQSw2QkFBU0EsRUFBRUEsSUFBSUEsQ0FBQ0EsVUFBVUE7aUJBQzdCQSxDQUFDQSxDQUFDQTtBQUVIQSx1QkFBT0EsSUFBSUEsQ0FBQ0E7YUFDZkEsQ0FBQ0EsQ0FBQ0E7U0FDTkE7OztXQTNFTCxHQUFBOzs7cUJBQUEsR0FBQSIsImZpbGUiOiJpbmRleC5qcyIsInNvdXJjZXNDb250ZW50IjpbIi8vLyA8cmVmZXJlbmNlIHBhdGg9XCIuL2luZGV4LmQudHNcIiAvPlxyXG5cclxuaW1wb3J0IHtTZXJ2aWNlfSBmcm9tICcuL3NlcnZpY2UnO1xyXG5cclxuY29uc3QgdHJpbSA9IChzdHI6c3RyaW5nKTpzdHJpbmcgPT4ge1xyXG4gICAgaWYgKHR5cGVvZiBzdHIgPT09IFwic3RyaW5nXCIpIHtcclxuICAgICAgICByZXR1cm4gc3RyLnJlcGxhY2UoL15cXHMqLywgJycpLnJlcGxhY2UoL1xccyokLywgJycpXHJcbiAgICB9XHJcblxyXG4gICAgcmV0dXJuIHN0cjtcclxufTtcclxuXHJcbmNsYXNzIExvY2F0aW9uIHtcclxuICAgIGNvZGU6bnVtYmVyO1xyXG4gICAgY2l0eTpzdHJpbmc7XHJcbiAgICBwYXJlbnQ6c3RyaW5nO1xyXG4gICAgYWdlbnQ6e1xyXG4gICAgICAgIGNvZGU6bnVtYmVyO1xyXG4gICAgICAgIG5hbWU6c3RyaW5nO1xyXG4gICAgfTtcclxuXHJcbiAgICBjb25zdHJ1Y3RvcihpdGVtOmFueSkge1xyXG4gICAgICAgIHRoaXMuY29kZSA9IE51bWJlcihpdGVtLmNvZGUpO1xyXG4gICAgICAgIHRoaXMuY2l0eSA9IHRyaW0oaXRlbS5jaXR5KTtcclxuICAgICAgICB0aGlzLnBhcmVudCA9IHRyaW0oaXRlbS5wYXJlbnQpO1xyXG4gICAgICAgIHRoaXMuYWdlbnQgPSB7XHJcbiAgICAgICAgICAgIGNvZGU6IE51bWJlcihpdGVtLmFnZW50LmNvZGUpLFxyXG4gICAgICAgICAgICBuYW1lOiB0cmltKGl0ZW0uYWdlbnQubmFtZSlcclxuICAgICAgICB9XHJcbiAgICB9XHJcbn1cclxuXHJcbmNsYXNzIENhbGN1bGF0aW9uIHtcclxuICAgIGNpdHk6c3RyaW5nO1xyXG4gICAgcGFyZW50OnN0cmluZztcclxuICAgIGNvc3Q6bnVtYmVyO1xyXG4gICAgaW5zdXJhbmNlOm51bWJlcjtcclxuICAgIHRpbWU6bnVtYmVyO1xyXG5cclxuICAgIGNvbnN0cnVjdG9yKGl0ZW06YW55KSB7XHJcbiAgICAgICAgdGhpcy5jaXR5ID0gdHJpbShpdGVtLmNpdHkpO1xyXG4gICAgICAgIHRoaXMucGFyZW50ID0gdHJpbShpdGVtLnBhcmVudCk7XHJcbiAgICAgICAgdGhpcy5jb3N0ID0gTnVtYmVyKGl0ZW0uY29zdCk7XHJcbiAgICAgICAgdGhpcy5pbnN1cmFuY2UgPSBOdW1iZXIoaXRlbS5pbnN1cmFuY2UpO1xyXG4gICAgICAgIHRoaXMudGltZSA9IE51bWJlcihpdGVtLnRpbWUpO1xyXG4gICAgfVxyXG59XHJcblxyXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBBUEkge1xyXG4gICAgc2VydmljZTpTZXJ2aWNlO1xyXG4gICAgY2xpZW50TmFtZTpzdHJpbmc7XHJcblxyXG4gICAgY29uc3RydWN0b3IodXNlcjpzdHJpbmcsIHBhc3M6c3RyaW5nID0gbnVsbCkge1xyXG4gICAgICAgIHRoaXMuY2xpZW50TmFtZSA9IHVzZXI7XHJcbiAgICAgICAgdGhpcy5zZXJ2aWNlID0gbmV3IFNlcnZpY2Uoe3VybDogJ2h0dHA6Ly9jb3VyaWVybmV3Lm1lLW9ubGluZS5ydS9DYWxjdWxhdG9yLmFzbXg/V1NETCcsIHVzZXIsIHBhc3N9KTtcclxuICAgIH1cclxuXHJcbiAgICAvKipcclxuICAgICAqIEByZXR1cm5zIHtQcm9taXNlPExvY2F0aW9uW10+fVxyXG4gICAgICovXHJcbiAgICBnZXRDaXRpZXMoKTpQcm9taXNlPExvY2F0aW9uW10+IHtcclxuICAgICAgICByZXR1cm4gdGhpcy5zZXJ2aWNlLmNhbGw8Q2l0eUxpc3RNZXNzYWdlPignQ2l0eXMnKS50aGVuKHJlc3VsdCA9PiB7XHJcbiAgICAgICAgICAgIGxldCBkYXRhID0gW107XHJcbiAgICAgICAgICAgIGlmIChyZXN1bHQuaGFzT3duUHJvcGVydHkoJ0NpdHlzUmVzdWx0JykgPT0gZmFsc2VcclxuICAgICAgICAgICAgICAgIHx8IHJlc3VsdC5DaXR5c1Jlc3VsdC5oYXNPd25Qcm9wZXJ0eSgnZGlmZmdyYW0nKSA9PT0gZmFsc2VcclxuICAgICAgICAgICAgICAgIHx8IHJlc3VsdC5DaXR5c1Jlc3VsdC5kaWZmZ3JhbS5oYXNPd25Qcm9wZXJ0eSgnRG9jdW1lbnRFbGVtZW50JykgPT0gZmFsc2VcclxuICAgICAgICAgICAgICAgIHx8IHJlc3VsdC5DaXR5c1Jlc3VsdC5kaWZmZ3JhbS5Eb2N1bWVudEVsZW1lbnQuaGFzT3duUHJvcGVydHkoJ0NpdGllcycpID09IGZhbHNlKSB7XHJcbiAgICAgICAgICAgICAgICByZXR1cm4gZGF0YTtcclxuICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICAgICAgZm9yIChsZXQgaXRlbSBvZiByZXN1bHQuQ2l0eXNSZXN1bHQuZGlmZmdyYW0uRG9jdW1lbnRFbGVtZW50LkNpdGllcykge1xyXG4gICAgICAgICAgICAgICAgbGV0IGNpdHkgPSAvKFvQsC3Rj2YtejAtOV9cXHNcXC4tXSspXFxzKihcXCgoW9CwLdGPZi16MC05X1xcc1xcLi1dKylcXCkpPy9pLmV4ZWMoaXRlbS5DaXR5UnVzTmFtZSk7XHJcbiAgICAgICAgICAgICAgICBsZXQgYWdlbnQgPSAvKFvQsC3Rj2YtejAtOV9cXHNcXC4tXSspXFxzKi9pLmV4ZWMoaXRlbS5BZ2VudE5hbWVSdXMpO1xyXG4gICAgICAgICAgICAgICAgZGF0YS5wdXNoKG5ldyBMb2NhdGlvbih7XHJcbiAgICAgICAgICAgICAgICAgICAgY29kZTogaXRlbS5DaXR5Q29kZSxcclxuICAgICAgICAgICAgICAgICAgICBjaXR5OiBjaXR5WzFdLFxyXG4gICAgICAgICAgICAgICAgICAgIHBhcmVudDogY2l0eVszXSB8fCBudWxsLFxyXG4gICAgICAgICAgICAgICAgICAgIGFnZW50OiB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGNvZGU6IGl0ZW0uQWdlbnRDb2RlLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICBuYW1lOiBhZ2VudFsxXVxyXG4gICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIH0pKTtcclxuICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICAgICAgcmV0dXJuIGRhdGE7XHJcbiAgICAgICAgfSk7XHJcbiAgICB9XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiBAcGFyYW0gb3JpZ2luQ2l0eUNvZGVcclxuICAgICAqIEBwYXJhbSBkZXN0aW5hdGlvbkNpdHlDb2RlXHJcbiAgICAgKiBAcGFyYW0gd2VpZ2h0XHJcbiAgICAgKiBAcGFyYW0gY2FyZ29Db3N0XHJcbiAgICAgKiBAcmV0dXJucyB7UHJvbWlzZTxUPn1cclxuICAgICAqL1xyXG4gICAgY2FsY3VsYXRlKG9yaWdpbkNpdHlDb2RlOm51bWJlciwgZGVzdGluYXRpb25DaXR5Q29kZTpudW1iZXIsIHdlaWdodDpudW1iZXIgPSAxLCBjYXJnb0Nvc3Q6bnVtYmVyID0gMCk6UHJvbWlzZTxDYWxjdWxhdGlvbj4ge1xyXG4gICAgICAgIHJldHVybiB0aGlzLnNlcnZpY2UuY2FsbDxDYWxjdWxhdGVNZXNzYWdlPignQ2FsY190b3InLCB7XHJcbiAgICAgICAgICAgIENsaWVudE5hbWU6IHRoaXMuY2xpZW50TmFtZSxcclxuICAgICAgICAgICAgT3JpZ0NpdHlDb2RlOiBvcmlnaW5DaXR5Q29kZSxcclxuICAgICAgICAgICAgRGVzdENpdHlDb2RlOiBkZXN0aW5hdGlvbkNpdHlDb2RlLFxyXG4gICAgICAgICAgICBXZWlnaHQ6IHdlaWdodCxcclxuICAgICAgICAgICAgV0JDb3N0OiBjYXJnb0Nvc3RcclxuICAgICAgICB9KS50aGVuKHJlc3VsdCA9PiB7XHJcbiAgICAgICAgICAgIHZhciBkYXRhID0gbnVsbDtcclxuICAgICAgICAgICAgaWYgKHJlc3VsdC5oYXNPd25Qcm9wZXJ0eSgnQ2FsY190b3JSZXN1bHQnKSA9PSBmYWxzZVxyXG4gICAgICAgICAgICAgICAgfHwgcmVzdWx0LkNhbGNfdG9yUmVzdWx0Lmhhc093blByb3BlcnR5KCdkaWZmZ3JhbScpID09PSBmYWxzZVxyXG4gICAgICAgICAgICAgICAgfHwgcmVzdWx0LkNhbGNfdG9yUmVzdWx0LmRpZmZncmFtLmhhc093blByb3BlcnR5KCdEb2N1bWVudEVsZW1lbnQnKSA9PSBmYWxzZVxyXG4gICAgICAgICAgICAgICAgfHwgcmVzdWx0LkNhbGNfdG9yUmVzdWx0LmRpZmZncmFtLkRvY3VtZW50RWxlbWVudC5oYXNPd25Qcm9wZXJ0eSgnTUVHQV9TUF9UYXJpZmZfQ2FsY19DbGllbnQnKSA9PSBmYWxzZSkge1xyXG4gICAgICAgICAgICAgICAgcmV0dXJuIGRhdGE7XHJcbiAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICAgIGxldCBpdGVtID0gcmVzdWx0LkNhbGNfdG9yUmVzdWx0LmRpZmZncmFtLkRvY3VtZW50RWxlbWVudC5NRUdBX1NQX1RhcmlmZl9DYWxjX0NsaWVudDtcclxuICAgICAgICAgICAgbGV0IGNpdHkgPSAvKFvQsC3Rj2YtejAtOV9cXHNcXC4tXSspXFxzKihcXCgoW9CwLdGPZi16MC05X1xcc1xcLi1dKylcXCkpPy9pLmV4ZWMoaXRlbS5DaXR5UnVzTmFtZSk7XHJcbiAgICAgICAgICAgIGRhdGEgPSBuZXcgQ2FsY3VsYXRpb24oe1xyXG4gICAgICAgICAgICAgICAgY2l0eTogY2l0eVsxXSxcclxuICAgICAgICAgICAgICAgIHBhcmVudDogY2l0eVszXSB8fCBudWxsLFxyXG4gICAgICAgICAgICAgICAgY29zdDogaXRlbS5mVGFyaWZmLFxyXG4gICAgICAgICAgICAgICAgdGltZTogaXRlbS5mRGVsaXZ0aW1lLFxyXG4gICAgICAgICAgICAgICAgaW5zdXJhbmNlOiBpdGVtLmZJbnN1cmFuY2VcclxuICAgICAgICAgICAgfSk7XHJcblxyXG4gICAgICAgICAgICByZXR1cm4gZGF0YTtcclxuICAgICAgICB9KTtcclxuICAgIH1cclxufVxyXG4iXSwic291cmNlUm9vdCI6ImU6XFx3d3dcXGRlbGl2ZXJ5XFxtYWpvcmV4cHJlc3NcXGJ1aWxkLXRzIn0=
