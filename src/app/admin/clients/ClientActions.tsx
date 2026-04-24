"use client";

import { useState } from "react";
import { Client } from "@prisma/client";
import { updateClient, deleteClient } from "@/lib/actions";

export default function ClientActions({ client }: { client: Client }) {
  const [isEditing, setIsEditing] = useState(false);
  const [formData, setFormData] = useState({
    name: client.name,
    email: client.email,
    company: client.company || "",
  });

  const handleDelete = async () => {
    if (confirm(`Are you sure you want to delete ${client.name}? This will also delete all their invoices.`)) {
      await deleteClient(client.id);
    }
  };

  const handleUpdate = async (e: React.FormEvent) => {
    e.preventDefault();
    await updateClient(client.id, formData.name, formData.email, formData.company);
    setIsEditing(false);
  };

  return (
    <div className="flex gap-2">
      <button onClick={() => setIsEditing(true)} className="text-amber-600 hover:text-amber-800 text-xs font-bold uppercase tracking-wider">Edit</button>
      <button onClick={handleDelete} className="text-red-600 hover:text-red-800 text-xs font-bold uppercase tracking-wider">Delete</button>

      {isEditing && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-xl shadow-2xl w-full max-w-md p-6">
            <div className="flex justify-between items-center mb-6">
              <h3 className="font-bold text-gray-800">Edit Client: {client.name}</h3>
              <button onClick={() => setIsEditing(false)} className="text-gray-400 hover:text-gray-600">✕</button>
            </div>
            
            <form onSubmit={handleUpdate} className="space-y-4 text-left">
              <div>
                <label className="block text-xs font-bold text-gray-400 uppercase mb-1">Name</label>
                <input 
                  type="text" 
                  value={formData.name} 
                  onChange={(e) => setFormData({...formData, name: e.target.value})}
                  className="w-full border rounded p-2 text-sm text-gray-800"
                  required
                />
              </div>
              <div>
                <label className="block text-xs font-bold text-gray-400 uppercase mb-1">Email</label>
                <input 
                  type="email" 
                  value={formData.email} 
                  onChange={(e) => setFormData({...formData, email: e.target.value})}
                  className="w-full border rounded p-2 text-sm text-gray-800"
                  required
                />
              </div>
              <div>
                <label className="block text-xs font-bold text-gray-400 uppercase mb-1">Company</label>
                <input 
                  type="text" 
                  value={formData.company} 
                  onChange={(e) => setFormData({...formData, company: e.target.value})}
                  className="w-full border rounded p-2 text-sm text-gray-800"
                />
              </div>
              
              <div className="pt-4 flex justify-end gap-2">
                <button type="button" onClick={() => setIsEditing(false)} className="px-4 py-2 text-sm font-bold text-gray-500 hover:text-gray-700">Cancel</button>
                <button type="submit" className="bg-amber-600 text-white px-6 py-2 rounded-lg font-bold hover:bg-amber-700">Save Changes</button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
