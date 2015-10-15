/// <reference path="../typings/tsd.d.ts" />
/// <reference path="./index.d.ts" />

import * as SOAP from 'soap';

export class Service {
    options:{url:string, user:string, pass?:string};
    client:SOAP.SOAPClient;

    constructor(options:{url:string, user:string, pass?:string}) {
        this.options = options;
    }

    /**
     * Deferred creation.
     */
    createClient():Promise<SOAP.SOAPClient> {
        return new Promise((resolve, reject) => {
            if (this.client) {
                return resolve(this.client);
            }

            SOAP.createClient(this.options.url, (error, client:SOAP.SOAPClient) => {
                if (error) {
                    return reject(error);
                }

                this.client = client;
                resolve(client);
            });
        });
    }

    /**
     * This function calls the service own methods.
     *
     * @param method        Service's method name
     * @param parameters    Method's parameters
     * @returns {Promise<T>}
     */
    call<T>(method:string, parameters:{[x:string]:any} = {}):Promise<T> {
        return new Promise((resolve, reject) => {
            this.createClient().then((client) => {
                if (client.hasOwnProperty(method)) {
                    if (!parameters) {
                        parameters = {};
                    }

                    return client[method].call(client, parameters, (error, result) => {
                        if (error) {
                            return reject(error);
                        }

                        resolve(result);
                    });
                } else {
                    reject(new Error(`Method ${method} has not found`));
                }
            })
            .catch(reject);
        });
    }
}


