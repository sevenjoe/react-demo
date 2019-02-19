import React, {Component} from "react";
import {connect} from 'react-redux';
import GamesList from './GamesList';
import {fetchGames,deleteGame} from '../actions';

class GamesPage extends Component {
    componentDidMount() {
        // 当gamesPage组件挂载之后向服务器请求数据
        this.props.fetchGames();
    }

    render() {
        return (
            <div>
                <GamesList games={this.props.games} deleteGame={this.props.deleteGame}/>
            </div>
        )
    }
}

const mapStateToProps = (state) => {
    return {
        /*注:这里的state是combineReducers返回的一个大的对象,state.games相当于这个大的state里面的key,
        对应的值是个数组,子reducer返回的数组.*/
        games: state.games
    }
};
export default connect(mapStateToProps, {fetchGames,deleteGame})(GamesPage);