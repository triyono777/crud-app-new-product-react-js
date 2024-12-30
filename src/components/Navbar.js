// src/components/Navbar.js
import React from 'react';
import { Link } from 'react-router-dom';

const Navbar = () => {
    return (
        <nav>
            <ul>
                <li><Link to="/">Produk</Link></li>
                <li><Link to="/create">Tambah Produk</Link></li>
            </ul>
        </nav>
    );
};

export default Navbar;