import React from 'react';
import TextField from 'material-ui/TextField';
import SelectField from 'material-ui/SelectField';
import MenuItem from 'material-ui/MenuItem';
import Checkbox from 'material-ui/Checkbox';
import Subheader from 'material-ui/Subheader';
import FlatButton from 'material-ui/FlatButton';
import { inject, observer } from 'mobx-react/index';

const styles = {
  block: {
    maxWidth: 250,
  },
  checkbox: {
    marginBottom: 16,
  },
};
const mobx = require('mobx');

@inject('stores')
@observer
export default class Settings extends React.Component {
  render() {
    const tournament = mobx.toJS(this.props.stores.TournamentStore.tournament)
      ? mobx.toJS(this.props.stores.TournamentStore.tournament)
      : ' ';
    const { CategoryStore } = this.props.stores;

    const categories = tournament.ranking_list
      ? CategoryStore.getCategories(tournament.ranking_list.id)
      : '';

    const createCategoryCheckbox = (category, index) => (
      <Checkbox
        defaultValue={category ? category.name : ''}
        style={styles.checkbox}
      />
    );

    return (
      <div>
        <TextField
          defaultValue={tournament.organization ? tournament.organization : ''}
          floatingLabelText="Organization"
          fullWidth={true}
        />
        <TextField
          defaultValue={tournament.ranking_list ? tournament.ranking_list : ''}
          floatingLabelText="Ranking List"
          fullWidth={true}
        />
        <Subheader>Categories</Subheader>
        <div style={{ display: 'inline-block' }}>
          {categories
            ? categories.map((category, index) =>
                createCategoryCheckbox(category, index))
            : ''}
        </div>

        <TextField
          defaultValue=""
          floatingLabelText="Grade"
          fullWidth={true}
        />

        <SelectField
          floatingLabelText="Points Distribution Method"
          value={1}
          fullWidth={true}
        >
          <MenuItem value={1} primaryText="Default" />
        </SelectField>

        <SelectField
          floatingLabelText="Money Distribution Method"
          value={1}
          fullWidth={true}
        >
          <MenuItem value={1} primaryText="Default" />
        </SelectField>

        <div style={{ display: 'inline-block', width: '100%' }}>
          <FlatButton label="CANCEL" />
          <FlatButton label="SAVE" style={{ color: 'green' }} />
        </div>
      </div>
    );
  }
}
