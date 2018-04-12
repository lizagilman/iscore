import React from 'react';
import { inject, observer } from 'mobx-react';

@inject('stores')
@observer
export default class Wizard extends React.Component {
  constructor(props) {
    super(props);
  }

  componentWillMount() {}

  render() {
    return <div>wizard</div>;
  }
}
