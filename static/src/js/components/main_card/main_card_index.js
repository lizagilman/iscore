import React from 'react';
import PropTypes from 'prop-types';
import { Card, CardTitle, CardText } from 'material-ui/Card';

class MainCard extends React.Component {
  render() {
    return (
      <div style={this.props.style}>
        <Card style={{ backgroundColor: '#ffffff' }}>
          <CardTitle title={this.props.title} />
          <CardText>
            {this.props.content}
          </CardText>
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
};
