import React, { Component } from 'react';
import { Button, Modal, ModalHeader, ModalBody } from 'reactstrap';
import AddEditForm from '../Forms/FormAddEdit'; 

class ModalForm extends Component {
    state = {
        modal: false,
    };

    toggle = () => {
        this.setState(prevState => ({
            modal: !prevState.modal
        }));
    };

    render() {
        const closeBtn = <button className="close" onClick={this.toggle}>&times;</button>;
        const label = this.props.buttonLabel;
        const title = label === 'Edit' ? 'Edit Item' : 'Add New Item';

        return (
            <div>
                <Button
                    color={label === 'Edit' ? 'warning' : 'success'}
                    onClick={this.toggle}
                    style={{ float: 'left', marginRight: '10px' }}
                >
                    {label}
                </Button>
                <Modal isOpen={this.state.modal} toggle={this.toggle}>
                    <ModalHeader toggle={this.toggle} close={closeBtn}>{title}</ModalHeader>
                    <ModalBody>
                        <AddEditForm
                            addItemToState={this.props.addItemToState}
                            updateState={this.props.updateState}
                            toggle={this.toggle}
                            item={this.props.item}
                        />
                    </ModalBody>
                </Modal>
            </div>
        );
    }
}

export default ModalForm;
