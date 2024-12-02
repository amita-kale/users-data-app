import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "../utils/api";

const UserDetail = () => {
  const { id } = useParams();
  const [user, setUser] = useState(null);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const response = await axios.get(`/users/${id}`);
        setUser(response.data);
      } catch (err) {
        setError("Unable to fetch user details.");
      }
    };
    fetchUser();
  }, [id]);

  if (error) return <div>{error}</div>;
  if (!user) return <div>Loading...</div>;

  return (
    <div className="p-4 border border-gray-200 rounded shadow-sm">
      <h3 className="text-lg font-bold">{user.name}</h3>
      <p>Email: {user.email}</p>
      <p>Phone: {user.phone}</p>
      <p>
        Address: {user.address.street}, {user.address.city}
      </p>
      <p>Company: {user.company.name}</p>
    </div>
  );
};

export default UserDetail;
