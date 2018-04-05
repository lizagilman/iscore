import React, { Component } from "react";
import SelectField from "material-ui/SelectField";
import MenuItem from "material-ui/MenuItem";

/**
 * The rendering of selected items can be customized by providing a `selectionRenderer`.
 */
export default class SelectFieldExampleSelectionRenderer extends Component {
  state = {
    values: [],
    persons: this.props.persons
  };

  handleChange = (event, index, values) => this.setState({ values });

  selectionRenderer = values => {
    switch (values.length) {
      case 0:
        return "";
      case 1:
        return this.state.persons[values[0]].name;
      default:
        return `${values.length} names selected`;
    }
  };

  menuItems(persons) {
    return persons.map(person => (
      <MenuItem
        key={person.value}
        insetChildren={true}
        checked={this.state.values.indexOf(person.value) > -1}
        value={person.value}
        primaryText={person.name}
      />
    ));
  }

  render() {
    return (
      <SelectField
        multiple={true}
        hintText={this.props.hintText}
        value={this.state.values}
        onChange={this.handleChange}
        selectionRenderer={this.selectionRenderer}
      >
        {this.menuItems(this.state.persons)}
      </SelectField>
    );
  }
}
