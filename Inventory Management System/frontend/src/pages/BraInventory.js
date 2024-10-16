import React, { useEffect, useState } from 'react';
import { createBra, getBras, updateBra, deleteBra } from '../services/braService';
import { Link } from 'react-router-dom';
import '../styles/global.css'; // Custom styles for the homepage
import logo from '../assets/InnerVentory Button.png'; // Placeholder for your logo

const BraInventory = () => {
    const [bras, setBras] = useState([]);
    const [newBra, setNewBra] = useState({ type: '', size: '', quantity: '' });
    const [editBra, setEditBra] = useState(null);
    const [searchTerm, setSearchTerm] = useState('');
    const [searchByType, setSearchByType] = useState(true);
    const [successMessage, setSuccessMessage] = useState('');

    useEffect(() => {
        fetchBras();
    }, []);

    const fetchBras = async () => {
        try {
            const brasData = await getBras();
            setBras(brasData);
        } catch (error) {
            console.error("Error fetching bras:", error);
        }
    };

    const handleCreate = async (e) => {
        e.preventDefault();
        const existingBra = bras.find(
            bra => bra.type.toLowerCase() === newBra.type.toLowerCase() &&
                   bra.size.toLowerCase() === newBra.size.toLowerCase()
        );
    
        if (existingBra) {
            // Update the existing bra's quantity
            const updatedQuantity = parseInt(existingBra.quantity) + parseInt(newBra.quantity);
            try {
                await updateBra(existingBra._id, { ...existingBra, quantity: updatedQuantity });
                fetchBras();
                setSuccessMessage('Quantity updated successfully!');
            } catch (error) {
                console.error("Error updating quantity:", error);
            }
        } else {
            // Create a new bra entry
            try {
                await createBra(newBra);
                fetchBras();
                setSuccessMessage('Bra added successfully!');
            } catch (error) {
                console.error("Error creating bra:", error);
            }
        }
    
        // Reset the input fields
        setNewBra({ type: '', size: '', quantity: '' });
    };
    

    const handleEdit = async (id) => {
        try {
            await updateBra(id, editBra);
            fetchBras();
            setEditBra(null);
        } catch (error) {
            console.error("Error updating bra:", error);
        }
        setSuccessMessage('Bra updated successfully!');
    };

    const handleDelete = async (id) => {
        const confirmDelete = window.confirm("Are you sure you want to delete this bra?");
        if (confirmDelete) {
            try {
                await deleteBra(id);
                fetchBras();
            } catch (error) {
                console.error("Error deleting bra:", error);
            }
        }
        setSuccessMessage('Bra deleted successfully!');
    };

    const filteredBras = bras.filter(bra => {
        if (searchByType) {
            return bra.type.toLowerCase().includes(searchTerm.toLowerCase());
        } else {
            return bra.size.toLowerCase().includes(searchTerm.toLowerCase());
        }
    });

    return (
        <div>
            <header className="homepage-header">
                <img src={logo} alt="Breast Intentions Logo" className="logo" />
                <nav className="navbar">
                <Link to="/" className="nav-link">Home</Link>
                <Link to="/bra-inventory" className="nav-link">Bra Inventory</Link>
                <Link to="/event-inventory" className="nav-link">Event Inventory</Link>
                </nav>
            </header>
            <h1>Bra Inventory</h1>
            {successMessage && <h3 style={{ textAlign: 'center'}}>{successMessage}</h3>}
            <input
                type="text"
                placeholder="Search Bras"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
            />
            <label>
                <input
                    type="checkbox"
                    checked={searchByType}
                    onChange={() => setSearchByType(!searchByType)}
                />
                Search by Type
            </label>
            <label>
                <input
                    type="checkbox"
                    checked={!searchByType}
                    onChange={() => setSearchByType(!searchByType)}
                />
                Search by Size
            </label>
            <form onSubmit={handleCreate}>
                <input 
                    type="text" 
                    placeholder="Type" 
                    value={newBra.type} 
                    onChange={(e) => setNewBra({ ...newBra, type: e.target.value })} 
                    required 
                />
                <input 
                    type="text" 
                    placeholder="Size" 
                    value={newBra.size} 
                    onChange={(e) => setNewBra({ ...newBra, size: e.target.value })} 
                    required 
                />
                <input 
                    type="number" 
                    placeholder="Quantity" 
                    value={newBra.quantity} 
                    onChange={(e) => setNewBra({ ...newBra, quantity: e.target.value })} 
                    required 
                />
                <button type="submit">Add Bra</button>
            </form>

            <ul>
                {filteredBras.map(bra => (
                    <li key={bra._id}>
                        {bra.type} - Size: {bra.size} - Quantity: {bra.quantity}
                        <button onClick={() => setEditBra(bra)}>Edit</button>
                        <button onClick={() => handleDelete(bra._id)}>Delete</button>
                    </li>
                ))}
            </ul>

            {editBra && (
                <form onSubmit={(e) => { e.preventDefault(); handleEdit(editBra._id); }}>
                    <input 
                        type="text" 
                        value={editBra.type} 
                        onChange={(e) => setEditBra({ ...editBra, type: e.target.value })} 
                        required 
                    />
                    <input 
                        type="text" 
                        value={editBra.size} 
                        onChange={(e) => setEditBra({ ...editBra, size: e.target.value })} 
                        required 
                    />
                    <input 
                        type="number" 
                        value={editBra.quantity} 
                        onChange={(e) => setEditBra({ ...editBra, quantity: e.target.value })} 
                        required 
                    />
                    <button type="submit">Update Bra</button>
                </form>
            )}

            <footer className="homepage-footer">
                <p>&copy; 2024 Breast Intentions of Washington. All Rights Reserved.</p>
            </footer>
        </div>
    );
};

export default BraInventory;
