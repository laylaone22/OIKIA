import { useState, useContext, useEffect } from 'react';
import { useParams, useHistory } from 'react-router-dom';

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
import favoriteFull from '../assets/icons/ui/favoriteFull.png';
import favoriteEmpty from '../assets/icons/ui/favoriteEmpty.png';
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

const MyPlantForm = ({
    selectedFav,
    handleSubmit,
    setMyPlantData,
    myPlantData,
    initialState,
    isCollapsed,
    setIsCollapsed
}) => {
    // contexts
    const { userData, authToken } = useContext(authContext);
    const { dataState, dispatch } = useContext(dataContext);

    // states
    const [isExpanded, setIsExpanded] = useState(true);

    // expand/collapse the suggestions
    const handleExpanded = () => {
        setIsExpanded(!isExpanded);
    };

    // change handler for the form
    const handleChange = ({ target: { name, value } }) => setMyPlantData({ ...myPlantData, [name]: value });

    // set type icons
    let iconType = null;
    if (selectedFav.type === 'fruits') iconType = fruits;
    else if (selectedFav.type === 'vegetables') iconType = vegetables;
    else if (selectedFav.type === 'roots') iconType = roots;
    else if (selectedFav.type === 'herbs') iconType = herbs;
    else iconType = killer;

    // set season icons
    let iconSeason = null;
    if (selectedFav.season === 'warm') iconSeason = seasonWarm;
    else if (selectedFav.season === 'cool') iconSeason = seasonCool;
    else iconSeason = killer;

    // set season icons
    let iconLightConditions = null;
    if (selectedFav.lightConditions === 'full sun') iconLightConditions = fullSun;
    else if (selectedFav.lightConditions === 'part sun') iconLightConditions = lowSun;
    else if (selectedFav.lightConditions === 'shade') iconLightConditions = noSun;
    else iconLightConditions = killer;

    return (
        <section
            className={`MyPlantForm ${isCollapsed && 'hide'}`}
            style={{
                animationName: 'moveInLeft',
                animationDuration: '1s',
                animationTimingFunction: 'ease-in-out',
                animationFillMode: 'backwards'
            }}
        >
            <div
                className="MyPlantForm__header"
                style={{
                    backgroundImage: `url('${process.env.REACT_APP_DB_URL}${selectedFav.img}')`,
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

            <div className="MyPlantForm__infoControls glued">
                {selectedFav.icon ? (
                    <img
                        className="plant_icon"
                        src={`${process.env.REACT_APP_DB_URL}${selectedFav.icon}`}
                        alt="plant icon"
                    />
                ) : (
                    <img className="plant_icon" src={killer} alt="plant icon" />
                )}
                <div className="MyPlantForm__infoControls__nameFavorite">
                    <div className="MyPlantForm__infoControls__name">
                        <div className="MyPlantForm__header__favorite">
                            <h3>{selectedFav.plantName}</h3>
                        </div>
                        <h6 className="MyPlantForm__infoControls__scientificName">{`"${selectedFav.scientificName}"`}</h6>
                    </div>
                </div>

                <div className="MyPlantForm__infoControls__icons-group">
                    <img
                        className={`caret ${isExpanded && 'frontFlip'}`}
                        alt="caret icon"
                        src={caret}
                        onClick={handleExpanded}
                    />
                </div>
            </div>

            {/* form */}

            <section className="MyPlantForm__userDefinedInfo">
                {/* suggestions */}
                <div className={`MyPlantForm__detailedInfo ${isExpanded && 'hide'}`}>
                    <h5>OIKIA' suggestions</h5>
                    <section className="MyPlantForm__detailedInfo__suggestions">
                        <div className="suggestion watering">
                            <img src={watering} alt="icon watering" />
                            <h6>{`${selectedFav.wateringInterval} /days`}</h6>
                        </div>
                        <div className="suggestion lightConditions">
                            <img src={iconLightConditions} alt="icon lightConditions" />
                            <h6>{`${selectedFav.lightConditions}`}</h6>
                        </div>
                        <div className="suggestion season">
                            <img src={iconSeason} alt="icon season" />
                            <h6>{`${selectedFav.season}`}</h6>
                        </div>
                        <div className="suggestion frostTolerance">
                            <img src={frost} alt="icon frostTolerance" />
                            <h6>{selectedFav.frostTolerance ? 'tolerant' : '!tolerant'}</h6>
                        </div>
                    </section>

                    {/* companions */}
                    <section className="MyPlantForm__detailedInfo__texts">
                        <div className="companions">
                            <div className="companions__good">
                                <h5>Good Companions</h5>
                                <ul className="companions__list">
                                    {selectedFav &&
                                        selectedFav.goodCompanions?.map((good, i) => (
                                            <li key={i} className="good">
                                                {good}
                                            </li>
                                        ))}
                                </ul>
                            </div>
                            <div className="companions__bad">
                                <h5>Bad Companions</h5>
                                <ul className="companions__list">
                                    {selectedFav &&
                                        selectedFav.badCompanions?.map((bad, i) => (
                                            <li key={i} className="bad">
                                                {bad}
                                            </li>
                                        ))}
                                </ul>
                            </div>
                        </div>
                    </section>
                </div>

                <h5>Personalize your plant</h5>
                <form onSubmit={handleSubmit} className="MyPlantForm__form">
                    <div className="MyPlantForm__form__sections">
                        <div className="MyPlantForm__form__section1">
                            {/* myPlant Name */}
                            <label htmlFor="name" className="MyPlantForm__form__label">
                                <input
                                    type="text"
                                    id="name"
                                    name="name"
                                    placeholder="Name"
                                    required
                                    value={myPlantData.name}
                                    onChange={handleChange}
                                    className="MyPlantForm__form__input"
                                />
                            </label>
                            {/* plantedAt */}
                            <label htmlFor="plantedAt" className="MyPlantForm__form__label">
                                <input
                                    type="date"
                                    id="plantedAt"
                                    name="plantedAt"
                                    placeholder="Planted On"
                                    required
                                    value={myPlantData.plantedAt}
                                    onChange={handleChange}
                                    className="MyPlantForm__form__input"
                                />
                            </label>
                            <label htmlFor="userWatering" className="MyPlantForm__form__label">
                                <input
                                    type="number"
                                    id="userWatering"
                                    name="userWatering"
                                    placeholder="Watering time (days)"
                                    min="1"
                                    required
                                    value={myPlantData.userWatering}
                                    onChange={handleChange}
                                    className="MyPlantForm__form__input"
                                />
                            </label>
                        </div>
                        <div className="MyPlantForm__form__section2">
                            {/* userWatering */}

                            {/* notes */}
                            <label htmlFor="notes" className="MyPlantForm__form__label">
                                <textarea
                                    id="notes"
                                    name="notes"
                                    placeholder="add some notes if you like..."
                                    value={myPlantData.notes}
                                    onChange={handleChange}
                                    className="MyPlantForm__form__input"
                                />
                            </label>
                        </div>
                    </div>
                    <div className="MyPlantForm__form__buttons">
                        <button
                            type="reset"
                            className="button button__secondary"
                            onClick={() => setMyPlantData(initialState)}
                        >
                            reset
                        </button>
                        <button type="submit" className="button button__primary">
                            Plant!!
                        </button>
                    </div>
                </form>
            </section>
        </section>
    );
};

export default MyPlantForm;
