import React, { useState } from "react";

import TopBar from "../../components/TopBar";

function SignupPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [acceptedTerms, setAcceptedTerms] = useState(false);

  const handleSubmit = (event) => {
    console.log(`
      Email: ${email}
      Password: ${password}
      Accepted Terms: ${acceptedTerms}
    `);

    event.preventDefault();
  };

  return (
    <div>
      <TopBar />
      <form onSubmit={handleSubmit}>
        <h1>Create Account</h1>

        <label>
          Email:
          <input
            name="email"
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </label>

        <label>
          Password:
          <input
            name="password"
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </label>

        <label>
          <input
            name="acceptedTerms"
            type="checkbox"
            onChange={(e) => setAcceptedTerms(e.target.value)}
            required
          />
          I accept the terms of service
        </label>

        <button>Submit</button>
      </form>
    </div>
  );
}

export default SignupPage;
