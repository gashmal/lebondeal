import React, { PureComponent } from "react";
import "./styles.css";

export default class LetMeExplain extends PureComponent {
	render() {
		console.log(this.props.url);
		let pic = "";
		if (this.props.url && this.props.url[0]) {
			pic = this.props.url[0].secure_url;
		}

		return (
			<div className="letMe">
				<img src={pic} alt="" />

				<p>{this.props.text}</p>
				<p>{this.props.content}</p>
				<p>{this.props.price}</p>
			</div>
		);
	}
}
