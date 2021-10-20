import { useHistory } from 'react-router-dom';

// helpers
import { calculateAge } from '../utilities/helpers';

// assets

// icons
import watering from '../assets/icons/gardenCard/watering.svg';
import harvest from '../assets/icons/gardenCard/harvest.svg';
import plants from '../assets/icons/gardenCard/plants.svg';
import calendar from '../assets/icons/gardenCard/calendar.svg';
import indoorGarden from '../assets/icons/gardenCard/indoorGarden.svg';
import outdoorGarden from '../assets/icons/gardenCard/outdoorGarden.svg';

// actions icons
import enter from '../assets/icons/ui/enter.svg';
//import edit from '../assets/icons/ui/edit.svg';
import cancel from '../assets/icons/ui/cancel.svg';

// img
import inside from '../assets/img/inside.jpeg';
import outside from '../assets/img/outside.jpg';

const MyGardenCard = ({ garden, deleteGarden }) => {
    const history = useHistory();

    return (
        <section className="MyGardenCard">
            <header className="MyGardenCard__header">
                <div className="MyGardenCard__header__gardenName">
                    <img src={garden.gardenType === 'indoor' ? indoorGarden : outdoorGarden} alt="potted plant icon" />
                    <h3 className="MyGardenCard__header__gardenName">{garden.gardenName}</h3>
                </div>

                <h4>{`${garden.width}x${garden.length}`}</h4>
            </header>

            <div
                className="MyGardenCard__body"
                style={{
                    backgroundImage: `url(${garden.gardenType === 'indoor' ? inside : outside})`,
                    backgroundRepeat: 'no-repeat',
                    backgroundSize: 'cover',
                    backgroundPosition: 'top'
                }}
            >
                <div className="MyGardenCard__details">
                    <div className="MyGardenCard__info time">
                        <img src={calendar} alt="date icon" />
                        <h4>{`${calculateAge(garden.createdAt)} days old`}</h4>
                    </div>
                    <div className="MyGardenCard__info plants">
                        <img src={plants} alt="plant icon" />
                        <h4>{`${garden.myGardenPlants ? garden.myGardenPlants.length : 0} plants`}</h4>
                    </div>
                    <div className="MyGardenCard__info water">
                        <img src={watering} alt="water icon" />
                        <h4>X plants need watering</h4>
                    </div>
                    <div className="MyGardenCard__info harvest">
                        <img src={harvest} alt="harvest icon" />
                        <h4>harvest season</h4>
                    </div>
                </div>
                <div className="MyGardenCard__actions">
                    <div className="action enter">
                        <img src={enter} alt="trash icon" onClick={() => history.push(`/gardeneditor/${garden._id}`)} />
                    </div>
                    {/* <div className="action edit">
                        <img src={edit} alt="enter icon" onClick={() => editGarden(garden)} />
                    </div> */}
                    <div className="action cancel">
                        <img src={cancel} alt="enter icon" onClick={() => deleteGarden(garden)} />
                    </div>
                </div>
            </div>
        </section>
    );
};

export default MyGardenCard;
