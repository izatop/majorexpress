'use strict';

Object.defineProperty(exports, '__esModule', {
    value: true
});

var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ('value' in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError('Cannot call a class as a function'); } }

var _service = require('./service');

var API = (function () {
    function API(user, pass) {
        _classCallCheck(this, API);

        this.clientName = user;
        this.service = new _service.Service({ url: 'http://couriernew.me-online.ru/Calculator.asmx?WSDL', user: user, pass: pass });
    }

    _createClass(API, [{
        key: 'getCities',
        value: function getCities() {
            return this.service.call('Citys');
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
            });
        }
    }]);

    return API;
})();

exports['default'] = API;
module.exports = exports['default'];
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uL3NyYy9pbmRleC50cyJdLCJuYW1lcyI6WyJBUEkiLCJBUEkuY29uc3RydWN0b3IiLCJBUEkuZ2V0Q2l0aWVzIiwiQVBJLmNhbGN1bGF0ZSJdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozt1QkFBc0IsV0FBVzs7SUFFakMsR0FBQTtBQUlJQSxhQUpKLEdBQUEsQ0FJZ0JBLElBQVdBLEVBQUVBLElBQVdBLEVBQUFBOzhCQUp4QyxHQUFBOztBQUtRQyxZQUFJQSxDQUFDQSxVQUFVQSxHQUFHQSxJQUFJQSxDQUFDQTtBQUN2QkEsWUFBSUEsQ0FBQ0EsT0FBT0EsR0FBR0EscUJBQVlBLEVBQUNBLEdBQUdBLEVBQUVBLHFEQUFxREEsRUFBRUEsSUFBSUEsRUFBSkEsSUFBSUEsRUFBRUEsSUFBSUEsRUFBSkEsSUFBSUEsRUFBQ0EsQ0FBQ0EsQ0FBQ0E7S0FDeEdBOztpQkFQTCxHQUFBOztlQVlhRCxxQkFBQUE7QUFDTEUsbUJBQU9BLElBQUlBLENBQUNBLE9BQU9BLENBQUNBLElBQUlBLENBQUNBLE9BQU9BLENBQUNBLENBQUNBO1NBQ3JDQTs7O2VBU1FGLG1CQUFDQSxjQUFxQkEsRUFBRUEsbUJBQTBCQSxFQUF5Q0E7Z0JBQXZDQSxNQUFNQSx5REFBVUEsQ0FBQ0E7Z0JBQUVBLFNBQVNBLHlEQUFVQSxDQUFDQTs7QUFDaEdHLG1CQUFPQSxJQUFJQSxDQUFDQSxPQUFPQSxDQUFDQSxJQUFJQSxDQUFDQSxVQUFVQSxFQUFFQTtBQUNqQ0EsMEJBQVVBLEVBQUVBLElBQUlBLENBQUNBLFVBQVVBO0FBQzNCQSw0QkFBWUEsRUFBRUEsY0FBY0E7QUFDNUJBLDRCQUFZQSxFQUFFQSxtQkFBbUJBO0FBQ2pDQSxzQkFBTUEsRUFBRUEsTUFBTUE7QUFDZEEsc0JBQU1BLEVBQUVBLFNBQVNBO2FBQ3BCQSxDQUFDQSxDQUFDQTtTQUNOQTs7O1dBL0JMLEdBQUE7OztxQkFBQSxHQUFBIiwiZmlsZSI6ImluZGV4LmpzIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHtTZXJ2aWNlfSBmcm9tICcuL3NlcnZpY2UnO1xyXG5cclxuZXhwb3J0IGRlZmF1bHQgY2xhc3MgQVBJIHtcclxuICAgIHNlcnZpY2U6U2VydmljZTtcclxuICAgIGNsaWVudE5hbWU6c3RyaW5nO1xyXG5cclxuICAgIGNvbnN0cnVjdG9yKHVzZXI6c3RyaW5nLCBwYXNzOnN0cmluZykge1xyXG4gICAgICAgIHRoaXMuY2xpZW50TmFtZSA9IHVzZXI7XHJcbiAgICAgICAgdGhpcy5zZXJ2aWNlID0gbmV3IFNlcnZpY2Uoe3VybDogJ2h0dHA6Ly9jb3VyaWVybmV3Lm1lLW9ubGluZS5ydS9DYWxjdWxhdG9yLmFzbXg/V1NETCcsIHVzZXIsIHBhc3N9KTtcclxuICAgIH1cclxuXHJcbiAgICAvKipcclxuICAgICAqIEByZXR1cm5zIHtQcm9taXNlPFQ+fVxyXG4gICAgICovXHJcbiAgICBnZXRDaXRpZXMoKSB7XHJcbiAgICAgICAgcmV0dXJuIHRoaXMuc2VydmljZS5jYWxsKCdDaXR5cycpO1xyXG4gICAgfVxyXG5cclxuICAgIC8qKlxyXG4gICAgICogQHBhcmFtIG9yaWdpbkNpdHlDb2RlXHJcbiAgICAgKiBAcGFyYW0gZGVzdGluYXRpb25DaXR5Q29kZVxyXG4gICAgICogQHBhcmFtIHdlaWdodFxyXG4gICAgICogQHBhcmFtIGNhcmdvQ29zdFxyXG4gICAgICogQHJldHVybnMge1Byb21pc2U8VD59XHJcbiAgICAgKi9cclxuICAgIGNhbGN1bGF0ZShvcmlnaW5DaXR5Q29kZTpudW1iZXIsIGRlc3RpbmF0aW9uQ2l0eUNvZGU6bnVtYmVyLCB3ZWlnaHQ6bnVtYmVyID0gMSwgY2FyZ29Db3N0Om51bWJlciA9IDApIHtcclxuICAgICAgICByZXR1cm4gdGhpcy5zZXJ2aWNlLmNhbGwoJ0NhbGNfdG9yJywge1xyXG4gICAgICAgICAgICBDbGllbnROYW1lOiB0aGlzLmNsaWVudE5hbWUsXHJcbiAgICAgICAgICAgIE9yaWdDaXR5Q29kZTogb3JpZ2luQ2l0eUNvZGUsXHJcbiAgICAgICAgICAgIERlc3RDaXR5Q29kZTogZGVzdGluYXRpb25DaXR5Q29kZSxcclxuICAgICAgICAgICAgV2VpZ2h0OiB3ZWlnaHQsXHJcbiAgICAgICAgICAgIFdCQ29zdDogY2FyZ29Db3N0XHJcbiAgICAgICAgfSk7XHJcbiAgICB9XHJcbn1cclxuIl0sInNvdXJjZVJvb3QiOiJlOlxcd3d3XFxkZWxpdmVyeVxcbWFqb3JleHByZXNzXFxidWlsZC10cyJ9
