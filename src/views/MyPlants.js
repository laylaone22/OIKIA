import { useContext } from 'react';

// contexts
import { authContext } from '../stores/auth/auth.js';
import { dataContext } from '../stores/data/store';

const MyPlants = () => {
    // context auth data
    const { dataState } = useContext(dataContext);

    return (
        <div className="MyPlants">
            <main className="MyPlants__body">
                <header className="MyPlants__body__header">
                    <h1 className="MyPlants__body__header__title">{`Hi ${dataState.name}`}</h1>
                </header>
                <section className="MyPlants__body__plants">
                    <h2>Your Plants</h2>
                </section>
            </main>
        </div>
    );
};

export default MyPlants;
