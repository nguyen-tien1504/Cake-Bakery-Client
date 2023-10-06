import { useState } from "react";
import "./SignupLoginForm.css";
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signInWithPopup,
  updateProfile,
} from "firebase/auth";
import { auth, facebookProvider, googleProvider } from "../../../services/FireBase";
import { useDispatch } from "react-redux";
import { login } from "../../../services/Redux/userSlice";
const SignupLoginForm = () => {
  const [userValue, setUserValue] = useState();
  const dispatch = useDispatch();
  const handleUserInput = (e) => {
    setUserValue({ ...userValue, [e.target.name]: e.target.value });
  };

  const handleSignupUser = async (e) => {
    const { email, pwd, userName } = userValue;
    e.preventDefault();
    try {
      const userCredential = await createUserWithEmailAndPassword(auth, email, pwd);
      if (userName) {
        await updateProfile(auth.currentUser, { displayName: userName });
      }
      dispatch(login({ user: userCredential.user }));
      e.target.reset();
    } catch (err) {
      console.log(err.message);
    }
  };

  const handleLoginUser = async (e) => {
    const { email, pwd } = userValue;
    e.preventDefault();
    try {
      const userCredential = await signInWithEmailAndPassword(auth, email, pwd);
      dispatch(login({ user: userCredential.user }));
      e.target.reset();
    } catch (err) {
      console.log(err);
    }
  };

  const handleLoginWithGoogle = async () => {
    try {
      const loginResult = await signInWithPopup(auth, googleProvider);
      // This gives you a Google Access Token. You can use it to access the Google API.
      // const credential = GoogleAuthProvider.credentialFromResult(result);
      // const token = credential.accessToken;

      // The signed-in user info.
      const user = loginResult.user;
      dispatch(login({ user }));
    } catch (error) {
      console.log(error);
    }
  };

  const handleLoginWithFacebook = async () => {
    try {
      const loginResult = await signInWithPopup(auth, facebookProvider);
      console.log(loginResult);
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <div className="login_page">
      <div className="login_container">
        <input
          type="checkbox"
          id="chk"
          aria-hidden="true"
        />

        <div className="signup">
          <form onSubmit={handleSignupUser}>
            <label
              htmlFor="chk"
              aria-hidden="true">
              Sign up
            </label>
            <input
              type="text"
              name="userName"
              placeholder="User name"
              onChange={handleUserInput}
            />
            <input
              type="email"
              name="email"
              placeholder="Email"
              onChange={handleUserInput}
            />
            <input
              type="password"
              name="pwd"
              placeholder="Password"
              onChange={handleUserInput}
            />
            <button type="submit">Sign up</button>
          </form>
        </div>

        <div className="login">
          <form onSubmit={handleLoginUser}>
            <label
              htmlFor="chk"
              aria-hidden="true">
              Login
            </label>
            <input
              type="email"
              name="email"
              placeholder="Email"
              onChange={handleUserInput}
            />
            <input
              type="password"
              name="pwd"
              placeholder="Password"
              onChange={handleUserInput}
            />
            <button type="submit">Login</button>
          </form>
          <p style={{ textAlign: "center" }}>or</p>
          <button
            className="login-button"
            onClick={handleLoginWithGoogle}>
            <img
              src="https://www.google.com/images/branding/googlelogo/1x/googlelogo_color_272x92dp.png"
              alt="Google Logo"
              className="google-logo"
            />
            <span className="button-text">Login with Google</span>
          </button>

          <button
            className="login-button"
            onClick={handleLoginWithFacebook}>
            <img
              src="https://www.facebookbrand.com/wp-content/uploads/2019/04/f_logo_RGB-Hex-Blue_512.png"
              alt="Facebook Logo"
              className="facebook-logo"
            />
            <span className="button-text">Login with Facebook</span>
          </button>
        </div>
      </div>
    </div>
  );
};

export default SignupLoginForm;
