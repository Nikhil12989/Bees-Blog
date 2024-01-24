import { Footer } from "flowbite-react";
import React from "react";
import { Link } from "react-router-dom";
import {BsFacebook , BsInstagram , BsTwitter , BsGithub , BsWhatsapp} from  'react-icons/bs';

export default function FooterCom() {
  return (
    <Footer container className="border border-t-8 border-teal-500">
      <div className="w-full max-w-7xl mx-auto">
        <div className="grid w-full justify-between sm:flex md:grid-cols-1">
          <div className="mt-5">
            <Link
              to="/"
              className="self-center whitespace-nowrap text-lg sm:text-xl font-semibold dark:dark-white"
            >
              <span className="px-2 py-1 bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-400 rounded-lg text-white ">
                Bees
              </span>
              Blog
            </Link>
          </div>
          <div className="grid grid-cols-3 gap-8 sm: mt-4 sm:grid-cols-3 sm:gap-6"> 
          <div>
          <Footer.Title title="About"/>
            <Footer.LinkGroup col> 
             <Footer.Link href="#">
                Contact
             </Footer.Link>
            </Footer.LinkGroup>
          </div>
          <div>
          <Footer.Title title="Follow us"/>
            <Footer.LinkGroup col> 
             <Footer.Link href="#">
                Github
             </Footer.Link>
             <Footer.Link href="#"> 
                Whatsapp
             </Footer.Link>
            </Footer.LinkGroup>
          </div>
          <div>
          <Footer.Title title="LEGAL"/>
            <Footer.LinkGroup col> 
             <Footer.Link href="#">
                Privacy Policy
             </Footer.Link>
             <Footer.Link href="#"> 
                Terms  and Conditions
             </Footer.Link>
            </Footer.LinkGroup>
          </div>
            
          </div>
        </div>
        <Footer.Divider/> 
        <Footer.Copyright href="#" by=" Project by Nikhil" year={new Date().getFullYear()}/>
        <div className="flex gap-4 sm:mt-0 mt-4 ">
          <Footer.Icon href="#" icon={BsFacebook} color="#1877f2" /> 
          <Footer.Icon href="#" icon={BsInstagram} color="#E4405F" /> 
          <Footer.Icon href="#" icon={BsTwitter} color="#1DA1F2" /> 
          <Footer.Icon href="#" icon={BsGithub} color="#24292e" /> 
          <Footer.Icon href="#" icon={BsWhatsapp} color="#25D366" /> 
        </div>
      </div>
    </Footer>
  );
}
