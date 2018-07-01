import React from 'react';
import Checkbox from 'material-ui/Checkbox';
import styled from 'styled-components';
import CheckCircle from 'material-ui/svg-icons/action/check-circle';
import Done from 'material-ui/svg-icons/action/done';

const styles = {
  checkbox: {
    height: '1.1em',
    width: '1.1em',
    marginTop: '-17px',
  },
  checkboxDiv: {
    margin: '0',
    paddingTop: '.5em',
    color: '#555',
    position: 'relative',
    height: '1.5em',
    background: '#fff',
    borderRadius: '2px',
    boxShadow: '0 1px 2px 0 rgba(0, 0, 0, 0.2)',
    webkitTapHighlightColor: 'rgba(0, 0, 0, 0)',
    fontSize: '4em',
    marginBottom: '16',
  },
};
const Row = styled.div`
  &::after {
    content: "";
    clear: both;
    display: table;
  }
`;
const Column = styled.div`
  float: left;
  width: 100%;
  @media only screen and (min-width: 768px) {
    width: ${props => (props.span ? props.span / 12 * 100 : '8.33')}%;
  }
`;
export default class MyChackbox extends React.Component {
  constructor(props) {
    super(props);

    this.updateCheck = this.updateCheck.bind(this);
    this.toggleChecked = this.toggleChecked.bind(this);

    this.changed = this.props.changed;

    this.state = {
      checked: false,
      value: this.props.value,
      submit: this.props.submit,
    };
  }

  toggleChecked() {
    this.setState(oldState => ({
      checked: !oldState.checked,
    }));
  }
  uncheck() {
    this.setState({ checked: false });
  }
  updateCheck(evt, isChecked) {
    console.log(`update check player id${this.state.value}`);

    if (this.changed) {
      this.changed({
        isChecked,
        playerId: this.state.value,
      });
    }
    this.toggleChecked();
  }
  render() {
    return (
      <li>
        <Row>
          <Column span="12">
            <div style={styles.checkboxDiv}>
              <Checkbox
                checkedIcon={<CheckCircle />}
                uncheckedIcon={<Done />}
                iconStyle={styles.checkbox}
                label={this.props.label}
                checked={this.props.uncheck ? false : this.state.checked}
                value={this.state.value}
                onCheck={(e, i) => this.updateCheck(e, i)}
              />
            </div>
          </Column>
        </Row>
      </li>
    );
  }
}
