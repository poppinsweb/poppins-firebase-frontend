// import React, { useState } from "react";
// import axios from "axios";
// import "../../styles/admin/create-user.css";

// const CreateUser = () => {
//   const [email, setEmail] = useState("");
//   const [password, setPassword] = useState("");
//   const [role, setRole] = useState("user");
//   const [message, setMessage] = useState("");

//   const handleRegister = async (e) => {
//     e.preventDefault();

//     const userData = {
//       email,
//       password,
//       admin: role === "admin",
//     };

//     try {
//       const response = await axios.post(
//         `${import.meta.env.VITE_API_URL}/register`,
//         userData
//       );
//       console.log(response);
//       setMessage("User registered successfully!");
//       // Reset form fields
//       setEmail("");
//       setPassword("");
//       setRole("user");
//     } catch (error) {
//       setMessage("Failed to register user");
//       console.error("Error:", error);
//     }
//   };

//   return (
//     <div className="registration-container">
//       <div className="register-card">
//         <h2 className="title-register">Registrar Usuarios</h2>
//         <form onSubmit={handleRegister}>
//           <div>
//             <label>Correo Electrónico:</label>
//             <input
//               className="form-control"
//               type="text"
//               value={email}
//               onChange={(e) => setEmail(e.target.value)}
//               required
//             />
//           </div>
//           <div>
//             <label>Contraseña:</label>
//             <input
//               className="form-control"
//               type="password"
//               value={password}
//               onChange={(e) => setPassword(e.target.value)}
//               required
//             />
//           </div>
//           <div>
//             <label>Rol:</label>
//             <select
//               value={role}
//               onChange={(e) => setRole(e.target.value)}
//               className="form-select"
//             >
//               <option value="user">Usuario</option>
//               <option value="admin">Administrador</option>
//             </select>
//           </div>
//           <button className="btn btn-color" type="submit">
//             Crear usuario
//           </button>
//         </form>
//         {message && <p>{message}</p>}
//       </div>
//     </div>
//   );
// };

// export default CreateUser;
