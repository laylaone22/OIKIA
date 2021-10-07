import { useState, useContext } from 'react';

// contexts
import { authContext } from '../stores/auth/auth';
import { dataContext } from '../stores/data/store';

// actions to dispatch
import { ADD_FAVORITE, REMOVE_FAVORITE } from '../stores/data/actions';

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

// info icons
import frost from '../assets/icons/infoCard/frost.svg';
import fullSun from '../assets/icons/infoCard/fullSun.svg';
import lowSun from '../assets/icons/infoCard/lowSun.svg';
import noSun from '../assets/icons/infoCard/noSun.svg';
import seasonCool from '../assets/icons/infoCard/seasonCool.svg';
import seasonWarm from '../assets/icons/infoCard/seasonWarm.svg';
import watering from '../assets/icons/infoCard/watering.svg';

const SearchResultCard = ({ plant, delay }) => {
    // contexts
    const { userData } = useContext(authContext);
    const { dataState, dispatch } = useContext(dataContext);

    const [isFavorite, setIsFavorite] = useState(false);
    const [isExpanded, setIsExpanded] = useState(false);

    const changeFavorite = () => {
        setIsFavorite(!isFavorite);
        console.log(isFavorite);
        console.log(plant);
        !isFavorite
            ? dispatch({ type: ADD_FAVORITE, payload: plant })
            : dispatch({ type: REMOVE_FAVORITE, payload: plant._id });
    };

    const handleExpanded = () => {
        setIsExpanded(!isExpanded);
    };

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
                    backgroundImage: `url(${plant.img})`,
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
                <div className="search-results--card__infoControls__nameFavorite">
                    <h3 className="search-results--card__infoControls__name">{plant.plantName}</h3>

                    {!isFavorite ? (
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
                    <img className="icon__info" alt="svgImg" src={caret} onClick={handleExpanded} />
                    <img className="search-results__icons" alt="Add symbol" src={add2} />
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
                    <h4>{plant.plantName}</h4>
                    <h6>{`"${plant.scientificName}"`}</h6>
                    <div className="description">
                        <h5>Description:</h5>
                        <p>
                            The tomato is the edible berry of the plant Solanum lycopersicum, commonly known as a tomato
                            plant. The species originated in western South America and Central America. The Nahuatl word
                            tomatl gave rise to the Spanish word tomate, from which the English word tomato derived. Its
                            domestication and use as a cultivated food may have originated with the indigenous peoples
                            of Mexico. The Aztecs used tomatoes in their cooking at the time of the Spanish conquest of
                            the Aztec Empire, and after the Spanish encountered the tomato for the first time after
                            their contact with the Aztecs, they brought the plant to Europe. From there, the tomato was
                            introduced to other parts of the European-colonized world during the 16th century.{' '}
                            {plant.briefDescription}
                        </p>
                    </div>
                    <div className="companions">
                        <div className="companions_good">
                            <h5>Good Companions</h5>
                            <p>{plant.goodCompanions.join(', ')}</p>
                        </div>
                        <div className="companions_bad">
                            <h5>Bad Companions</h5>
                            <p>{plant.badCompanions.join(', ')}</p>
                        </div>
                    </div>
                </section>
            </div>
        </section>
    );
};

export default SearchResultCard;

/*

{
        "plantName": "",
        "scientificName": "",
        "briefDescription": "",
        "type": "",
        "goodCompanions": [""],
        "badCompanions": [],
        "wateringInterval": 0,
        "lightConditions": "",
        "season": "",
        "frostTolerance": true,
        "lifeSpan": "",
        "firstHarvestExpected": 0,
        "lastHarvestExpected": 0,
        "icon":"",
        "wiki": "",
        "img": ""
    }
     */
