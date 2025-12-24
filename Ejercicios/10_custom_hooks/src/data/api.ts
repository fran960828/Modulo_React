import type { Iplace } from "../core/entities"

export async function fetchPlaces():Promise<Iplace[]>{
    const response=await fetch('http://localhost:3000/places')
    const resData=await response.json()

    if (!response.ok){
        throw new Error('failed connection to database')
    }
    return resData.places
}