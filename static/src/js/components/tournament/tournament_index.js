import React from "react";
import MainCard from "../main_card/main_card_index";
import LeftMenu from "./left_menu/left_menu_index";

class Tournament extends React.Component {
  render() {
    return (
      <div>
        <LeftMenu zDepth={0} />
        <MainCard
          title={"2 Tournament"}
          content={"2 Hi content tournament"}
          style={{ flex: 1, margin: "1vw 2vw 0 15vw" }}
        />
      </div>
    );
  }
}

export default Tournament;
