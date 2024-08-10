import { useState } from "react";
import { Link } from "react-router-dom";

export default function SignUp() {
  const [formData, setFormData] = useState({});
  const [error, setError] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleInputChange = (e) => {
    setFormData({ ...formData, [e.target.id]: e.target.value });
  };

  const handleFormSubmit = async (e) => {
    e.preventDefault();
    try {
      setLoading(true);
      setError(false);
      const response = await fetch("/api/auth/signup", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      const responseData = await response.json();
      console.log(responseData);

      setLoading(false);
      if (responseData.error === "User already exists") {
        setError(true);
        return;
      }
    } catch (error) {
      setLoading(false);
      setError(true);
    }
  };

  return (
    <div className="p-3 max-w-lg mx-auto">
      <h1 className="text-3xl text-center font-semibold">Sign Up</h1>
      <form className="flex flex-col gap-4 mt-5" onSubmit={handleFormSubmit}>
        <input
          className="bg-slate-100 p-3 rounded-lg"
          type="text"
          name="username"
          placeholder="Username"
          id="username"
          onChange={handleInputChange}
        />
        <input
          className="bg-slate-100 p-3 rounded-lg"
          type="email"
          name="email"
          placeholder="Email"
          id="email"
          onChange={handleInputChange}
        />
        <input
          className="bg-slate-100 p-3 rounded-lg"
          type="password"
          name="password"
          placeholder="Password"
          id="password"
          onChange={handleInputChange}
        />
        <button
          id="sign-up"
          className="bg-slate-700 text-white p-3 rounded-lg uppercase hover:opacity-95 disabled:placeholder-opacity-80"
        >
          {loading ? "Loading..." : "Sign Up"}
        </button>
        {/* <button
          id="continue-with-google"
          className="bg-red-600 text-white p-3 rounded-lg uppercase hover:opacity-95 disabled:placeholder-opacity-80"
        >
          Continue with google
        </button> */}
      </form>
      <div className="flex gap-1 mt-5">
        <p>Have an account? </p>
        <Link to="/sign-in">
          <span className="text-blue-600">Sign In</span>
        </Link>
      </div>
      <p className="text-sm mt-5 text-red-600">
        {error && "Something Went Wrong..."}
      </p>
    </div>
  );
}
