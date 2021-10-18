import { useContext } from 'react';

// contexts
import { authContext } from '../stores/auth/auth.js';
import { dataContext } from '../stores/data/store';

// components
import PlantCard from '../components/PlantCard.js';

const MyPlants = () => {
    // context auth data
    const { userData } = useContext(authContext);
    const { dataState, dispatch } = useContext(dataContext);

    return (
        <div className="MyPlants">
            <main className="MyPlants__body">
                <header className="MyPlants__body__header">
                    <h1 className="MyPlants__body__header__title">{`Hi ${userData.name}`}</h1>
                </header>
                <section className="MyPlants__body__plants">
                    <h2>Your Plants</h2>

                    {dataState.myPlants?.map((plant, i) => (
                        <PlantCard key={plant._id} plant={plant} delay={i} />
                    ))}
                </section>
            </main>
        </div>
    );
};

export default MyPlants;
