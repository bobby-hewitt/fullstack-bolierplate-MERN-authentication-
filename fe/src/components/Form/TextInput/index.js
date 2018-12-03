import React from "react";
import { push } from "react-router-redux";
import { bindActionCreators } from "redux";
import { connect } from "react-redux";
import "./style.scss";

const TextInput = props => (
	<div className={`textInput ${props.fieldError && "hasError"}`}>
		{props.label ? <label htmlFor={props.name}>{props.label}</label> : null}
		<input
			type={props.type ? props.type : "text"}
			name={props.name}
			onChange={props.onChange}
			value={props.value}
			className="textInput"
			placeholder={props.placeholder}
			onKeyDown={(event) => {
				if (event.keyCode == 13 && props.onEnter) {
					props.onEnter()
					return false;
				}
			}}
		/>
		{props.helpText && 
			<p className="helpText">{props.helpText}</p>
		}
	</div>
);

export default TextInput;
