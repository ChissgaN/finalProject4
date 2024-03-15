import React, { useState, useEffect } from "react";
import "./info.css";
import { Link, useNavigate } from "react-router-dom";

export default function Info({ data }) {
  const [userData, setUserData] = useState(null);

  useEffect(() => {
    fetch("http://127.0.0.1:8000/api/rolls")
      .then((response) => response.json())
      .then((dataRoll) => setRolls(dataRoll))
      .catch((error) => console.error("Error fetching roles:", error));
  }, []);

  const navigate = useNavigate();
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

    console.log(data);
  }, []);

  return (
    <>
      <section>
        <h2 className="personalInfo text-[#8CFBDE]">Personal info</h2>
        <p className="basicInfo text-black">Basic info, like your name and photo</p>
      </section>

      <section>
        {userData && (
          <table className="border">
            <thead className="border">
              <tr>
                <th>
                  <div>
                    <h3 className="thProfile">Profile</h3>
                    <p className="thSomeInfo">
                      Some info may be visible to other people
                    </p>
                  </div>

                  <div className="thBtnEdit bg-[#F6E27F] text-black hover:bg-[#E6C937] hover:text-black">
                    <Link to={`/LayoutAdmin/Perfil/${userData.id}`}>
                      Editar
                    </Link>
                  </div>
                </th>
              </tr>
            </thead>

            <tbody>
              <table>
                <thead className="">
                  <tr className="flex  flex-col ">
                    <th className="justify-between border-b text-[#880D1E]">
                      Email{" "}
                      <div className="px-[40px] text-black">
                        {userData.email}
                      </div>
                    </th>

                    <th className="justify-between border-b text-[#880D1E]">
                      Names{" "}
                      <div className="px-[40px] text-black">
                        {userData.names}
                      </div>
                    </th>
                    <th className="justify-between border-b text-[#880D1E]">
                      Lastname{" "}
                      <div className="px-[40px]  text-black">
                        {userData.first_LastName} {userData.second_LastName}
                      </div>
                    </th>

                    <th className="justify-between border-b text-[#880D1E]">
                      Date of Birth{" "}
                      <div className="px-[40px]  text-black">
                        {userData.birthday}
                      </div>
                    </th>

                    <th className="justify-between border-b text-[#880D1E]">
                      Roll{" "}
                      <div className="px-[40px]  text-black">
                        {userData.roll_id}
                      </div>
                    </th>

                    <th className="justify-between border-b text-[#880D1E]">
                      PASSWORD{" "}
                      <div className="px-[40px] text-black">*********</div>
                    </th>
                  </tr>
                </thead>
              </table>
            </tbody>
          </table>
        )}
      </section>
    </>
  );
}
