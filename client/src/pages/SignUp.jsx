import { set } from "mongoose";
import React, { useState } from "react";
import { Link ,useNavigate} from "react-router-dom";

function SignUp() {
  const [formdata, setFormdata] = useState({
    username: "",
    email: "",
    password: ""
  });
  const [loading ,setloading]=useState()
  const [error,seterror]=useState()
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormdata({
      ...formdata,
      [e.target.id]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      setloading(true)
      const res = await fetch('/api/auth/signup', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formdata)
      });

      if (!res.ok) {
        throw new Error('Network response was not ok');
      
      }

      const data = await res.json();
      // if(!data){
      //   setloading(true)
      //   throw new Error('No data')
      // }
      setloading(false)
      seterror(null)
      navigate('/signIn');
      console.log(data);
    } catch (error) {
      seterror(error)
      setloading(true)
      console.error('There was an error!', error);
    }
  };

  return (
    <div className="p-4 max-w-lg m-auto">
      <h1 className="text-3xl text-center font-semibold">SignUp</h1>
      <form
        onSubmit={handleSubmit}
        className="flex flex-col gap-4 p-4"
      >
        <input
          type="text"
          className="border p-3 rounded-lg"
          placeholder="username"
          onChange={handleChange}
          id="username"
          value={formdata.username}
        />
        <input
          type="email"
          className="border p-3 rounded-lg"
          onChange={handleChange}
          placeholder="email"
          id="email"
          value={formdata.email}
        />
        <input
          type="password"
          className="border p-3 rounded-lg"
          onChange={handleChange}
          placeholder="password"
          id="password"
          value={formdata.password}
        />
        <button  disabled={loading} className="bg-slate-700 text-slate-50 rounded-lg hover:opacity-70 disabled:opacity-80 p-3 uppercase0">
         {loading?'Loading...' : 'SignUp'}

        </button>
      </form>
      <div className="flex gap-2 mt-5">
        <p>
          Have an account? <Link to="/signIn">Sign In</Link>
        </p>
      </div>
      <p className="text-red-700">{error?error.message:''}</p>
    </div>
  );
}

export default SignUp;
