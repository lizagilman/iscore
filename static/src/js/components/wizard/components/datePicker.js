import React from 'react';
import DatePicker from 'material-ui/DatePicker';

/**
 * `DatePicker` can be implemented as a controlled input,
 * where `value` is handled by state in the parent component.
 */
export default class DatePickerExampleControlled extends React.Component {

  constructor(props) {
    super(props);

    this.state = {
      controlledDate: "15/07/1857",
    };
  }

  handleChange = (event, date) => {
    this.setState({
      controlledDate: date,
    });
  };

  render() {
    return (
      <DatePicker
        hintText={this.props.hintText}
        value={this.state.controlledDate}
        onChange={this.handleChange}
      />
    );
  }
}