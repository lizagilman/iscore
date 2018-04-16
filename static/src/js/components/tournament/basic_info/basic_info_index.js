import React from 'react';
import TextField from 'material-ui/TextField';
import SelectField from 'material-ui/SelectField';
import MenuItem from 'material-ui/MenuItem';
import Checkbox from 'material-ui/Checkbox';
import Subheader from 'material-ui/Subheader';
import FlatButton from 'material-ui/FlatButton';
const styles = {
  block: {
    maxWidth: 250,
  },
  checkbox: {
    marginBottom: 16,
  },
};
export default class BasicInfo extends React.Component {
  // eslint-disable-next-line
  render() {
    const paperStyle = {
      height: 100,
      width: 100,
      margin: '20px 20px 20px 0',
      textAlign: 'center',
      display: 'inline-block',
    };

    return (
      <div>
        <TextField
          defaultValue="ATP"
          floatingLabelText="Organization"
          fullWidth={true}
        />
        <TextField
          defaultValue="ATP"
          floatingLabelText="Ranking"
          fullWidth={true}
        />
          <Subheader>Categories</Subheader>
          <div style={{display:"inline-block"}}>
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
          <SelectField
          floatingLabelText="Grade"
          value={1}
          fullWidth={true}
        >
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
          <MenuItem value={1} primaryText="Boys" />
          <MenuItem value={2} primaryText="Girls" />
          <MenuItem value={3} primaryText="Woman" />
            <MenuItem value={4} primaryText="Man" />
        </SelectField>

          <SelectField
          floatingLabelText="Money Distribution Method"
          value={1}
          fullWidth={true}
        >
          <MenuItem value={1} primaryText="Boys" />
          <MenuItem value={2} primaryText="Girls" />
          <MenuItem value={3} primaryText="Woman" />
            <MenuItem value={4} primaryText="Man" />
        </SelectField>
        <div style={{display:"inline-block", width:"100%"}}>
            <FlatButton label="CANCEL" />
            <FlatButton label="SAVE" style={{color:"green"}}/>
        </div>
      </div>
    );
  }
}
