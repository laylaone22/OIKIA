function PlantcyclopediaCard({ plantType, getPlantsByType }) {
    return (
        <div className={`PlantcyclopediaCard ${plantType}`} onClick={() => getPlantsByType(`${plantType}`)}>
            <h3>{plantType}</h3>
        </div>
    );
}
export default PlantcyclopediaCard;
