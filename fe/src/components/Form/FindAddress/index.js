import React, { Component } from 'react'
import Form, { TextInput } from 'components/Form'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import { setPair } from 'actions/account'
import './style.scss'

class FindAddress extends Component {

	constructor(props){
		super(props)
		this.sessionToken = new window.google.maps.places.AutocompleteSessionToken();
		this.state = {
			inputValue: '',
			results: null
		}
	}

	onClick(place){
		this.props.setPair({key:'place', value: place})
		this.setState({inputValue: place.description, hiddenValue: place.id, results: null})
	}

	onChange(e){
		let value = this.refs.addressLookup.value
		this.setState({inputValue: value}, () => {
			var service = new window.google.maps.places.AutocompleteService();
			service.getQueryPredictions({ input: value, sessionToken: this.sessionToken }, (results, status) => {
				this.setState({results})
			});
		})
	}

	render(){
		return(
			<div className="addressInput">
				<input value={this.state.hiddenValue} name="placeId" ref="addressLookup" type="hidden" className="textInput" placeholder="Address"onChange={this.onChange.bind(this)} />	
				<input value={this.state.inputValue} name="address" ref="addressLookup" type="text" className="textInput" placeholder="Address"onChange={this.onChange.bind(this)} />	
				<div className={`"resultsContainer" ${ (this.state.results && this.state.results.length) > 0 && 'expanded'}`}>
				{this.state.results && this.state.results.map((r,i) => {
					return(
						<div key={i} className="result p" onClick={this.onClick.bind(this, r)}>
							{r.description}
						</div>
					)
				})}
				</div>
			</div>
		)
	}
}

const mapStateToProps = state => ({

})

const mapDispatchToProps = dispatch => bindActionCreators({
  setPair,
}, dispatch)

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(FindAddress)