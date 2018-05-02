import React from "react";
import Checkbox from "material-ui/Checkbox";
import styled from "styled-components";

const styles = {
  checkboxDiv: {
    margin: "0",
    paddingTop: ".5em",
    color: "#555",
    position: "relative",
    height: "1.5em",
    background: "#fff",
    borderRadius: "2px",
    boxShadow: "0 1px 2px 0 rgba(0, 0, 0, 0.2)",
    webkitTapHighlightColor: "rgba(0, 0, 0, 0)",
    fontSize: "4em",
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
    width: ${props => (props.span ? props.span / 12 * 100 : "8.33")}%;
  }
`;
export default class MyChackbox extends React.Component {
  constructor(props) {
    super(props);

    this.updateCheck = this.updateCheck.bind(this);

    this.changed=this.props.changed;

    this.state = {
      checked: false,
      value: this.props.value,
      submit: this.props.submit,
    };
  }

   updateSubmit() {
    this.setState(oldState => {
      return {
        submit: !oldState.submit
      };
    },() => {
        this.state.submit === true
      ? console.log('player id :',this.state.value):false;
       });
  }
  updateCheck(evt,isChecked) {

    console.log('update check player id'+this.state.value);

    if(this.changed){
        this.changed(
            {
                isChecked:isChecked,
                playerId:this.state.value
            });
    }

    this.setState(oldState => {
      return {
        checked: !oldState.checked
      };
    });
  }
  render() {
    return (
      <li>
        <Row>
          <Column span="12">
            <div style={styles.checkboxDiv}>
              <Checkbox
                label={this.props.label}
                checked={this.state.checked}
                value={this.state.value}
                onCheck={(e,i) => this.updateCheck(e,i)}
                style={this.props.style}
              />
            </div>
          </Column>
        </Row>
      </li>
    );
  }
}
