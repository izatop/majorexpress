import {Service} from './service';

export default class API {
    service:Service;
    clientName:string;

    constructor(user:string, pass:string) {
        this.clientName = user;
        this.service = new Service({url: 'http://couriernew.me-online.ru/Calculator.asmx?WSDL', user, pass});
    }

    /**
     * @returns {Promise<T>}
     */
    getCities() {
        return this.service.call('Citys');
    }

    /**
     * @param originCityCode
     * @param destinationCityCode
     * @param weight
     * @param cargoCost
     * @returns {Promise<T>}
     */
    calculate(originCityCode:number, destinationCityCode:number, weight:number = 1, cargoCost:number = 0) {
        return this.service.call('Calc_tor', {
            ClientName: this.clientName,
            OrigCityCode: originCityCode,
            DestCityCode: destinationCityCode,
            Weight: weight,
            WBCost: cargoCost
        });
    }
}
