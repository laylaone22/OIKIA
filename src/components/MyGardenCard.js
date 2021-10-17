// import moment from 'moment';

// helpers
import { calculateAge } from '../utilities/helpers';

// assets

// icons
import click from '../assets/icons/ui/click.svg';
import trash from '../assets/icons/ui/trash.svg';
import watering from '../assets/icons/infoCard/watering.svg';
import harvest from '../assets/icons/ui/harvest.svg';
import potPlant from '../assets/icons/ui/potplant.svg';
import clock from '../assets/icons/ui/clock.svg';
import plant from '../assets/icons/ui/plant.svg';

import enter from '../assets/icons/ui/enter.svg';
import edit from '../assets/icons/ui/edit.svg';
import cancel from '../assets/icons/ui/cancel.svg';

// img
import inside from '../assets/img/inside.jpeg';
import outside from '../assets/img/outside.jpg';

const MyGardenCard = ({ garden, deleteGarden }) => {
    console.log(garden);
    // sim data
    const gardenBerlin = {
        _id: '616428b2207157d8e2235598',
        userID: '616421ca29e8480ca5f9b369',
        gardenName: 'garden berlin',
        gardenType: 'indoor',
        width: 10,
        length: 5,
        myGardenPlants: [],
        id: '616428b2207157d8e2235598',
        createdAt: '2021-10-11T12:59:34.219Z'
    };

    return (
        <section className="MyGardenCard">
            <header className="MyGardenCard__header">
                <div className="MyGardenCard__header__gardenName">
                    <img src={potPlant} alt="potted plant icon" />
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
                        <img src={clock} alt="date icon" />
                        <h4>{`${calculateAge(garden.createdAt)} days old`}</h4>
                    </div>
                    <div className="MyGardenCard__info plants">
                        <img src={plant} alt="plant icon" />
                        <h4>{`${garden.myGardenPlants.length} plants`}</h4>
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
                        <img src={enter} alt="trash icon" />
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
