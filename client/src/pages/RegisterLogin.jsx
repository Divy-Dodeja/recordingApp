import { useState } from "react";
import axios from "axios";
import { toast } from "react-hot-toast";
import { useNavigate } from "react-router-dom";

export default function RegisterLogin() {
  const navigate = useNavigate();
  const [data, setData] = useState({
    name: "",
    email: "",
  });
  const registerLoginUser = async (e) => {
    e.preventDefault();
    const { name, email } = data;
    try {
      const { data } = await axios.post("/registerLogin", {
        name,
        email,
      });
      if (data.error) {
        toast.error(data.error);
      } else {
        setData({});
        toast.success("Register/Login Successful, Welcome!");
        navigate("/");
      }
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <div>
      <form onSubmit={registerLoginUser}>
        <label>Name:</label>
        <br />
        <input
          type="text"
          placeholder="Enter name..."
          value={data.name}
          onChange={(e) => setData({ ...data, name: e.target.value })}
        />
        <br />
        <br />
        <label>Email: </label>
        <br />
        <input
          type="email"
          placeholder="Enter email..."
          value={data.email}
          onChange={(e) => setData({ ...data, email: e.target.value })}
        />
        <br />
        <br />
        <button type="submit">Submit</button>
      </form>
    </div>
  );
}
