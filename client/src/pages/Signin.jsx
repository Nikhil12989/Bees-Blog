import { Button, Label, TextInput, Alert, Spinner } from "flowbite-react";
import React, { useState } from "react";
import { Link , useNavigate } from "react-router-dom";

export default function Signin() {
  const [formData, setformData] = useState({});
  const [errorMessage, setErrorMessage] = useState(null);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate()

  const handleChange = (e) => {
    setformData({ ...formData, [e.target.id]: e.target.value.trim() });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if ( !formData.email || !formData.password) {
      return setErrorMessage("All Fields Required");
    }
  

    try {
      setLoading(true)
      setErrorMessage(null)
      const res = await fetch("/api/auth/signin", {
        method: "POST",
        headers: { 'Content-type': 'application/json' },
        body: JSON.stringify(formData),
      });

      if (!res.ok) {
        throw new Error("Failed to sign in");
      }

      // You can handle the successful signup response here if needed
      const data = await res.json();
      if (data.success === false) {
        return setErrorMessage(data.message)
      }
      setLoading(false);
      if (res.ok) {
        navigate('/')
      }
    } catch (error) {
      setErrorMessage(error.message);
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen mt-20">
      <div className="flex p-3 max-w-3xl mx-auto flex-col md:flex-row md:items-center gap-5">
        {/* Left Side  */}
        <div className="flex-1">
          <Link to="/" className="font-bold dark:text-white text-4xl">
            <span className="px-2 py-1 bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-400 rounded-lg text-white">
              Bees
            </span>
            Blog
          </Link>
          <p className="text-sm mt-5">Sign in to  Bees Blog</p>
        </div>
        {/* Right Side  */}

        <div className="flex-1">
          <form className="flex flex-col gap-4" onSubmit={handleSubmit}>
            
            <div>
              <Label value="Enter Email" />
              <TextInput
                type="email"
                placeholder="Email"
                id="email"
                onChange={handleChange}
              />
            </div>
            <div>
              <Label value="Enter Password" />
              <TextInput
                type="password"
                placeholder="password"
                id="password"
                onChange={handleChange}
              />
            </div>
            <Button gradientDuoTone="purpleToPink" type="submit" disabled={loading}>
              {
                loading ? ( 
                 <> 
                  <Spinner size='sm'/> 
                  <span className="pl-3">Loading</span>
                 </>
                ) : 'Sign in'
              }
            </Button>
          </form>
          <div className="flex gap-2 text-sm mt-5">
            <span> Dont have an account?</span>
            <Link to="/sign-up" className="text-blue-500">
              Sign up
            </Link>
          </div>
          {errorMessage && (
            <Alert className="mt-5" color="failure">
              {errorMessage}
            </Alert>
          )}
        </div>
      </div>
    </div>
  );
}
