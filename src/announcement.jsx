import React from "react";

const Announcement = ({ announcements = [] }) => (
  <div className="p-3 shadow-sm rounded-md border bg-white w-64">
    <h2 className="text-lg font-bold mb-2">Announcements</h2>
    <div className="space-y-2">
      {announcements.map((announcement, index) => (
        <div 
          key={index} 
          className="flex items-center border-b pb-2 last:border-b-0 w-full"
          style={{ display: "flex", flexDirection: "row", alignItems: "center", width: "260px", height: "50px", gap: "8px" }}
        >
          {announcement.image && (
            <img
              src={announcement.image}
              alt={announcement.title}
              style={{ width: "40px", height: "40px", borderRadius: "5px", flexShrink: 0 }}
            />
          )}
          <div style={{ flex: 1 }}>
            <h3 style={{ fontSize: "14px", fontWeight: "bold", color: "#4B5563", margin: 0 }}>{announcement.title}</h3>
            <p style={{ fontSize: "12px", color: "#4B5563", margin: 0 }}>{announcement.description}</p>
          </div>
        </div>
      ))}
    </div>
  </div>
);

export default Announcement;