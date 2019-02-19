import {SET_GAMES, ADD_GAME, GAME_FETCHED,GAME_UPDATED,GAME_DELETED} from '../constants/index';

const setGames = (games) => {
    return {
        type: SET_GAMES,
        games: games,
    }
};

const gameFetched = (game) => {
    return {
        type: GAME_FETCHED,
        game
    }
}

//gamesPage挂载之后请求数据
export const fetchGames = () => {
    /*因为有了thunk这个中间件，store发现action 是一个函数，会自动执行这个函数.
    action可以是一个函数，这个函数有个参数是dispatch,必须填了才能在后面多次调用dispatch,
    从而把最终的action{}对象注入到reducer中。*/
    return (dispatch) => {
        fetch('/api/games')
        //如果把nginx对games的请求改成重写到index.html那么,响应的res.json就解析不了,报错,state没有改变,也就不会重新渲染
            .then(res => res.json())//把从服务器中拿到的json数据读取出来.
            .then(data => {

                /*dispatch把action发布到reducer中,在gamesPage里面react-redux把reducer返回的数据注入到gamesPage中,
                并传给gamesList无状态组件.*/
                dispatch(setGames(data.games));
                // console.log(data)
            })
    }
};


//定义点击编辑后,发送请求,让GamePage中的input获取{title:''...,cover:'aaa'}
export const fetchGame = (id) => {
    return (dispatch) => {
        fetch(`/api/games/${id}`)
            .then(res => res.json())
            .then(data => {
                dispatch(gameFetched(data.game));
            })
    }
};

const addGame = (game) => {
    return {
        type: ADD_GAME,
        game
    }
};

const gameUpdated =(game) => {
    return {
        type:GAME_UPDATED,
        game

    }
};

//定义响应数据
const handleResponse = (response) => {
    if (response.ok) {
        return response.json();
    } else {
        let error = new Error(response.statusText);
        error.response = response;
        throw error;
    }
};
//点提交按钮之后请求数据
export const saveGame = (data) => {
    //data是从GameForm中的state里面传进来的{title,cover}
    return (dispatch) => {
        //注意! 这里必须要在写一个return,因为dispatch()里面最终必须要返回一个值,不一定非要是{}对象,返回值类型没有任何限制。
        return fetch('/api/games', {
            method: 'post',
            body: JSON.stringify(data),//把对象或者数组变成JSON字符串
            headers: {
                "Content-Type": "application/json"
            }
        }).then(handleResponse).then(data => dispatch(addGame(data.game)))
        /*这个data不是从saveGame传过来的,是从服务器返回handleResponse处理过的{game:{title:...,cover:...}*/
    }
};

export const updateGame = (data) => {
    //data是从GameForm中的state里面传进来的{title,cover}
    return (dispatch) => {
        //注意! 这里必须要在写一个return,因为dispatch()里面最终必须要返回一个值,不一定非要是{}对象,返回值类型没有任何限制。
        return fetch(`/api/games/${data._id}`, {
            method: 'put',
            body: JSON.stringify(data),//把对象或者数组变成JSON字符串
            headers: {
                "Content-Type": "application/json"
            }
        }).then(handleResponse).then(data => dispatch(gameUpdated(data.game)))
        /*这个data不是从saveGame传过来的,是从服务器返回的handleResponse处理后的{game:{title:...,cover:...}*/
    }
};

const gameDeleted = (gameID) =>{
    return{
        type:GAME_DELETED,
        gameID
    }
};

export const deleteGame = (id) => {
    return (dispatch) => {
        return fetch(`/api/games/${id}`, {
            method: 'delete',
            headers: {
                "Content-Type": "application/json"
            }
        }).then(handleResponse).then(data => dispatch(gameDeleted(id)));
    }
};

