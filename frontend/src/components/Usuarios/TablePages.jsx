import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

export const Tablepages = () => {
  const [users, setUsers] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [searchTerm, setSearchTerm] = useState("");

  const navigate = useNavigate();
  useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token) {
      navigate("/");
    }
  }, [navigate]);

  useEffect(() => {
    fetch("http://127.0.0.1:8000/api/pages")
      .then((response) => response.json())
      .then((data) => setUsers(data))
      .catch((error) => console.error("Error fetching users:", error));
  }, []);

  const handleStatusChange = (id, newStatus) => {
    fetch(`http://127.0.0.1:8000/api/pages/${id}/status`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ status: newStatus }),
    })
      .then((response) => {
        if (response.ok) {
          window.location.reload();
          setCurrentPage(1);
        } else {
          throw new Error("Error changing page status");
        }
      })
      .catch((error) => console.error("Error:", error));
  };

  const handleDelete = (id) => {
    fetch(`http://127.0.0.1:8000/api/pages/${id}`, {
      method: "DELETE",
    })
      .then((response) => {
        if (response.ok) {
          window.location.reload();
        } else {
          throw new Error("Error deleting page");
        }
      })
      .catch((error) => console.error("Error:", error));
  };

  const handleChangePage = (page) => {
    setCurrentPage(page);
  };

  const handleSearch = (event) => {
    setSearchTerm(event.target.value);
    setCurrentPage(1);
  };

  const formatDate = (dateTimeString) => {
    const dateTime = new Date(dateTimeString);
    return dateTime.toLocaleDateString();
  };

  const formatDateTime = (dateTimeString) => {
    const dateTime = new Date(dateTimeString);
    return dateTime.toLocaleString();
  };

  const filteredUsers = users.filter((user) => {
    return (
      (user.URL && user.URL.toLowerCase().includes(searchTerm.toLowerCase())) ||
      (user.name &&
        user.name.toLowerCase().includes(searchTerm.toLowerCase())) ||
      (user.description &&
        user.description.toLowerCase().includes(searchTerm.toLowerCase())) ||
      (user.created_at && user.created_at.includes(searchTerm)) ||
      (user.roll_id && user.roll_id.toString().includes(searchTerm)) ||
      (user.updated_at && user.updated_at.includes(searchTerm))
    );
  });

  const itemsPerPage = 5;
  const totalPages = Math.ceil(filteredUsers.length / itemsPerPage);
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentUsers = filteredUsers.slice(indexOfFirstItem, indexOfLastItem);

  return (
    <div className="container mx-auto py-8">
      <div className="mb-4 flex items-center justify-between">
        <input
          type="text"
          placeholder="Search..."
          value={searchTerm}
          onChange={handleSearch}
          className="p-2 border border-gray-300 rounded-md w-64"
        />
        <p className="text-gray-600">
          Page {currentPage} of {totalPages}
        </p>
      </div>
      <div className="overflow-x-auto">
        <table className="table-auto w-full border-collapse">
          <thead>
            <tr className="bg-[#F49CBB]">
              <td className="px-4 py-2 border">ID</td>
              <td className="px-4 py-2 border">URL</td>
              <td className="px-4 py-2 border">Name</td>
              <td className="px-4 py-2 border">Description</td>
              <td className="px-4 py-2 border">Status</td>
              <td className="px-4 py-2 border">Created</td>
              <td className="px-4 py-2 border">Update</td>
              <td className="px-4 py-2 border">Actions</td>
            </tr>
          </thead>
          <tbody>
            {currentUsers.map((user) => (
              <tr key={user.id} className="bg-white">
                <td className="px-4 py-2 border">{user.id}</td>
                <td className="px-4 py-2 border">{user.URL}</td>
                <td className="px-4 py-2 border">{user.name}</td>
                <td className="px-4 py-2 border">{user.description}</td>
                <td className="px-4 py-2 border">
                  <div
                    className={`rounded-md flex justify-center ${
                      user.status === "active" ? "bg-[#8CFBDE]" : "bg-[#DD2D4A]"
                    }`}
                  >
                    {user.status}
                  </div>
                </td>
                <td className="px-4 py-2 border">
                  {formatDate(user.created_at)}
                </td>
                <td className="px-4 py-2 border">
                  {formatDate(user.updated_at)}
                </td>
                <td className="px-4 py-2 border">
                  <button
                    className="bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded"
                    onClick={() => handleDelete(user.id)}
                  >
                    Delete
                  </button>
                  <button
                    className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded ml-1"
                    onClick={() =>
                      handleStatusChange(
                        user.id,
                        user.status === "active" ? "inactive" : "active"
                      )
                    }
                  >
                    Change
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <div className="flex justify-end mt-4">
        <button
          onClick={() => handleChangePage(currentPage - 1)}
          disabled={currentPage === 1}
          className={`px-4 py-2 rounded ${
            currentPage === 1
              ? "bg-[#CBEEF3] cursor-not-allowed"
              : "bg-[#CBEEF3] hover:bg-gray-300"
          }`}
        >
          Previous
        </button>
        <button
          onClick={() => handleChangePage(currentPage + 1)}
          disabled={currentPage === totalPages}
          className={`ml-4 px-4 py-2 rounded ${
            currentPage === totalPages
              ? "bg-[#CBEEF3] cursor-not-allowed"
              : "bg-[#CBEEF3] hover:bg-gray-300"
          }`}
        >
          Next
        </button>
      </div>
    </div>
  );
};
