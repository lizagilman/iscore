import React, { PropTypes, Component } from 'react';
import { observer } from 'mobx-react';
import LizaComponent from './liza_component';

@observer
class Liza extends Component {

    constructor(props) {
        super(props);
        this.numberOfLizot = 0;
    }

    componentWillMount() {
        this.numberOfLizot = Number(this.props.params.id);
    }

    render() {
        return (
            <div>
                <LizaComponent
                    name={'liza'}
                    numberOfLizot={this.numberOfLizot}
                />
            </div>
        );
    }
}


Liza.propTypes = {
    params: PropTypes.object,
};

export default Liza;
