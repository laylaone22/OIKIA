import { useContext } from 'react';

// contexts
import { authContext } from '../stores/auth/auth.js';
import { dataContext } from '../stores/data/store';

// components
import FavoriteCard from '../components/FavoriteCard.js';

const MyFavorites = () => {
    // context auth data
    const { userData } = useContext(authContext);
    const { dataState, dispatch } = useContext(dataContext);

    return (
        <div className="MyFavorites">
            <main className="MyFavorites__body">
                <header className="MyFavorites__body__header">
                    <h1 className="MyFavorites__body__header__title">{`Hi ${userData.name}`}</h1>
                </header>
                <section className="MyFavorites__body__favorites">
                    <h2>Your Favorite Plants</h2>
                    {dataState.myFavorites?.map((fav, i) => (
                        <FavoriteCard key={fav._id} favorite={fav} delay={i} />
                    ))}
                </section>
            </main>
        </div>
    );
};

export default MyFavorites;
