import React, { Component } from 'react'
import './style.scss'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import $ from 'jquery'
const host = 'http://localhost:9000'

export default class Loading extends Component {

	constructor(props){
		super(props)
		this.state = {

		}
	}

	get (route){
		let self = this
		this.setState({loading: true})
		const url = host + route
		return new Promise((resolve, reject) => {	
			$.ajax({
				url: url,
				type: "GET",
				beforeSend: function(xhr){xhr.setRequestHeader('jwt', window.localStorage.packagejwt || '');},
				success: function(response) {
				self.setState({loading: false}) 
					resolve(response)
				},
				error: function(err){
					self.setState({loading: false})
					reject(err)
				}
			});
		})
	}

	post(route, dataIn){
		let self = this
		this.setState({loading: true})
		console.log('POSTING', route, dataIn)
		const url = host + route
		return new Promise((resolve, reject) => {
			$.ajax({
				url: url,
				type: "POST",
				data: dataIn,
				beforeSend: function(xhr){xhr.setRequestHeader('jwt', window.localStorage.packagejwt || '');},
				success: function(response) { 
					self.setState({loading: false})
					resolve(response)
				},
				error: function(err){
					self.setState({loading: false})
					reject(err)
				}
			});
		})
	}

	del(route){
		let self = this
		this.setState({loading: true})
		const url = host + route
		return new Promise((resolve, reject) => {
			$.ajax({
				beforeSend: function(xhr){xhr.setRequestHeader('jwt', window.localStorage.packagejwt || '');},
			    url: url,
			    type: 'DELETE',
			    success: function(data) {
			    	self.setState({loading: false})
			        resolve(data)
			    },
			    fail: function(err) {
			    	self.setState({loading: false})
			    	reject(err)
			    }
			});
		})
	}

	render(){
		return(
			<div className={`loadingContainer ${this.state.loading && 'loading'}`}>
				LOADING
			</div>
		)
	}

}
