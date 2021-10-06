import { useContext, useState } from 'react';

// contexts
import { authContext } from '../stores/auth/auth.js';
import { dataContext } from '../stores/data/store';

// assets
import favoriteFull from '../assets/icons/ui/favoriteFull.png';
import remove from '../assets/icons/ui/remove.svg';
import caret from '../assets/icons/ui/caret.png';

const FavoriteCard = ({ favorite, delay }) => {
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
                    backgroundImage: `url(${favorite.img})`,
                    backgroundRepeat: 'no-repeat',
                    backgroundPosition: 'center',
                    backgroundSize: 'cover'
                }}
            ></div>
            <div className="FavoriteCard__info">
                <h3 className="FavoriteCard__info__name">{favorite.plantName}</h3>
                <h4>added on DATE</h4>
                <img className="FavoriteCard__info__caret" alt="Heart outline symbol" src={caret} />
                <img className="FavoriteCard__info__remove" alt="Heart outline symbol" src={remove} />
            </div>
        </div>
    );
};

export default FavoriteCard;
