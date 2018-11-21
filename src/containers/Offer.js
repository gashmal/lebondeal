import React from "react";
import LetMeExplain from "../components/LetMeExplain";
import axios from "axios";
import { Link } from "react-router-dom";

class Offer extends React.Component {
	state = {
		offer: {}
	};

	renderItem() {
		if (this.state.offer.creator === undefined) {
			return null;
		} else {
			return (
				<div>
					<LetMeExplain
						url={""}
						content={this.state.offer.description}
						text={this.state.offer.title}
						price={this.state.offer.price}
					/>
					<LetMeExplain
						url={""}
						text={this.state.offer.creator.account.username}
						price={this.state.offer.creator.account.email}
					/>
				</div>
			);
		}
	}

	componentDidMount() {
		axios
			.get(
				"https://leboncoin-api.herokuapp.com/api/offer/" +
					this.props.match.params.id
			)
			.then(response => {
				console.log(response.data);
				console.log(response.data.creator.account.username);
				this.setState({
					offer: response.data
				});
			})
			.catch(err => {
				console.log(err);
			});
	}

	render() {
		return <div>{this.renderItem()}</div>;
	}
}

export default Offer;
