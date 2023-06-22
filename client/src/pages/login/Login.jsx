import React, { useState } from "react";
import { Helmet } from "react-helmet-async";
import Container from "../../components/global/Container";
import googleIcon from "../../assets/auth/google.svg";
import facebookIcon from "../../assets/auth/facebook.svg";
import githubIcon from "../../assets/auth/github.svg";
import { AiFillEye, AiFillEyeInvisible } from "react-icons/ai";
import { Link, useLocation, useNavigate } from "react-router-dom";
import {
  FacebookAuthProvider,
  GithubAuthProvider,
  GoogleAuthProvider,
  signInWithEmailAndPassword,
  signInWithPopup,
} from "firebase/auth";
import { auth } from "../../Firebase/Firebase";
import { useScrollTop } from "../../hooks";
import { toast } from "react-hot-toast";
const Login = () => {
  useScrollTop();
  const location = useLocation();
  const navigate = useNavigate();
  const from = location?.state?.from?.pathname || "/";
  const [loading, setLoading] = useState(false);
  const [emailError, setEmailError] = useState("");
  const [passwordError, setPasswordError] = useState("");
  const [show, setShow] = useState(false);
  const [error, setError] = useState("");
  const handleLogin = (e) => {
    e.preventDefault();
    setLoading(true);
    const form = e.target;
    const email = form.email.value;
    const password = form.password.value;
    const emailregex =
      /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/;
    if (!emailregex.test(email)) {
      setLoading(false);
      setEmailError("Invalid email address");
    }
    if (!email) {
      setEmailError("Email is required");
      setLoading(false);
    }
    if (!password) {
      setPasswordError("Password is required");
      setLoading(false);
    }
    if (!email || !emailregex.test(email) || !password) {
      return;
    }

    signInWithEmailAndPassword(auth, email, password)
      .then(() => {
        setError("");
        setLoading(false);
        navigate(from);
        toast.success("Login Successfully");
      })
      .catch((error) => {
        if (error.code === "auth/user-not-found") {
          setLoading(false);
          setError("");
          setPasswordError("");
          setEmailError("Email does not exist!");
          return;
        } else if (error.code === "auth/wrong-password") {
          setLoading(false);
          setError("");
          setEmailError("");
          setPasswordError("Incorrect password!");
          return;
        }
        setLoading(false);
        setError(error.code);
      });
  };

  const handleGoogleLogin = () => {
    const provider = new GoogleAuthProvider();
    signInWithPopup(auth, provider)
      .then(() => {
        navigate(from);
        toast.success("Login Successfully");
      })
      .catch((error) => {
        setError(error.code);
      });
  };

  const handleFacebookLogin = () => {
    const provider = new FacebookAuthProvider();
    signInWithPopup(auth, provider)
      .then(() => {
        navigate(from);
        toast.success("Login Successfully");
      })
      .catch((error) => {
        setError(error.code);
      });
  };

  const handleGithubLogin = () => {
    const provider = new GithubAuthProvider();
    signInWithPopup(auth, provider)
      .then(() => {
        navigate(from);
        toast.success("Login Successfully");
      })
      .catch((error) => {
        setError(error.code);
      });
  };

  return (
    <Container className="py-5 my-20">
      <Helmet>
        <title>Login - Toy Palace</title>
      </Helmet>
      <h1 className="text-center font-bold text-indigo-900 text-2xl">Log in</h1>
      <div className="w-full max-w-md mx-auto space-y-6 mt-6">
        <div className="flex items-center justify-center gap-x-3">
          <div
            onClick={handleGoogleLogin}
            className="bg-white border border-[#dadce0] py-3 px-6 rounded cursor-pointer"
          >
            <img src={googleIcon} alt="google icon" className="w-full h-full" />
          </div>
          <div
            onClick={handleFacebookLogin}
            className="bg-[#1877f2] border border-[#dadce0] py-3 px-6 rounded cursor-pointer"
          >
            <img src={facebookIcon} alt="facebook" className="w-full h-full" />
          </div>
          <div
            onClick={handleGithubLogin}
            className="bg-[#2f363d] border border-[#dadce0] py-3 px-6 rounded cursor-pointer"
          >
            <img src={githubIcon} alt="github icon" className="w-full h-full" />
          </div>
        </div>

        <div className="relative max-w-sm mx-auto">
          <div className="absolute inset-0 flex items-center">
            <div className="w-full border-t border-gray-300" />
          </div>
          <div className="relative flex justify-center text-sm">
            <span className="bg-white px-2 text-gray-500">Or</span>
          </div>
        </div>

        <form className="space-y-5" onSubmit={handleLogin}>
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
              "Log in"
            )}
          </button>
        </form>

        <h4 className="text-center text-[#2f1c6a] font-semibold">
          New to Toy Palace?{" "}
          <Link to="/signup" className="text-indigo-500">
            Sign Up
          </Link>
        </h4>
      </div>
    </Container>
  );
};

export default Login;
