import React, { useState, useEffect } from "react";
import { Icons } from "../Icons/Icons";
import { useNavigate } from "react-router-dom";

export const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [user, setUser] = useState("");
  const navigate = useNavigate();
  useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token) {
      navigate("/");
    }
  }, [navigate]);

  const handleSubmit = (event) => {
    event.preventDefault();

    const data = {
      email: email,
      password: password,
      user: user,
    };

    fetch("http://127.0.0.1:8000/api/auth/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error("Network response was not ok");
        }
        return response.json();
      })
      .then((data) => {
        console.log(data.user);
        localStorage.setItem("token", data.access_token);
        localStorage.setItem("InfoUser", JSON.stringify(data.user));

        navigate("/LayoutAdmin/DashBoard");
      })
      .catch((error) => {
        console.error("There was an error!", error);
      });
  };

  return (
    <>
      <section className=" flex flex-col items-center justify-center ">
        <div className="bg-[#CBEEF3] w-[473.83px] h-[600px] top-[253.65px] left-[483.08px] rounded-[24px] border-[#F26A8D] border-[1px] px-[60px]">
          <form onSubmit={handleSubmit}>
            <div className="my-[40px]">
              <img
                src="./public/devchallenges.svg"
                alt="logo"
                className="logoOriginal"
              />

              <div className="left-[541.66px] text-[18px] my-[20px]">
                <h1 className="text-left text-[20px]">
                  <strong>Login</strong>
                </h1>
              </div>

              <div className="w-[356.48px] h-[48px] top-[399.79px] left-[541.66px] rounded-[8px] border-[#F26A8D] border-[1px] py-[10px] mb-[15px] flex items-center px-[10px]">
                <span className="material-symbols-outlined text-gray-500">
                  mail
                </span>
                <input
                  type="email"
                  name="email"
                  placeholder="Email"
                  required
                  autoComplete="off"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-[90%] h-[100%] px-[10px] focus:outline-none bg-[#CBEEF3]"
                />
              </div>

              <div className="w-[356.48px] h-[48px] top-[399.79px] left-[541.66px] rounded-[8px] border-[#F26A8D] border-[1px] py-[10px] mb-[15px] flex items-center px-[10px]">
                <span className="material-symbols-outlined text-gray-500">
                  lock
                </span>
                <input
                  type="password"
                  placeholder="Password"
                  name="password"
                  required
                  autoComplete="off"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-[90%] h-[100%] px-[10px] focus:outline-none bg-[#CBEEF3]"
                />
              </div>

              <div>
                <button
                  type="submit"
                  className=" w-[356.48px] h-[38px] top-[532.8px] left-[541.66px] rounded-[8px] bg-blue-500 text-white mt-[25px] border-none text-[16px] hover:bg-sky-500"
                >
                  Login
                </button>
              </div>

              <div className="containerTextAndItems">
                <div className="text-[14px] font-[400] items-center flex text-gray-500 justify-center my-[25px]">
                  <p>or continue with these social profile</p>
                </div>
                <div className="flex flex-row justify-center items-center gap-[20px] my-[20px]">
                  <Icons
                    srcIcons="./public/Google.svg"
                    altIcons="google Icon"
                  />
                  <Icons
                    srcIcons="./public/Facebook.svg"
                    altIcons="facebook Icon"
                  />
                  <Icons
                    srcIcons="./public/Twitter.svg"
                    altIcons="twitter Icon"
                  />
                  <Icons srcIcons="./public/Gihub.svg" altIcons="github Icon" />
                </div>
                <div className="text-[14px] font-[400] items-center flex text-gray-500 justify-center">
                  <p className="">Don’t have an account yet?</p>

                  <a
                    href="/Register.jsx"
                    className="hover:text-sky-500 ml-1 text-[#880D1E]"
                  >
                    Register
                  </a>
                </div>
              </div>
            </div>
          </form>
        </div>
        <div className="text-gray-500 text-[14px] flex justify-between mt-[10px] gap-[200px]">
          <p>
            created by{" "}
            <a href="#" className="no-underline hover:text-sky-500">
              ChissgaN
            </a>
          </p>
          <p>devChallenges.io</p>
        </div>
      </section>
    </>
  );
};
export default Login;
