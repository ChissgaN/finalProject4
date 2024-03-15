import { useNavigate } from "react-router-dom";
import React, { useState } from "react";
import { useEffect } from "react";
import Info from "./Info";

export const Perfil = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [names, setNames] = useState("");
  const [first_LastName, setFirst_LastName] = useState("");
  const [second_LastName, setSecond_LastName] = useState("");
  const [birthday, setBirthday] = useState("");
  const navigate = useNavigate();
  const [userData, setUserData] = useState(null);
  const [rollId, setRollId] = useState("");
  const [rolls, setRolls] = useState([]);

  useEffect(() => {
    fetch("http://127.0.0.1:8000/api/rolls")
      .then((response) => response.json())
      .then((dataRoll) => setRolls(dataRoll))
      .catch((error) => console.error("Error fetching roles:", error));
  }, []);

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token) {
      navigate("/");
    }
  }, [navigate]);

  useEffect(() => {
    const userDataString = localStorage.getItem("InfoUser");
    if (userDataString) {
      const userData = JSON.parse(userDataString);
      setUserData(userData);
    }
  }, []);

  const handleSubmit = (event) => {
    event.preventDefault();

    const data = {
      email: email,
      password: password,
      names: names,
      first_LastName: first_LastName,
      second_LastName: second_LastName,
      birthday: birthday,
      roll_id: rollId,
    };

    fetch(`http://127.0.0.1:8000/api/users/${userData.id}`, {
      method: "PUT",
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
        console.log(data);
        localStorage.setItem("InfoUser", JSON.stringify(data));

        setEmail("");
        setPassword("");
        setNames("");
        setFirst_LastName("");
        setSecond_LastName("");
        setBirthday("");

        navigate(`/LayoutAdmin/Perfil/${userData.id}`);
      })
      .catch((error) => {
        console.error("There was an error!", error);
      });
    <div className="hidden">
      <Info userData1={data} />
    </div>;
  };

  return (
    <>
      <div className=" w-[600px] pt-4 m-auto relative ">
        <a
          href="/LayoutAdmin/Info"
          className="text-sky-500 absolute left-[-200px] top-0 "
        >
          Back
        </a>
        <section className="absolute top-[-12px]">
          <section className="w-[550px] rounded-[12px] border-gray-200 border-[1px] px-[20px] ">
            <h2 className="text-[24px] mt-[10px]">Change Info</h2>

            <form onSubmit={handleSubmit}>
              <div className="my-[10px]">
                <label htmlFor="email" className="text-gray-600 mb-0">
                  Email
                </label>
                <br />
                <div className="w-[400px] h-[35px] rounded-[12px] border-[1px] border-gray-200 items-center flex ">
                  <input
                    type="text"
                    id="email"
                    name="email"
                    placeholder="Type your Email..."
                    className="focus:outline-none w-[90%] h-[50%] px-3 bg-transparent mt-0"
                    autoComplete="off"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                  />
                  <br />
                </div>
              </div>

              <div className="my-[15px]">
                <label htmlFor="names" className="text-gray-600 mb-0">
                  Names
                </label>
                <br />
                <div className="w-[400px] h-[35px] rounded-[12px] border-[1px] border-gray-200 items-center flex ">
                  <input
                    type="text"
                    id="names"
                    name="names"
                    placeholder="Type your names..."
                    className=" focus:outline-none w-[90%] h-[50%] px-3 bg-transparent mt-0"
                    autoComplete="off"
                    value={names}
                    onChange={(e) => setNames(e.target.value)}
                  />
                  <br />
                </div>
              </div>
              <div className="my-[15px]">
                <label htmlFor="first_LastName" className="text-gray-600 mb-0">
                  First Lastame
                </label>
                <br />
                <div className="w-[400px] h-[35px] rounded-[12px] border-[1px] border-gray-200 items-center flex ">
                  <input
                    type="text"
                    id="first_LastName"
                    name="first_LastName"
                    placeholder="Type your First Lastname..."
                    className=" focus:outline-none w-[90%] h-[50%] px-3 bg-transparent mt-0"
                    autoComplete="off"
                    value={first_LastName}
                    onChange={(e) => setFirst_LastName(e.target.value)}
                  />
                  <br />
                </div>
              </div>
              <div className="my-[15px]">
                <label htmlFor="second_LastName	" className="text-gray-600 mb-0">
                  Second Surname
                </label>
                <br />
                <div className="w-[400px] h-[35px] rounded-[12px] border-[1px] border-gray-200 items-center flex ">
                  <input
                    type="text"
                    id="second_LastName	"
                    name="second_LastName	"
                    placeholder="Type your second surname..."
                    className=" focus:outline-none w-[90%] h-[50%] px-3 bg-transparent mt-0"
                    autoComplete="off"
                    value={second_LastName}
                    onChange={(e) => setSecond_LastName(e.target.value)}
                  />
                  <br />
                </div>
              </div>

              <div className="my-[15px]">
                <label htmlFor="birthday" className="text-gray-600 mb-0">
                  Date of Birth
                </label>
                <br />
                <div className="w-[400px] h-[35px] rounded-[12px] border-[1px] border-gray-200  items-center flex ">
                  <input
                    type="date"
                    id="birthday"
                    name="birthday"
                    placeholder="Type your date of birth..."
                    className=" focus:outline-none w-[90%] h-[50%] px-3 bg-transparent mt-0"
                    autoComplete="off"
                    value={birthday}
                    onChange={(e) => setBirthday(e.target.value)}
                  />
                  <br />
                </div>
              </div>

              <div className="my-[15px]">
                <label htmlFor="password" className="text-gray-600 mb-0">
                  Password
                </label>
                <br />
                <div className="w-[400px] h-[35px] rounded-[12px] border-[1px] border-gray-200 items-center flex ">
                  <input
                    type="password"
                    id="password"
                    name="password"
                    placeholder="Type your password..."
                    className=" focus:outline-none w-[90%] h-[50%] px-3 bg-transparent mt-0"
                    autoComplete="off"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                  />
                  <br />
                </div>
                <div className="flex">
                  <select
                    id="rollId"
                    name="rollId"
                    value={rollId}
                    className="focus:outline-none w-[250px] h-[30px] px-3 border rounded-lg border-gray-300 mt-3"
                    onChange={(e) => setRollId(e.target.value)}
                  >
                    <option disabled value="">
                      Select a Roll
                    </option>
                    {rolls.map((roll) => (
                      <option key={roll.id} value={roll.id}>
                        {roll.name}
                      </option>
                    ))}
                  </select>
                </div>
              </div>
              <button
                type="submit"
                className=" w-[82px] h-[38px] rounded-[8px] bg-sky-500 text-white text-[16px] mt-[5px] hover:bg-sky-400 mb-[50px]"
              >
                Save
              </button>
            </form>
          </section>
        </section>
      </div>
    </>
  );
};
