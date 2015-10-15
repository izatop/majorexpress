interface ICredentials {
    client:number;
    key:string;
}

interface IServiceOptions {
    test:boolean;
}

interface IContext {
    credentials:ICredentials;
    hostname:string;
}

interface IServiceResponse {
    [key:string]:any;
}

interface IServiceRequest {
    [key:string]:any;
}

interface IncomingMessage {

}

declare module "soap" {
    export function createClient(url:string, options:any, callback:(error:Error, client:SOAPClient) => void);
    export function createClient(url:string, callback:(error:Error, client:SOAPClient) => void);

    interface SOAP {
        createClient(url:string, options:any, callback:(error:Error, client:SOAPClient) => void):void;
        createClient(url:string, callback:(error:Error, client:SOAPClient) => void):void;
    }

    export class SOAPClient {
        describe():any;
        [x:string]:<T>(...args:any[]) => Promise<T>;
    }
    export default SOAP;
}