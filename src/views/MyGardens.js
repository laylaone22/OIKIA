import { useContext } from 'react';

// contexts
import { authContext } from '../stores/auth/auth.js';
import { dataContext } from '../stores/data/store';

const MyGardens = () => {
    // context auth data
    const { dataState } = useContext(dataContext);

    return (
        <div className="MyGardens">
            <main className="MyGardens__body">
                <header className="MyGardens__body__header">
                    <h1 className="MyGardens__body__header__title">{`Hi ${dataState.name}`}</h1>
                </header>
                <section className="MyGardens__body__gardens">
                    <h2>Your Gardens</h2>
                </section>
            </main>
        </div>
    );
};

export default MyGardens;
