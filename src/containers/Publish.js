import React, { Component } from "react";
import FormFields from "../components/FormFields";
import axios from "axios";
import Title from "../components/Title";

class Publish extends Component {
	state = {
		title: "",
		content: "",
		price: ""
	};

	handleChange = event => {
		const target = event.target;
		const name = target.name;

		console.log("name:", name);
		const value = target.type === "checkbox" ? target.checked : target.value;
		console.log("value:", value);
		console.log("baye", this.state.baye);
		this.setState({
			[name]: value
		});
	};

	onSubmit = event => {
		if (this.state.password === this.state.passwordConfirmation) {
			axios
				.post(
					"https://leboncoin-api.herokuapp.com/api/offer/publish",
					{
						title: this.state.title,
						description: this.state.content,
						price: this.state.price
					},
					{
						headers: {
							authorization: "Bearer " + this.props.user.token
						}
					}
				)
				.then(response => {
					console.log(response.data);
					if (response.data && response.data.token) {
						this.props.logIn({
							token: response.data.token,
							username: response.data.account.username,
							_id: response.data._id
						});

						this.props.history.push("/");
					}
				})
				.catch(err => {
					console.log(err);
				});
			event.preventDefault();
		} else {
			console.log("t'as loupé ton copier-coller");
		}
	};

	render() {
		return (
			<div>
				<h1>Publier une annonce</h1>
				<div className="card">
					<Title text="Votre Annonce" />
					{/* <div className="separator" /> */}

					<form onSubmit={this.onSubmit} className="form-signup">
						<FormFields
							id="title"
							type="text"
							onChange={this.handleChange}
							value={this.state.title}
						/>
						<FormFields
							id="content"
							type="text"
							onChange={this.handleChange}
							value={this.state.content}
						/>
						<FormFields
							id="price"
							type="text"
							onChange={this.handleChange}
							value={this.state.price}
						/>
						<button type="submit"> Valider </button>
					</form>
				</div>
			</div>
		);
	}
}

export default Publish;
