import roots from '../assets/icons/type/roots.png';
import vegetables from '../assets/icons/type/vegetables.png';
import fruits from '../assets/icons/type/fruits.png';
import herbs from '../assets/icons/type/herbs.png';
import killer from '../assets/icons/type/killer.png';

const PlantcyclopediaCard = ({ plantType, getPlantsByType, selected }) => {
    // set icons
    let icon = null;
    if (plantType === 'fruits') icon = fruits;
    else if (plantType === 'vegetables') icon = vegetables;
    else if (plantType === 'roots') icon = roots;
    else if (plantType === 'herbs') icon = herbs;
    else icon = killer;

    return (
        <div
            className={`PlantcyclopediaCard ${plantType} ${selected ? 'selected' : ''}`}
            onClick={() => getPlantsByType(`${plantType}`)}
        >
            <h3>{plantType}</h3>
            <img src={icon} alt={`${plantType} category icon`} />
        </div>
    );
};
export default PlantcyclopediaCard;
