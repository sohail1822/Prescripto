import React, { useState } from "react";

const Login = () => {
  const [state, setState] = useState("Sign Up");

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");

  const onSubmitHandler = async (event) => {
    event.preventDefault();
  };

  return (
    <form
      onSubmit={onSubmitHandler}
      className="min-h-[80vh] flex items-center justify-center px-4"
    >
      <div className="flex flex-col gap-5 w-full max-w-md bg-white p-10 border rounded-xl shadow-md text-zinc-700">
        {/* Title */}
        <div>
          <p className="text-3xl font-semibold text-gray-800">
            {state === "Sign Up" ? "Create Account" : "Login"}
          </p>
          <p className="text-sm mt-1 text-gray-600">
            Please {state === "Sign Up" ? "Sign Up" : "Log in"} to continue.
          </p>
        </div>

        {/* Full Name */}
        {state === "Sign Up" && (
          <div className="w-full">
            <label className="font-medium">
              Full Name <span className="text-red-600">*</span>
            </label>
            <input
              className="border border-zinc-300 rounded-md w-full p-2 mt-1 focus:border-primary focus:ring-1 focus:ring-primary outline-none"
              type="text"
              placeholder="Enter your full name"
              onChange={(e) => setName(e.target.value)}
              value={name}
              required
            />
          </div>
        )}

        {/* Email */}
        <div className="w-full">
          <label className="font-medium">
            Email <span className="text-red-600">*</span>
          </label>
          <input
            className="border border-zinc-300 rounded-md w-full p-2 mt-1 focus:border-primary focus:ring-1 focus:ring-primary outline-none"
            type="email"
            placeholder="example@mail.com"
            onChange={(e) => setEmail(e.target.value)}
            value={email}
            required
          />
        </div>

        {/* Password */}
        <div className="w-full">
          <label className="font-medium">
            Password <span className="text-red-600">*</span>
          </label>
          <input
            className="border border-zinc-300 rounded-md w-full p-2 mt-1 focus:border-primary focus:ring-1 focus:ring-primary outline-none"
            type="password"
            placeholder="Enter your password"
            onChange={(e) => setPassword(e.target.value)}
            value={password}
            required
          />
        </div>

        {/* Submit */}
        <button className="bg-primary hover:bg-primary/90 text-white w-full py-2.5 rounded-md text-base font-medium transition-all duration-300">
          {state === "Sign Up" ? "Create Account" : "Login"}
        </button>

        {/* Switch State */}
        <p className="text-sm text-gray-600 mt-1">
          {state === "Sign Up" ? (
            <>
              Already have an account?{" "}
              <span
                onClick={() => setState("Login")}
                className="text-primary underline cursor-pointer"
              >
                Login here
              </span>
            </>
          ) : (
            <>
              Create a new account?{" "}
              <span
                onClick={() => setState("Sign Up")}
                className="text-primary underline cursor-pointer"
              >
                Sign Up here
              </span>
            </>
          )}
        </p>
      </div>
    </form>
  );
};

export default Login;
