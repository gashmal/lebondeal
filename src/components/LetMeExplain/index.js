import React, { PureComponent } from "react";
import "./styles.css";

export default class LetMeExplain extends PureComponent {
	render() {
		return (
			<div className="letMe">
				<img src={this.props.url} alt="" />

				<p>{this.props.text}</p>
				<p>{this.props.content}</p>
				<p>{this.props.price}</p>
			</div>
		);
	}
}
