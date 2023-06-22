import React, { useState } from "react";
import { Helmet } from "react-helmet-async";
import { AiFillEye, AiFillEyeInvisible } from "react-icons/ai";
import { Link, useLocation, useNavigate } from "react-router-dom";
import Container from "../../components/global/Container";
import { createUserWithEmailAndPassword, updateProfile } from "firebase/auth";
import { auth } from "../../Firebase/Firebase";
import { useScrollTop } from "../../hooks";
import { toast } from "react-hot-toast";
const Signup = () => {
  useScrollTop();
  const location = useLocation();
  const navigate = useNavigate();
  const from = location?.state?.from?.pathname || "/";
  const [loading, setLoading] = useState(false);
  const [nameError, setNameError] = useState("");
  const [emailError, setEmailError] = useState("");
  const [passwordError, setPasswordError] = useState("");
  const [photoError, setPhotoError] = useState("");
  const [show, setShow] = useState(false);
  const [error, setError] = useState("");
  const handleSignup = (e) => {
    e.preventDefault();
    setLoading(true);
    const form = e.target;
    const name = form.name.value;
    const email = form.email.value;
    const password = form.password.value;
    const photoUrl = form.photo.value;
    const emailregex =
      /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/;
    if (!name) {
      setNameError("Name is required");
      setLoading(false);
    }
    if (password.length < 6) {
      setLoading(false);
      setPasswordError("Password must be at least 6 characters");
    }

    if (!password) {
      setPasswordError("Password is required");
      setLoading(false);
    }
    if (!photoUrl) {
      setPhotoError("Photo URL is required");
      setLoading(false);
    }
    if (!emailregex.test(email)) {
      setLoading(false);
      setEmailError("Invalid email address");
    }

    if (!email) {
      setEmailError("Email is required");
      setLoading(false);
    }

    // prettier-ignore
    if(!email || !emailregex.test(email) || !password || password.length < 6 || !name || !photoUrl) {
      return;
    }

    createUserWithEmailAndPassword(auth, email, password)
      .then((UserCredential) => {
        setError("");
        updateProfile(UserCredential.user, {
          displayName: name,
          photoURL: photoUrl,
        }).then(() => {
          setLoading(false);
          navigate(from);
          toast.success("Signup Successfully");
        });
      })
      .catch((error) => {
        if (error.code === "auth/email-already-in-use") {
          setLoading(false);
          setError("");
          setEmailError("Email already in use");
          return;
        } else if (error.code === "auth/network-request-failed") {
          setLoading(false);
          setEmailError("");
          setError("Network Error!");
          return;
        }
        setLoading(false);
        setError(error.code);
      });
  };
  return (
    <Container className="py-5 my-20">
      <Helmet>
        <title>Sign up - Toy Palace</title>
      </Helmet>
      <h1 className="text-center font-bold text-indigo-900 text-2xl">
        Sign up
      </h1>
      <div className="w-full max-w-md mx-auto space-y-6 mt-6">
        <form className="space-y-5" onSubmit={handleSignup}>
          <div>
            <div className="relative">
              <input
                disabled={loading}
                type="text"
                id="name"
                onChange={() => setNameError("")}
                className={`block px-4 pb-2.5 pt-4 w-full text-sm text-gray-900 ring-1 ${
                  nameError ? "ring-red-500" : "ring-gray-300"
                } focus:ring-indigo-500 focus:shadow focus:shadow-[#673de6] bg-transparent rounded appearance-none focus:outline-none peer`}
                placeholder=" "
              />
              <label
                htmlFor="name"
                className="absolute text-sm text-gray-500 duration-300 transform -translate-y-4 scale-75 top-2 z-10 origin-[0] bg-white px-4 peer-focus:px-4 peer-focus:text-indigo-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:-translate-y-1/2 peer-placeholder-shown:top-1/2 peer-focus:top-2 peer-focus:scale-75 peer-focus:-translate-y-4 left-1"
              >
                Name
              </label>
            </div>
            <p className="mt-2 text-xs text-red-500">
              <span className="font-medium">{nameError}</span>
            </p>
          </div>
          <div>
            <div className="relative">
              <input
                disabled={loading}
                type="text"
                id="email"
                onChange={() => setEmailError("")}
                className={`block px-4 pb-2.5 pt-4 w-full text-sm text-gray-900 ring-1 ${
                  emailError ? "ring-red-500" : "ring-gray-300"
                } focus:ring-indigo-500 focus:shadow focus:shadow-[#673de6] bg-transparent rounded appearance-none focus:outline-none peer`}
                placeholder=" "
              />
              <label
                htmlFor="email"
                className="absolute text-sm text-gray-500 duration-300 transform -translate-y-4 scale-75 top-2 z-10 origin-[0] bg-white px-4 peer-focus:px-4 peer-focus:text-indigo-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:-translate-y-1/2 peer-placeholder-shown:top-1/2 peer-focus:top-2 peer-focus:scale-75 peer-focus:-translate-y-4 left-1"
              >
                Email
              </label>
            </div>
            <p className="mt-2 text-xs text-red-500">
              <span className="font-medium">{emailError}</span>
            </p>
          </div>

          <div>
            <div className="relative">
              <input
                disabled={loading}
                type={show ? "text" : "password"}
                id="password"
                onChange={() => setPasswordError("")}
                className={`block px-4 pb-2.5 pt-4 w-full text-sm text-gray-900 ring-1 ${
                  passwordError ? "ring-red-500" : "ring-gray-300"
                } focus:ring-indigo-500 focus:shadow focus:shadow-[#673de6] bg-transparent rounded appearance-none focus:outline-none peer`}
                placeholder=" "
              />
              <label
                htmlFor="password"
                className="absolute text-sm text-gray-500 duration-300 transform -translate-y-4 scale-75 top-2 z-10 origin-[0] bg-white px-4 peer-focus:px-4 peer-focus:text-indigo-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:-translate-y-1/2 peer-placeholder-shown:top-1/2 peer-focus:top-2 peer-focus:scale-75 peer-focus:-translate-y-4 left-1"
              >
                Password
              </label>
              <div
                className="absolute top-3 cursor-pointer right-3"
                onClick={() => setShow((prev) => !prev)}
              >
                {show ? (
                  <AiFillEye className="text-xl" />
                ) : (
                  <AiFillEyeInvisible className="text-xl" />
                )}
              </div>
            </div>
            <p className="mt-2 text-xs text-red-500">
              <span className="font-medium">{passwordError}</span>
            </p>
          </div>

          <div>
            <div className="relative">
              <input
                disabled={loading}
                type="text"
                id="photo"
                onChange={() => setPhotoError("")}
                className={`block px-4 pb-2.5 pt-4 w-full text-sm text-gray-900 ring-1 ${
                  photoError ? "ring-red-500" : "ring-gray-300"
                } focus:ring-indigo-500 focus:shadow focus:shadow-[#673de6] bg-transparent rounded appearance-none focus:outline-none peer`}
                placeholder=" "
              />
              <label
                htmlFor="photo"
                className="absolute text-sm text-gray-500 duration-300 transform -translate-y-4 scale-75 top-2 z-10 origin-[0] bg-white px-4 peer-focus:px-4 peer-focus:text-indigo-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:-translate-y-1/2 peer-placeholder-shown:top-1/2 peer-focus:top-2 peer-focus:scale-75 peer-focus:-translate-y-4 left-1"
              >
                Photo URL
              </label>
            </div>
            <p className="mt-2 text-xs text-red-500">
              <span className="font-medium">{photoError}</span>
            </p>
          </div>

          {error && <p className="text-xs text-red-500 font-medium">{error}</p>}

          <button
            disabled={loading}
            className="w-full bg-indigo-500 hover:bg-indigo-600 disabled:hover:bg-indigo-500 transition-all px-4 py-3 rounded font-semibold text-white"
          >
            {loading ? (
              <div className="flex items-center justify-center">
                <svg
                  aria-hidden="true"
                  className="w-6 h-6 text-gray-200 animate-spin fill-indigo-600"
                  viewBox="0 0 100 101"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z"
                    fill="currentColor"
                  />
                  <path
                    d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z"
                    fill="currentFill"
                  />
                </svg>
                <span className="sr-only">Loading...</span>
              </div>
            ) : (
              "Sign up"
            )}
          </button>
        </form>

        <h4 className="text-center text-[#2f1c6a] font-semibold">
          Already have an account?{" "}
          <Link to="/login" className="text-indigo-500">
            Log in
          </Link>
        </h4>
      </div>
    </Container>
  );
};

export default Signup;
