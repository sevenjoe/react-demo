import {combineReducers} from 'redux';

import games from './games';
export default combineReducers({
    games:games
});
//合并后的reducer可以调用各个子reducer并把它们返回的结果合并成一个state对象。由combineReducers()返回的state对象，
// 会将传入的每个reducer返回的state按其传递给combineReducers() 时对应的key进行命名。

//也就是说会返回一个大的state对象,可以通过对应的key去获取单个的reducer的返回值.