"use client";

import { useState } from "react";
import { Plus, Edit2, Trash2 } from "lucide-react";
import { motion } from "framer-motion";
import { cn } from "@/lib/utils";
import { AddUserModal } from "./add-user-modal";

const initialUsers = [
  {
    name: "Admin User",
    email: "admin@fleet.com",
    role: "Admin",
    lastActive: "Just now",
  },
  {
    name: "John Dispatcher",
    email: "john@fleet.com",
    role: "Dispatcher",
    lastActive: "2 hours ago",
  },
  {
    name: "Sarah Manager",
    email: "sarah@fleet.com",
    role: "Manager",
    lastActive: "1 day ago",
  },
  {
    name: "Mike Viewer",
    email: "mike@fleet.com",
    role: "Viewer",
    lastActive: "3 days ago",
  },
];

const roleStyles = {
  Admin: "bg-destructive/10 text-destructive border-destructive/20",
  Dispatcher: "bg-primary/10 text-primary border-primary/20",
  Manager: "bg-amber-500/10 text-amber-500 border-amber-500/20",
  Viewer: "bg-slate-500/10 text-slate-400 border-slate-500/20",
};

export function UsersRolesTab() {
  const [users, setUsers] = useState(initialUsers);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleAddUser = (newUser: { name: string; email: string; role: string }) => {
    const userWithActivity = {
      ...newUser,
      lastActive: "Just now",
    };
    setUsers([userWithActivity, ...users]);
  };

  const handleDeleteUser = (email: string) => {
    setUsers(users.filter(u => u.email !== email));
  };

  return (
    <>
      <motion.div
        initial={{ opacity: 0, x: 20 }}
        animate={{ opacity: 1, x: 0 }}
        className="bg-card border border-border rounded-2xl overflow-hidden shadow-2xl"
      >
        <div className="p-6 border-b border-border flex items-center justify-between bg-gradient-to-r from-transparent to-muted/20">
          <h2 className="text-xl font-bold text-foreground">User Management</h2>
          <button
            onClick={() => setIsModalOpen(true)}
            className="flex items-center gap-2 bg-primary hover:bg-primary/90 text-primary-foreground px-4 py-2 rounded-lg font-semibold transition-all duration-300 hover:shadow-[0_0_20px_rgba(var(--primary),0.3)] group"
          >
            <Plus className="h-4 w-4 group-hover:rotate-90 transition-transform" />
            Add User
          </button>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="border-b border-border bg-muted/30">
                <th className="px-6 py-4 text-xs font-bold text-muted-foreground uppercase tracking-widest">Name</th>
                <th className="px-6 py-4 text-xs font-bold text-muted-foreground uppercase tracking-widest">Email</th>
                <th className="px-6 py-4 text-xs font-bold text-muted-foreground uppercase tracking-widest">Role</th>
                <th className="px-6 py-4 text-xs font-bold text-muted-foreground uppercase tracking-widest">Last Active</th>
                <th className="px-6 py-4 text-xs font-bold text-muted-foreground uppercase tracking-widest text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-border">
              {users.map((user, index) => (
                <tr
                  key={user.email}
                  className="group hover:bg-muted/10 transition-colors"
                  style={{ animationDelay: `${index * 50}ms` }}
                >
                  <td className="px-6 py-4">
                    <span className="text-foreground font-medium group-hover:text-primary transition-colors">{user.name}</span>
                  </td>
                  <td className="px-6 py-4 text-muted-foreground">
                    {user.email}
                  </td>
                  <td className="px-6 py-4">
                    <span className={cn(
                      "px-3 py-1 rounded-full text-[10px] font-bold border uppercase tracking-widest",
                      roleStyles[user.role as keyof typeof roleStyles]
                    )}>
                      {user.role}
                    </span>
                  </td>
                  <td className="px-6 py-4 text-muted-foreground italic">
                    {user.lastActive}
                  </td>
                  <td className="px-6 py-4">
                    <div className="flex items-center justify-end gap-3 translate-x-4 opacity-0 group-hover:translate-x-0 group-hover:opacity-100 transition-all duration-300">
                      <button className="p-2 text-primary hover:bg-primary/10 rounded-lg transition-colors">
                        <Edit2 className="h-4 w-4" />
                      </button>
                      <button
                        onClick={() => handleDeleteUser(user.email)}
                        className="p-2 text-destructive hover:bg-destructive/10 rounded-lg transition-colors"
                      >
                        <Trash2 className="h-4 w-4" />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </motion.div>

      <AddUserModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onAdd={handleAddUser}
      />
    </>
  );
}
