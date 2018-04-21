/* eslint-disable */
import React from "react";
import TextField from "material-ui/TextField";
import SelectField from "material-ui/SelectField";
import MenuItem from "material-ui/MenuItem";
import Checkbox from "material-ui/Checkbox";
import Subheader from "material-ui/Subheader";
import FlatButton from "material-ui/FlatButton";
const styles = {
  block: {
    maxWidth: 250
  },
  checkbox: {
    marginBottom: 16
  }
};
export default class Settings extends React.Component {
  // eslint-disable-next-line
  render() {
    return (
      <div>
        <TextField
          defaultValue={item.organization}
          floatingLabelText="Organization"
          fullWidth={true}
        />
        <TextField
          defaultValue={item.ranking_list}
          floatingLabelText="Ranking List"
          fullWidth={true}
        />
        <Subheader>Categories</Subheader>
        <div style={{ display: "inline-block" }}>
          <Checkbox
            label="Woman"
            //checked={this.state.checked}
            //onCheck={this.updateCheck.bind(this)}
            style={styles.checkbox}
          />
          <Checkbox
            label="Man"
            //checked={this.state.checked}
            //onCheck={this.updateCheck.bind(this)}
            style={styles.checkbox}
          />
          <Checkbox
            label="Girls"
            //checked={this.state.checked}
            //onCheck={this.updateCheck.bind(this)}
            style={styles.checkbox}
          />
          <Checkbox
            label="Boys"
            //checked={this.state.checked}
            //onCheck={this.updateCheck.bind(this)}
            style={styles.checkbox}
          />
        </div>
        <SelectField floatingLabelText="Grade" value={1} fullWidth={true}>
          <MenuItem value={1} primaryText="Boys" />
          <MenuItem value={2} primaryText="Girls" />
          <MenuItem value={3} primaryText="Woman" />
          <MenuItem value={3} primaryText="Man" />
        </SelectField>

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

        <div style={{ display: "inline-block", width: "100%" }}>
          <FlatButton label="CANCEL" />
          <FlatButton label="SAVE" style={{ color: "green" }} />
        </div>
      </div>
    );
  }
}
