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

  useEffect(() => {
    const userDataString = localStorage.getItem("InfoUser");
    if (userDataString) {
      const userData = JSON.parse(userDataString);
      setUserData(userData);
    }
  }, []);

  const handleSubmit = (event) => {
    event.preventDefault();

    // Datos a enviar al backend
    const data = {
      email: email,
      password: password,
      names: names,
      first_LastName: first_LastName,
      second_LastName: second_LastName,
      birthday: birthday,
    };

    // Solicitud POST al backend
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
        // Manejar la respuesta del backend
        console.log(data );
        localStorage.setItem("InfoUser", JSON.stringify(data));
        // Aquí puedes hacer algo con la respuesta, como redirigir al usuario

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
        // Manejar errores de red o errores en el backend
      });
      <div className="hidden">
      <Info 
      userData1= {data}
      
      />
      </div>
  };

  return (
    <>
      <div className=" w-[600px] pt-4 m-auto mt-12 relative ">
        <a href="/LayoutAdmin/Info" className="text-sky-500 absolute left-9 top-0 ">
          Back
        </a>
        <section className="">
          <section className="w-[550px] rounded-[12px] border-gray-200 border-[1px] mt-[10px] px-[40px] ">
            <h2 className="text-[24px] mt-[25px]">Change Info</h2>
            {/* <p className="text-[13px] text-gray-500 pt-[7px]">
              Changes will be reflected to every services
            </p> */}
            <form onSubmit={handleSubmit}>
              <div className="my-[15px]">
                <label htmlFor="email" className="text-gray-600">
                  Usuario/Correo
                </label>
                <br />
                <div className="w-[400px] h-[45px] rounded-[12px] border-[1px] border-gray-200 mt-[5px] items-center flex ">
                  <input
                    type="text"
                    id="email"
                    name="email"
                    placeholder="Escriba su correo.."
                    className="focus:outline-none w-[90%] h-[80%] px-3 bg-transparent"
                    autoComplete="off"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                  />
                  <br />
                </div>
              </div>

              <div className="my-[15px]">
                <label htmlFor="names" className="text-gray-600">
                  Nombres
                </label>
                <br />
                <div className="w-[400px] h-[45px] rounded-[12px] border-[1px] border-gray-200 mt-[5px] items-center flex ">
                  <input
                    type="text"
                    id="names"
                    name="names"
                    placeholder="Escriba su nombres.."
                    className=" focus:outline-none w-[90%] h-[80%] px-3 bg-transparent"
                    autoComplete="off"
                    value={names}
                    onChange={(e) => setNames(e.target.value)}
                  />
                  <br />
                </div>
              </div>
              <div className="my-[15px]">
                <label htmlFor="first_LastName" className="text-gray-600">
                  Primer Apellido
                </label>
                <br />
                <div className="w-[400px] h-[45px] rounded-[12px] border-[1px] border-gray-200 mt-[5px] items-center flex ">
                  <input
                    type="text"
                    id="first_LastName"
                    name="first_LastName"
                    placeholder="Escriba su primer apellido.."
                    className=" focus:outline-none w-[90%] h-[80%] px-3 bg-transparent"
                    autoComplete="off"
                    value={first_LastName}
                    onChange={(e) => setFirst_LastName(e.target.value)}
                  />
                  <br />
                </div>
              </div>
              <div className="my-[15px]">
                <label htmlFor="second_LastName	" className="text-gray-600">
                  Segundo Apellido
                </label>
                <br />
                <div className="w-[400px] h-[45px] rounded-[12px] border-[1px] border-gray-200 mt-[5px] items-center flex ">
                  <input
                    type="text"
                    id="second_LastName	"
                    name="second_LastName	"
                    placeholder="Escriba su segundo apellido.."
                    className=" focus:outline-none w-[90%] h-[80%] px-3 bg-transparent"
                    autoComplete="off"
                    value={second_LastName}
                    onChange={(e) => setSecond_LastName(e.target.value)}
                  />
                  <br />
                </div>
              </div>

              <div className="my-[15px]">
                <label htmlFor="birthday" className="text-gray-600">
                  Fecha de Nacimiento
                </label>
                <br />
                <div className="w-[400px] h-[45px] rounded-[12px] border-[1px] border-gray-200 mt-[5px] items-center flex ">
                  <input
                    type="date"
                    id="birthday"
                    name="birthday"
                    placeholder="Escriba su fecha de nacimiento.."
                    className=" focus:outline-none w-[90%] h-[80%] px-3 bg-transparent"
                    autoComplete="off"
                    value={birthday}
                    onChange={(e) => setBirthday(e.target.value)}
                  />
                  <br />
                </div>
              </div>


              <div className="my-[15px]">
                <label htmlFor="password" className="text-gray-600">
                  Contraseña
                </label>
                <br />
                <div className="w-[400px] h-[45px] rounded-[12px] border-[1px] border-gray-200 mt-[5px] items-center flex ">
                  <input
                    type="password"
                    id="password"
                    name="password"
                    placeholder="Escriba su contraseña.."
                    className=" focus:outline-none w-[90%] h-[80%] px-3 bg-transparent"
                    autoComplete="off"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                  />
                  <br />
                </div>
              </div>
              <button
                type="submit"
                className=" w-[82px] h-[38px] rounded-[8px] bg-sky-500 text-white text-[16px] mt-[15px] hover:bg-sky-400 mb-[50px]"
              >
                Save
              </button>
            </form>
          </section>
        </section>
        <div className="text-[14px] flex justify-between mt-[15px] text-gray-400 ">
          <p>
            created by{" "}
            <a href="#" className="text-gray-600">
              DerekMoscui
            </a>
          </p>
          <p>devChallenges.io</p>
        </div>
      </div>
    </>
  );
};
