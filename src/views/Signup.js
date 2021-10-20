import { useState, useEffect } from 'react';
import { useHistory } from 'react-router';

const Signup = () => {
    //
    const history = useHistory();

    const initialState = {
        name: '',
        email: '',
        password: ''
    };

    const [formData, setFormData] = useState(initialState);

    const handleChange = ({ target: { name, value } }) => setFormData({ ...formData, [name]: value });

    const handleSubmit = async (evt) => {
        evt.preventDefault();

        try {
            const URL = 'http://localhost:3000/users/signup';
            const OPTIONS = {
                method: 'POST',
                body: JSON.stringify(formData),
                headers: {
                    'Content-Type': 'application/json'
                }
            };
            const response = await fetch(URL, OPTIONS);
            const data = await response.json();

            if (response.ok) {
                history.push('/login');
            } else {
                // 400 status codes are not errors with fetch
                const error = new Error('Validation failed');
                error.error = data.error;
                throw error;
            }
        } catch (error) {
            console.log(error);
        }
    };

    return (
        <div className="Signup">
            <main className="Signup__body">
                <header className="Signup__body__header">
                    <h1 className="Signup__body__header__title">Signup</h1>
                </header>
                <section>
                    <form onSubmit={handleSubmit} className="Signup__body--form">
                        <label htmlFor="name" className="Signup__body--form__label">
                            <input
                                type="text"
                                id="name"
                                name="name"
                                placeholder="Name"
                                required
                                value={formData.name}
                                onChange={handleChange}
                                className="Signup__body--form__input"
                            />
                        </label>

                        <label htmlFor="email" className="Signup__body--form__label">
                            <input
                                type="email"
                                id="email"
                                name="email"
                                placeholder="Email"
                                required
                                value={formData.email}
                                onChange={handleChange}
                                className="Signup__body--form__input"
                            />
                        </label>

                        <label htmlFor="password" className="Signup__body--form__label">
                            <input
                                type="password"
                                id="password"
                                name="password"
                                placeholder="Password"
                                required
                                value={formData.password}
                                onChange={handleChange}
                                className="Signup__body--form__input"
                            />
                        </label>

                        <button type="submit" className="button button__primary">
                            Sign Up
                        </button>
                    </form>
                </section>
            </main>
        </div>
    );
};

export default Signup;
