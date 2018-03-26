import React, { PropTypes } from 'react';

const create_li = function(developer,index,props){
    return(
        <li id={`developer_filter_${developer.id}`} onClick= {props.click} key={`developer_filter_${developer.id}`}><a>{developer.name}</a></li>
    );
}

;
const DeveloperFilterComponent = props => {
    return (
    <div className="col-md-12 dropdown">
        <a className="btn btn-simple dropdown-toggle" data-toggle="dropdown">מתכנת
            <b className="caret"></b>
        </a>
        <ul className="col-md-12 dropdown-menu">
            {props.developers1.map(function(developer, index){return (create_li(developer,index,props))})}
        </ul>


    </div>
    )
}

export default DeveloperFilterComponent;

