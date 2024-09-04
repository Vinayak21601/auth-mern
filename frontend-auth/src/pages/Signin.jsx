import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import {
  signInStart,
  signInSuccess,
  signInFailure,
} from "../redux/user/userSlice";
import { useDispatch, useSelector } from "react-redux";
export default function Signin() {
  const [formData, setFormData] = useState({});
  const { loading, error } = useSelector((state) => state.user);

  console.log(loading, error);

  const navigate = useNavigate();
  const dispatch = useDispatch();
  const handleInputChange = (e) => {
    setFormData({ ...formData, [e.target.id]: e.target.value });
  };

  const handleFormSubmit = async (e) => {
    e.preventDefault();
    try {
      dispatch(signInStart());
      const response = await fetch("/api/auth/signin", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      const responseData = await response.json();
      console.log(responseData);
      if (responseData.success == false) {
        dispatch(signInFailure(responseData.messgae));
        return;
      }
      dispatch(signInSuccess(responseData));
      navigate("/");
    } catch (error) {
      dispatch(signInFailure(error));
    }
  };

  return (
    <div className="p-3 max-w-lg mx-auto">
      <h1 className="text-3xl text-center font-semibold">Sign</h1>
      <form className="flex flex-col gap-4 mt-5" onSubmit={handleFormSubmit}>
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
        <button
          id="continue-with-google"
          className="bg-red-600 text-white p-3 rounded-lg uppercase hover:opacity-95 disabled:placeholder-opacity-80"
        >
          Continue with google
        </button>
      </form>
      <div className="flex gap-1 mt-5">
        <p>Don't have an account? </p>
        <Link to="/sign-up">
          <span className="text-blue-600">Sign Up</span>
        </Link>
      </div>
      <p className="text-sm mt-5 text-red-600">
        {error ? error || "Something Went Wrong..." : ""}
      </p>
    </div>
  );
}
