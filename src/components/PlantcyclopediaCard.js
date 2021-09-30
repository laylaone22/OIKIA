function PlantcyclopediaCard({ plantType, getPlantsByType }) {
    return (
        <div className={`PlantcyclopediaCard ${plantType}`} onClick={() => getPlantsByType(`${plantType}`)}>
            <h2>{plantType}</h2>
        </div>
    );
}
export default PlantcyclopediaCard;
