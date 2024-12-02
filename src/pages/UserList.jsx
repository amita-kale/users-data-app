import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { fetchUsers } from "../store/userSlice";
import SearchBar from "../components/SearchBar";

const UserList = () => {
  const dispatch = useDispatch();
  const { users, loading, error } = useSelector((state) => state.user);
  const [searchTerm, setSearchTerm] = useState("");

  useEffect(() => {
    dispatch(fetchUsers());
  }, [dispatch]);

  const filteredUsers = users.filter(
    (user) =>
      user.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      user.email.toLowerCase().includes(searchTerm.toLowerCase())
  );

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error}</div>;

  return (
    <div>
      <SearchBar searchTerm={searchTerm} setSearchTerm={setSearchTerm} />
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {filteredUsers.map((user) => (
          <div
            key={user.id}
            className="p-4 border border-gray-200 rounded shadow-sm"
          >
            <h3 className="text-lg font-bold">{user.name}</h3>
            <p>{user.email}</p>
            <p>{user.phone}</p>
            <p>{user.company.name}</p>
            <Link
              to={`/users/${user.id}`}
              className="text-blue-500 hover:underline"
            >
              View Details
            </Link>
          </div>
        ))}
      </div>
    </div>
  );
};

export default UserList;
