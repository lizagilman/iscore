import React from 'react';
import TextField from 'material-ui/TextField';
import DatePicker from 'material-ui/DatePicker';
import SelectField from 'material-ui/SelectField';
import MenuItem from 'material-ui/MenuItem';
import { inject, observer } from 'mobx-react';
import * as mobx from 'mobx';

@inject('stores')
@observer
class FirstStep extends React.Component {
  constructor(props) {
    super(props);
    this.handleTournamentNameChange = this.handleTournamentNameChange.bind(this);
    this.handleFieldOfSportChange = this.handleFieldOfSportChange.bind(this);
    this.handleAddressChange = this.handleAddressChange.bind(this);
  }

  handleTournamentNameChange(event) {
    event.preventDefault();
    const { WizardStore } = this.props.stores;

    WizardStore.setTournamentProperty('name', event.target.value);
  }

  handleAddressChange(event) {
    event.preventDefault();
    const { WizardStore } = this.props.stores;

    WizardStore.setTournamentProperty('address', event.target.value);
  }

  handleFieldOfSportChange(event, index, value) {
    event.preventDefault();
    const { WizardStore } = this.props.stores;

    WizardStore.setTournamentProperty('field_of_sport', value);
    WizardStore.resetFieldOfSport();

    this.forceUpdate();
  }

  handleDateChange(key, date) {
    const { WizardStore } = this.props.stores;

    WizardStore.setTournamentProperty(key, date);
  }

  render() {
    const { WizardStore } = this.props.stores;

    const tournament = mobx.toJS(WizardStore.tournament);

    return (
      <div>
        <TextField
          defaultValue={tournament ? tournament.name : false}
          floatingLabelText="Tournament Name"
          fullWidth={true}
          onChange={event => this.handleTournamentNameChange(event)}
        />

        <TextField
          defaultValue={tournament ? tournament.address : false}
          floatingLabelText="Venue Address"
          fullWidth={true}
          onChange={event => this.handleAddressChange(event)}
        />

        <SelectField
          value={tournament ? tournament.field_of_sport : false}
          onChange={(event, index, value) =>
            this.handleFieldOfSportChange(event, index, value)
          }
          floatingLabelText="Field of Sport"
        >
          <MenuItem key={1} value={'Tennis'} primaryText={'Tennis'} />
          <MenuItem key={2} value={'Judo'} primaryText="Judo" />
          <MenuItem key={3} value={'Badminton'} primaryText="Badminton" />
          <MenuItem key={4} value={'Table Tennis'} primaryText="Table Tennis" />
        </SelectField>

        <DatePicker
          defaultDate={tournament ? tournament.start_date : ''}
          floatingLabelText="Start Date"
          container="inline"
          className={'formField'}
          onChange={(event, date) => {
            this.handleDateChange('start_date', date);
          }}
        />

        <DatePicker
          defaultDate={tournament ? tournament.start_date : ''}
          floatingLabelText="End Date"
          container="inline"
          className={'formField'}
          onChange={(event, date) => {
            this.handleDateChange('end_date', date);
          }}
        />
      </div>
    );
  }
}

export default FirstStep;
