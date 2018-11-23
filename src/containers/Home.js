import React from "react";
import LetMeExplain from "../components/LetMeExplain";
import axios from "axios";
import { Link } from "react-router-dom";
import SearchBar from "../components/SearchBar";

class Home extends React.Component {
	state = {
		offers: [],
		counter: ""
	};

	searchFn = (params, num) => {
		this.setState({ offers: params, counter: num });
	};

	componentDidMount() {
		axios
			.get(
				"https://leboncoin-api.herokuapp.com/api/offer/with-count?skip=0&limit=5"
			)
			.then(response => {
				console.log(response.data);

				this.setState({
					offers: response.data.offers,
					counter: response.data.count
				});
			})
			.catch(err => {
				console.log(err);
			});
	}

	render() {
		return (
			<div>
				<SearchBar fn={this.searchFn} count={this.state.counter} />
				{this.state.offers.map(annonce => (
					<Link key={annonce._id} to={"/offer/" + annonce._id}>
						<LetMeExplain
							url={annonce.pictures}
							text={annonce.title}
							price={annonce.price}
						/>
					</Link>
				))}
			</div>
		);
	}
}

export default Home;
