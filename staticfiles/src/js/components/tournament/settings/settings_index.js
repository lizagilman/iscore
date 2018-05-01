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
  list: {
    listStyleType: 'none',
  },
};
const mobx = require('mobx');

@inject('stores')
@observer
export default class Settings extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      tournament: null,
      categories: null,
    };
  }

  componentWillMount() {
    const self = this;
    const { TournamentStore, CategoryStore } = this.props.stores;

    const tournament = TournamentStore.tournament
      ? mobx.toJS(TournamentStore.tournament)
      : false;

    this.setState({ tournament });

    if (tournament && CategoryStore) {
      CategoryStore.CategoriesByTournament(tournament.id).then((CategoryStore) => {
        self.setState({ categories: mobx.toJS(CategoryStore) });
      });
    }
  }
  render() {
    const tournament = this.state.tournament;

    const categories = this.state.categories;

    const CreateCategoryCheckbox = (category, index) => (
      <li>
        <Checkbox
          label={category ? category.category : ''}
          style={styles.checkbox}
        />
      </li>
    );
    return (
      <div>
        <TextField
          defaultValue={tournament ? tournament.organization : ''}
          floatingLabelText="Organization"
          fullWidth={true}
        />
        <TextField
          defaultValue={tournament ? tournament.ranking_list : ''}
          floatingLabelText="Ranking List"
          fullWidth={true}
        />
        <Subheader>Categories</Subheader>
        <div style={{ display: 'inline-block' }}>
          <ul style={styles.list}>
            {categories
              ? categories.map((category, index) =>
                  CreateCategoryCheckbox(category, index))
              : ''}
          </ul>
        </div>

        <TextField
          defaultValue={tournament ? tournament.grade : ''}
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
