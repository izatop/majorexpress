/// <reference path="./index.d.ts" />

import {Service} from './service';

const trim = (str:string):string => {
    if (typeof str === "string") {
        return str.replace(/^\s*/, '').replace(/\s*$/, '')
    }

    return str;
};

class Location {
    code:number;
    city:string;
    parent:string;
    agent:{
        code:number;
        name:string;
    };

    constructor(item:any) {
        this.code = Number(item.code);
        this.city = trim(item.city);
        this.parent = trim(item.parent);
        this.agent = {
            code: Number(item.agent.code),
            name: trim(item.agent.name)
        }
    }
}

class Calculation {
    city:string;
    parent:string;
    cost:number;
    insurance:number;
    time:number;

    constructor(item:any) {
        this.city = trim(item.city);
        this.parent = trim(item.parent);
        this.cost = Number(item.cost);
        this.insurance = Number(item.insurance);
        this.time = Number(item.time);
    }
}

export default class API {
    service:Service;
    clientName:string;

    constructor(user:string, pass:string = null) {
        this.clientName = user;
        this.service = new Service({url: 'http://couriernew.me-online.ru/Calculator.asmx?WSDL', user, pass});
    }

    /**
     * @returns {Promise<Location[]>}
     */
    getCities():Promise<Location[]> {
        return this.service.call<CityListMessage>('Citys').then(result => {
            let data = [];
            if (result.hasOwnProperty('CitysResult') == false
                || result.CitysResult.hasOwnProperty('diffgram') === false
                || result.CitysResult.diffgram.hasOwnProperty('DocumentElement') == false
                || result.CitysResult.diffgram.DocumentElement.hasOwnProperty('Cities') == false) {
                return data;
            }

            for (let item of result.CitysResult.diffgram.DocumentElement.Cities) {
                let city = /([а-яf-z0-9_\s\.-]+)\s*(\(([а-яf-z0-9_\s\.-]+)\))?/i.exec(item.CityRusName);
                let agent = /([а-яf-z0-9_\s\.-]+)\s*/i.exec(item.AgentNameRus);
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

            return data;
        });
    }

    /**
     * @param originCityCode
     * @param destinationCityCode
     * @param weight
     * @param cargoCost
     * @returns {Promise<T>}
     */
    calculate(originCityCode:number, destinationCityCode:number, weight:number = 1, cargoCost:number = 0):Promise<Calculation> {
        return this.service.call<CalculateMessage>('Calc_tor', {
            ClientName: this.clientName,
            OrigCityCode: originCityCode,
            DestCityCode: destinationCityCode,
            Weight: weight,
            WBCost: cargoCost
        }).then(result => {
            var data = null;
            if (result.hasOwnProperty('Calc_torResult') == false
                || result.Calc_torResult.hasOwnProperty('diffgram') === false
                || result.Calc_torResult.diffgram.hasOwnProperty('DocumentElement') == false
                || result.Calc_torResult.diffgram.DocumentElement.hasOwnProperty('MEGA_SP_Tariff_Calc_Client') == false) {
                return data;
            }

            let item = result.Calc_torResult.diffgram.DocumentElement.MEGA_SP_Tariff_Calc_Client;
            let city = /([а-яf-z0-9_\s\.-]+)\s*(\(([а-яf-z0-9_\s\.-]+)\))?/i.exec(item.CityRusName);
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
}
