import { useEffect, useState } from "react";
import type{ IsortPlaces, Iplace, Ierror } from "../core/entities";




export function useSort({initialValue,fnfetch,fnSort}:IsortPlaces){
const [fetching,setFetching]=useState(false)
const [data,setData]=useState<Iplace[]>(initialValue)
const [errorFetch,setErrorFetch]=useState<Ierror|null>(null)


useEffect(()=>{
    const fetchData = async () => {
        setFetching(true)
        try {
            
            const places=await fnfetch()
            if(fnSort) {
            navigator.geolocation.getCurrentPosition((position:GeolocationPosition)=>{
                const sortedPlaces=fnSort(places,position.coords.latitude,position.coords.longitude)
                setData(sortedPlaces)
                setFetching(false)
                return {data,fetching,errorFetch}
            })}
        } catch (error:unknown) {
             let message = 'fallo en la toma de datos'

            if (error instanceof Error) {
                message = error.message
            }

            setErrorFetch({ message })
                }
            setFetching(false)
    }
    fetchData()
},[])
}