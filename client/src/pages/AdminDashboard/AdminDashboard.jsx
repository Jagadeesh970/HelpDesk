import { useEffect, useState, useContext } from "react";
import API from "../../utils/API";
import { AuthContext } from "../../Store/AuthContext";
import "./AdminDashboard.css";


const formatDateForInput = (date) => {
  if (!date) return "";
  const d = new Date(date);
  const month = `${d.getMonth() + 1}`.padStart(2, "0");
  const day = `${d.getDate()}`.padStart(2, "0");
  return `${d.getFullYear()}-${month}-${day}`;
};

const AdminDashboard = () => {
  const { user } = useContext(AuthContext);
  const [tickets, setTickets] = useState([]);
  const [agents, setAgents] = useState([]);
  const [newAgentName, setNewAgentName] = useState("");

  useEffect(() => {
    if (user?.token) {
      fetchTickets();
      fetchAgents();
    }
  }, [user]);

  const fetchTickets = async () => {
    try {
      const res = await API.get("/tickets", {
        headers: { Authorization: `Bearer ${user.token}` },
      });
      setTickets(res.data);
    } catch (err) {
      console.error(err.response?.data?.message || err.message);
    }
  };

  const fetchAgents = async () => {
    try {
      const res = await API.get("/users", {
        headers: { Authorization: `Bearer ${user.token}` },
      });
      setAgents(res.data.filter((u) => u.role === "agent"));
    } catch (err) {
      console.error(err.response?.data?.message || err.message);
    }
  };

  const addAgent = async () => {
    if (!newAgentName.trim()) return;
    try {
      const res = await API.post(
        "/auth/register",
        {
          username: newAgentName,
          email: `${newAgentName}@example.com`,
          password: "agent123",
          role: "agent",
        },
        { headers: { Authorization: `Bearer ${user.token}` } }
      );
      setAgents((prev) => [...prev, res.data.user]);
      setNewAgentName("");
    } catch (err) {
      console.error(err.response?.data?.message || err.message);
    }
  };

  const updateTicket = async (ticketId, field, value) => {
    try {
      const res = await API.patch(
        `/tickets/${ticketId}`,
        { [field]: value },
        { headers: { Authorization: `Bearer ${user.token}` } }
      );
      setTickets((prev) =>
        prev.map((t) => (t._id === ticketId ? { ...t, ...res.data } : t))
      );
    } catch (err) {
      console.error(err.response?.data?.message || err.message);
    }
  };

  return (
    <div className="admin-dashboard-page">
      <h1>Admin Dashboard</h1>

      <div className="add-agent-container">
        <input
          type="text"
          placeholder="New Agent Username"
          value={newAgentName}
          onChange={(e) => setNewAgentName(e.target.value)}
        />
        <button onClick={addAgent}>Add Agent</button>
      </div>

      <div className="dashboard-container">
        {tickets.length === 0 ? (
          <p>No tickets found.</p>
        ) : (
          tickets.map((ticket) => (
            <div key={ticket._id} className="admin-ticket-card">
              <div className="ticket-title">{ticket.title}</div>

              <div>
                Status:{" "}
                <select
                  value={ticket.status}
                  onChange={(e) =>
                    updateTicket(ticket._id, "status", e.target.value)
                  }
                >
                  <option value="Open">Open</option>
                  <option value="In Progress">In Progress</option>
                  <option value="Resolved">Resolved</option>
                  <option value="Planned">Planned</option>
                </select>
              </div>

              <div>
                Priority:{" "}
                <select
                  value={ticket.priority}
                  onChange={(e) =>
                    updateTicket(ticket._id, "priority", e.target.value)
                  }
                >
                  <option value="Low">Low</option>
                  <option value="Medium">Medium</option>
                  <option value="High">High</option>
                </select>
              </div>

              <div>
                Assigned To:{" "}
                <select
                  value={ticket.assignedTo?._id || ""}
                  onChange={(e) =>
                    updateTicket(ticket._id, "assignedTo", e.target.value)
                  }
                >
                  <option value="">Unassigned</option>
                  {agents.map((agent) => (
                    <option key={agent._id} value={agent._id}>
                      {agent.username}
                    </option>
                  ))}
                </select>
              </div>

              <div>
                SLA:{" "}
                <input
                  type="date"
                  value={formatDateForInput(ticket.sla)}
                  onChange={(e) =>
                    updateTicket(ticket._id, "sla", e.target.value)
                  }
                />
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default AdminDashboard;
