import { Button, Label, TextInput } from "flowbite-react";
import React from "react";
import { Link } from "react-router-dom";


export default function Signup() {
  return (
    <div className="min-h-screen mt-20">
      <div className="flex p-3 max-w-3xl mx-auto flex-col md:flex-row md:items-center gap-5">
        {/* Left Side  */}
        <div className="flex-1">
        <Link
        to="/"
        className="  font-bold dark:text-white text-4xl" 
      >
        <span className="px-2 py-1 bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-400 rounded-lg text-white ">
          Bees
        </span>
        Blog
      </Link>
      <p className="text-sm mt-5">
        Create your Account with Bees Blog 
      </p>
        </div>
        {/* Right Side  */}
        <div className="flex-1">
         <form className="flex flex-col gap-4" >
          <div> 
            <Label value="Enter Username"/>
            <TextInput 
            type="text"
            placeholder="username"
            id="username"/>
          </div>
          <div> 
            <Label value="Enter Email"/>
            <TextInput 
            type="text"
            placeholder="Email"
            id="username"/>
          </div>
          <div> 
            <Label value="Enter Password"/>
            <TextInput 
            type="text"
            placeholder="password"
            id="username"/>
          </div>
          <Button gradientDuoTone="purpleToPink" type="submit">
             Sign up
          </Button>
         </form>
         <div className="flex gap-2 text-sm mt-5">
              <span>Have an account?</span>  
              <Link to="/sign-in" className="text-blue-500"> Sign in</Link>
         </div>
        </div>
      </div>
    </div>
  );
}
