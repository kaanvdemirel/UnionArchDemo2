import React, { Component } from 'react';
import { Table, Button } from 'reactstrap';
import ModalForm from '../Modals/Modal'; // ModalForm bile�enini import ettik
import { fetchProducts, deleteProduct } from '../../api/product'; // API fonksiyonlar�n� import ettik

class ProductList extends Component {
    constructor(props) {
        super(props);
        this.state = {
            products: []
        };
    }

    componentDidMount() {
        this.loadProducts();
    }

    loadProducts = () => {
        fetchProducts()
            .then(data => {
                this.setState({ products: data });
            })
            .catch(err => console.error(err));
    };

    handleDelete = (id) => {
        const confirmDelete = window.confirm('Are you sure you want to delete this product?');
        if (confirmDelete) {
            deleteProduct(id)
                .then(() => {
                    this.loadProducts(); // G�ncel �r�n listesini y�kle
                })
                .catch(err => console.error(err));
        }
    };

    render() {
        const { products } = this.state;

        return (
            <Table responsive hover>
                <thead>
                    <tr>
                        <th>ID</th>
                        <th>Name</th>
                        <th>Price</th>
                        <th>Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {products.map(product => (
                        <tr key={product.id}>
                            <th scope="row">{product.id}</th>
                            <td>{product.name}</td>
                            <td>{product.price}</td>
                            <td>
                                <div style={{ width: '110px' }}>
                                    <ModalForm buttonLabel="Edit" item={product} updateState={this.props.upda
