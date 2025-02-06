import React, { useEffect, useState } from "react";
import {
  createBra,
  getBras,
  updateBra,
  deleteBra,
} from "../services/braService";

const BraManager = () => {
  const [bras, setBras] = useState([]);
  const [newBra, setNewBra] = useState({ type: "", size: "", quantity: "" });
  const [editBra, setEditBra] = useState(null);
  //UseEffect to fetch bras
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
    try {
      await createBra(newBra);
      fetchBras(); // Refresh the list after creating a new bra
      setNewBra({ type: "", size: "", quantity: "" }); // Clear form
    } catch (error) {
      console.error("Error creating bra:", error);
    }
  };

  const handleEdit = async (id) => {
    try {
      await updateBra(id, editBra);
      fetchBras(); // Refresh the list after updating a bra
      setEditBra(null); // Clear edit state
    } catch (error) {
      console.error("Error updating bra:", error);
    }
  };

  const handleDelete = async (id) => {
    try {
      await deleteBra(id);
      fetchBras(); // Refresh the list after deleting a bra
    } catch (error) {
      console.error("Error deleting bra:", error);
    }
  };

  return (
    <div>
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
        {bras.map((bra) => (
          <li key={bra._id}>
            {bra.type} - Size: {bra.size} - Quantity: {bra.quantity}
            <button onClick={() => setEditBra(bra)}>Edit</button>
            <button onClick={() => handleDelete(bra._id)}>Delete</button>
          </li>
        ))}
      </ul>

      {editBra && (
        <form
          onSubmit={(e) => {
            e.preventDefault();
            handleEdit(editBra._id);
          }}
        >
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
            onChange={(e) =>
              setEditBra({ ...editBra, quantity: e.target.value })
            }
            required
          />
          <button type="submit">Update Bra</button>
        </form>
      )}
    </div>
  );
};

export default BraManager;
