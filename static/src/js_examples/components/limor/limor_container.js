import React, { Component } from 'react';
import { observer } from 'mobx-react';
import LimorComponent from './limor_component';

@observer
class Limor extends Component {
    constructor(props) {
        super(props);
        this.addLiza = this.addLiza.bind(this);
    }

    addLiza() {
        this.props.LizaStore.numOfLizot++;
    }

    render() {
        return (
            <LimorComponent name={'limor'} addLiza={this.addLiza} />
        );
    }
}

export default Limor;
