import React, { PureComponent } from "react";

export default class Profile extends PureComponent {
	render() {
		return <div>Bonjour {this.props.user.username}, bon deal.</div>;
	}
}
