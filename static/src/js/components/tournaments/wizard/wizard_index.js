import React from 'react';
import * as mobx from 'mobx';
import { inject, observer } from 'mobx-react';
import { Step, Stepper, StepButton } from 'material-ui/Stepper';
import RaisedButton from 'material-ui/RaisedButton';
import FlatButton from 'material-ui/FlatButton';
import FirstStep from './first_step';
import SecondStep from './second_step';

@inject('stores')
@observer
export default class Wizard extends React.Component {
  constructor(props) {
    super(props);
    this.handleNext = this.handleNext.bind(this);
    this.handlePrev = this.handlePrev.bind(this);
    this.getStepContent = this.getStepContent.bind(this);

    this.state = {
      stepIndex: 0,
      tournament: { field_of_sport: null, is_ranked: false },
      organization: 'test',
    };
  }

  handleNext = () => {
    const { stepIndex } = this.state;
    if (stepIndex < 2) {
      this.setState({ stepIndex: stepIndex + 1 });
    }
  };

  handlePrev = () => {
    const { stepIndex } = this.state;
    if (stepIndex > 0) {
      this.setState({ stepIndex: stepIndex - 1 });
    }
  };

  // eslint-disable-next-line
  getStepContent(stepIndex) {
    const basicInfoStep = <FirstStep />;

    const categoriesStep = <SecondStep />;

    const settingsStep = <div>settings</div>;

    switch (stepIndex) {
      case 0:
        return basicInfoStep;
      case 1:
        return categoriesStep;
      case 2:
        return settingsStep;
      default:
        return basicInfoStep;
    }
  }

  render() {
    const { WizardStore } = this.props.stores;
    const tournament = WizardStore ? mobx.toJS(WizardStore.tournament) : false;
    const { stepIndex } = this.state;
    const contentStyle = { margin: '0 16px' };

    return (
      <div style={{ width: '100%', maxWidth: 700, margin: 'auto' }}>
        <Stepper linear={false} activeStep={stepIndex}>
          <Step>
            <StepButton onClick={() => this.setState({ stepIndex: 0 })}>
              Basic Info
            </StepButton>
          </Step>
          <Step>
            <StepButton onClick={() => this.setState({ stepIndex: 1 })}>
              Categories
            </StepButton>
          </Step>
          <Step>
            <StepButton onClick={() => this.setState({ stepIndex: 2 })}>
              Additional Settings
            </StepButton>
          </Step>
        </Stepper>

        <div style={contentStyle}>
          <p>{this.getStepContent(stepIndex, tournament)}</p>
          <div style={{ marginTop: 12 }}>
            <FlatButton
              label="Back"
              disabled={stepIndex === 0}
              onClick={this.handlePrev}
              style={{ marginRight: 12 }}
            />
            <RaisedButton
              label="Next"
              disabled={stepIndex === 2}
              primary={true}
              onClick={this.handleNext}
            />
          </div>
        </div>
      </div>
    );
  }
}
