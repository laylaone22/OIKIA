import { useState } from 'react';

const EmptyTile = ({ id, tile, handleClick }) => {
    //const [isClicked, setIsClicked] = useState(false);
    //console.log(tile);

    return <div className="EmptyTile" onClick={() => handleClick(id)}></div>;
};

export default EmptyTile;
