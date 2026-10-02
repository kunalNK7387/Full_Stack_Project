import React from "react";

const Register = () => {
  const handleSubmit = (e) => {
    e.preventDefault();
  };
  return (
    <main>
      <div className="form-container">
        <h1>Register</h1>
        <form onSubmit={handleSubmit}>
          <div className="input-group">
            <label htmlFor="username">User Name</label>
            <input
              type="text"
              id="username"
              name="username"
              placeholder="Enter User Name"
            />
          </div>
          <div className="input-group">
            <label htmlFor="email">Email</label>
            <input
              type="email"
              id="email"
              name="email"
              placeholder="Enter Email Address"
            />
          </div>
          <div className="input-group">
            <label htmlFor="password">Password</label>
            <input
              type="password"
              id="password"
              name="password"
              placeholder="Enter Password"
            />
          </div>
          <button className="button primary-button">Register</button>
        </form>
      </div>
    </main>
  );
};

export default Register;
