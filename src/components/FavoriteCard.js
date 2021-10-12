import { useContext, useState } from 'react';

// contexts
import { authContext } from '../stores/auth/auth.js';
import { dataContext } from '../stores/data/store';

// actions
import { REMOVE_FAVORITE } from '../stores/data/actions.js';

// assets
import remove from '../assets/icons/ui/remove.svg';
import caret from '../assets/icons/ui/caret.png';

const FavoriteCard = ({ favorite, delay }) => {
    const { dataState, dispatch } = useContext(dataContext);

    return (
        <div
            className="FavoriteCard"
            style={{
                animation: `1s moveInLeft ${delay / 1.5}s ease-in-out`,
                animationFillMode: 'backwards'
            }}
        >
            <div
                className="FavoriteCard__img"
                style={{
                    backgroundImage: `url('http://localhost:3000${favorite.img}')`,
                    backgroundRepeat: 'no-repeat',
                    backgroundPosition: 'center',
                    backgroundSize: 'cover'
                }}
            ></div>
            <div className="FavoriteCard__info">
                <h3 className="FavoriteCard__info__name">{favorite.plantName}</h3>
                <h4>added on DATE</h4>
                <img className="FavoriteCard__info__caret" alt="Heart outline symbol" src={caret} />
                <img
                    className="FavoriteCard__info__remove"
                    alt="Heart outline symbol"
                    src={remove}
                    onClick={() => dispatch({ type: REMOVE_FAVORITE, payload: favorite })}
                />
            </div>
        </div>
    );
};

export default FavoriteCard;
