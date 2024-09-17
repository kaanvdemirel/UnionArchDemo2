import React, { Component } from 'react';
import { Table, Button } from 'reactstrap';
import ModalForm from '../Modals/Modal';
import { deleteProduct } from '../../api/product';

class DataTable extends Component {
    deleteItem = async (id) => {
        const confirmDelete = window.confirm('Delete item forever?');
        if (confirmDelete) {
            try {
                await deleteProduct(id);
                this.props.deleteItemFromState(id);
            } catch (error) {
                console.error('Error deleting product:', error);
            }
        }
    };

    render() {
        const items = this.props.items.map(item => (
            <tr key={item.productId}>
                <th scope="row">{item.productId}</th>
                <td>{item.productName}</td>
                <td>{item.unitPrice}</td>
                <td>{item.unitsInStock}</td>
                <td>
                    <ModalForm
                        buttonLabel="Edit"
                        item={item}
                        updateState={this.props.updateState}
                        addItemToState={this.props.addItemToState}
                    />
                    {' '}
                    <Button color="danger" onClick={() => this.deleteItem(item.productId)}>Del</Button>
                </td>
            </tr>
        ));

        return (
            <Table responsive hover>
                <thead>
                    <tr>
                        <th>ID</th>
                        <th>Name</th>
                        <th>Price</th>
                        <th>Stock</th>
                        <th>Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {items}
                </tbody>
            </Table>
        );
    }
}

export default DataTable;
