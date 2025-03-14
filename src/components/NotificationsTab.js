import React from "react";

const NotificationsTab = ({ notifications }) => {
  return (
    <div>
      <h2>Notifications</h2>
      {notifications.length > 0 ? (
        <ul>
          {notifications.map((notif, index) => (
            <li key={index}>{notif}</li>
          ))}
        </ul>
      ) : (
        <p>No notifications.</p>
      )}
    </div>
  );
};

export default NotificationsTab;
