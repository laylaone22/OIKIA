const Login = () => {
    return (
        <div className="Login">
            <main className="Login__body">
                <header className="Login__body__header">
                    <h1 className="Login__body--header__title">Login</h1>
                </header>

                <section className="Login__body--search__form">
                    <form>
                        <div>
                            <label htmlFor="email" className="Login__body--search__form__label">
                                <input
                                    type="email"
                                    id="email"
                                    name="email"
                                    placeholder="Email"
                                    required
                                    // value={formData.email}
                                    // onChange={handleChange}
                                    className="Login__body--search__form__input"
                                />
                            </label>
                        </div>
                        <div>
                            <label htmlFor="password" className="Login__body--search__form__label">
                                <input
                                    type="password"
                                    id="password"
                                    name="password"
                                    placeholder="Password"
                                    required
                                    // value={formData.password}
                                    // onChange={handleChange}
                                    className="Login__body--search__form__input"
                                />
                            </label>
                        </div>
                        <div className="Signup__body--search__form__field">
                            <button type="submit" className="Login__body--search__form__button">
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
