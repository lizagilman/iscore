import React, {Component } from 'react';
import { observer } from 'mobx-react';
import ToDoListComponent from './todo_list_component';
import {addToDo, updateTodo} from '../../../utils/api';

@observer
class ToDoList extends Component{
    constructor(props){
        super(props);
        this.createTodos = this.createTodos.bind(this);
        this.add_todo = this.add_todo.bind(this);
        this.changeToDoStatus = this.changeToDoStatus.bind(this);
        this.deleteTodo = this.deleteTodo.bind(this);
        this.todo_id =null
    }


    createTodos(todo, index){
        return(
            <ul id="menu" key = {todo.to_do_task +index}>
                <li>
                    <button type="button" rel="tooltip" title="מחיקה" className="btn btn-success btn-simple btn-xs" onClick= {()=>this.deleteTodo(todo)}>
                        <i className="fa fa-trash-o"></i>
                    </button>
                </li>
                <li className={todo.is_done ? "pointer complete" : 'pointer'} onClick = {()=>this.changeToDoStatus(todo)}>
                    {todo.to_do_task}
                </li>
            </ul>)
    }

    changeToDoStatus(todo){
        todo.is_done = Boolean(!todo.is_done);
        this.forceUpdate();
        updateTodo({id:todo.id, action:"update", is_done:todo.is_done})
    }


    add_todo(todo){
        addToDo({to_do_task: todo, is_done:false, project_id: this.props.projectID}).then((response)=>{this.props.todos_list.push({to_do_task: todo, is_done:false, id:response, project_id: this.props.projectID})})}


    deleteTodo(todo){
        updateTodo({todo_id:todo.id, action:"delete"});
        this.props.project.todos = this.props.project.todos.filter((item)=> item.id != todo.id);
        this.forceUpdate();
    }

    render(){
        return <ToDoListComponent add_todo={this.add_todo}
                                  createTodos={this.createTodos}
                                  todos_list={this.props.todos_list}
                                  index={this.props.index} />
    }
}

export default ToDoList;
