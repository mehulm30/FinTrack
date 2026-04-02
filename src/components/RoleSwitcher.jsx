import React from "react";
import { useApp } from "../context/AppContext";

export default function RoleSwitcher() {
  const { role, setRole } = useApp();

  return (
    <div className="flex justify-end mb-4">
      <select value={role} onChange={e => setRole(e.target.value)} className="border p-2 rounded">
        <option value="viewer">Viewer</option>
        <option value="admin">Admin</option>
      </select>
    </div>
  );
}