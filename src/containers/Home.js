import React from "react";
import LetMeExplain from "../components/LetMeExplain";
import axios from "axios";
import { Link } from "react-router-dom";

class Home extends React.Component {
	state = {
		offers: []
	};

	componentDidMount() {
		axios
			.get("https://leboncoin-api.herokuapp.com/api/offer")
			.then(response => {
				console.log(response.data);

				this.setState({
					offers: response.data
				});
			})
			.catch(err => {
				console.log(err);
			});
	}

	render() {
		return (
			<div>
				{this.state.offers.reverse().map(annonce => (
					<Link key={annonce._id} to={"/profile/" + annonce._id}>
						<LetMeExplain text={annonce.title} price={annonce.price} />
					</Link>
				))}
			</div>
		);
	}
}

export default Home;
