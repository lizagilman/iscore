import React from 'react';
import AppBar from 'material-ui/AppBar';

const SelectStyle = {
  height: '10em',
};
const titleStyle = {
  marginTop: '1em',
  fontSize: '3em',
};


const OrgHeader = props => <AppBar showMenuIconButton={false} titleStyle={titleStyle} style={SelectStyle} title={`Welcome ${props.first_name} ${props.last_name}`} />;

export default OrgHeader;
