import { useContext, useState } from 'react';

// contexts
import { authContext } from '../stores/auth/auth.js';
import { dataContext } from '../stores/data/store';

// assets

// default
import killer from '../assets/icons/type/killer.png';

// ui icons
import caret from '../assets/icons/ui/caret.svg';
import remove from '../assets/icons/ui/remove.svg';

// info icons
import frost from '../assets/icons/infoCard/frost.svg';
import fullSun from '../assets/icons/infoCard/fullSun.svg';
import lowSun from '../assets/icons/infoCard/lowSun.svg';
import noSun from '../assets/icons/infoCard/noSun.svg';
import seasonCool from '../assets/icons/infoCard/seasonCool.svg';
import seasonWarm from '../assets/icons/infoCard/seasonWarm.svg';
import watering from '../assets/icons/infoCard/watering.svg';
import wiki from '../assets/icons/infoCard/wiki.svg';

const MyFavoriteCard = ({ favorite, delay, removeFavorite }) => {
    // contexts
    const { userData, authToken } = useContext(authContext);
    const { dataState, dispatch } = useContext(dataContext);

    // states
    const [isExpanded, setIsExpanded] = useState(false);

    const handleExpanded = () => {
        setIsExpanded(!isExpanded);
    };

    // set season icons
    let iconSeason = null;
    if (favorite.season === 'warm') iconSeason = seasonWarm;
    else if (favorite.season === 'cool') iconSeason = seasonCool;
    else iconSeason = killer;

    // set season icons
    let iconLightConditions = null;
    if (favorite.lightConditions === 'full sun') iconLightConditions = fullSun;
    else if (favorite.lightConditions === 'part sun') iconLightConditions = lowSun;
    else if (favorite.lightConditions === 'shade') iconLightConditions = noSun;
    else iconLightConditions = killer;

    return (
        <section
            className="search-results--card"
            style={{
                animationName: 'moveInLeft',
                animationDuration: '1s',
                animationTimingFunction: 'ease-in-out',
                animationDelay: `${delay / 2}s`,
                animationFillMode: 'backwards'
            }}
        >
            <div className="search-results--card__deleteFavorites">
                <img
                    onClick={() => removeFavorite(favorite)}
                    src={remove}
                    alt="remove favorite icon"
                    className="deleteIcon"
                />
            </div>

            <div
                className="search-results--card__header"
                style={{
                    backgroundImage: `url('${process.env.REACT_APP_DB_URL}${favorite.img}')`,
                    backgroundRepeat: 'no-repeat',
                    backgroundPosition: 'center',
                    backgroundSize: 'cover'
                }}
            >
                <div className="wave">
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1440 320">
                        <path
                            fill="#e8fffe"
                            fillOpacity="1"
                            d="M0,224L60,224C120,224,240,224,360,234.7C480,245,600,267,720,234.7C840,203,960,117,1080,101.3C1200,85,1320,139,1380,165.3L1440,192L1440,320L1380,320C1320,320,1200,320,1080,320C960,320,840,320,720,320C600,320,480,320,360,320C240,320,120,320,60,320L0,320Z"
                        ></path>
                    </svg>
                </div>
            </div>

            <div className="search-results--card__infoControls glued">
                {favorite.icon ? (
                    <img
                        className="plant_icon"
                        src={`${process.env.REACT_APP_DB_URL}${favorite.icon}`}
                        alt="plant icon"
                    />
                ) : (
                    <img className="plant_icon" src={killer} alt="plant icon" />
                )}
                <div className="search-results--card__infoControls__nameFavorite">
                    <div className="search-results--card__infoControls__name">
                        <div className="search-results--card__header__favorite">
                            <h3>{favorite.plantName}</h3>
                        </div>

                        <h6>{`"${favorite.scientificName}"`}</h6>
                    </div>
                </div>

                <div className="search-results--card__infoControls__icons-group">
                    <img
                        className={`icon__info ${isExpanded && 'frontFlip'}`}
                        alt="caret icon"
                        src={caret}
                        onClick={handleExpanded}
                    />
                </div>
            </div>
            <div className={`search-results--card__detailedInfo ${!isExpanded && 'hide'}`}>
                <section className="search-results--card__detailedInfo__suggestions">
                    <div className="suggestion watering">
                        <img src={watering} alt="icon watering" />
                        <h6>{`${favorite.wateringInterval} /days`}</h6>
                    </div>
                    <div className="suggestion lightConditions">
                        <img src={iconLightConditions} alt="icon lightConditions" />
                        <h6>{`${favorite.lightConditions}`}</h6>
                    </div>
                    <div className="suggestion season">
                        <img src={iconSeason} alt="icon season" />
                        <h6>{`${favorite.season}`}</h6>
                    </div>
                    <div className="suggestion frostTolerance">
                        <img src={frost} alt="icon frostTolerance" />
                        <h6>{favorite.frostTolerance ? 'tolerant' : '!tolerant'}</h6>
                    </div>
                </section>
                <section className="search-results--card__detailedInfo__texts">
                    <div className="description">
                        <h5>Description:</h5>
                        <p>{favorite.briefDescription}</p>
                    </div>
                    <div className="lifeSpan__Harvest">
                        <h5>
                            Life Span: <span>{favorite.lifeSpan}</span>
                        </h5>

                        <h5>
                            First Harvest Expected: <span>{`after ${favorite.firstHarvestExpected} weeks`}</span>
                        </h5>

                        <h5>
                            Last Harvest Expected: <span>{`after ${favorite.lastHarvestExpected} weeks`}</span>
                        </h5>
                    </div>
                    <div className="companions">
                        <div className="companions_good">
                            <h5>Good Companions</h5>
                            <ul>
                                {favorite.goodCompanions.map((good, i) => (
                                    <li key={i} className="good">
                                        {good}
                                    </li>
                                ))}
                            </ul>
                        </div>
                        <div className="companions_bad">
                            <h5>Bad Companions</h5>
                            <ul>
                                {favorite.badCompanions.map((bad, i) => (
                                    <li key={i} className="bad">
                                        {bad}
                                    </li>
                                ))}
                            </ul>
                        </div>
                    </div>
                    <div className="wikipedia">
                        <a href={favorite.wiki} target="_blank" rel="noreferrer">
                            <img src={wiki} alt="link to wikipedia" />
                        </a>
                    </div>
                </section>
            </div>
        </section>
    );
};

export default MyFavoriteCard;
