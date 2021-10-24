// assets
import killer from '../assets/icons/type/killer.png';
import water from '../assets/icons/gardenCard/watering.svg';

const LegendTile = ({ type }) => {
    let title = '';
    if (type === 'LegendEmpty empty') title = 'empty';
    if (type === 'LegendEmpty normal') title = 'healthy';
    if (type === 'LegendEmpty needsWater') title = 'water';
    if (type === 'LegendEmpty badCompanion') title = 'bad';
    if (type === 'LegendEmpty isDead') title = 'dead';

    return (
        <div className={type}>
            {/* <img src={killer} alt={`${type} icon`} /> */}
            <h6>{title}</h6>
        </div>
    );
};

export default LegendTile;
