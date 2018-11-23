import React, { Component, Fragment } from "react";
import { Link, NavLink, withRouter } from "react-router-dom";
import "./styles.css";
import Logo from "../../logoSvg.svg";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBars } from "@fortawesome/free-solid-svg-icons";
import { faTimes } from "@fortawesome/free-solid-svg-icons";

class Header extends Component {
	state = {
		visible: false
	};

	onLogOut = event => {
		this.props.logOut();
		this.props.history.push("/");
	};
	renderNav() {
		if (this.props.user._id) {
			return (
				<Fragment>
					<li
						onClick={() =>
							this.props.history.push("/profile/" + this.props.user._id)
						}
					>
						{this.props.user.username}
					</li>
					<li onClick={this.onLogOut}>Déconnexion</li>
				</Fragment>
			);
		}
		return (
			<Fragment>
				<li onClick={() => this.props.history.push("sign_up")}>
					Créer un compte
				</li>
				<li onClick={() => this.props.history.push("log_in")}>Se connecter</li>
			</Fragment>
		);
	}

	renderBurger() {
		if (this.state.visible) {
			return (
				<FontAwesomeIcon
					onClick={() =>
						this.setState({
							visible: !this.state.visible
						})
					}
					className="iconMenu"
					icon={faTimes}
				/>
			);
		} else
			return (
				<FontAwesomeIcon
					onClick={() =>
						this.setState({
							visible: !this.state.visible
						})
					}
					className="iconMenu"
					icon={faBars}
				/>
			);
	}

	render() {
		return (
			<Fragment>
				<header>
					<div className="container">
						<div className="logo">
							<Link to="/">
								<img src={Logo} alt="Le Bon Deal" />
							</Link>
						</div>

						<div className="h1">
							<h1>Le Bon Deal</h1>
						</div>
						<div className="menu wide">
							<div className="menu-left">
								<ul>
									<li>
										<NavLink to="/publish">DÉPOSER UNE ANNONCE</NavLink>
									</li>
									<li>
										<NavLink to="/">OFFRES</NavLink>
									</li>
								</ul>
							</div>
							<div className="menu-right">
								<ul>{this.renderNav()}</ul>
							</div>
						</div>
						<div className="notWide">{this.renderBurger()}</div>
					</div>
				</header>
				<menu
					className={this.state.visible ? "visible " : "notVisible"}
					id="lilMenu"
				>
					<ul
						onClick={() =>
							this.setState({
								visible: !this.state.visible
							})
						}
					>
						<li>
							<NavLink to="/publish">DÉPOSER UNE ANNONCE</NavLink>
						</li>
						<li>
							<NavLink to="/">OFFRES</NavLink>
						</li>
						{this.renderNav()}
					</ul>
				</menu>
			</Fragment>
		);
	}
}

export default withRouter(Header);
