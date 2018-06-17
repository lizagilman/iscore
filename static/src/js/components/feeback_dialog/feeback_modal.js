import React from 'react';
import Dialog from 'material-ui/Dialog';
import FlatButton from 'material-ui/FlatButton';
import Spinner from '../spinner/spinner';

export default class FeedBack extends React.Component {
  render() {
    const actions = [
      <FlatButton
        label="Close"
        primary={true}
        onClick={e => this.props.handleClose(e)}
      />,
    ];

    return (
      <div>
        <Dialog title="" actions={actions} modal={true} open={true}>
          {this.props.text ? this.props.text : Spinner(50)}
        </Dialog>
      </div>
    );
  }
}
