import React from 'react';
import SelectField from 'material-ui/SelectField';
import MenuItem from 'material-ui/MenuItem';
import { inject, observer } from 'mobx-react';
import * as mobx from 'mobx';

@inject('stores')
@observer
class ThirsStep extends React.Component {
  constructor(props) {
    super(props);
    this.handleSizeOfDrawChange = this.handleSizeOfDrawChange.bind(this);
  }

  handleSizeOfDrawChange(event, index, value) {
    event.preventDefault();
    const { WizardStore } = this.props.stores;

    WizardStore.setTournamentProperty('max_players', value);
    this.forceUpdate();
  }

  render() {
    const { WizardStore } = this.props.stores;

    const tournament = mobx.toJS(WizardStore.tournament);

    return (
      <SelectField
        value={tournament ? tournament.max_players : false}
        onChange={(event, index, value) =>
          this.handleSizeOfDrawChange(event, index, value)
        }
        floatingLabelText="Size of Draws"
      >
        <MenuItem key={1} value={4} primaryText="4" />
        <MenuItem key={2} value={8} primaryText="8" />
        <MenuItem key={3} value={16} primaryText="16" />
        <MenuItem key={4} value={32} primaryText="32" />
        <MenuItem key={4} value={64} primaryText="64" />
      </SelectField>
    );
  }
}

export default ThirsStep;
