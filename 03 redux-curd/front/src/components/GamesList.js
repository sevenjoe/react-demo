import React from 'react';
import GameCard from './GameCard';
//这里是无状态组件,不需要用this.props.games获取父组件传来的值,用{games}即可.
const GamesList = ({games,deleteGame}) => {
    const emptyMessage = (
        <p>There are no games yet in your collection.</p>
    );
    const gamesList = (
        <div className="ui four cards">
            {games.map(game => <GameCard game={game} deleteGame={deleteGame} key={game._id}/> )}
        </div>
    );
    return (
        <div>
            {games.length === 0 ? emptyMessage : gamesList}
        </div>
    )
};
export default GamesList;