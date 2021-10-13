import GardenDisplay from '../components/GardenDisplay';

const GardenEditor = () => {
    return (
        <div className="GardenEditor">
            <main className="GardenEditor__body">
                {/* <header className="GardenEditor__body__header">
                    <h1 className="GardenEditor__body--header__title">GardenEditor</h1>
                </header> */}
                <GardenDisplay />
            </main>
        </div>
    );
};

export default GardenEditor;
