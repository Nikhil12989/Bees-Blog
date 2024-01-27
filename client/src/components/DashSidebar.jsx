import { Sidebar } from 'flowbite-react'
import {HiArrowSmRight, HiUser} from 'react-icons/hi'
import { Link, useLocation } from "react-router-dom";
import React, { useEffect, useState } from "react";
import { signOutSuccess } from '../redux/user/userSlice';
import { useDispatch } from 'react-redux';




export default function DashSidebar() {
  const dispatch = useDispatch();
    const location = useLocation();
    const [tab, setTab] = useState("");
    useEffect(() => {
      const urlParams = new URLSearchParams(location.search);
      const tabFromUrl = urlParams.get("tab");
      if (tabFromUrl) {
        setTab(tabFromUrl);
      }
    }, [location.search]);


  //handleSignout

  const handleSignout = async () => {
    try {
      const res = await fetch("/api/user/signout", {
        method: "POST",
      });
      const data = await res.json();
      if (!res.ok) {
        console.log(data.message);
      } else {
        dispatch(signOutSuccess());
        toast.success("Signed out successfully");
      }
    } catch (error) {
      console.log(error.message);
    }
  };

  return (
    <Sidebar>
        <Sidebar.Items>
            <Sidebar.ItemGroup>
                <Link to="/dashboard?tab=profile"> 
                <Sidebar.Item active={tab === 'profile'} icon={HiUser} label={"User"} labelColors='dark' as= 'div'>
                      Profile
                </Sidebar.Item>
                </Link>
                <Sidebar.Item  icon={HiArrowSmRight}    className="cursor-pointer" onClick={handleSignout}>
                      Sign Out
                </Sidebar.Item>
            </Sidebar.ItemGroup>
        </Sidebar.Items>
    </Sidebar>
  )
}
