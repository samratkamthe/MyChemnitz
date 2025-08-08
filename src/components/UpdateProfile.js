import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

const UpdateProfile = (props) => {
  const [name, setName] = useState("");
  const [location, setLocation] = useState("");
  const navigate = useNavigate();
  const apiUrl=process.env.REACT_APP_API_URI

  useEffect(() => {
    // load current user data to fill the form with previous info
    const fetchUserData = async () => {
      const token = localStorage.getItem("token");
      if (!token) {
        navigate("/login");
        return;
      }

      try {
        const res = await fetch(`${apiUrl}/api/auth/getuser`, {
          method: "POST",
          headers: {
            "auth-token": token,
          },
        });
        const data = await res.json();
        setName(data.name || "");
        setLocation(data.location || "");
      } catch (err) {
        console.error("Failed to fetch user data", err);
      }
    };

    fetchUserData();
  }, [navigate,apiUrl]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const token = localStorage.getItem("token");
    if (!token) return;

    try {
      const res = await fetch(`${apiUrl}/api/auth/updateuser`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          "auth-token": token,
        },
        body: JSON.stringify({ name, location }),
      });

      const data = await res.json();

      if (res.ok) {
        props.showAlert("Profile Info updated", "success", "Successfully.");
        localStorage.setItem("name", name); // Update localStorage name
        navigate("/");
      } else {
        props.showAlert("Error", "danger", data.error || "Failed to update profile");
      }
    } catch (err) {
      props.showAlert("Error", "danger", "Server error. Try again later.");
    }
  };

  return (
    <div id="UpdatePbg" className="container mt-4">
      <h2>Update Profile</h2>
      <form onSubmit={handleSubmit} style={{ maxWidth: "400px" }}>
        <div className="mb-3">
          <label htmlFor="name" className="form-label">Name</label>
          <input
            type="text"
            id="name"
            className="form-control"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
          />
        </div>
        <div className="mb-3">
          <label htmlFor="location" className="form-label">Location</label>
          <input
            type="text"
            id="location"
            className="form-control"
            value={location}
            onChange={(e) => setLocation(e.target.value)}
            required
          />
        </div>
        <button type="submit" className="btn btn-primary">Update</button>
      </form>
    </div>
  );
};

export default UpdateProfile;
