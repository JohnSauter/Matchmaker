class ProfileForm extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            gender: male,
            age: 100,
            height: 65,
            weight: 100,
            eyes: brown,
            hair: brown,
            aboutMe: "",
            contactInfo: ""
        };

        this.handleInputChange = this.handleInputChange.bind(this);
    }

    handleInputChange(event) {
        const target = event.target;
        const value = target.type === 'checkbox' ? target.checked : target.value;
        const name = target.name;

        this.setState({
            [name]: value
        });
    }

    render() {
        return (
            <form onSubmit={handleSubmit}>
                <h1>Tell us a little about yourself</h1>
                <label>
                    What is your gender?:
                    <select value={this.state.value} onChange={this.handleChange}>
                        <option value="male">Male</option>
                        <option value="female">Female</option>
                        <option value="nonbinary">Nonbinary</option>
                    </select>
                </label>
                <label>
                    What is your age?
                    <input
                        name="ages"
                        type="number"
                        value={this.state.age}
                        onChange={this.handleInputChange} />
                </label>
                <label>
                    What is your height?
                    <input
                        name="height"
                        type="number"
                        value={this.state.height}
                        onChange={this.handleInputChange} />
                </label>
                <label>
                    What is your weight?
                    <input
                        name="weights"
                        type="number"
                        value={this.state.weight}
                        onChange={this.handleInputChange} />
                </label>
                <label>
                    What color are your eyes?
                    <select value={this.state.value} onChange={this.handleChange}>
                        <option value="brown">Brown</option>
                        <option value="blue">blue</option>
                        <option value="green">green</option>
                        <option value="gray">gray</option>
                    </select>
                </label>
                <label>What would you like your match to know about you?
                    <input
                        type="text"
                        value={aboutMe}
                        onChange={(e) => setaboutMe(e.target.value)}
                    />
                </label>
                <label>Enter your name:How would you like your match to contact you?
                    <input
                        type="text"
                        value={contactInfo}
                        onChange={(e) => setcontactInfo(e.target.value)}
                    />
                </label>
                <button type="submit">
                    Submit
                </button>


            </form>
        );
    }
}

