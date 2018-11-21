import React, { Component } from "react";
import axios from "axios";
import Title from "../components/Title";
import LetMeExplain from "../components/LetMeExplain";
import FormFields from "../components/FormFields";

class SignUp extends Component {
	state = {
		username: "",
		email: "",
		password: "",
		passwordConfirmation: "",
		acceptOffers: "",
		cgv: "",
		errorMessage: "",
		baye: ""
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
				.post("https://leboncoin-api.herokuapp.com/api/user/sign_up", {
					email: this.state.email,
					password: this.state.password,
					username: this.state.username
				})
				.then(response => {
					// console.log(response.data);
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
			this.setState({
				errorMessage: "t'as loupé ton copier-coller"
			});
		}
	};

	renderError() {
		if (this.state.errorMessage) {
			return <div>{this.state.errorMessage}</div>;
		} else return null;
	}

	render() {
		return (
			<React.Fragment>
				<div className="card">
					<div className="whyCreate">
						<Title text="Pourquoi créer un compte ?" />

						<div>
							<LetMeExplain
								url="https://orig00.deviantart.net/95f1/f/2015/063/5/1/514e54ca3122f0a604f187b9f714ac56-d8kd4dn.png"
								text="Si tu vends il y a pleins de boloss sur le site qui vont acheter tes bails trop cher."
							/>
							<LetMeExplain
								url="https://techflourish.com/images/economy-money-funy-clipart-18.png"
								text="Des deals de oufs, tu vas te mettre bien. Il y en a pour tout le monde. Si tu cherches des bon plans il y en a plein aussi, parole d'auvergnat."
							/>
							<LetMeExplain
								url="https://www.iconspng.com/uploads/friendship/friendship.png"
								text="Avec un peu de chance tu peux même te faire un ou une Best Friend For Life !"
							/>
						</div>
					</div>

					<div className="goCreate">
						<Title text="Créer un compte" />
						<div className="separator" />

						<form onSubmit={this.onSubmit} className="form-signup">
							<FormFields
								id="baye"
								type="text"
								onChange={this.handleChange}
								value={this.state.baye}
							/>
							<label htmlFor="username"> Username </label>
							<input
								id="username"
								name="username"
								type="text"
								value={this.state.username}
								onChange={this.handleChange}
							/>
							<label htmlFor="email"> Email </label>
							<input
								id="email"
								name="email"
								type="email"
								value={this.state.email}
								onChange={this.handleChange}
							/>
							<label htmlFor="password"> Password </label>
							<input
								id="password"
								name="password"
								type="password"
								value={this.state.password}
								onChange={this.handleChange}
							/>

							<label htmlFor="passwordConfirmation">
								{" "}
								Confirmer le mot de passe{" "}
							</label>
							<input
								id="passwordConfirmation"
								name="passwordConfirmation"
								type="password"
								value={this.state.passwordConfirmation}
								onChange={this.handleChange}
							/>
							<label htmlFor="acceptOffers">
								{" "}
								Offres partenaires, plein de Spams au calme{" "}
							</label>
							<input
								id="acceptOffers"
								name="acceptOffers"
								type="checkbox"
								value={this.state.password}
								onChange={this.handleChange}
							/>
							<label htmlFor="cgv">
								{" "}
								CGV, clique mais lis pas stp, tu vas être déçu{" "}
							</label>
							<input
								id="cgv"
								name="cgv"
								type="checkbox"
								value={this.state.cgv}
								onChange={this.handleChange}
							/>
							{this.renderError()}
							<button type="submit"> Valider </button>
						</form>
					</div>
				</div>
			</React.Fragment>
		);
	}
}

export default SignUp;
