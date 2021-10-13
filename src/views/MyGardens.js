import { useContext } from 'react';
import GardenCard from '../components/GardenCard.js';

// contexts
import { authContext } from '../stores/auth/auth.js';
import { dataContext } from '../stores/data/store';

const MyGardens = () => {
    // context auth data
    const { userData } = useContext(authContext);

    return (
        <div className="MyGardens">
            <main className="MyGardens__body">
                <header className="MyGardens__body__header">
                    <h1 className="MyGardens__body__header__title">{`Hi ${userData.name}`}</h1>
                </header>
                <section className="MyGardens__body__gardens">
                    <h2>Your Gardens</h2>
                    <GardenCard />
                </section>
            </main>
        </div>
    );
};

export default MyGardens;
