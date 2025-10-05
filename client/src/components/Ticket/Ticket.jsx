import React, { useEffect, useState } from "react";
import "./Ticket.css";

const Ticket = ({ title, status, priority, assignedTo, sla, onClick }) => {
  const [timeLeft, setTimeLeft] = useState("");

  useEffect(() => {
    if (!sla) return;

    const calculateTimeLeft = () => {
      if (status.toLowerCase() === "resolved") {
        setTimeLeft("Completed");
        return;
      }

      const now = new Date();
      const slaDate = new Date(sla);
      const diff = slaDate - now;

      if (diff <= 0) {
        setTimeLeft("Breached!");
      } else {
        const days = Math.floor(diff / (1000 * 60 * 60 * 24));
        const hours = Math.floor((diff / (1000 * 60 * 60)) % 24);
        // const minutes = Math.floor((diff / (1000 * 60)) % 60);
        setTimeLeft(`${days > 0 ? days + "d " : ""}${hours}h left`);
      }
    };

    calculateTimeLeft();
    const interval = setInterval(calculateTimeLeft, 60000); 
    return () => clearInterval(interval);
  }, [sla, status]);

  return (
    <div className={`ticket-card ${priority?.toLowerCase()}`} onClick={onClick}>
      <div className="ticket-title">{title}</div>

      <div>
        Status:{" "}
        <span className={`status ${status.toLowerCase().replace(" ", "-")}`}>
          {status}
        </span>
      </div>

      <div>
        Priority: <span>{priority}</span>
      </div>

      <div>
        Assigned To: <span>{assignedTo?.username || "Unassigned"}</span>
      </div>

      <div>
        SLA:{" "}
        <span
          className={
            timeLeft === "Breached!" ? "breached" : timeLeft === "Completed" ? "completed" : ""
          }
        >
          {sla ? timeLeft : "N/A"}
        </span>
      </div>
    </div>
  );
};

export default Ticket;
