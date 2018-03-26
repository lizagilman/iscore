import React, { PropTypes } from 'react';

const LizaComponent = props =>

    <div>
        <h1>{props.name} {props.numberOfLizot}</h1>
    </div>;

LizaComponent.propTypes = {
    name: PropTypes.string.isRequired,
    numberOfLizot: PropTypes.number.isRequired,
};

export default LizaComponent;
