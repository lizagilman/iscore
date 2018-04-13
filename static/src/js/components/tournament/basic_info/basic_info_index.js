import React from 'react';
import TextField from 'material-ui/TextField';
import SelectField from 'material-ui/SelectField';
import MenuItem from 'material-ui/MenuItem';
import DatePicker from 'material-ui/DatePicker';
import Paper from 'material-ui/Paper';
import Backup from 'material-ui/svg-icons/action/backup';
import Toggle from 'material-ui/Toggle';

export default class BasicInfo extends React.Component {
  // eslint-disable-next-line
  render() {
    const paperStyle = {
      height: 100,
      width: 100,
      margin: '20px 20px 20px 0',
      textAlign: 'center',
      display: 'inline-block',
    };

    return (
      <div>
        <TextField
          defaultValue="TLV Open 2018"
          floatingLabelText="Tournament Name"
          fullWidth={true}
        />

        <SelectField
          floatingLabelText="Field of Sport"
          value={1}
          fullWidth={true}
        >
          <MenuItem value={1} primaryText="Tennis" />
          <MenuItem value={2} primaryText="Judo" />
          <MenuItem value={3} primaryText="Badminton" />
        </SelectField>

        <TextField
          defaultValue="Hadar Yossef"
          floatingLabelText="Venue Address"
          fullWidth={true}
        />

        <DatePicker
          hintText="Start Date"
          container="inline"
          className={'formField'}
        />

        <DatePicker
          hintText="End Date"
          container="inline"
          className={'formField'}
        />

        <DatePicker
          hintText="Registration Deadline"
          container="inline"
          className={'formField'}
        />

        <Paper zDepth={1} style={paperStyle} className={'formField'}>
          <Backup />
          <div>Upload invitation file</div>
        </Paper>

        <Toggle
          defaultToggled={true}
          label={'Publish Tournament?'}
          labelPosition={'right'}
          className={'formField'}
        />
      </div>
    );
  }
}
