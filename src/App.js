import React, { Component, Fragment } from "react";
import { BrowserRouter as Router, Route } from "react-router-dom";
import Cookies from "js-cookie";
import "./App.css";
import Home from "./containers/Home";
import SignUp from "./containers/SignUp";
import LogIn from "./containers/LogIn";
import Offer from "./containers/Offer";
import Publish from "./containers/Publish";
import Header from "./components/Header";
import Profile from "./containers/Profile";
import "./App.css";
import { library } from "@fortawesome/fontawesome-svg-core";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

class App extends Component {
	state = {
		user: {
			token: Cookies.get("token") || "",
			username: Cookies.get("username") || "",
			_id: Cookies.get("_id") || ""
		}
	};

	logIn = user => {
		Cookies.set("token", user.token);
		Cookies.set("username", user.username);
		Cookies.set("_id", user._id);

		this.setState({ user: user });
	};

	logOut = () => {
		Cookies.remove("token");
		Cookies.remove("username");
		Cookies.remove("_id");

		this.setState({
			user: {
				token: "",
				username: "",
				_id: ""
			}
		});
	};

	render() {
		const { user } = this.state;
		return (
			<Router>
				<Fragment>
					<Header user={user} logOut={this.logOut} />
					<div className="container">
						<Route
							exact
							path="/"
							render={props => <Home {...props} user={user} />}
						/>
						<Route
							path="/sign_up"
							render={props => (
								<SignUp {...props} user={user} logIn={this.logIn} />
							)}
						/>
						<Route
							path="/log_in"
							render={props => (
								<LogIn {...props} user={user} logIn={this.logIn} />
							)}
						/>
						<Route
							path="/profile/:id"
							render={props => <Profile {...props} user={user} />}
						/>
						<Route
							path="/offer/:id"
							render={props => <Offer {...props} user={user} />}
						/>
						<Route
							path="/publish"
							render={props => <Publish {...props} user={user} />}
						/>
					</div>
				</Fragment>
			</Router>
		);
	}
}

export default App;
