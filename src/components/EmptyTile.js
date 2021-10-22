const EmptyTile = ({ id, tile, handleClick }) => {
    return <div className="EmptyTile" onClick={() => handleClick(id)}></div>;
};

export default EmptyTile;
