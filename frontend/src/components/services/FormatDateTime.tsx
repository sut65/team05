import { Dayjs } from "dayjs"

export function formatTime(date_time : Dayjs | null){
    if (`${date_time?.hour()}`.length == 1 && `${date_time?.minute()}`.length == 1) {
        return `0${date_time?.hour()}:0${date_time?.minute()}`
    }
    else if (`${date_time?.hour()}`.length == 2 && `${date_time?.minute()}`.length == 1) {
        return `${date_time?.hour()}:0${date_time?.minute()}`
    }
    else if (`${date_time?.hour()}`.length == 1 && `${date_time?.minute()}`.length == 2) {
        return `0${date_time?.hour()}:${date_time?.minute()}`
    }
    else {
        return `${date_time?.hour()}:${date_time?.minute()}`
    }
}

export function formatDate(date_time : Dayjs | null){
    const day = date_time?.date()
    const month = date_time?.month()! + 1
    const year = date_time?.year()

    // if day < 10 and month < 10
    if (day! < 10 && month! < 10){
        return `0${day}/0${month}/${year}`
    }
    // if day >= 10 and month < 10
    else if (day! >= 10 && month! < 10){
        return `${day}/0${month}/${year}`
    } 
    else {
        return `${day}/${month}/${year}`
    }

    // if day >= 10 and month >= 10
}