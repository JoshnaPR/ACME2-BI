import React, { useEffect, useState } from "react";
import { createBra, getBras, updateBra, deleteBra } from "../services/braService";
import { Link } from "react-router-dom";
import "../styles/BraInventory.css";
import logo from "../assets/InnerVentory Button.png";
import logo2 from "../assets/BreastIntentionsLogo.png";
import { IoIosLogOut } from "react-icons/io";
import { logAction } from "../services/logService";

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
      const updatedQuantity =
        parseInt(existingBra.quantity) + parseInt(newBra.quantity);
      try {
        await updateBra(existingBra._id, {
          ...existingBra,
          quantity: updatedQuantity,
        });
        fetchBras();
        setSuccessMessage("Quantity updated successfully!");
        await logAction(localStorage.getItem("userId"), `Added more of ${existingBra.type} ${existingBra.size} so quantity went from ${existingBra.quantity} to ${updatedQuantity} in the Inventory`);
      } catch (error) {
        console.error("Error updating quantity:", error);
      }
    } else {
      try {
        await createBra(newBra);
        fetchBras();
        setSuccessMessage("Bra added successfully!");

        await logAction(localStorage.getItem("userId"), `Added ${newBra.quantity} of a bra: ${newBra.type} ${newBra.size} to the Inventory`);

      } catch (error) {
        console.error("Error creating bra:", error);
      }
    }

    // Reset the input fields
    setNewBra({ type: "", size: "", quantity: "" });
  };

  const handleEdit = async (id) => {
    const existingBra = bras.find((bra) => bra._id === id);

    if (!existingBra) {
      console.error("Bra not found for editing.");
      return;
    }

    if (existingBra.type === editBra.type && existingBra.size === editBra.size && existingBra.quantity === editBra.quantity) {
      console.log("No changes made to the bra.");
      setEditBra(null);
      return;
    }

    try {
      await updateBra(id, editBra);
      fetchBras();
      setEditBra(null);

    } catch (error) {
      console.error("Error updating bra:", error);
    }
    setSuccessMessage("Bra updated successfully!");
    await logAction(localStorage.getItem("userId"), `Updated ${existingBra.type} ${existingBra.size} 
    - Qty: ${existingBra.quantity} to ${editBra.type} ${editBra.size} - Qty: ${editBra.quantity} in the Inventory`);
  };

  const handleDelete = async (id) => {

    const braToDelete = bras.find((bra) => bra._id === id);

    if (!braToDelete) {
      console.error("Bra not found for deletion.");
      return;
    }

    const confirmDelete = window.confirm(
      "Are you sure you want to delete this bra?"
    );
    if (confirmDelete) {
      try {
        await deleteBra(id);
        fetchBras();

        setSuccessMessage("Bra deleted successfully!");
        await logAction(localStorage.getItem("userId"), `Deleted ${braToDelete.type} ${braToDelete.size} - Qty: ${braToDelete.quantity} from the inventory`);

      } catch (error) {
        console.error("Error deleting bra:", error);
      }
    }
  };

  const filteredBras = bras.filter((bra) => {
    if (searchByType) {
      return bra.type?.toLowerCase().includes(searchTerm.toLowerCase());
    } else {
      return bra.size?.toLowerCase().includes(searchTerm.toLowerCase());
    }
  });

  const getInventoryTotals = () => {
    const normalizeType = (type) => type.toLowerCase().replace(/\s+/g, "");
    const totalBras = bras.reduce((sum, bra) => sum + parseInt(bra.quantity), 0);

    const normalBras = bras
      .filter((bra) => normalizeType(bra.type) === "normal")
      .reduce((sum, bra) => sum + parseInt(bra.quantity), 0);

    const maternityBras = bras
      .filter((bra) => normalizeType(bra.type) === "maternity")
      .reduce((sum, bra) => sum + parseInt(bra.quantity), 0);

    const disabilityBras = bras
      .filter((bra) => normalizeType(bra.type) === "disability")
      .reduce((sum, bra) => sum + parseInt(bra.quantity), 0);

    const flexfitBras = bras
      .filter((bra) => normalizeType(bra.type) === "flexfit")
      .reduce((sum, bra) => sum + parseInt(bra.quantity), 0);

    const kidsBras = bras
      .filter((bra) => normalizeType(bra.type) === "kids")
      .reduce((sum, bra) => sum + parseInt(bra.quantity), 0);

    return { totalBras, normalBras, maternityBras, disabilityBras, flexfitBras, kidsBras };
  };

  return (
    <div className="app">
      <header className="BraInventory-header">
        <div className="logo-container">
          <img src={logo} alt="Breast Intentions Logo" className="logo" />
          <img src={logo2} alt="Breast Intentions Logo" className="logo" />
        </div>
        <nav className="navbar">
          <Link to="/home" className="nav-link">
            Home
          </Link>
          <Link to="/bra-inventory" className="nav-link">
            Bra Inventory
          </Link>
          <Link to="/event-inventory" className="nav-link">
            Event Inventory
          </Link>
          <Link to="/logout" title="Logout">
            <IoIosLogOut size={25} />
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
              <input
                type="text"
                placeholder="Type"
                value={newBra.type}
                onChange={(e) => setNewBra({ ...newBra, type: e.target.value })}
                required
                className="form-input"
              />
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
              <h1>Inventory Levels</h1>
              <h2><strong>Total Bras: {getInventoryTotals().totalBras}</strong></h2>
              <p>Normal Bras: {getInventoryTotals().normalBras}</p>
              <p>Maternity Bras: {getInventoryTotals().maternityBras}</p>
              <p>Disability Bras: {getInventoryTotals().disabilityBras}</p>
              <p>FlexFit Bras: {getInventoryTotals().flexfitBras}</p>
              <p>Kids Bras: {getInventoryTotals().kidsBras}</p>
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
                    <button onClick={() => handleDelete(bra._id)}>Delete</button>
                  ) : null}
                </div>

                {editBra && editBra._id === bra._id && (
                  <form
                    className="bra-form edit-form"
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
                    <button
                      type="button"
                      className="cancel-button"
                      onClick={() => setEditBra(null)}
                    >
                      Cancel
                    </button>
                  </form>
                )}
              </li>
            ))
          ) : (
            <h2 style={{ textAlign: "center" }}>
              {searchByType ? "No bras of this type found." : "No bras of this size found."}
            </h2>
          )}
        </ul>
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
