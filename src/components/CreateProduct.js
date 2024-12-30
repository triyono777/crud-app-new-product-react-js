// src/components/CreateProduct.js
import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const CreateProduct = () => {
    const [name, setName] = useState('');
    const [price, setPrice] = useState('');
    const [stock, setStock] = useState('');
    const [error, setError] = useState(null);
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();

        const newProduct = {
            name,
            price: parseFloat(price),
            stock: parseInt(stock)
        };

        try {
            const response = await axios.post('http://localhost:3000/api/products', newProduct, {
                headers: {
                    'Content-Type': 'application/json'
                }
            });
            console.log('Create Product Response:', response.data); // Untuk debugging
            if (response.data && response.data.status === 'success') {
                navigate('/');
            } else {
                throw new Error('Gagal menambahkan produk');
            }
        } catch (err) {
            console.error('Error creating product:', err);
            setError('Gagal menambahkan produk');
        }
    };

    return (
        <div>
            <h2>Tambah Produk Baru</h2>
            {error && <p style={{ color: 'red' }}>{error}</p>}
            <form onSubmit={handleSubmit} style={styles.form}>
                <div style={styles.formGroup}>
                    <label>Nama:</label>
                    <input
                        type="text"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        required
                        style={styles.input}
                    />
                </div>
                <div style={styles.formGroup}>
                    <label>Harga:</label>
                    <input
                        type="number"
                        step="0.01"
                        value={price}
                        onChange={(e) => setPrice(e.target.value)}
                        required
                        style={styles.input}
                    />
                </div>
                <div style={styles.formGroup}>
                    <label>Stok:</label>
                    <input
                        type="number"
                        value={stock}
                        onChange={(e) => setStock(e.target.value)}
                        required
                        style={styles.input}
                    />
                </div>
                <button type="submit" style={styles.button}>Tambah Produk</button>
            </form>
        </div>
    );
};

const styles = {
    form: {
        display: 'flex',
        flexDirection: 'column',
        maxWidth: '400px',
    },
    formGroup: {
        marginBottom: '15px',
    },
    input: {
        width: '100%',
        padding: '8px',
        boxSizing: 'border-box',
    },
    button: {
        padding: '10px',
        backgroundColor: '#28a745',
        color: '#fff',
        border: 'none',
        cursor: 'pointer',
    },
};

export default CreateProduct;
