import React, { useEffect, useState } from "react";
import { createBra, getBras, updateBra, deleteBra} from "../services/braService";
import { Link } from "react-router-dom";
import "../styles/BraInventory.css"; // Custom styles for the homepage
import logo from "../assets/InnerVentory Button.png";
import logo2 from "../assets/BreastIntentionsLogo.png";

const BraInventory = () => {
  const role = localStorage.getItem("role");
  const [bras, setBras] = useState([]);
  const [newBra, setNewBra] = useState({ type: "", size: "", quantity: "" });
  const [editBra, setEditBra] = useState(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [searchByType, setSearchByType] = useState(true);
  const [successMessage, setSuccessMessage] = useState("");
  const [showModal, setShowModal] = useState(false);

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
      (bra) =>
        bra.type.toLowerCase() === newBra.type.toLowerCase() &&
        bra.size.toLowerCase() === newBra.size.toLowerCase()
    );

    if (existingBra) {
      // Update the existing bra's quantity
      const updatedQuantity =
        parseInt(existingBra.quantity) + parseInt(newBra.quantity);
      try {
        await updateBra(existingBra._id, {
          ...existingBra,
          quantity: updatedQuantity,
        });
        fetchBras();
        setSuccessMessage("Quantity updated successfully!");
      } catch (error) {
        console.error("Error updating quantity:", error);
      }
    } else {
      // Create a new bra entry
      try {
        await createBra(newBra);
        fetchBras();
        setSuccessMessage("Bra added successfully!");
      } catch (error) {
        console.error("Error creating bra:", error);
      }
    }

    // Reset the input fields
    setNewBra({ type: "", size: "", quantity: "" });
  };

  const handleEdit = async (id) => {
    try {
      await updateBra(id, editBra);
      fetchBras();
      setEditBra(null);
    } catch (error) {
      console.error("Error updating bra:", error);
    }
    setSuccessMessage("Bra updated successfully!");
  };

  const handleDelete = async (id) => {
    const confirmDelete = window.confirm(
      "Are you sure you want to delete this bra?"
    );
    if (confirmDelete) {
      try {
        await deleteBra(id);
        fetchBras();
      } catch (error) {
        console.error("Error deleting bra:", error);
      }
    }
    setSuccessMessage("Bra deleted successfully!");
  };

  const filteredBras = bras.filter((bra) => {
    if (searchByType) {
      return bra.type.toLowerCase().includes(searchTerm.toLowerCase());
    } else {
      return bra.size.toLowerCase().includes(searchTerm.toLowerCase());
    }
  });

  const getInventoryTotals = () => {
    const totalBras = bras.reduce(
      (sum, bra) => sum + parseInt(bra.quantity),
      0
    );
    const normalBras = bras
      .filter((bra) => bra.type === "Normal")
      .reduce((sum, bra) => sum + parseInt(bra.quantity), 0);
    const nursingBras = bras
      .filter((bra) => bra.type === "Nursing")
      .reduce((sum, bra) => sum + parseInt(bra.quantity), 0);
    const disabilityBras = bras
      .filter((bra) => bra.type === "Disability")
      .reduce((sum, bra) => sum + parseInt(bra.quantity), 0);

    return { totalBras, normalBras, nursingBras, disabilityBras };
  };

  return (
    <div className="app">
      <header className="BraInventory-header">
        <div className="logo-container">
          <img src={logo} alt="Breast Intentions Logo" className="logo" />
          <img src={logo2} alt="Breast Intentions Logo" className="logo" />
        </div>
        <nav className="navbar">
          <Link to="/" className="nav-link">
            Home
          </Link>
          <Link to="/bra-inventory" className="nav-link">
            Bra Inventory
          </Link>
          <Link to="/event-inventory" className="nav-link">
            Event Inventory
          </Link>
        </nav>
      </header>
      <div className="main-content">
        <h1 className="bra-inventory-title">Welcome to the Bra Inventory</h1>
        <div className="search-section">
          <input
            type="text"
            className="search-input"
            placeholder="Search Bras"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
          <div className="search-options">
            <label className="search-option">
              <input
                type="checkbox"
                checked={searchByType}
                onChange={() => setSearchByType(true)}
              />
              Search by Type
            </label>
            <label className="search-option">
              <input
                type="checkbox"
                checked={!searchByType}
                onChange={() => setSearchByType(false)}
              />
              Search by Size
            </label>
          </div>
        </div>

        <form className="bra-form" onSubmit={handleCreate}>
          <h2>Add a New Bra</h2>
          <div className="form-row">
            <div className="form-group">
              <select
                value={newBra.type}
                onChange={(e) => setNewBra({ ...newBra, type: e.target.value })}
                required
                className="form-input"
              >
                <option value="" disabled>
                  Select a Type
                </option>
                <option value="Normal">Normal</option>
                <option value="Nursing">Nursing</option>
                <option value="Disability">Disability</option>
              </select>
            </div>
            <div className="form-group">
              <input
                type="text"
                placeholder="Size"
                value={newBra.size}
                onChange={(e) => setNewBra({ ...newBra, size: e.target.value })}
                required
                className="form-input"
              />
            </div>
            <div className="form-group">
              <input
                type="number"
                placeholder="Quantity"
                value={newBra.quantity}
                onChange={(e) =>
                  setNewBra({ ...newBra, quantity: e.target.value })
                }
                required
                className="form-input"
              />
            </div>
          </div>
          <button type="submit" className="submit-button">
            Add Bra
          </button>
        </form>

        <button className="inventory-button" onClick={() => setShowModal(true)}>
          View Inventory Levels
        </button>

        {showModal && (
          <div className="modal-overlay" onClick={() => setShowModal(false)}>
            <div className="modal-content" onClick={(e) => e.stopPropagation()}>
              <h2>Inventory Levels</h2>
              <p>Total Bras: {getInventoryTotals().totalBras}</p>
              <p>Normal Bras: {getInventoryTotals().normalBras}</p>
              <p>Nursing Bras: {getInventoryTotals().nursingBras}</p>
              <p>Disability Bras: {getInventoryTotals().disabilityBras}</p>
              <button onClick={() => setShowModal(false)}>Close</button>
            </div>
          </div>
        )}

        {successMessage && (
          <h2 style={{ textAlign: "center" }}>{successMessage}</h2>
        )}

        <ul className="bra-list">
          {filteredBras.length > 0 ? (
            filteredBras.map((bra) => (
              <li key={bra._id} className="bra-item">
                <div className="bra-details">
                  <h3>Type: {bra.type}</h3>
                  <h3>Size: {bra.size}</h3>
                  <h3>Quantity: {bra.quantity}</h3>
                </div>
                <div className="bra-actions">
                  <button onClick={() => setEditBra(bra)}>Edit</button>
                  {role === "Admin" ? (
                    <button onClick={() => handleDelete(bra._id)}>
                      Delete
                    </button>
                  ) : null}
                </div>
              </li>
            ))
          ) : (
            <h2 style={{ textAlign: "center" }}>
              {searchByType
                ? "No bras of this type found."
                : "No bras of this size found."}
            </h2>
          )}
        </ul>

        {editBra && (
          <form
            className="bra-form"
            onSubmit={(e) => {
              e.preventDefault();
              handleEdit(editBra._id);
            }}
          >
            <h2>Edit Bra</h2>
            <div className="form-row">
              <div className="form-group">
                <input
                  type="text"
                  placeholder="Type"
                  value={editBra.type}
                  onChange={(e) =>
                    setEditBra({ ...editBra, type: e.target.value })
                  }
                  required
                  className="form-input"
                />
              </div>
              <div className="form-group">
                <input
                  type="text"
                  placeholder="Size"
                  value={editBra.size}
                  onChange={(e) =>
                    setEditBra({ ...editBra, size: e.target.value })
                  }
                  required
                  className="form-input"
                />
              </div>
              <div className="form-group">
                <input
                  type="number"
                  placeholder="Quantity"
                  value={editBra.quantity}
                  onChange={(e) =>
                    setEditBra({ ...editBra, quantity: e.target.value })
                  }
                  required
                  className="form-input"
                />
              </div>
            </div>
            <button type="submit" className="submit-button">
              Update Bra
            </button>
          </form>
        )}
      </div>

      <footer className="BraInventory-footer">
        <div className="footer-content">
          <p>&copy; 2024 Breast Intentions. All rights reserved.</p>
          <div className="social-links">
            <a
              href="https://www.facebook.com/breastintentionswa"
              target="_blank"
              rel="noopener noreferrer"
            >
              Facebook
            </a>
            <a
              href="https://www.instagram.com/breastintentionsofwa/"
              target="_blank"
              rel="noopener noreferrer"
            >
              Instagram
            </a>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default BraInventory;