import React from 'react';
import SelectField from 'material-ui/SelectField';
import TextField from 'material-ui/TextField';
import MenuItem from 'material-ui/MenuItem';
import { inject, observer } from 'mobx-react';
import * as mobx from 'mobx';

@inject('stores')
@observer
class RankingListForm extends React.Component {
  constructor(props) {
    super(props);
    this.handleRankingListNameChange = this.handleRankingListNameChange.bind(this);
    this.handleCategoryChange = this.handleCategoryChange.bind(this);
    this.handleGradesChange = this.handleGradesChange.bind(this);

    this.state = {
      rankingListCategories: [],
      rankingListGrades: [],
    };
  }

  handleRankingListNameChange(event) {
    event.preventDefault();
    const { RankingsStore } = this.props.stores;

    RankingsStore.setRankingListProperty('name', event.target.value);
  }

  handleCategoryChange(event, index, rankingListCategories) {
    this.setState({ rankingListCategories });
    const { RankingsStore } = this.props.stores;
    RankingsStore.setRankingListCategories(rankingListCategories);
  }

  handleGradesChange(event, index, rankingListGrades) {
    this.setState({ rankingListGrades });
    const { RankingsStore } = this.props.stores;
    RankingsStore.setRankingListGrades(rankingListGrades);
  }

  // eslint-disable-next-line
  menuItems(items, values) {
    return items.map(item => (
        <MenuItem
          key={item.name}
          insetChildren={true}
          checked={values && values.indexOf(item) > -1}
          value={item.id}
          primaryText={item.name}
        />
    ));
  }

  componentWillMount() {
    const { RankingsStore } = this.props.stores;
    RankingsStore.getGrades();

    RankingsStore.getCategories();
  }

  render() {
    const { RankingsStore } = this.props.stores;

    const rankingListToCreate = mobx.toJS(RankingsStore.rankingListToCreate);
    const grades = mobx.toJS(RankingsStore.organizationGrades);
    const categories = mobx.toJS(RankingsStore.organizationCategories);

    const { rankingListCategories, rankingListGrades } = this.state;

    return (
      <div>
        <TextField
          defaultValue={rankingListToCreate ? rankingListToCreate.name : false}
          floatingLabelText="Ranking List Name"
          fullWidth={true}
          onChange={event => this.handleRankingListNameChange(event)}
        />

        <SelectField
          multiple={true}
          hintText="Categories"
          value={rankingListCategories}
          onChange={this.handleCategoryChange}
          floatingLabelText="Categories"
        >
          {categories ? (
            this.menuItems(
              categories.map(category => category),
              rankingListCategories,
            )
          ) : (
            <MenuItem
              value={'select categories'}
              key={'select categories'}
              insetChildren={true}
              checked={false}
              primaryText={'Loading...'}
            />
          )}
        </SelectField>

        <SelectField
          multiple={true}
          hintText="Grades"
          value={rankingListGrades}
          onChange={this.handleGradesChange}
          floatingLabelText="Grades"
        >
          {grades ? (
            this.menuItems(grades, rankingListGrades)
          ) : (
            <MenuItem
              value={'select grade'}
              key={'select grade'}
              insetChildren={true}
              checked={false}
              primaryText={'Loading...'}
            />
          )}
        </SelectField>
      </div>
    );
  }
}

export default RankingListForm;
