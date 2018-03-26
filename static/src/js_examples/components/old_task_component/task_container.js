import React, {Component } from 'react';
import TaskComponent from './task_component';
import { getTaskByIdApi } from '../../utils/api';

class Task extends Component {

    constructor(props) {
        super(props);
        this.id;
        this.state = {
            task:false
        };
        this.saveValue = this.saveValue.bind(this);
    }


    componentWillMount() {
        this.id = Number(this.props.params.id);
        getTaskByIdApi(this.id).then(json => {
            this.setState({task: json});
        });
    }


    componentDidMount() {

    }

    componentDidUpdate() {
        console.log(this.state.task);
    }

    saveValue(event){
        let currentTaskObject = this.state.task;
        currentTaskObject[event.target.id] = event.target.value;
        let newTaskObject = currentTaskObject;
        this.setState({task: newTaskObject});
    }

    render() {
        return (
            <div>
                {
                    this.state.task ?
                        <TaskComponent task={this.state.task} taskId={this.id} saveValue={this.saveValue} />
                        :
                        false
                }
            </div>
        );
    }
}

/*
 Liza.propTypes = {
 params: PropTypes.object,
 };
 */

export default Task;
