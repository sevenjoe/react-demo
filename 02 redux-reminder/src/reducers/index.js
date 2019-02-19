import { bake_cookie, read_cookie, } from 'sfcookies';

const reminder = (action)=>{
    return {
        text:action.text,
        id:Math.random(),
        dueDate: action.duDate
    }
}
const reminders = (state = read_cookie('reminders')||[],action = {})=>{
    let reminders = null;
    switch (action.type) {
        case "ADD_REMINDER":
            reminders = [
                ...state,
                reminder(action)
            ];
            bake_cookie('reminders',reminders);
            return reminders;

        case "DELETE_REMINDER":
            reminders = state.filter(reminder=>reminder.id!==action.id);
            bake_cookie('reminders',reminders);
            return reminders;
        case 'CLEAR_REMINDERS':
            reminders = [];
            bake_cookie('reminders',reminders);
            return reminders;
        default:return state;
    }

}
export default reminders;