const games = (state = [], action = {}) => {
    switch (action.type) {
        case 'SET_GAMES':
            return action.games;
        case 'ADD_GAME':
            return [
                ...state,
                action.game
            ];
        case 'GAME_UPDATED':
            return state.map(item => {
                //action.game是修改数据后从服务器返回的新的一条记录.
                if (item._id === action.game._id) return action.game;
                return item;

                //如果if return了后面就不会再执行了,如果没return,继续执行.
                //如果匹配到了就返回新的记录,然后进行下一轮比较,没匹配到就返回旧的记录
                //最后把所有返回的记录合并成一个数组.
            });

        case 'GAME_DELETED':
            return state.filter(item => item._id !== action.gameID);

        case 'GAME_FETCHED':
            //返回满足条件时的下标
            const index = state.findIndex(item => item._id === action.game._id)
            if (index > -1) {
                return state.map(item => {
                    if (item._id === action.game._id) return action.game;
                    return item;
                })
            } else {
                return [
                    ...state,
                    action.game
                ]
            }
        default:
            return state;
    }
};
export default games;