import React, { useEffect, useState } from 'react';
import { createBra, getBras, updateBra, deleteBra } from '../services/braService';

const BraManager = () => {
    const [bras, setBras] = useState([]);
    const [newBra, setNewBra] = useState({ type: '', size: '', quantity: 0 });
    const [editBra, setEditBra] = useState(null);

    useEffect(() => {
        fetchBras();
    }, []);

    const fetchBras = async () => {
        const brasData = await getBras();
        setBras(brasData);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (editBra) {
            await updateBra(editBra._id, newBra);
        } else {
            await createBra(newBra);
        }
        setNewBra({ type: '', size: '', quantity: 0 });
        setEditBra(null);
        fetchBras();
    };

    const handleEdit = (bra) => {
        setEditBra(bra);
        setNewBra({ type: bra.type, size: bra.size, quantity: bra.quantity });
    };

    const handleDelete = async (id) => {
        await deleteBra(id);
        fetchBras();
    };

    return (
        <div>
            <h2>Manage Bras</h2>
            <form onSubmit={handleSubmit}>
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
                <button type="submit">{editBra ? 'Update Bra' : 'Add Bra'}</button>
            </form>

            <ul>
                {bras.map((bra) => (
                    <li key={bra._id}>
                        {bra.type} - {bra.size} - {bra.quantity}
                        <button onClick={() => handleEdit(bra)}>Edit</button>
                        <button onClick={() => handleDelete(bra._id)}>Delete</button>
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default BraManager;
