import axios from "axios"
import { Session } from "next-auth";
import { getSession } from "next-auth/react";

export const isAxiosError = (error: unknown) => {
    return axios.isAxiosError(error)
}

export const deepObjectComparison = (obj1: any, obj2: any) => {
    if (obj1 === obj2) return true;
    if (typeof obj1 !== 'object' || obj1 === null || typeof obj2 !== 'object' || obj2 === null) {
        return false;
    }
    const keys1 = Object.keys(obj1);
    const keys2 = Object.keys(obj2);
    if (keys1.length !== keys2.length) return false;
    for (let key of keys1) {
        if (!keys2.includes(key) || !deepObjectComparison(obj1[key], obj2[key])) {
            return false;
        }
    }
    return true;
}

export const formatVND = (n: number) => {
    const config: Intl.NumberFormatOptions = { style: 'currency', currency: 'VND', maximumFractionDigits: 9 }
    const formated = new Intl.NumberFormat('vi-VN', config);
    return formated.format(n)
}

let cachedSession: Session | null = null;

export const getCachedSession = async (): Promise<Session | null> => {
    // If there's no cached session, fetch it
    if (!cachedSession) {
        cachedSession = await getSession()
    }
    return cachedSession
}

export const clearCachedSession = () => {
    cachedSession = null
}

