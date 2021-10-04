function PlantcyclopediaCard({ plantType, getPlantsByType }) {
    return (
        <div className={`PlantcyclopediaCard ${plantType}`}>
            <div className="layer" onClick={() => getPlantsByType(`${plantType}`)}>
                <h3>{plantType}</h3>
            </div>
        </div>
    );
}
export default PlantcyclopediaCard;
