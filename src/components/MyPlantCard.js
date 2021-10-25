import { useState, useContext, useEffect } from 'react';
import moment from 'moment';

// contexts
import { authContext } from '../stores/auth/auth';
import { dataContext } from '../stores/data/store';

// type icons
import roots from '../assets/icons/type/roots.png';
import vegetables from '../assets/icons/type/vegetables.png';
import fruits from '../assets/icons/type/fruits.png';
import herbs from '../assets/icons/type/herbs.png';
import killer from '../assets/icons/type/killer.png';

// ui icons
import caret from '../assets/icons/ui/caret.svg';

// info icons
import frost from '../assets/icons/infoCard/frost.svg';
import fullSun from '../assets/icons/infoCard/fullSun.svg';
import lowSun from '../assets/icons/infoCard/lowSun.svg';
import noSun from '../assets/icons/infoCard/noSun.svg';
import seasonCool from '../assets/icons/infoCard/seasonCool.svg';
import seasonWarm from '../assets/icons/infoCard/seasonWarm.svg';
import watering from '../assets/icons/infoCard/watering.svg';
import wiki from '../assets/icons/infoCard/wiki.svg';

const MyPlantCard = ({ id, plant, toggleFavorite, myPlant, garden, handleDeath, handleRemove }) => {
    // contexts
    const { userData, authToken } = useContext(authContext);
    const { dataState, dispatch } = useContext(dataContext);

    // states
    const [isExpanded, setIsExpanded] = useState(false);

    const handleExpanded = () => {
        setIsExpanded(!isExpanded);
    };

    // variable to set bgColor based on Alive or Dead
    const bgColorAoD = `${myPlant.isAlive ? '#e8fffe' : '#9e9a9a'}`;

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
        <section className="MyPlantCard">
            <div
                className="MyPlantCard__header"
                style={{
                    backgroundImage: `url('${process.env.REACT_APP_DB_URL}${plant.img}')`,
                    backgroundRepeat: 'no-repeat',
                    backgroundPosition: 'center',
                    backgroundSize: 'cover'
                }}
            >
                <div className="wave">
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1440 320">
                        <path
                            fill={bgColorAoD}
                            fillOpacity="1"
                            d="M0,224L60,224C120,224,240,224,360,234.7C480,245,600,267,720,234.7C840,203,960,117,1080,101.3C1200,85,1320,139,1380,165.3L1440,192L1440,320L1380,320C1320,320,1200,320,1080,320C960,320,840,320,720,320C600,320,480,320,360,320C240,320,120,320,60,320L0,320Z"
                        ></path>
                    </svg>
                </div>
            </div>

            <div className="MyPlantCard__infoControls glued" style={{ backgroundColor: bgColorAoD }}>
                {myPlant.isAlive ? (
                    <img className="plant_icon" src={`${process.env.REACT_APP_DB_URL}${plant.icon}`} alt="plant icon" />
                ) : (
                    <img className="plant_icon" src={killer} alt="plant icon" />
                )}
                <div className="MyPlantCard__infoControls__myPlantName">
                    <div className="MyPlantCard__infoControls__name">
                        <h3>{myPlant.name}</h3>
                    </div>
                </div>

                <div className="MyPlantCard__infoControls__icons-group">
                    <img
                        className={`icon__info ${isExpanded && 'frontFlip'}`}
                        alt="caret icon"
                        src={caret}
                        onClick={handleExpanded}
                    />
                </div>
            </div>

            <div
                className={`MyPlantCard__detailedInfo ${!isExpanded && 'hide'}`}
                style={{ backgroundColor: bgColorAoD }}
            >
                {/* myPlant user Info */}
                <section className="MyPlantCard__userInfo">
                    <div className="MyPlantCard__userInfo__sections">
                        <h5>Planted in garden:</h5>
                        <h3>{garden.gardenName}</h3>
                    </div>
                    <div className="MyPlantCard__userInfo__sections">
                        <h5>Planted On:</h5>
                        <h3>{moment(myPlant.plantedAt).format('MMMM Do YYYY')}</h3>
                    </div>
                    <div className="MyPlantCard__userInfo__sections">
                        <h5>water every:</h5>
                        <h3>{`${myPlant.userWatering} days`}</h3>
                    </div>

                    {/* if user gives notes render them */}
                    {myPlant.notes && (
                        <div className="MyPlantCard__userInfo__sections notes">
                            <h5>Notes:</h5>
                            <p>{myPlant.notes}</p>
                        </div>
                    )}
                </section>
                <section className="MyPlantCard__buttons">
                    <button className="button button__secondary" onClick={() => handleRemove(id)}>
                        Delete forever!
                    </button>

                    {myPlant.isAlive ? (
                        <button className="button button__primary" onClick={() => handleDeath(myPlant)}>
                            Killed it Again!
                        </button>
                    ) : (
                        <button className="button button__primary" onClick={() => handleDeath(myPlant)}>
                            Resuscitate!
                        </button>
                    )}
                </section>
            </div>
        </section>
    );
};

export default MyPlantCard;
