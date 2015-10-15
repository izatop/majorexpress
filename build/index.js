/// <reference path="./index.d.ts" />
'use strict';

Object.defineProperty(exports, '__esModule', {
    value: true
});

var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ('value' in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError('Cannot call a class as a function'); } }

var _service = require('./service');

var Location = function Location(item) {
    _classCallCheck(this, Location);

    this.code = Number(item.code);
    this.city = item.city;
    this.parent = item.parent;
    this.agent = {
        code: Number(item.agent.code),
        name: item.agent.name
    };
};

var Calculation = function Calculation(item) {
    _classCallCheck(this, Calculation);

    this.city = item.city;
    this.parent = item.parent;
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

                        var city = /([а-яf-z0-9_-]+)\s*(\(([а-яf-z0-9_-]+)\))?/i.exec(item.CityRusName);
                        var agent = /([а-яf-z0-9_-]+)\s*/i.exec(item.AgentNameRus);
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
                var city = /([а-яf-z0-9_-]+)\s*(\(([а-яf-z0-9_-]+)\))?/i.exec(item.CityRusName);
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uL3NyYy9pbmRleC50cyJdLCJuYW1lcyI6WyJMb2NhdGlvbiIsIkxvY2F0aW9uLmNvbnN0cnVjdG9yIiwiQ2FsY3VsYXRpb24iLCJDYWxjdWxhdGlvbi5jb25zdHJ1Y3RvciIsIkFQSSIsIkFQSS5jb25zdHJ1Y3RvciIsIkFQSS5nZXRDaXRpZXMiLCJBUEkuY2FsY3VsYXRlIl0sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozt1QkFFc0IsV0FBVzs7SUFFakMsUUFBQSxHQVNJQSxTQVRKLFFBQUEsQ0FTZ0JBLElBQVFBLEVBQUFBOzBCQVR4QixRQUFBOztBQVVRQyxRQUFJQSxDQUFDQSxJQUFJQSxHQUFHQSxNQUFNQSxDQUFDQSxJQUFJQSxDQUFDQSxJQUFJQSxDQUFDQSxDQUFDQTtBQUM5QkEsUUFBSUEsQ0FBQ0EsSUFBSUEsR0FBR0EsSUFBSUEsQ0FBQ0EsSUFBSUEsQ0FBQ0E7QUFDdEJBLFFBQUlBLENBQUNBLE1BQU1BLEdBQUdBLElBQUlBLENBQUNBLE1BQU1BLENBQUNBO0FBQzFCQSxRQUFJQSxDQUFDQSxLQUFLQSxHQUFHQTtBQUNUQSxZQUFJQSxFQUFFQSxNQUFNQSxDQUFDQSxJQUFJQSxDQUFDQSxLQUFLQSxDQUFDQSxJQUFJQSxDQUFDQTtBQUM3QkEsWUFBSUEsRUFBRUEsSUFBSUEsQ0FBQ0EsS0FBS0EsQ0FBQ0EsSUFBSUE7S0FDeEJBLENBQUFBO0NBQ0pBOztJQUdMLFdBQUEsR0FPSUMsU0FQSixXQUFBLENBT2dCQSxJQUFRQSxFQUFBQTswQkFQeEIsV0FBQTs7QUFRUUMsUUFBSUEsQ0FBQ0EsSUFBSUEsR0FBR0EsSUFBSUEsQ0FBQ0EsSUFBSUEsQ0FBQ0E7QUFDdEJBLFFBQUlBLENBQUNBLE1BQU1BLEdBQUdBLElBQUlBLENBQUNBLE1BQU1BLENBQUNBO0FBQzFCQSxRQUFJQSxDQUFDQSxJQUFJQSxHQUFHQSxNQUFNQSxDQUFDQSxJQUFJQSxDQUFDQSxJQUFJQSxDQUFDQSxDQUFDQTtBQUM5QkEsUUFBSUEsQ0FBQ0EsU0FBU0EsR0FBR0EsTUFBTUEsQ0FBQ0EsSUFBSUEsQ0FBQ0EsU0FBU0EsQ0FBQ0EsQ0FBQ0E7QUFDeENBLFFBQUlBLENBQUNBLElBQUlBLEdBQUdBLE1BQU1BLENBQUNBLElBQUlBLENBQUNBLElBQUlBLENBQUNBLENBQUNBO0NBQ2pDQTs7SUFHTCxHQUFBO0FBSUlDLGFBSkosR0FBQSxDQUlnQkEsSUFBV0EsRUFBb0JBO1lBQWxCQSxJQUFJQSx5REFBVUEsSUFBSUE7OzhCQUovQyxHQUFBOztBQUtRQyxZQUFJQSxDQUFDQSxVQUFVQSxHQUFHQSxJQUFJQSxDQUFDQTtBQUN2QkEsWUFBSUEsQ0FBQ0EsT0FBT0EsR0FBR0EscUJBQVlBLEVBQUNBLEdBQUdBLEVBQUVBLHFEQUFxREEsRUFBRUEsSUFBSUEsRUFBSkEsSUFBSUEsRUFBRUEsSUFBSUEsRUFBSkEsSUFBSUEsRUFBQ0EsQ0FBQ0EsQ0FBQ0E7S0FDeEdBOztpQkFQTCxHQUFBOztlQVlhRCxxQkFBQUE7QUFDTEUsbUJBQU9BLElBQUlBLENBQUNBLE9BQU9BLENBQUNBLElBQUlBLENBQWtCQSxPQUFPQSxDQUFDQSxDQUFDQSxJQUFJQSxDQUFDQSxVQUFBQSxNQUFNQSxFQUFBQTtBQUMxREEsb0JBQUlBLElBQUlBLEdBQUdBLEVBQUVBLENBQUNBO0FBQ2RBLG9CQUFJQSxNQUFNQSxDQUFDQSxjQUFjQSxDQUFDQSxhQUFhQSxDQUFDQSxJQUFJQSxLQUFLQSxJQUMxQ0EsTUFBTUEsQ0FBQ0EsV0FBV0EsQ0FBQ0EsY0FBY0EsQ0FBQ0EsVUFBVUEsQ0FBQ0EsS0FBS0EsS0FBS0EsSUFDdkRBLE1BQU1BLENBQUNBLFdBQVdBLENBQUNBLFFBQVFBLENBQUNBLGNBQWNBLENBQUNBLGlCQUFpQkEsQ0FBQ0EsSUFBSUEsS0FBS0EsSUFDdEVBLE1BQU1BLENBQUNBLFdBQVdBLENBQUNBLFFBQVFBLENBQUNBLGVBQWVBLENBQUNBLGNBQWNBLENBQUNBLFFBQVFBLENBQUNBLElBQUlBLEtBQUtBLEVBQUVBO0FBQ2xGQSwyQkFBT0EsSUFBSUEsQ0FBQ0E7aUJBQ2ZBOzs7Ozs7QUFFREEseUNBQWlCQSxNQUFNQSxDQUFDQSxXQUFXQSxDQUFDQSxRQUFRQSxDQUFDQSxlQUFlQSxDQUFDQSxNQUFNQSw4SEFBRUE7NEJBQTVEQSxJQUFJQTs7QUFDVEEsNEJBQUlBLElBQUlBLEdBQUdBLDZDQUE2Q0EsQ0FBQ0EsSUFBSUEsQ0FBQ0EsSUFBSUEsQ0FBQ0EsV0FBV0EsQ0FBQ0EsQ0FBQ0E7QUFDaEZBLDRCQUFJQSxLQUFLQSxHQUFHQSxzQkFBc0JBLENBQUNBLElBQUlBLENBQUNBLElBQUlBLENBQUNBLFlBQVlBLENBQUNBLENBQUNBO0FBQzNEQSw0QkFBSUEsQ0FBQ0EsSUFBSUEsQ0FBQ0EsSUFBSUEsUUFBUUEsQ0FBQ0E7QUFDbkJBLGdDQUFJQSxFQUFFQSxJQUFJQSxDQUFDQSxRQUFRQTtBQUNuQkEsZ0NBQUlBLEVBQUVBLElBQUlBLENBQUNBLENBQUNBLENBQUNBO0FBQ2JBLGtDQUFNQSxFQUFFQSxJQUFJQSxDQUFDQSxDQUFDQSxDQUFDQSxJQUFJQSxJQUFJQTtBQUN2QkEsaUNBQUtBLEVBQUVBO0FBQ0hBLG9DQUFJQSxFQUFFQSxJQUFJQSxDQUFDQSxTQUFTQTtBQUNwQkEsb0NBQUlBLEVBQUVBLEtBQUtBLENBQUNBLENBQUNBLENBQUNBOzZCQUNqQkE7eUJBQ0pBLENBQUNBLENBQUNBLENBQUNBO3FCQUNQQTs7Ozs7Ozs7Ozs7Ozs7OztBQUVEQSx1QkFBT0EsSUFBSUEsQ0FBQ0E7YUFDZkEsQ0FBQ0EsQ0FBQ0E7U0FDTkE7OztlQVNRRixtQkFBQ0EsY0FBcUJBLEVBQUVBLG1CQUEwQkEsRUFBeUNBO2dCQUF2Q0EsTUFBTUEseURBQVVBLENBQUNBO2dCQUFFQSxTQUFTQSx5REFBVUEsQ0FBQ0E7O0FBQ2hHRyxtQkFBT0EsSUFBSUEsQ0FBQ0EsT0FBT0EsQ0FBQ0EsSUFBSUEsQ0FBbUJBLFVBQVVBLEVBQUVBO0FBQ25EQSwwQkFBVUEsRUFBRUEsSUFBSUEsQ0FBQ0EsVUFBVUE7QUFDM0JBLDRCQUFZQSxFQUFFQSxjQUFjQTtBQUM1QkEsNEJBQVlBLEVBQUVBLG1CQUFtQkE7QUFDakNBLHNCQUFNQSxFQUFFQSxNQUFNQTtBQUNkQSxzQkFBTUEsRUFBRUEsU0FBU0E7YUFDcEJBLENBQUNBLENBQUNBLElBQUlBLENBQUNBLFVBQUFBLE1BQU1BLEVBQUFBO0FBQ1ZBLG9CQUFJQSxJQUFJQSxHQUFHQSxJQUFJQSxDQUFDQTtBQUNoQkEsdUJBQU9BLENBQUNBLEdBQUdBLENBQUNBLE1BQU1BLENBQUNBLGNBQWNBLENBQUNBLFFBQVFBLENBQUNBLGVBQWVBLENBQUNBLENBQUNBO0FBQzVEQSxvQkFBSUEsTUFBTUEsQ0FBQ0EsY0FBY0EsQ0FBQ0EsZ0JBQWdCQSxDQUFDQSxJQUFJQSxLQUFLQSxJQUM3Q0EsTUFBTUEsQ0FBQ0EsY0FBY0EsQ0FBQ0EsY0FBY0EsQ0FBQ0EsVUFBVUEsQ0FBQ0EsS0FBS0EsS0FBS0EsSUFDMURBLE1BQU1BLENBQUNBLGNBQWNBLENBQUNBLFFBQVFBLENBQUNBLGNBQWNBLENBQUNBLGlCQUFpQkEsQ0FBQ0EsSUFBSUEsS0FBS0EsSUFDekVBLE1BQU1BLENBQUNBLGNBQWNBLENBQUNBLFFBQVFBLENBQUNBLGVBQWVBLENBQUNBLGNBQWNBLENBQUNBLDRCQUE0QkEsQ0FBQ0EsSUFBSUEsS0FBS0EsRUFBRUE7QUFDekdBLDJCQUFPQSxJQUFJQSxDQUFDQTtpQkFDZkE7QUFFREEsb0JBQUlBLElBQUlBLEdBQUdBLE1BQU1BLENBQUNBLGNBQWNBLENBQUNBLFFBQVFBLENBQUNBLGVBQWVBLENBQUNBLDBCQUEwQkEsQ0FBQ0E7QUFDckZBLG9CQUFJQSxJQUFJQSxHQUFHQSw2Q0FBNkNBLENBQUNBLElBQUlBLENBQUNBLElBQUlBLENBQUNBLFdBQVdBLENBQUNBLENBQUNBO0FBQ2hGQSxvQkFBSUEsR0FBR0EsSUFBSUEsV0FBV0EsQ0FBQ0E7QUFDbkJBLHdCQUFJQSxFQUFFQSxJQUFJQSxDQUFDQSxDQUFDQSxDQUFDQTtBQUNiQSwwQkFBTUEsRUFBRUEsSUFBSUEsQ0FBQ0EsQ0FBQ0EsQ0FBQ0EsSUFBSUEsSUFBSUE7QUFDdkJBLHdCQUFJQSxFQUFFQSxJQUFJQSxDQUFDQSxPQUFPQTtBQUNsQkEsd0JBQUlBLEVBQUVBLElBQUlBLENBQUNBLFVBQVVBO0FBQ3JCQSw2QkFBU0EsRUFBRUEsSUFBSUEsQ0FBQ0EsVUFBVUE7aUJBQzdCQSxDQUFDQSxDQUFDQTtBQUVIQSx1QkFBT0EsSUFBSUEsQ0FBQ0E7YUFDZkEsQ0FBQ0EsQ0FBQ0E7U0FDTkE7OztXQTVFTCxHQUFBOzs7cUJBQUEsR0FBQSIsImZpbGUiOiJpbmRleC5qcyIsInNvdXJjZXNDb250ZW50IjpbIi8vLyA8cmVmZXJlbmNlIHBhdGg9XCIuL2luZGV4LmQudHNcIiAvPlxyXG5cclxuaW1wb3J0IHtTZXJ2aWNlfSBmcm9tICcuL3NlcnZpY2UnO1xyXG5cclxuY2xhc3MgTG9jYXRpb24ge1xyXG4gICAgY29kZTpudW1iZXI7XHJcbiAgICBjaXR5OnN0cmluZztcclxuICAgIHBhcmVudDpzdHJpbmc7XHJcbiAgICBhZ2VudDp7XHJcbiAgICAgICAgY29kZTpudW1iZXI7XHJcbiAgICAgICAgbmFtZTpzdHJpbmc7XHJcbiAgICB9O1xyXG5cclxuICAgIGNvbnN0cnVjdG9yKGl0ZW06YW55KSB7XHJcbiAgICAgICAgdGhpcy5jb2RlID0gTnVtYmVyKGl0ZW0uY29kZSk7XHJcbiAgICAgICAgdGhpcy5jaXR5ID0gaXRlbS5jaXR5O1xyXG4gICAgICAgIHRoaXMucGFyZW50ID0gaXRlbS5wYXJlbnQ7XHJcbiAgICAgICAgdGhpcy5hZ2VudCA9IHtcclxuICAgICAgICAgICAgY29kZTogTnVtYmVyKGl0ZW0uYWdlbnQuY29kZSksXHJcbiAgICAgICAgICAgIG5hbWU6IGl0ZW0uYWdlbnQubmFtZVxyXG4gICAgICAgIH1cclxuICAgIH1cclxufVxyXG5cclxuY2xhc3MgQ2FsY3VsYXRpb24ge1xyXG4gICAgY2l0eTpzdHJpbmc7XHJcbiAgICBwYXJlbnQ6c3RyaW5nO1xyXG4gICAgY29zdDpudW1iZXI7XHJcbiAgICBpbnN1cmFuY2U6bnVtYmVyO1xyXG4gICAgdGltZTpudW1iZXI7XHJcblxyXG4gICAgY29uc3RydWN0b3IoaXRlbTphbnkpIHtcclxuICAgICAgICB0aGlzLmNpdHkgPSBpdGVtLmNpdHk7XHJcbiAgICAgICAgdGhpcy5wYXJlbnQgPSBpdGVtLnBhcmVudDtcclxuICAgICAgICB0aGlzLmNvc3QgPSBOdW1iZXIoaXRlbS5jb3N0KTtcclxuICAgICAgICB0aGlzLmluc3VyYW5jZSA9IE51bWJlcihpdGVtLmluc3VyYW5jZSk7XHJcbiAgICAgICAgdGhpcy50aW1lID0gTnVtYmVyKGl0ZW0udGltZSk7XHJcbiAgICB9XHJcbn1cclxuXHJcbmV4cG9ydCBkZWZhdWx0IGNsYXNzIEFQSSB7XHJcbiAgICBzZXJ2aWNlOlNlcnZpY2U7XHJcbiAgICBjbGllbnROYW1lOnN0cmluZztcclxuXHJcbiAgICBjb25zdHJ1Y3Rvcih1c2VyOnN0cmluZywgcGFzczpzdHJpbmcgPSBudWxsKSB7XHJcbiAgICAgICAgdGhpcy5jbGllbnROYW1lID0gdXNlcjtcclxuICAgICAgICB0aGlzLnNlcnZpY2UgPSBuZXcgU2VydmljZSh7dXJsOiAnaHR0cDovL2NvdXJpZXJuZXcubWUtb25saW5lLnJ1L0NhbGN1bGF0b3IuYXNteD9XU0RMJywgdXNlciwgcGFzc30pO1xyXG4gICAgfVxyXG5cclxuICAgIC8qKlxyXG4gICAgICogQHJldHVybnMge1Byb21pc2U8TG9jYXRpb25bXT59XHJcbiAgICAgKi9cclxuICAgIGdldENpdGllcygpOlByb21pc2U8TG9jYXRpb25bXT4ge1xyXG4gICAgICAgIHJldHVybiB0aGlzLnNlcnZpY2UuY2FsbDxDaXR5TGlzdE1lc3NhZ2U+KCdDaXR5cycpLnRoZW4ocmVzdWx0ID0+IHtcclxuICAgICAgICAgICAgbGV0IGRhdGEgPSBbXTtcclxuICAgICAgICAgICAgaWYgKHJlc3VsdC5oYXNPd25Qcm9wZXJ0eSgnQ2l0eXNSZXN1bHQnKSA9PSBmYWxzZVxyXG4gICAgICAgICAgICAgICAgfHwgcmVzdWx0LkNpdHlzUmVzdWx0Lmhhc093blByb3BlcnR5KCdkaWZmZ3JhbScpID09PSBmYWxzZVxyXG4gICAgICAgICAgICAgICAgfHwgcmVzdWx0LkNpdHlzUmVzdWx0LmRpZmZncmFtLmhhc093blByb3BlcnR5KCdEb2N1bWVudEVsZW1lbnQnKSA9PSBmYWxzZVxyXG4gICAgICAgICAgICAgICAgfHwgcmVzdWx0LkNpdHlzUmVzdWx0LmRpZmZncmFtLkRvY3VtZW50RWxlbWVudC5oYXNPd25Qcm9wZXJ0eSgnQ2l0aWVzJykgPT0gZmFsc2UpIHtcclxuICAgICAgICAgICAgICAgIHJldHVybiBkYXRhO1xyXG4gICAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgICBmb3IgKGxldCBpdGVtIG9mIHJlc3VsdC5DaXR5c1Jlc3VsdC5kaWZmZ3JhbS5Eb2N1bWVudEVsZW1lbnQuQ2l0aWVzKSB7XHJcbiAgICAgICAgICAgICAgICBsZXQgY2l0eSA9IC8oW9CwLdGPZi16MC05Xy1dKylcXHMqKFxcKChb0LAt0Y9mLXowLTlfLV0rKVxcKSk/L2kuZXhlYyhpdGVtLkNpdHlSdXNOYW1lKTtcclxuICAgICAgICAgICAgICAgIGxldCBhZ2VudCA9IC8oW9CwLdGPZi16MC05Xy1dKylcXHMqL2kuZXhlYyhpdGVtLkFnZW50TmFtZVJ1cyk7XHJcbiAgICAgICAgICAgICAgICBkYXRhLnB1c2gobmV3IExvY2F0aW9uKHtcclxuICAgICAgICAgICAgICAgICAgICBjb2RlOiBpdGVtLkNpdHlDb2RlLFxyXG4gICAgICAgICAgICAgICAgICAgIGNpdHk6IGNpdHlbMV0sXHJcbiAgICAgICAgICAgICAgICAgICAgcGFyZW50OiBjaXR5WzNdIHx8IG51bGwsXHJcbiAgICAgICAgICAgICAgICAgICAgYWdlbnQ6IHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgY29kZTogaXRlbS5BZ2VudENvZGUsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIG5hbWU6IGFnZW50WzFdXHJcbiAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgfSkpO1xyXG4gICAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgICByZXR1cm4gZGF0YTtcclxuICAgICAgICB9KTtcclxuICAgIH1cclxuXHJcbiAgICAvKipcclxuICAgICAqIEBwYXJhbSBvcmlnaW5DaXR5Q29kZVxyXG4gICAgICogQHBhcmFtIGRlc3RpbmF0aW9uQ2l0eUNvZGVcclxuICAgICAqIEBwYXJhbSB3ZWlnaHRcclxuICAgICAqIEBwYXJhbSBjYXJnb0Nvc3RcclxuICAgICAqIEByZXR1cm5zIHtQcm9taXNlPFQ+fVxyXG4gICAgICovXHJcbiAgICBjYWxjdWxhdGUob3JpZ2luQ2l0eUNvZGU6bnVtYmVyLCBkZXN0aW5hdGlvbkNpdHlDb2RlOm51bWJlciwgd2VpZ2h0Om51bWJlciA9IDEsIGNhcmdvQ29zdDpudW1iZXIgPSAwKTpQcm9taXNlPENhbGN1bGF0aW9uPiB7XHJcbiAgICAgICAgcmV0dXJuIHRoaXMuc2VydmljZS5jYWxsPENhbGN1bGF0ZU1lc3NhZ2U+KCdDYWxjX3RvcicsIHtcclxuICAgICAgICAgICAgQ2xpZW50TmFtZTogdGhpcy5jbGllbnROYW1lLFxyXG4gICAgICAgICAgICBPcmlnQ2l0eUNvZGU6IG9yaWdpbkNpdHlDb2RlLFxyXG4gICAgICAgICAgICBEZXN0Q2l0eUNvZGU6IGRlc3RpbmF0aW9uQ2l0eUNvZGUsXHJcbiAgICAgICAgICAgIFdlaWdodDogd2VpZ2h0LFxyXG4gICAgICAgICAgICBXQkNvc3Q6IGNhcmdvQ29zdFxyXG4gICAgICAgIH0pLnRoZW4ocmVzdWx0ID0+IHtcclxuICAgICAgICAgICAgdmFyIGRhdGEgPSBudWxsO1xyXG4gICAgICAgICAgICBjb25zb2xlLmxvZyhyZXN1bHQuQ2FsY190b3JSZXN1bHQuZGlmZmdyYW0uRG9jdW1lbnRFbGVtZW50KTtcclxuICAgICAgICAgICAgaWYgKHJlc3VsdC5oYXNPd25Qcm9wZXJ0eSgnQ2FsY190b3JSZXN1bHQnKSA9PSBmYWxzZVxyXG4gICAgICAgICAgICAgICAgfHwgcmVzdWx0LkNhbGNfdG9yUmVzdWx0Lmhhc093blByb3BlcnR5KCdkaWZmZ3JhbScpID09PSBmYWxzZVxyXG4gICAgICAgICAgICAgICAgfHwgcmVzdWx0LkNhbGNfdG9yUmVzdWx0LmRpZmZncmFtLmhhc093blByb3BlcnR5KCdEb2N1bWVudEVsZW1lbnQnKSA9PSBmYWxzZVxyXG4gICAgICAgICAgICAgICAgfHwgcmVzdWx0LkNhbGNfdG9yUmVzdWx0LmRpZmZncmFtLkRvY3VtZW50RWxlbWVudC5oYXNPd25Qcm9wZXJ0eSgnTUVHQV9TUF9UYXJpZmZfQ2FsY19DbGllbnQnKSA9PSBmYWxzZSkge1xyXG4gICAgICAgICAgICAgICAgcmV0dXJuIGRhdGE7XHJcbiAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICAgIGxldCBpdGVtID0gcmVzdWx0LkNhbGNfdG9yUmVzdWx0LmRpZmZncmFtLkRvY3VtZW50RWxlbWVudC5NRUdBX1NQX1RhcmlmZl9DYWxjX0NsaWVudDtcclxuICAgICAgICAgICAgbGV0IGNpdHkgPSAvKFvQsC3Rj2YtejAtOV8tXSspXFxzKihcXCgoW9CwLdGPZi16MC05Xy1dKylcXCkpPy9pLmV4ZWMoaXRlbS5DaXR5UnVzTmFtZSk7XHJcbiAgICAgICAgICAgIGRhdGEgPSBuZXcgQ2FsY3VsYXRpb24oe1xyXG4gICAgICAgICAgICAgICAgY2l0eTogY2l0eVsxXSxcclxuICAgICAgICAgICAgICAgIHBhcmVudDogY2l0eVszXSB8fCBudWxsLFxyXG4gICAgICAgICAgICAgICAgY29zdDogaXRlbS5mVGFyaWZmLFxyXG4gICAgICAgICAgICAgICAgdGltZTogaXRlbS5mRGVsaXZ0aW1lLFxyXG4gICAgICAgICAgICAgICAgaW5zdXJhbmNlOiBpdGVtLmZJbnN1cmFuY2VcclxuICAgICAgICAgICAgfSk7XHJcblxyXG4gICAgICAgICAgICByZXR1cm4gZGF0YTtcclxuICAgICAgICB9KTtcclxuICAgIH1cclxufVxyXG4iXSwic291cmNlUm9vdCI6ImU6XFx3d3dcXGRlbGl2ZXJ5XFxtYWpvcmV4cHJlc3NcXGJ1aWxkLXRzIn0=
