import React, { Component } from "react";
import FormFields from "../components/FormFields";
import axios from "axios";
import ReactFileReader from "react-file-reader";
import Title from "../components/Title";

class Publish extends Component {
	state = {
		title: "",
		content: "",
		price: "",
		files: []
	};

	handleFiles = files => {
		console.log(files);
		const newFiles = [...this.state.files, ...files.base64];
		this.setState({
			files: newFiles
		});
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
						files: this.state.files,
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
		const filesArray = [];
		for (let i = 0; i < this.state.files.length; i++) {
			filesArray.push(
				<img
					key={i}
					onClick={() => {
						// En cliquant sur l'image, le fichier sera supprimé
						const newFiles = [...this.state.files];
						newFiles.splice(i, 1);
						this.setState({ files: newFiles });
					}}
					src={this.state.files[i]}
					alt="Annonce"
					height="100px"
					width="auto"
				/>
			);
		}

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
						<div>
							<ReactFileReader
								fileTypes={[".png", ".jpg"]}
								base64={true}
								multipleFiles={true} // `false si une seule image`
								handleFiles={this.handleFiles}
							>
								<span>Choisir des images</span>
							</ReactFileReader>

							{filesArray}
						</div>
						<button type="submit"> Valider </button>
					</form>
				</div>
			</div>
		);
	}
}

export default Publish;
