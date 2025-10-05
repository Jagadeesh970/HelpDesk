import React, { useEffect, useState, useContext } from "react";
import API from "../../utils/API";
import Ticket from "../Ticket/Ticket";
import { AuthContext } from "../../Store/AuthContext";
import "./TicketDisplay.css";

const TicketDisplay = ({ onSelectTicket }) => {
  const { user } = useContext(AuthContext);
  const [tickets, setTickets] = useState([]);

  useEffect(() => {
    const fetchTickets = async () => {
      try {
        let url = "/tickets";
        if (user.role === "agent") url = `/tickets?assignedTo=${user.userId}`;
        const res = await API.get(url);
        setTickets(res.data);
      } catch (err) {
        console.error(err);
      }
    };
    fetchTickets();
  }, [user]);

  return (
    <div className="ticket-display-container">
      <h1>Tickets</h1>
      <div className="tickets-grid">
        {tickets.map(ticket => (
          <Ticket
            key={ticket._id}
            id={ticket._id}
            title={ticket.title}
            status={ticket.status}
            priority={ticket.priority}
            assignedTo={ticket.assignedTo}
            sla={ticket.sla || "N/A"}
            role={user.role}
            onClick={() => onSelectTicket(ticket)}
          />
        ))}
      </div>
    </div>
  );
};

export default TicketDisplay;
