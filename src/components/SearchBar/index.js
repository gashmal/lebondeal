import React, { Component } from "react";
import axios from "axios";
import "./styles.css";
import FormFields from "../FormFields";
import debounce from "lodash.debounce";

export default class SearchBar extends Component {
	state = {
		title: "",
		priceMin: "",
		priceMax: "",
		sort: "", // "price-desc", "price-asc", "date-desc", "date-asc"
		skip: 0,
		limit: 5
	};

	handleChange = event => {
		const { name, value } = event.target;
		console.log(this.state);
		this.setState(
			{
				[name]: value
			},
			() => {
				axios
					.get("https://leboncoin-api.herokuapp.com/api/offer/with-count", {
						params: {
							title: this.state.title,
							priceMin: this.state.priceMin,
							priceMax: this.state.priceMax,
							sort: this.state.sort,
							skip: this.state.skip,
							limit: this.state.limit
						}
					})
					.then(response => {
						this.props.fn(response.data.offers);
					})
					.catch(err => {
						console.log(err);
					});
			}
		);
	};

	onSubmit = event => {
		const { title, priceMin, priceMax, sort, skip, limit } = this.state;
		event.preventDefault();
		axios
			.get("https://leboncoin-api.herokuapp.com/api/offer/with-count", {
				params: {
					title: title,
					priceMin: priceMin,
					priceMax: priceMax,
					sort: sort,
					skip: skip,
					limit: limit
				}
			})
			.then(response => {
				this.props.fn(response.data.offers);
			})
			.catch(err => {
				console.log(err);
			});
	};

	render() {
		return (
			<div className="search">
				<form onSubmit={this.onSubmit}>
					<FormFields
						id="title"
						type="text"
						onChange={this.handleChange}
						value={this.state.title}
					/>
					<FormFields
						id="priceMin"
						type="text"
						onChange={this.handleChange}
						value={this.state.priceMin}
					/>
					<FormFields
						id="priceMax"
						type="text"
						onChange={this.handleChange}
						value={this.state.priceMax}
					/>
					<select
						name="sort"
						id="sort"
						value={this.state.sort}
						onChange={this.handleChange}
					>
						<option selected value="">
							filtres-->
						</option>
						<option value="date-desc">date-desc</option>
						<option value="date-asc">date-asc</option>
						<option value="price-desc">price-desc</option>
						<option value="price-asc">price-asc</option>
					</select>

					<button
						className=""
						onClick={() => {
							this.setState(
								{
									skip: this.state.skip + 5
								},
								() => {
									axios
										.get(
											"https://leboncoin-api.herokuapp.com/api/offer/with-count",
											{
												params: {
													title: this.state.title,
													priceMin: this.state.priceMin,
													priceMax: this.state.priceMax,
													sort: this.state.sort,
													skip: this.state.skip,
													limit: this.state.limit
												}
											}
										)
										.then(response => {
											this.props.fn(response.data.offers);
										})
										.catch(err => {
											console.log(err);
										});
								}
							);
						}}
					>
						suivante
					</button>
					<span>1</span>
					<button
						className=""
						onClick={() => {
							if (this.state.skip >= 5) {
								this.setState(
									{
										skip: this.state.skip - 5
									},
									() => {
										axios
											.get(
												"https://leboncoin-api.herokuapp.com/api/offer/with-count",
												{
													params: {
														title: this.state.title,
														priceMin: this.state.priceMin,
														priceMax: this.state.priceMax,
														sort: this.state.sort,
														skip: this.state.skip,
														limit: this.state.limit
													}
												}
											)
											.then(response => {
												this.props.fn(response.data.offers);
											})
											.catch(err => {
												console.log(err);
											});
									}
								);
							}
						}}
					>
						Précédente
					</button>
					<button type="submit">Lancer la recherche</button>
				</form>
			</div>
		);
	}
}
