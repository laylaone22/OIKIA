import { useContext, useState } from 'react';

// contexts
import { authContext } from '../stores/auth/auth.js';
import { dataContext } from '../stores/data/store';

// actions
import { REMOVE_PLANT } from '../stores/data/actions.js';

// navigation
// import NavigationHandler from '../utilities/NavigationHandler';

// type icons
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

// set season icons

const PlantCard = ({ plant, delay }) => {
    const { userData } = useContext(authContext);
    const { dataState, dispatch } = useContext(dataContext);

    const [isExpanded, setIsExpanded] = useState(false);

    const handleExpanded = () => {
        setIsExpanded(!isExpanded);
    };

    // set season icons
    let iconLightConditions = null;

    if (plant.lightConditions === 'full sun') iconLightConditions = fullSun;
    else if (plant.lightConditions === 'part sun') iconLightConditions = lowSun;
    else if (plant.lightConditions === 'shade') iconLightConditions = noSun;
    else iconLightConditions = killer;

    let iconSeason = null;
    if (plant.season === 'warm') iconSeason = seasonWarm;
    else if (plant.season === 'cool') iconSeason = seasonCool;
    else iconSeason = killer;

    return (
        <div
            className="PlantCard"
            style={{
                animation: `1s moveInLeft ${delay / 1.5}s ease-in-out`,
                animationFillMode: 'backwards'
            }}
        >
            <div className="PlantCard__info">
                <div
                    className="PlantCard__img"
                    style={{
                        backgroundImage: `url('http://localhost:3000${plant.img}')`,
                        backgroundRepeat: 'no-repeat',
                        backgroundPosition: 'center',
                        backgroundSize: 'cover'
                    }}
                ></div>
                <div className="PlantCard__info__basic">
                    <h3 className="PlantCard__info__name">{plant.plantName}</h3>
                    <form>
                        <select className="PlantCard__form--input">
                            <option>Indoor</option>
                            <option>Outdoor</option>
                        </select>
                    </form>
                    <img
                        className="PlantCard__info__caret"
                        alt="Heart outline symbol"
                        src={caret}
                        onClick={handleExpanded}
                    />
                    <img
                        className="PlantCard__info__remove"
                        alt="Heart outline symbol"
                        src={remove}
                        onClick={() => dispatch({ type: REMOVE_PLANT, payload: plant._id })}
                    />
                </div>
            </div>
            <div className={`PlantCard--card__detailedInfo ${!isExpanded && 'hide'}`}>
                <section className="PlantCard---card__detailedInfo__suggestions">
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
                <section className="PlantCard---card__detailedInfo__texts">
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
        </div>
    );
};

export default PlantCard;
