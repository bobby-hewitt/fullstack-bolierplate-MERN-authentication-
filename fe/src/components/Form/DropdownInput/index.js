import React, { Component } from 'react';
import PropTypes from 'prop-types';
import clickOutside from '../../../helpers/clickOutsideDecorator.js';
import './style.css';

class DropdownInput extends Component {
  constructor(props) {
    super(props);

    this.state = {
      open: false,
      selectedValue: props.value,
    };
  }
  onClick = () => {
    this.setState({ open: !this.state.open });
  };
  onClickOutside = () => {
    return this.setState({ open: false });
  }
  onSelect = value => {
    return this.setState({ selectedValue: value }, () => {
      this.props.onSelect ? this.props.onSelect(value, this.props.name) : null;
    });
  };
  renderDropdownList() {
    const items = this.props.options.map(option => {
      return (
        <span
          className="DropdownInput-option"
          onClick={this.onSelect.bind(null, option.value)}
          key={option.value}
        >
          {option.name}
        </span>
      );
    });
    return <div className="DropdownInput-optionsList">{items}</div>;
  }
  render() {
    const selected = this.props.options.find(
      o => o.value === this.state.selectedValue,
    );

    return (
      <div
        className={`${this.props.className} DropdownInput ${this.props.fieldError ? 'hasError' : ''}`}
        onClick={this.onClick}
      >
        {this.props.label ? (
          <label className="form-label">{this.props.label}</label>
        ) : null}
        <input
          placeholder={this.props.placeholder}
          className="DropdownInput-input"
          name={this.props.name}
          value={selected ? selected.name : ''}
          readOnly={this.props.readOnly}
          onChange={() => {}}
        />
        {this.state.open ? this.renderDropdownList() : null}
      </div>
    );
  }
}

DropdownInput.propTypes = {
  name: PropTypes.string,
  value: PropTypes.string,
  placeholder: PropTypes.string,
  className: PropTypes.string,
  label: PropTypes.string,
  readOnly: PropTypes.bool,
  onSelect: PropTypes.func.isRequired,
  options: PropTypes.array.isRequired,
  selectVal: PropTypes.bool,
};

export default clickOutside(DropdownInput)