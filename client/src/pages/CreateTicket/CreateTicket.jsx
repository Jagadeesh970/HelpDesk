import { useState, useContext } from "react";
import "./CreateTicket.css";
import { AuthContext } from "../../Store/AuthContext";
import API from "../../utils/API";

const CreateTicket = () => {
  const { user } = useContext(AuthContext);
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [message, setMessage] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const payload = { title, description };
      await API.post("/tickets", payload, {
        headers: { Authorization: `Bearer ${user.token}` },
      });

      setMessage("Ticket created successfully!");
      setTitle("");
      setDescription("");
    } catch (err) {
      console.error(err.response?.data?.message || err.message);
      setMessage("Failed to create ticket.");
    }
  };

  return (
    <div className="create-ticket-container">
      <h2>Create Ticket</h2>
      {message && <p>{message}</p>}
      <form onSubmit={handleSubmit} className="ticket-form">
        <div className="form-group">
          <label htmlFor="title">Title<span>*</span></label>
          <input
            type="text"
            id="title"
            placeholder="Enter a short title for your issue"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            required
          />
        </div>

        <div className="form-group">
          <label htmlFor="description">Description</label>
          <textarea
            id="description"
            placeholder="Describe your issue in detail"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            rows={5}
          />
        </div>

        <button type="submit" className="submit-btn">Create Ticket</button>
      </form>
    </div>
  );
};

export default CreateTicket;
