import React from 'react';
import { Button, Form, FormGroup, Label, Input } from 'reactstrap';
import { addProduct, updateProduct } from '../../api/product';

class AddEditForm extends React.Component {
    state = {
        productId: 0,
        productName: '',
        unitPrice: 0,
        unitsInStock: 0,
    };

    componentDidMount() {
        if (this.props.item) {
            const { productId, productName, unitPrice, unitsInStock } = this.props.item;
            this.setState({ productId, productName, unitPrice, unitsInStock });
        }
    }

    onChange = (e) => {
        this.setState({ [e.target.name]: e.target.value });
    };

    submitForm = async (e) => {
        e.preventDefault();
        const { productId, productName, unitPrice, unitsInStock } = this.state;
        const product = { productId, productName, unitPrice, unitsInStock };

        try {
            if (productId === 0) {
                const newProduct = await addProduct(product);
                this.props.addItemToState(newProduct);
            } else {
                const updatedProduct = await updateProduct(product);
                this.props.updateState(updatedProduct);
            }
            this.props.toggle();
        } catch (error) {
            console.error('Error submitting form:', error);
        }
    };

    render() {
        return (
            <Form onSubmit={this.submitForm}>
                <FormGroup>
                    <Label for="productName">Product Name</Label>
                    <Input
                        type="text"
                        name="productName"
                        id="productName"
                        onChange={this.onChange}
                        value={this.state.productName || ''}
                    />
                </FormGroup>
                <FormGroup>
                    <Label for="unitPrice">Unit Price</Label>
                    <Input
                        type="number"
                        name="unitPrice"
                        id="unitPrice"
                        onChange={this.onChange}
                        value={this.state.unitPrice || ''}
                    />
                </FormGroup>
                <FormGroup>
                    <Label for="unitsInStock">Units in Stock</Label>
                    <Input
                        type="number"
                        name="unitsInStock"
                        id="unitsInStock"
                        onChange={this.onChange}
                        value={this.state.unitsInStock || ''}
                    />
                </FormGroup>
                <Button color="primary" type="submit">Submit</Button>
            </Form>
        );
    }
}

export default AddEditForm;
