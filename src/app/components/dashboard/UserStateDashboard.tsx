"use client";

import React, { useEffect, useState } from "react";
import {
  getUsers,
  updateUser,
  getUserById,
  User,
} from "@/actions/dashboard/stateUser";

const UserTable: React.FC = () => {
  const [users, setUsers] = useState<User[]>([]);
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 10;
  const [isEditing, setIsEditing] = useState<User | null>(null);
  const [formData, setFormData] = useState({
    username: "",
    avatar: "",
    cover: "",
  });
  const [isModalOpen, setIsModalOpen] = useState(false);

  useEffect(() => {
    async function fetchUsers() {
      try {
        const data = await getUsers(
          (currentPage - 1) * itemsPerPage,
          itemsPerPage
        );
        setUsers(data);
      } catch (error) {
        console.error("Error fetching users:", error);
      }
    }

    fetchUsers();
  }, [currentPage]);

  const handlePreviousPage = () => {
    setCurrentPage((prevPage) => Math.max(prevPage - 1, 1));
  };

  const handleNextPage = () => {
    setCurrentPage((prevPage) => prevPage + 1);
  };

  const handleEditUser = async () => {
    if (!isEditing) return;
    try {
      const updatedUser = await updateUser(isEditing.id, formData);
      setUsers(
        users.map((user) => (user.id === updatedUser.id ? updatedUser : user))
      );
      setIsEditing(null);
      setFormData({ username: "", avatar: "", cover: "" });
      setIsModalOpen(false);
    } catch (error) {
      console.error("Error updating user:", error);
    }
  };

  const handleEditClick = async (userId: string) => {
    const user = await getUserById(userId);
    if (user) {
      setIsEditing(user);
      setFormData({
        username: user.username,
        avatar: user.avatar ?? "",
        cover: user.cover ?? "",
      });
      setIsModalOpen(true);
    }
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setIsEditing(null);
    setFormData({ username: "", avatar: "", cover: "" });
  };

  return (
    <div className="p-5  text-white">
      <div className="flex justify-between mb-4">
        <h1 className="text-2xl font-bold">Пользователи</h1>
      </div>
      {isModalOpen && (
        <div className="fixed inset-0 flex items-center justify-center z-50">
          <div className="bg-black opacity-75 absolute inset-0"></div>
          <div className="bg-gray-800 p-6 rounded-lg shadow-lg z-10">
            <h2 className="text-xl font-bold mb-4">Edit User</h2>
            <form
              onSubmit={(e) => {
                e.preventDefault();
                handleEditUser();
              }}
            >
              <div className="mb-4">
                <label className="block mb-2">Username</label>
                <input
                  type="text"
                  value={formData.username}
                  onChange={(e) =>
                    setFormData({ ...formData, username: e.target.value })
                  }
                  className="w-full px-3 py-2 border border-gray-600 rounded bg-gray-700 text-white"
                />
              </div>
              <div className="mb-4">
                <label className="block mb-2">Avatar URL</label>
                <input
                  type="text"
                  value={formData.avatar}
                  onChange={(e) =>
                    setFormData({ ...formData, avatar: e.target.value })
                  }
                  className="w-full px-3 py-2 border border-gray-600 rounded bg-gray-700 text-white"
                />
              </div>
              <div className="mb-4">
                <label className="block mb-2">Cover URL</label>
                <input
                  type="text"
                  value={formData.cover}
                  onChange={(e) =>
                    setFormData({ ...formData, cover: e.target.value })
                  }
                  className="w-full px-3 py-2 border border-gray-600 rounded bg-gray-700 text-white"
                />
              </div>
              <div className="flex justify-end">
                <button
                  type="submit"
                  className="px-4 py-2 bg-blue-600 text-white rounded mr-2"
                >
                  Update
                </button>
                <button
                  type="button"
                  onClick={closeModal}
                  className="px-4 py-2 bg-gray-600 text-white rounded"
                >
                  Cancel
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
      <table className="min-w-full bg-gray-800 border border-gray-700 rounded">
        <thead>
          <tr className="bg-gray-700">
            {/* <th className="py-2 px-4 border-b border-gray-600">ID</th> */}
            <th className="py-2 px-4 border-b border-gray-600">ФИО</th>
            <th className="py-2 px-4 border-b border-gray-600">Фото</th>
            {/* <th className="py-2 px-4 border-b border-gray-600">Cover</th> */}
            <th className="py-2 px-4 border-b border-gray-600">Created At</th>
            <th className="py-2 px-4 border-b border-gray-600">Actions</th>
          </tr>
        </thead>
        <tbody>
          {users.map((user) => (
            <tr key={user.id} className="hover:bg-gray-700">
              {/* <td className="py-2 px-4 border-b border-gray-600">{user.id}</td> */}
              <td className="py-2 px-4 border-b border-gray-600">
                {user.username}
              </td>
              <td className="py-2 px-4 border-b border-gray-600">
                {user.avatar ? (
                  <img
                    src={user.avatar}
                    alt="Avatar"
                    className="h-10 w-10 rounded-full object-cover"
                  />
                ) : (
                  "N/A"
                )}
              </td>
              {/* <td className="py-2 px-4 border-b border-gray-600">
                {user.cover ? (
                  <img
                    src={user.cover}
                    alt="Cover"
                    className="h-10 w-10 rounded object-cover"
                  />
                ) : (
                  "N/A"
                )}
              </td> */}
              <td className="py-2 px-4 border-b border-gray-600">
                {new Date(user.createdAt).toLocaleString()}
              </td>
              <td className="py-2 px-4 border-b border-gray-600">
                <button
                  onClick={() => handleEditClick(user.id)}
                  className="px-2 py-1 bg-gray-600 text-white rounded mr-2"
                >
                  Edit
                </button>
                <button
                  onClick={() => console.log("View Profile", user.id)}
                  className="px-2 py-1 bg-red-500 text-white rounded"
                >
                  Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      <div className="flex justify-between mt-4">
        <button
          onClick={handlePreviousPage}
          disabled={currentPage === 1}
          className="px-4 py-2 bg-gray-600 text-white rounded disabled:opacity-50"
        >
          Previous
        </button>
        <button
          onClick={handleNextPage}
          className="px-4 py-2 bg-gray-600 text-white rounded"
        >
          Next
        </button>
      </div>
    </div>
  );
};

export default UserTable;
