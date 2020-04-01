export interface NType {
    name: string;
    value: string;
}

export interface INumberList {
    respType:any;
    data:[];
    phoneNumber: string;
    addressRequirements: string;
    capabilities:ICapabilities;
    isoCountry:string;
    postalCode:string;
    region:string;
}
export interface ICapabilities{
    MMS:boolean;
    SMS:boolean;
    fax:boolean;
    voice:boolean;
}
export class NumberList implements INumberList {
    phoneNumber: string;
    addressRequirements: string;
    isoCountry:string;
    postalCode:string;
    region:string;
    capabilities:ICapabilities;
    respType:any;
    data:[];
    constructor(numberList: INumberList) {
        this.phoneNumber = numberList.phoneNumber;
        this.addressRequirements = numberList.addressRequirements;
        this.capabilities = numberList.capabilities;
        this.postalCode = numberList.postalCode;
        this.region = numberList.region;
        this.isoCountry = numberList.isoCountry;
    }
}