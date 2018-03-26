import React, { PropTypes } from 'react';
import { observer } from 'mobx-react';




const ToDoListComponent = observer(props=>

    <div className="modal fade" id= {"todo_list" + props.index}  tabIndex="-1" role="dialog" aria-labelledby="myModalLabel" aria-hidden="true"><div className="modal-dialog">
            <div className="modal-content">
                <div className="modal-header">
                    <button type="button" className="close" data-dismiss="modal" aria-hidden="true">&times;</button>
                    <h3 className="modal-title text-muted" id="myModalLabel">רשימת משימות</h3>
                </div>
                <div className="modal-body">
                    <label className="active formLabel">: משימה חדשה</label>
                        <input id ="todo_input" type="text" className="form-control" onKeyPress = {(event)=> {if(event.charCode ==13){props.add_todo(event.target.value); event.target.value = ''; }}} />
                    <div className="form-group">
                        {props.todos_list.map(props.createTodos)}
                    </div>
                </div>
            </div>
        </div>
    </div>)

export default ToDoListComponent