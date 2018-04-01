import React from "react";
import AppBar from "material-ui/AppBar";
import FlatButton from "material-ui/FlatButton";
import { Card, CardTitle, CardText } from "material-ui/Card";
import LeftMenu from "../home/left_menu/left_menu_index";

class Home extends React.Component {
  render() {
    return (
      <div>
        <AppBar title={"ISCORE"} zDepth={2} showMenuIconButton={false}>
          <div>
            <FlatButton label={"link1"} />
            <FlatButton label={"link2"} />
            <FlatButton label={"link3"} />
          </div>
        </AppBar>
        <LeftMenu style={{ padding: "2em" }} />
        <div style={{ flex: 1, padding: "2em" }}>
          <Card style={{ backgroundColor: "#ffffff" }}>
            <CardTitle title={"Card title"} />
            <CardText>
              Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec
              mattis pretium massa. Aliquam erat volutpat. Nulla facilisi. Donec
              vulputate interdum sollicitudin. Nunc lacinia auctor quam sed
              pellentesque. Aliquam dui mauris, mattis quis lacus id,
              pellentesque lobortis odio.
            </CardText>
          </Card>
        </div>
      </div>
    );
  }
}

export default Home;
