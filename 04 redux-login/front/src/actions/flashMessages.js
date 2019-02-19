import {ADD_FLASH_MESSAGES} from '../constants';
import {DELETE_FLASH_MESSAGES} from '../constants';
export const addFlashMessage = (message) =>{
    return {
        type:ADD_FLASH_MESSAGES,
        message
    }
};

export const deleteFlashMessage = (id) =>{
    return {
        type:DELETE_FLASH_MESSAGES,
        id
    }
};