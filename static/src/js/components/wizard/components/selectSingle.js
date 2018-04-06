import React, { Component } from "react";
import SelectField from "material-ui/SelectField";


/**
 * `SelectField` supports a floating label with the `floatingLabelText` property.
 * This can be fixed in place with the `floatingLabelFixed` property,
 * and can be customised with the `floatingLabelText` property.
 */
export default class SelectFieldExampleFloatingLabel extends Component {
  state = {
    value: null,
    items: this.props.items
  };

  handleChange = (event, index, value) => this.setState({ value });

  render() {
    return (
      <div>
        <SelectField
          value={this.state.value}
          onChange={this.handleChange}
          floatingLabelText={this.props.hintText}
        >
          {this.state.items}
        </SelectField>
      </div>
    );
  }
}
