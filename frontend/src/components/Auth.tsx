import axios from "axios";
import { ChangeEvent, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { BACKEND_URL } from "../config";

const Auth = () => {
  const [signupInputs, setSignupInputs] = useState({
    name: "",
    email: "",
    password: "",
  });
  const navigate = useNavigate();

  const sendRequest = async () => {
    try {
      const res = await axios.post(`${BACKEND_URL}/api/v1/user/signup`, {
        name: signupInputs.name,
        email: signupInputs.email,
        password: signupInputs.password,
      });
      // console.log(res.data.token);
      if (!res.data.token) {
        alert("something ent worng");
        return;
      }
      localStorage.setItem("token", res.data.token);
      navigate("/blogs");
    } catch (err) {
      alert("email is already taken");
    }
  };
  return (
    <div className="h-screen flex justify-center items-center flex-col ">
      <div className="text-3xl font-bold">Create an account</div>
      <div className="text-md mt-1">
        Already have an account?
        <Link className="underline pl-2" to={"/signin"}>
          Login
        </Link>
      </div>
      <div className="mt-3 w-1/2 ">
        <LabelledInput
          label="Name"
          placeholder="Enter your full name"
          onChange={(e) => {
            setSignupInputs({
              ...signupInputs,
              name: e.target.value,
            });
          }}
        />
        <LabelledInput
          label="Email"
          placeholder="Enter your Email"
          onChange={(e) => {
            setSignupInputs({
              ...signupInputs,
              email: e.target.value,
            });
          }}
        />
        <LabelledInput
          label="Password"
          placeholder=""
          onChange={(e) => {
            setSignupInputs({
              ...signupInputs,
              password: e.target.value,
            });
          }}
        />
        <button
          type="button"
          className="mt-8 w-full text-white bg-gray-800 hover:bg-gray-900 focus:outline-none focus:ring-4 focus:ring-gray-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:bg-gray-800 dark:hover:bg-gray-700 dark:focus:ring-gray-700 dark:border-gray-700"
          onClick={sendRequest}>
          Sign up
        </button>
      </div>
    </div>
  );
};

interface LabelledInputType {
  label: string;
  placeholder: string;
  onChange: (e: ChangeEvent<HTMLInputElement>) => void;
  type?: string;
}
function LabelledInput({
  label,
  placeholder,
  onChange,
  type,
}: LabelledInputType) {
  return (
    <div>
      <label className="block mb-2 text-sm text-black font-semibold pt-4">
        {label}
      </label>
      <input
        onChange={onChange}
        type={type || "text"}
        id="first_name"
        className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 "
        placeholder={placeholder}
        required
      />
    </div>
  );
}
export default Auth;
