import { useState } from 'react';

// type icons
import roots from '../assets/icons/type/roots.png';
import vegetables from '../assets/icons/type/vegetables.png';
import fruits from '../assets/icons/type/fruits.png';
import herbs from '../assets/icons/type/herbs.png';
import killer from '../assets/icons/type/killer.png';

// ui icons
import add from '../assets/icons/ui/add.svg';
import add2 from '../assets/icons/ui/add-2.svg';
import addChecked from '../assets/icons/ui/add-checked.svg';
import favoriteFull from '../assets/icons/ui/favoriteFull.png';
import favoriteEmpty from '../assets/icons/ui/favoriteEmpty.png';
import caret from '../assets/icons/ui/caret.png';

const SearchResultCard = ({ plantName, img, type, delay }) => {
    // set icons
    let icon = null;
    if (type === 'fruits') icon = fruits;
    else if (type === 'vegetables') icon = vegetables;
    else if (type === 'roots') icon = roots;
    else if (type === 'herbs') icon = herbs;
    else icon = killer;

    const [favorite, setFavorite] = useState(false);

    const changeFavorite = () => {
        setFavorite(!favorite);
    };

    return (
        <section
            className="search-results--card"
            style={{
                animation: `1s moveInLeft ${delay / 1.5}s ease-in-out`,
                animationFillMode: 'backwards'
            }}
        >
            <div
                className="search-results--card__header"
                style={{
                    backgroundImage: `url(${img})`,
                    backgroundRepeat: 'no-repeat',
                    backgroundPosition: 'center',
                    backgroundSize: 'cover'
                }}
            >
                <div className="wave">
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1440 320">
                        <path
                            fill="#fff"
                            fill-opacity="1"
                            d="M0,224L60,224C120,224,240,224,360,234.7C480,245,600,267,720,234.7C840,203,960,117,1080,101.3C1200,85,1320,139,1380,165.3L1440,192L1440,320L1380,320C1320,320,1200,320,1080,320C960,320,840,320,720,320C600,320,480,320,360,320C240,320,120,320,60,320L0,320Z"
                        ></path>
                    </svg>
                </div>
            </div>

            <div className="search-results--card__infoControls">
                <div className="search-results--card__infoControls__nameFavorite">
                    <h3 className="search-results--card__infoControls__name">{plantName}</h3>
                    {!favorite ? (
                        <img
                            onClick={changeFavorite}
                            className="search-results--card__header__favorite"
                            alt="Heart outline symbol"
                            src={favoriteEmpty}
                        />
                    ) : (
                        <img
                            onClick={changeFavorite}
                            className="search-results--card__header__favorite"
                            alt="Heart outline symbol"
                            src={favoriteFull}
                        />
                    )}
                </div>

                <div className="search-results--card__infoControls__icons-group">
                    <img className="icon__info" alt="svgImg" src={caret} />
                    <img className="search-results__icons" alt="Add symbol" src={add2} />
                </div>
            </div>
        </section>
    );
};

export default SearchResultCard;
