function PlantcyclopediaCard(props) {
    console.log(props);
    return (
        <div className={`PlantcyclopediaCard ${props.style}`}>
            <h2>{props.plantType}</h2>
        </div>
    );
}
export default PlantcyclopediaCard;
