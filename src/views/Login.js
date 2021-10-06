import { useState, useContext } from 'react';
import { useHistory } from 'react-router-dom';
import { authContext } from '../stores/auth/auth';

const Login = () => {
    const history = useHistory();

    const [formData, setFormData] = useState({
        email: '',
        password: ''
    });

    const [hasLoginError, setHasLoginError] = useState(false);

    const { setIsLoggedIn, setUserData, setAuthToken } = useContext(authContext);

    const handleSubmit = async (evt) => {
        evt.preventDefault();

        try {
            const res = await fetch('http://localhost:3000/users/login', {
                method: 'POST',
                body: JSON.stringify(formData),
                headers: {
                    'Content-Type': 'application/json'
                }
            });

            const data = await res.json();

            if (res.ok) {
                const token = res.headers.get('x-auth-token');
                setIsLoggedIn(true);
                setUserData(data);
                setAuthToken(token);
                localStorage.setItem('isLoggedIn', JSON.stringify(true));
                localStorage.setItem('userData', JSON.stringify(data));
                localStorage.setItem('authToken', JSON.stringify(token));
                history.push('/userdashboard');
            } else {
                // 400 status codes are not errors with fetch
                const error = new Error('Validation failed');
                error.error = data.error;
                throw error;
            }
        } catch (err) {
            // 400s and 500s are handled here
            setHasLoginError(true);
        }
    };

    const handleChange = ({ target: { name, value } }) => setFormData({ ...formData, [name]: value });

    return (
        <div className="Login">
            <main className="Login__body">
                <header className="Login__body__header">
                    <h1 className="Login__body--header__title">Login</h1>
                </header>
                <section className="Login__body--form">
                    <form onSubmit={handleSubmit}>
                        {hasLoginError && <p className="error">Error: E-mail or password incorrect</p>}
                        <div>
                            <label htmlFor="email" className="Login__body--form__label">
                                <input
                                    type="email"
                                    id="email"
                                    name="email"
                                    placeholder="Email"
                                    required
                                    value={formData.email}
                                    onChange={handleChange}
                                    className="Login__body--form__input"
                                />
                            </label>
                        </div>
                        <div>
                            <label htmlFor="password" className="Login__body--form__label">
                                <input
                                    type="password"
                                    id="password"
                                    name="password"
                                    placeholder="Password"
                                    required
                                    value={formData.password}
                                    onChange={handleChange}
                                    className="Login__body--form__input"
                                />
                            </label>
                        </div>
                        <div className="Login__body--form__field">
                            <button type="submit" className="Login__body--form__button">
                                Log In
                            </button>
                        </div>
                    </form>
                </section>
            </main>
        </div>
    );
};

export default Login;
