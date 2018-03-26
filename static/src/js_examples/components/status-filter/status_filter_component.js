
import React, { PropTypes } from 'react';

const create_li = function(status, index, props)  {
	return (
		<li onClick= {props.click.bind(this)} key = {"status_filter"+index}><a href="#">{status}</a></li>
	);
};

const StatusFilterComponent = props =>
		<div  className="col-md-12 dropdown">

			<a href="#" className="btn btn-simple dropdown-toggle" data-toggle="dropdown">סטטוס
				<b className="caret"></b>
			</a>
			<ul  className="col-md-12 dropdown-menu">
				{props.statusim ? props.statusim.map(function(status, index){return (create_li(status,index,props))}) : false}
			</ul>
		</div>



export default StatusFilterComponent;

