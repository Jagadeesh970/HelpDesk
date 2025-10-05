// import React, { useState, useRef, useEffect } from "react";
// import TicketDisplay from "../TicketDisplay/TicketDisplay";
// import CommentSidebar from "../CommentSidebar/CommentSidebar";
// import "./DashboardLayout.css";

// const DashboardLayout = () => {
//   const [selectedTicket, setSelectedTicket] = useState(null);
//   const commentsEndRef = useRef(null);

  
//   const scrollToBottom = () => {
//     commentsEndRef.current?.scrollIntoView({ behavior: "smooth" });
//   };

//   useEffect(() => {
//     scrollToBottom();
//   }, [selectedTicket]);

//   return (
//     <div className="dashboard-container">
//       <div className="ticket-display-container">
//         <TicketDisplay onSelectTicket={setSelectedTicket} />
//       </div>

//       {selectedTicket ?(
//         <CommentSidebar ticket={selectedTicket} commentsEndRef={commentsEndRef} />
//       ):<div className="empty-container">
//         <h1>click on ticket to add comment</h1>
//         </div>}
//     </div>
//   );
// };

// export default DashboardLayout;
