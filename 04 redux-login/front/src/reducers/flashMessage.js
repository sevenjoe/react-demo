import shortid from 'shortid';
import findeIndex from 'lodash/findIndex';

const flashMessage = (state = [], action = {}) => {
    switch (action.type) {
        case 'ADD_FLASH_MESSAGES':
            return [
                ...state,
                {
                    id: shortid.generate(),
                    type: action.message.type,
                    text: action.message.text
                }
            ];
        case "DELETE_FLASH_MESSAGES":
            //匹配不到就是-1,这里是去除和store里面相同的元素
            const index = findeIndex(state, {id: action.id});
            if (index >= 0) {
                return [
                    ...state.slice(0, index),
                    ...state.slice(index + 1)
                ]
            }
            return state;
        default:
            return state;
    }
};

export default flashMessage;