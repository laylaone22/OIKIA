// assets
import enter from '../assets/icons/ui/enter-dark.png';
import trash from '../assets/icons/ui/trash.svg';
import watering from '../assets/icons/infoCard/watering.svg';
import harvest from '../assets/icons/ui/harvest.svg';
import potplant from '../assets/icons/ui/potplant.svg';
import clock from '../assets/icons/ui/clock.svg';
import plant from '../assets/icons/ui/plant.svg';

const GardenCard = () => {
    return (
        <div className="GardenCard__display">
            <div className="GardenCard__display--title">
                <h3 className="GardenCard__display--title__name">#gardenName</h3>

                <h4 className="GardenCard__display--title__size">
                    <img src={potplant} alt="potted plant icon" />
                    #widthx#length
                </h4>
            </div>
            <div className="GardenCard__display--body">
                <div className="GardenCard__display--info">
                    <h4>
                        <img src={clock} alt="date icon" />
                        #timestamps
                    </h4>
                    <h4>
                        <img src={plant} alt="plant icon" />
                        #NUMBER plants
                    </h4>
                    <h4>
                        <img src={watering} alt="water icon" />
                        #WATER need water
                    </h4>
                    <h4>
                        <img src={harvest} alt="harvest icon" />? harvest season
                    </h4>
                </div>

                <div className="GardenCard__display--buttons">
                    <img src={trash} alt="trash icon" />
                    <img src={enter} alt="enter icon" />
                </div>
            </div>
        </div>
    );
};

export default GardenCard;
