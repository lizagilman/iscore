
import React, { PropTypes } from 'react';

const StatusFilterComponent = props =>
<div  className="col-md-12 dropdown">

	<a className="btn btn-simple dropdown-toggle" data-toggle="dropdown">סטטוס
    	<b className="caret"></b>
	</a>
	<ul  className="col-md-12 dropdown-menu">
		<li value="bbdika" onClick= {props.click.bind(this)}><a href="#">חדש</a></li>
		<li value="btipul" onClick= {props.click.bind(this)}><a href="#">בפיתוח</a></li>
		<li value="tupal" onClick= {props.click.bind(this)}><a href="#">הסתיים</a></li>
	</ul>
</div>

export default StatusFilterComponent;

