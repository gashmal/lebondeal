import React, { PureComponent } from "react";
import "./styles.css";

export default class Title extends PureComponent {
	render() {
		return <h2 className="title">{this.props.text}</h2>;
	}
}
