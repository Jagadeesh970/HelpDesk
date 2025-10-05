import { useEffect, useState, useContext } from "react";
import API from "../../utils/API";
import { AuthContext } from "../../Store/AuthContext";
import "./AgentDashboard.css";

const AgentDashboard = () => {
  const { user } = useContext(AuthContext);
  const [tickets, setTickets] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (user?.token) fetchTickets();
  }, [user]);

  const fetchTickets = async () => {
    try {
      setLoading(true);
      const res = await API.get("/tickets", {
        headers: { Authorization: `Bearer ${user.token}` },
      });
      // Only tickets assigned to this agent
      setTickets(res.data.filter((t) => t.assignedTo?._id === user.userId));
    } catch (err) {
      console.error(err.response?.data?.message || err.message);
    } finally {
      setLoading(false);
    }
  };

  const updateStatus = async (ticketId, status) => {
    try {
      const res = await API.patch(
        `/tickets/${ticketId}`,
        { status },
        { headers: { Authorization: `Bearer ${user.token}` } }
      );
      setTickets((prev) =>
        prev.map((t) => (t._id === ticketId ? { ...t, ...res.data } : t))
      );
    } catch (err) {
      console.error(err.response?.data?.message || err.message);
    }
  };

  if (loading) return <p className="loading-text">Loading tickets...</p>;
  if (!tickets.length) return <p className="loading-text">No tickets assigned.</p>;

  return (
    <div className="agent-dashboard-page">
      <h1>Agent Dashboard</h1>
      <div className="agent-tickets-grid">
        {tickets.map((ticket) => (
          <div key={ticket._id} className="agent-ticket-card">
            <div className="ticket-title">{ticket.title}</div>
            <div>
              Status:{" "}
              <select
                value={ticket.status}
                onChange={(e) => updateStatus(ticket._id, e.target.value)}
              >
                <option value="Open">Open</option>
                <option value="In Progress">In Progress</option>
                <option value="Resolved">Resolved</option>
              </select>
            </div>
            <div>Priority: {ticket.priority}</div>
            <div>Assigned To: {ticket.assignedTo?.username || "Unassigned"}</div>
            <div>SLA: {ticket.sla ? new Date(ticket.sla).toLocaleDateString() : "N/A"}</div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default AgentDashboard;
