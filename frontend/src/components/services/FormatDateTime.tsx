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
    return `${date_time?.year()}-${date_time?.month()! + 1}-${date_time?.date()}`
}