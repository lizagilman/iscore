import React, {Component, prototype } from 'react';
import { observer } from 'mobx-react';
import { clipboardClass } from '../../utils/clipboard';

@observer
class PrintScreenComponent extends Component {
    constructor(props){
        super(props);
        this.instance;
    }

    componentDidMount() {
        //new clipboardClass("my_canvas", true, this.props.task, this.props.destroy);
        new clipboardClass("my_canvas", true, this.props.task, this.props.destroy);

    }

    componentWillUnmount(){

    }

    //TO-DO: try to put this in iframe to fix ctrl-v bug


    render(){
        return (
            <div>
                נא להעתיק צילום מסך - ע"י לחיצה על כפתור Pritn Screen במקלדת/ Ctrl+C / העתק, ולהדביק בעמוד זה - ע"י לחיצה על Ctrl+V/ הדבק.<canvas id="my_canvas" width="0" height="0"></canvas>
            </div>
        )
    }
}

export default PrintScreenComponent;