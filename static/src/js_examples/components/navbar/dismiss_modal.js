import React, {Component, prototype } from 'react';
import { observer } from 'mobx-react';

@observer
class DismissModal extends Component {
    constructor(props){
        super(props);
        this.state = {userShowedModal: false};
    }

    componentDidMount() {
        let component = this;
        $('#work_button').on('shown.bs.modal', function () {
            component.setState({userShowedModal: true});
            component.props.WorkDayStore.userClickedSaveWorkDay = false;
        });


        $('#work_button').on('hidden.bs.modal', function (e) {
            if (component.state.userShowedModal){
                $('#unicorn').click();
                $('.modal-backdrop').remove();
                component.setState({userShowedModal: false})
            }
        });
    }

    render(){
        return (
            <div></div>
        )
    }
}

export default DismissModal;