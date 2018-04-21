import React from 'react';
import TextField from 'material-ui/TextField';
import SelectField from 'material-ui/SelectField';
import MenuItem from 'material-ui/MenuItem';
import DatePicker from 'material-ui/DatePicker';
import Paper from 'material-ui/Paper';
import Backup from 'material-ui/svg-icons/action/backup';
import Toggle from 'material-ui/Toggle';
import { inject, observer } from 'mobx-react/index';

const mobx = require('mobx');

const paperStyle = {
  height: 100,
  width: 100,
  margin: '20px 20px 20px 0',
  textAlign: 'center',
  display: 'inline-block',
};
@inject('stores')
@observer
export default class BasicInfo extends React.Component {
  // eslint-disable-next-line
  constructor(props) {
    super(props);

    this.state = {};
  }

  componentWillMount() {
    const { TournamentsStore } = this.props.stores;
    TournamentsStore.fetchAllTournaments();
  }

  render() {
    const { TournamentsStore } = this.props.stores;

    const storedTournament = TournamentsStore.allTournaments;

    const data =
      storedTournament && storedTournament.length > 0
        ? mobx.toJS(storedTournament)
        : false;

    const createForm = (item, index) => (
        <div>
          <TextField
            defaultValue={item.name}
            floatingLabelText="Tournament Name"
            fullWidth={true}
          />

          <SelectField
            floatingLabelText="Field of Sport"
            value={1}
            fullWidth={true}
          >
            <MenuItem value={1} primaryText={item.field_of_sport} />
            <MenuItem value={2} primaryText="Judo" />
            <MenuItem value={3} primaryText="Badminton" />
          </SelectField>

          <TextField
            defaultValue={item.address}
            floatingLabelText="Venue Address"
            fullWidth={true}
          />

          <DatePicker
            floatingLabelText="Start Date"
            defaultDate={new Date(item.start_date)}
            container="inline"
            className={'formField'}
          />

          <DatePicker
            floatingLabelText="End Date"
            defaultDate={new Date(item.end_date)}
            container="inline"
            className={'formField'}
          />
          <DatePicker
            floatingLabelText="Registration Begin Date"
            defaultDate={new Date(item.registration_start_date)}
            container="inline"
            className={'formField'}
          />
          <DatePicker
            floatingLabelText="Registration Deadline"
            defaultDate={new Date(item.registration_end_date)}
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

    const showForm = (
      <div>
        {data
          ? data.map((Entrie, index) => createForm(Entrie, index))
          : 'Loading...'}
      </div>
    );

    return <div>{showForm}</div>;
  }
}
