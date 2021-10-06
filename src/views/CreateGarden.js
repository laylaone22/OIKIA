const CreateGarden = () => {
    return (
        <div className="CreateGarden">
            <main className="CreateGarden__body">
                <header className="CreateGarden__body__header">
                    <h1 className="CreateGarden__body__header__title">Create Your Garden</h1>
                </header>

                <section className="CreateGarden__body--form">
                    <form>
                        <div>
                            <label htmlFor="name" className="CreateGarden__body--form__label">
                                Name:
                            </label>{' '}
                            <input
                                type="name"
                                id="name"
                                name="name"
                                placeholder="Garden Name"
                                required
                                // value={formData.email}
                                // onChange={handleChange}
                                className="CreateGarden__body--form__input"
                            />
                        </div>
                        <div>
                            <label htmlFor="placement" className="CreateGarden__body--form__label">
                                Garden Placement:
                            </label>
                            <select className="CreateGarden__body--form__input">
                                <option value="" disabled selected>
                                    Select location
                                </option>
                                <option value="outdoor">Outdoor</option>
                                <option value="indoor">Indoor</option>
                            </select>
                        </div>
                        <div>
                            <label htmlFor="size" className="CreateGarden__body--form__label">
                                Size:
                            </label>
                            <select placeholder="width" className="CreateGarden__body--form__input"></select>
                            <select placeholder="length" className="CreateGarden__body--form__input"></select>
                        </div>
                        <div className="CreateGarden__body--search__form__field">
                            <button type="reset" className="CreateGarden__body--form__button">
                                Delete
                            </button>
                            <button type="submit" className="CreateGarden__body--form__button--submit">
                                Save
                            </button>
                        </div>
                    </form>
                </section>
            </main>
        </div>
    );
};

export default CreateGarden;
