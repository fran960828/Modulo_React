export interface Iplace {
    id:string,
    title:string,
    image:{
        src:string,
        alt:string
    },
    lat:number,
    lon:number
}
export interface IsortPlaces {
    initialValue:any[],
    fnfetch:()=>Promise<Iplace[]>,
    fnSort?:(place:Iplace[],lat:number,lon:number)=>Iplace[]
}

export interface Ierror {
    message:string
}