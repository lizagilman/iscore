import React from 'react';
import SelectField from 'material-ui/SelectField';
import MenuItem from 'material-ui/MenuItem';
import { inject, observer } from 'mobx-react';
import Checkbox from 'material-ui/Checkbox';
import * as mobx from 'mobx';

@inject('stores')
@observer
class SecondStep extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      tournamentCategories: [],
    };

    this.handleIsRankedChange = this.handleIsRankedChange.bind(this);
    this.handleOrganizationChange = this.handleOrganizationChange.bind(this);
    this.handleRankingListChange = this.handleRankingListChange.bind(this);
    this.handleGradeChange = this.handleGradeChange.bind(this);
    this.handleCategoryChange = this.handleCategoryChange.bind(this);
  }

  handleIsRankedChange(event) {
    event.preventDefault();
    const { WizardStore } = this.props.stores;
    const isRankedCurrent = WizardStore.tournament.is_ranked;

    if (!isRankedCurrent) {
      WizardStore.getOrganization();
    }
    WizardStore.setTournamentProperty('is_ranked', !isRankedCurrent);
  }

  handleOrganizationChange(event, index, value) {
    event.preventDefault();
    const { WizardStore } = this.props.stores;

    if (WizardStore.rankingLists) {
      WizardStore.resetOrganization();
    }

    WizardStore.setTournamentProperty('organization', value);
    WizardStore.getRankingLists();
    this.forceUpdate();
  }

  handleRankingListChange(event, index, value) {
    event.preventDefault();
    const { WizardStore } = this.props.stores;
    if (WizardStore.grades) {
      WizardStore.resetRankingList();
    }
    WizardStore.setTournamentProperty('ranking_list', value);
    WizardStore.getGrades();
    WizardStore.getRankingListCategories();
    this.forceUpdate();
  }

  handleGradeChange(event, index, value) {
    event.preventDefault();
    const { WizardStore } = this.props.stores;

    WizardStore.setTournamentProperty('grade', value);
    this.forceUpdate();
  }

  handleCategoryChange(event, index, tournamentCategories) {
    this.setState({ tournamentCategories });
    const { WizardStore } = this.props.stores;
    WizardStore.setTournamentCategories(tournamentCategories);
  }

  // eslint-disable-next-line
  menuItems(names, values) {
    return names.map(name => (
      <MenuItem
        key={name}
        insetChildren={true}
        checked={values && values.indexOf(name) > -1}
        value={name}
        primaryText={name}
      />
    ));
  }

  render() {
    const { WizardStore } = this.props.stores;

    const tournament = mobx.toJS(WizardStore.tournament);

    const organizations = WizardStore.organizations
      ? mobx.toJS(WizardStore.organizations)
      : false;

    const rankingLists = WizardStore.rankingLists
      ? mobx.toJS(WizardStore.rankingLists)
      : false;

    const categories = WizardStore.rankingListCategories
      ? mobx.toJS(WizardStore.rankingListCategories)
      : false;

    const { tournamentCategories } = this.state;

    const grades = WizardStore.grades ? mobx.toJS(WizardStore.grades) : false;

    return (
      <div>
        <Checkbox
          checked={tournament.is_ranked}
          label={'Ranked Tournament'}
          onCheck={event => this.handleIsRankedChange(event)}
        />

        {tournament.is_ranked ? (
          <div>
            <SelectField
              value={tournament.organization}
              onChange={(event, index, value) =>
                this.handleOrganizationChange(event, index, value)
              }
              floatingLabelText="Organization"
            >
              {organizations ? (
                organizations.map(organization => (
                  <MenuItem
                    key={organization.id}
                    value={organization.id}
                    primaryText={organization.name}
                  />
                ))
              ) : (
                <MenuItem value={1} primaryText={'Loading...'} />
              )}
            </SelectField>
            {tournament.organization ? (
              <div>
                <SelectField
                  value={tournament.ranking_list}
                  onChange={(event, index, value) =>
                    this.handleRankingListChange(event, index, value)
                  }
                  floatingLabelText="Ranking List"
                >
                  {rankingLists ? (
                    rankingLists.map(rankingList => (
                      <MenuItem
                        key={rankingList.id}
                        value={rankingList.id}
                        primaryText={rankingList.name}
                      />
                    ))
                  ) : (
                    <MenuItem value={1} primaryText={'Loading...'} />
                  )}
                </SelectField>

                {tournament.ranking_list ? (
                  <div>
                    <SelectField
                      value={tournament.grade}
                      onChange={(event, index, value) =>
                        this.handleGradeChange(event, index, value)
                      }
                      floatingLabelText="Grade"
                    >
                      {grades ? (
                        grades.map((grade, index) => (
                          <MenuItem
                            key={index + 1}
                            value={index + 1}
                            primaryText={grade}
                          />
                        ))
                      ) : (
                        <MenuItem value={1} primaryText={'Loading...'} />
                      )}
                    </SelectField>

                    <SelectField
                      multiple={true}
                      hintText="Categories"
                      value={tournamentCategories}
                      onChange={this.handleCategoryChange}
                      floatingLabelText="Categories"
                    >
                      {categories ? (
                        this.menuItems(categories, tournamentCategories)
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
                  </div>
                ) : (
                  false
                )}
              </div>
            ) : (
              false
            )}
          </div>
        ) : (
          false
        )}
      </div>
    );
  }
}

export default SecondStep;
