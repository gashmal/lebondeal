import React, { Component } from "react";
import "./styles.css";

export default class FormFields extends Component {
	render() {
		return (
			<div className="">
				<label htmlFor={this.props.id}> {this.props.id} </label>
				<input
					id={this.props.id}
					name={this.props.id}
					type={this.props.type}
					value={this.props.value}
					onChange={this.props.onChange}
				/>
			</div>
		);
	}
}
