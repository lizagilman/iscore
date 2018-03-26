import React, { PropTypes } from 'react';

const LimorComponent = props =>

    <div>
        <h1>{props.name}</h1>
        <a onClick={props.addLiza}>Add Liza</a>
    </div>;

LimorComponent.propTypes = {
    name: PropTypes.string.isRequired,
    addLiza: PropTypes.func.isRequired,
};

export default LimorComponent;
