import { useState, useContext, useEffect } from 'react';

// contexts
import { authContext } from '../stores/auth/auth';
import { dataContext } from '../stores/data/store';

// actions to dispatch
import { ADD_FAVORITE, REMOVE_FAVORITE, ADD_PLANT, REMOVE_PLANT } from '../stores/data/actions';

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

import link from '../assets/icons/ui/link.svg';

// info icons
import frost from '../assets/icons/infoCard/frost.svg';
import fullSun from '../assets/icons/infoCard/fullSun.svg';
import lowSun from '../assets/icons/infoCard/lowSun.svg';
import noSun from '../assets/icons/infoCard/noSun.svg';
import seasonCool from '../assets/icons/infoCard/seasonCool.svg';
import seasonWarm from '../assets/icons/infoCard/seasonWarm.svg';
import watering from '../assets/icons/infoCard/watering.svg';
import wiki from '../assets/icons/infoCard/wiki.svg';

// plant icons default
import cookie from '../assets/icons/plants/cookie.svg';

const SearchResultCard = ({ plant, delay, toggleFavorite }) => {
    // contexts
    const { userData, authToken } = useContext(authContext);
    const { dataState, dispatch } = useContext(dataContext);

    //const [isFavorite, setIsFavorite] = useState(false);
    const [isAdded, setIsAdded] = useState(false);
    const [isExpanded, setIsExpanded] = useState(false);
    //const [favoritesToPost, setFavoritesToPost] = useState({});
    //const [favoritesToPostAgain, setFavoritesToPostAgain] = useState({});

    const handleAdded = () => {
        setIsAdded(!isAdded);
        !isAdded ? dispatch({ type: ADD_PLANT, payload: plant }) : dispatch({ type: ADD_PLANT, payload: plant._id });
    };

    const handleExpanded = () => {
        setIsExpanded(!isExpanded);
    };
    /*
    const toggleFavorite = () => {
        setIsFavorite(!isFavorite);
        (() => console.log(isFavorite))();
        console.log(isFavorite);
        console.log(plant);
        
        !isFavorite
            ? dispatch({ type: ADD_FAVORITE, payload: plant })
            : dispatch({ type: REMOVE_FAVORITE, payload: plant._id });

        // PUT from myFavorites virtual on click
        // PUT /users/:id

        const updateMyFavorites = async () => {
            const URL = `http://localhost:3000/users/${userData._id}`;

            const OPTIONS = {
                method: 'PUT',
                body: JSON.stringify(favoritesToPost),
                headers: {
                    'Content-Type': 'application/json',
                    'x-auth-token': authToken
                }
            };

            try {
                const response = await fetch(URL, OPTIONS);
                const data = await response.json();
            } catch (error) {
                console.log(error);
            }
        };
        updateMyFavorites();
    };*/
    /*
    useEffect(() => {
        const copyOfMyFav = [...dataState.myFavorites];
        const favoritesData = { myFavorites: copyOfMyFav.map(({ _id }) => _id) };
        setFavoritesToPost(favoritesData);
        setFavoritesToPostAgain(favoritesData);
        console.log(favoritesToPostAgain);
        console.log(JSON.stringify(favoritesToPost));
    }, [dataState.myFavorites]);
*/

    // set type icons
    let iconType = null;
    if (plant.type === 'fruits') iconType = fruits;
    else if (plant.type === 'vegetables') iconType = vegetables;
    else if (plant.type === 'roots') iconType = roots;
    else if (plant.type === 'herbs') iconType = herbs;
    else iconType = killer;

    // set season icons
    let iconSeason = null;
    if (plant.season === 'warm') iconSeason = seasonWarm;
    else if (plant.season === 'cool') iconSeason = seasonCool;
    else iconSeason = killer;

    // set season icons
    let iconLightConditions = null;
    if (plant.lightConditions === 'full sun') iconLightConditions = fullSun;
    else if (plant.lightConditions === 'part sun') iconLightConditions = lowSun;
    else if (plant.lightConditions === 'shade') iconLightConditions = noSun;
    else iconLightConditions = killer;

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
                    backgroundImage: `url('http://localhost:3000${plant.img}')`,
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
                {plant.icon ? (
                    <img className="plant_icon" src={`http://localhost:3000${plant.icon}`} alt="plant icon" />
                ) : (
                    <img className="plant_icon" src={killer} alt="plant icon" />
                )}
                <div className="search-results--card__infoControls__nameFavorite">
                    <div className="search-results--card__infoControls__name">
                        <div className="search-results--card__header__favorite">
                            <h3>{plant.plantName}</h3>
                            {!plant.isFavorite ? (
                                <img
                                    onClick={() => toggleFavorite(plant)}
                                    src={favoriteEmpty}
                                    alt="Heart outline symbol"
                                />
                            ) : (
                                <img
                                    onClick={() => toggleFavorite(plant)}
                                    src={favoriteFull}
                                    alt="Heart outline symbol"
                                />
                            )}
                        </div>

                        <h6>{`"${plant.scientificName}"`}</h6>
                    </div>
                </div>

                <div className="search-results--card__infoControls__icons-group">
                    <img className="icon__info" alt="svgImg" src={caret} onClick={handleExpanded} />

                    <img className="search-results__icons" alt="Add symbol" src={add2} onClick={handleAdded} />
                </div>
            </div>
            <div className={`search-results--card__detailedInfo ${!isExpanded && 'hide'}`}>
                <section className="search-results--card__detailedInfo__suggestions">
                    <div className="suggestions watering">
                        <img src={watering} alt="icon watering" />
                        <h6>{`${plant.wateringInterval} /days`}</h6>
                    </div>
                    <div className="suggestions lightConditions">
                        <img src={iconLightConditions} alt="icon lightConditions" />
                        <h6>{`${plant.lightConditions}`}</h6>
                    </div>
                    <div className="suggestions season">
                        <img src={iconSeason} alt="icon season" />
                        <h6>{`${plant.season}`}</h6>
                    </div>
                    <div className="suggestions frostTolerance">
                        <img src={frost} alt="icon frostTolerance" />
                        <h6>{plant.frostTolerance ? 'tolerant' : '!tolerant'}</h6>
                    </div>
                </section>
                <section className="search-results--card__detailedInfo__texts">
                    <div className="description">
                        <h5>Description:</h5>
                        <p>{plant.briefDescription}</p>
                    </div>
                    <div className="lifeSpan__Harvest">
                        <h5>
                            Life Span: <span>{plant.lifeSpan}</span>
                        </h5>

                        <h5>
                            First Harvest Expected: <span>{`after ${plant.firstHarvestExpected} weeks`}</span>
                        </h5>

                        <h5>
                            Last Harvest Expected: <span>{`after ${plant.lastHarvestExpected} weeks`}</span>
                        </h5>
                    </div>
                    <div className="companions">
                        <div className="companions_good">
                            <h5>Good Companions</h5>
                            <ul>
                                {plant.goodCompanions.map((good, i) => (
                                    <li key={i} className="good">
                                        {good}
                                    </li>
                                ))}
                            </ul>
                        </div>
                        <div className="companions_bad">
                            <h5>Bad Companions</h5>
                            <ul>
                                {plant.badCompanions.map((bad, i) => (
                                    <li key={i} className="bad">
                                        {bad}
                                    </li>
                                ))}
                            </ul>
                        </div>
                    </div>
                    <div className="wikipedia">
                        <a href={plant.wiki} target="_blank" rel="noreferrer">
                            <img src={wiki} alt="link to wikipedia" />
                        </a>
                    </div>
                </section>
            </div>
        </section>
    );
};

export default SearchResultCard;

/*

{
        "plantName": "",//
        "scientificName": "",//
        "briefDescription": "",//
        "type": "",
        "goodCompanions": [""],//
        "badCompanions": [],//
        "wateringInterval": 0,//
        "lightConditions": "",//
        "season": "",//
        "frostTolerance": true,//
        "lifeSpan": "",
        "firstHarvestExpected": 0,//
        "lastHarvestExpected": 0,//
        "icon":"",//
        "wiki": "",//
        "img": ""//
    }
     */
