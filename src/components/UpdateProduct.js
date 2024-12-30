// src/components/UpdateProduct.js
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate, useParams } from 'react-router-dom';

const UpdateProduct = () => {
    const { id } = useParams();
    const navigate = useNavigate();

    const [name, setName] = useState('');
    const [price, setPrice] = useState('');
    const [stock, setStock] = useState('');
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        axios.get(`http://localhost:3000/api/products/${id}`)
            .then(response => {
                const product = response.data;
                setName(product.name);
                setPrice(product.price);
                setStock(product.stock);
                setLoading(false);
            })
            .catch(() => {
                setError('Produk tidak ditemukan');
                setLoading(false);
            });
    }, [id]);

    const handleSubmit = (e) => {
        e.preventDefault();

        const updatedProduct = { name, price: parseFloat(price), stock: parseInt(stock) };

        axios.put(`http://localhost:3000/api/products/${id}`, updatedProduct, {
            headers: {
                'Content-Type': 'application/json'
            }
        })
            .then(() => {
                navigate('/');
            })
            .catch(() => {
                setError('Gagal memperbarui produk');
            });
    };

    if (loading) return <p>Loading...</p>;
    if (error) return <p>{error}</p>;

    return (
        <div>
            <h2>Update Produk</h2>
            <form onSubmit={handleSubmit}>
                <div>
                    <label>Nama:</label>
                    <input
                        type="text"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        required
                    />
                </div>
                <div>
                    <label>Harga:</label>
                    <input
                        type="number"
                        step="0.01"
                        value={price}
                        onChange={(e) => setPrice(e.target.value)}
                        required
                    />
                </div>
                <div>
                    <label>Stok:</label>
                    <input
                        type="number"
                        value={stock}
                        onChange={(e) => setStock(e.target.value)}
                        required
                    />
                </div>
                <button type="submit">Update Produk</button>
            </form>
        </div>
    );
};

export default UpdateProduct;