import React, { PureComponent } from "react";
import "./styles.css";

export default class LetMeExplain extends PureComponent {
	renderImages() {
		if (this.props.url && this.props.url[0]) {
			return <img src={this.props.url[0].secure_url} alt="" />;
		} else
			return (
				<img
					src="https://www.arrowsmithstation.co.nz/wp-content/uploads/2014/03/deal.png"
					alt=""
				/>
			);
	}

	render() {
		return (
			<div className="letMe">
				{this.renderImages()}
				<p>{this.props.text}</p>
				<p>{this.props.content}</p>
				<p>{this.props.price}</p>
				<p>{this.props.date}</p>
			</div>
		);
	}
}
