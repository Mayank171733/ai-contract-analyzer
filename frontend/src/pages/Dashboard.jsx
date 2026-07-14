import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import api from "../services/api";
import { useAuth } from "../context/AuthContext";

function Dashboard() {
  const [contracts, setContracts] = useState([]);
  const [loading, setLoading] = useState(true);

  const navigate = useNavigate();
  const { logout } = useAuth();

  useEffect(() => {
    fetchContracts();
  }, []);

  const fetchContracts = async () => {
    try {
      const response = await api.get("/contracts");
      setContracts(response.data.contracts);
    } catch (error) {
      console.error(error);
      alert("Failed to fetch contracts");
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id) => {
    const confirmDelete = window.confirm(
      "Are you sure you want to delete this contract?"
    );

    if (!confirmDelete) return;

    try {
      await api.delete(`/contracts/${id}`);

      setContracts((prev) =>
        prev.filter((contract) => contract._id !== id)
      );

      alert("Contract deleted successfully");
    } catch (error) {
      console.error(error);
      alert("Delete failed");
    }
  };

  const handleLogout = () => {
    logout();
    navigate("/");
  };

  return (
    <div style={{ padding: "30px" }}>
      <h1>AI Contract Analyzer Dashboard</h1>

      <button onClick={() => navigate("/upload")}>
        Upload Contract
      </button>

      <button
        onClick={handleLogout}
        style={{ marginLeft: "10px" }}
      >
        Logout
      </button>

      <hr />

      <h2>My Contracts</h2>

      {loading ? (
        <p>Loading...</p>
      ) : contracts.length === 0 ? (
        <p>No contracts uploaded.</p>
      ) : (
        <table
          border="1"
          cellPadding="10"
          style={{
            borderCollapse: "collapse",
            width: "100%",
            marginTop: "20px",
          }}
        >
          <thead>
            <tr>
              <th>Filename</th>
              <th>Status</th>
              <th>Uploaded</th>
              <th>Actions</th>
            </tr>
          </thead>

          <tbody>
            {contracts.map((contract) => (
              <tr key={contract._id}>
                <td>{contract.filename}</td>

                <td>{contract.status}</td>

                <td>
                  {new Date(contract.createdAt).toLocaleString()}
                </td>

                <td>
                  <button
                    onClick={() =>
                      navigate(`/analysis/${contract._id}`)
                    }
                  >
                    Analyze
                  </button>

                  <button
                    onClick={() =>
                      handleDelete(contract._id)
                    }
                    style={{ marginLeft: "10px" }}
                  >
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
}

export default Dashboard;