import React from "react";
import LetMeExplain from "../components/LetMeExplain";
import axios from "axios";
import { Link } from "react-router-dom";
import SearchBar from "../components/SearchBar";

class Home extends React.Component {
	state = {
		offers: []
	};

	searchFn = params => {
		this.setState({ offers: params });
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
				<SearchBar fn={this.searchFn} />
				{this.state.offers.map(annonce => (
					<Link key={annonce._id} to={"/offer/" + annonce._id}>
						<LetMeExplain text={annonce.title} price={annonce.price} />
					</Link>
				))}
			</div>
		);
	}
}

export default Home;
