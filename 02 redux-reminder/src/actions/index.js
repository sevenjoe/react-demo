import {ADD_REMINDER,DELETE_REMINDER,CLEAR_REMINDERS} from "../constants";

export const addReminder = (text,duDate)=>{
    return {
        type:ADD_REMINDER,
        text:text,
        duDate:duDate

    }
}
export const deleteReminder = (id)=>{
    return {
        type: DELETE_REMINDER,
        id:id
    }
}
export const clearReminders =()=>{
    return {
        type:CLEAR_REMINDERS
    }
}