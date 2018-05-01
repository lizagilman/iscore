import React from 'react';
import PropTypes from 'prop-types';
import { Card, CardTitle, CardText, CardActions } from 'material-ui/Card';
import FlatButton from 'material-ui/FlatButton';

class MainCard extends React.Component {
  render() {
    return (
      <div style={this.props.style} id={'mainCard'}>
        <Card style={{ backgroundColor: '#ffffff' }}>
          <CardTitle title={this.props.title} />
          <CardText>{this.props.content}</CardText>
          {this.props.content.props.isForm ? (
            <CardActions>
              <FlatButton label={'SAVE'} /> <FlatButton label={'CANCEL'} />
            </CardActions>
          ) : (
            false
          )}
        </Card>
      </div>
    );
  }
}

export default MainCard;

MainCard.propTypes = {
  title: PropTypes.string,
  style: PropTypes.object,
  content: PropTypes.node,
  isForm: PropTypes.bool,
};
