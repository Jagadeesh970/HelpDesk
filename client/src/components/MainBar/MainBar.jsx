import { useState } from "react";
import TicketDisplay from "../TicketDisplay/TicketDisplay";
import CommentSidebar from "../CommentSidebar/CommentSidebar";
import "./MainBar.css";

const MainBar = () => {
  const [selectedTicket, setSelectedTicket] = useState(null);
  const [showSidebar, setShowSidebar] = useState(false);

  const handleSelectTicket = (ticket) => {
    setSelectedTicket(ticket);
    setShowSidebar(true); 
  };

  const handleCloseSidebar = () => {
    setShowSidebar(false);
  };

  return (
    <div className="mainbar-container">
      <TicketDisplay onSelectTicket={handleSelectTicket} />

      {selectedTicket && showSidebar ? (
        <CommentSidebar
          ticket={selectedTicket}
          onClose={handleCloseSidebar}
        />
      ) : (
        <div className="empty-container">
          <h2>Click on a ticket to view & add comments</h2>
        </div>
      )}
    </div>
  );
};

export default MainBar;
