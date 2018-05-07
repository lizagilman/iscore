import React from "react";
import TextField from "material-ui/TextField";
import SelectField from "material-ui/SelectField";
import MenuItem from "material-ui/MenuItem";
import DatePicker from "material-ui/DatePicker";
import Paper from "material-ui/Paper";
import Backup from "material-ui/svg-icons/action/backup";
import Toggle from "material-ui/Toggle";
import { inject, observer } from "mobx-react/index";
var moment = require("moment");

const mobx = require("mobx");

@inject("stores")
@observer
export default class BasicInfo extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    const tournament = mobx.toJS(this.props.stores.TournamentStore.tournament)
      ? mobx.toJS(this.props.stores.TournamentStore.tournament)
      : " ";

    const paperStyle = {
      height: 100,
      width: 100,
      margin: "20px 20px 20px 0",
      textAlign: "center",
      display: "inline-block"
    };

    return (
      <div>
        <TextField
          defaultValue={tournament ? tournament.name : ""}
          floatingLabelText="Tournament Name"
          fullWidth={true}
        />

        <SelectField
          floatingLabelText="Field of Sport"
          value={1}
          fullWidth={true}
        >
          <MenuItem
            value={1}
            primaryText={tournament ? tournament.field_of_sport : ""}
          />
          <MenuItem value={2} primaryText="Judo" />
          <MenuItem value={3} primaryText="Badminton" />
        </SelectField>

        <TextField
          defaultValue={tournament ? tournament.address : ""}
          floatingLabelText="Venue Address"
          fullWidth={true}
        />

        <DatePicker
          floatingLabelText="Start Date"
          defaultDate={tournament ? new Date(tournament.start_date) : ""}
          container="inline"
          className={"formField"}
        />

        <DatePicker
          floatingLabelText="End Date"
          defaultDate={tournament ? new Date(tournament.end_date) : ""}
          container="inline"
          className={"formField"}
        />
        <DatePicker
          floatingLabelText="Registration Begin Date"
          defaultDate={
            tournament ? new Date(tournament.registration_start_date) : ""
          }
          container="inline"
          className={"formField"}
        />
        <DatePicker
          floatingLabelText="Registration Deadline"
          defaultDate={
            tournament ? new Date(tournament.registration_end_date) : ""
          }
          container="inline"
          className={"formField"}
        />

        <Paper zDepth={1} style={paperStyle} className={"formField"}>
          <Backup />
          <div>Upload invitation file</div>
        </Paper>

        <Toggle
          defaultToggled={true}
          label={"Publish Tournament?"}
          labelPosition={"right"}
          className={"formField"}
        />
      </div>
    );
  }
}
