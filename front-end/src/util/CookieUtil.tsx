import {cookies} from "next/headers";


const useCookie = () => {

    const setCookie = (name: string, value: string,secure:boolean = false):void => {
        cookies().set(name, value, {secure})
    }

    const deleteCookie = (name: string):void => {
        if(cookies().has(name)) cookies().delete(name)
    }

    const getCookie = (name: string):any => {
        return cookies().get(name)
    }

    return {setCookie, deleteCookie, getCookie}
}


export default useCookie