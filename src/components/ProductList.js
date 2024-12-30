// src/components/ProductList.js
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';

const ProductList = () => {
    const [products, setProducts] = useState([]); // Pastikan inisialisasi sebagai array
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        axios.get('http://localhost:3000/api/products')
            .then(response => {
                console.log('Response Data:', response.data); // Untuk debugging
                // Akses array produk dari properti 'data'
                if (response.data && Array.isArray(response.data.data)) {
                    setProducts(response.data.data);
                } else {
                    throw new Error('Format data tidak sesuai');
                }
                setLoading(false);
            })
            .catch(error => {
                console.error('Error fetching products:', error);
                setError('Gagal memuat data');
                setLoading(false);
            });
    }, []);

    const handleDelete = (id) => {
        if (window.confirm('Apakah Anda yakin ingin menghapus produk ini?')) {
            axios.delete(`http://localhost:3000/api/products/${id}`)
                .then(() => {
                    setProducts(products.filter(product => product.id !== id));
                })
                .catch(() => {
                    alert('Gagal menghapus produk');
                });
        }
    };

    if (loading) return <p>Loading...</p>;
    if (error) return <p style={{ color: 'red' }}>{error}</p>;

    return (
        <div>
            <h2>Daftar Produk</h2>
            {products.length === 0 ? (
                <p>Tidak ada produk yang tersedia.</p>
            ) : (
                <table border="1" cellPadding="10">
                    <thead>
                        <tr>
                            <th>ID</th>
                            <th>Nama</th>
                            <th>Harga</th>
                            <th>Stok</th>
                            <th>Aksi</th>
                        </tr>
                    </thead>
                    <tbody>
                        {products.map(product => (
                            <tr key={product.id}>
                                <td>{product.id}</td>
                                <td>
                                    <Link to={`/products/${product.id}`}>{product.name}</Link>
                                </td>
                                <td>${parseFloat(product.price).toLocaleString()}</td>
                                <td>{product.stock}</td>
                                <td>
                                    <Link to={`/update/${product.id}`}>Edit</Link> |
                                    <button onClick={() => handleDelete(product.id)} style={{ marginLeft: '10px' }}>
                                        Delete
                                    </button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            )}
        </div>
    );
};

export default ProductList;
