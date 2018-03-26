import React, { PropTypes } from 'react';

const createLi = function (project, index, props){
    return (
        <li onClick={props.click.bind(this)} key={"dev"+index}><a value={""+project.id}>{project.name}</a></li>
    );
};


const ProjectsFilterComponent = props => {
    return (
    <div className="col-md-12 dropdown">
        <a className="btn btn-simple dropdown-toggle" data-toggle="dropdown">פרוייקט
            <b className="caret"></b>
        </a>
        <ul className="col-md-12 dropdown-menu">
            {props.projects.map((project, index )=> (createLi(project, index, props)))}
        </ul>
    </div>
    )
}

export default ProjectsFilterComponent;

/**
 * Created by DEV on 19/09/2016.
 */
