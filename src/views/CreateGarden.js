const CreateGarden = () => {
    return (
        <div className="CreateGarden">
            <main className="CreateGarden__body">
                <header className="CreateGarden__body__header">
                    <h1 className="CreateGarden__body--header__title">Create Your Garden</h1>
                </header>

                <section className="CreateGarden__body--search__form">
                    <form>
                        <div>
                            <label htmlFor="name" className="CreateGarden__body--search__form__label">
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
                                className="CreateGarden__body--search__form__input"
                            />
                        </div>
                        <div>
                            <label htmlFor="placement" className="CreateGarden__body--search__form__label">
                                Garden Placement:
                            </label>
                            <select>
                                <option value="outdoor">Outdoor</option>
                                <option value="indoor">Indoor</option>
                            </select>
                        </div>
                        <div>
                            <label htmlFor="size" className="CreateGarden__body--search__form__label">
                                Size:
                            </label>
                            <select placeholder="width">
                                <option value="outdoor">Outdoor</option>
                                <option value="indoor">Indoor</option>
                            </select>
                            <select>
                                <option value="outdoor">Outdoor</option>
                                <option value="indoor">Indoor</option>
                            </select>
                        </div>
                        <div className="CreateGarden__body--search__form__field">
                            <button type="submit" className="CreateGarden__body--search__form__button">
                                Delete
                            </button>
                            <button type="submit" className="CreateGarden__body--search__form__button">
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
