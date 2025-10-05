import "./SideBar.css";

const SideBar = () => {
  return (
    <div className="sidebar-container">
      <h3>Filters</h3>
      <div className="sidebar-list">
        <div>Status</div>
        <div>Priority</div>
        <div>SLA</div>
      </div>
    </div>
  );
};

export default SideBar;
