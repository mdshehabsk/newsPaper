/* eslint-disable no-unused-vars */
/* eslint-disable jsx-a11y/img-redundant-alt */
import React,{useEffect, useState} from "react";
import { Link , useNavigate } from "react-router-dom";
import { AiOutlineMenu } from "react-icons/ai";
import {AiOutlineUser} from 'react-icons/ai'
import { FiSearch } from "react-icons/fi";
import {AiOutlineClose} from 'react-icons/ai'
import Sidebar from "./Sidebar";
import SearchBox from "./SearchBox";
import axios from "axios";
const Navbar = () => {
  const navigate = useNavigate();
  const [user,setUser] = useState(null)
  const [image,setImage] = useState(null)
  const [showSidebar, setShowSidebar] = useState(false);
  const [showSearch, setShowSearch] = useState(false);
  const fontStyle = { fontSize: "2.5rem", cursor: "pointer" };
  const sidebarShow = () => {
    setShowSidebar(!showSidebar);
  };
  const searchShow = () => {
    setShowSearch(!showSearch);
  };
  const apicall = async () => {
    const res = await axios.get('/userAuth',{withCredentials:'true'})
    const {imageUrl,user} = res.data
    setUser(user)
    setImage(imageUrl)
  }
  useEffect(()=>{
    apicall()
  },[])
  return (
    <>
      <nav className="bg-slate-100 h-28 flex items-center ">
        <div className="container mx-8 md:mx-auto">
          <div className="nav-wrapper flex justify-between items-center w-full ">
            <div className="left flex relative ">
              {showSidebar ? (<AiOutlineClose style={fontStyle} onClick={sidebarShow} />) : (<AiOutlineMenu style={fontStyle} onClick={sidebarShow} />)}
              <FiSearch className="ml-8" style={fontStyle} onClick={searchShow} />
              {showSearch ? (<SearchBox />) : null}
            </div>
            <div className="middle">
              <h1 className="text-5xl font-bold text-rose-800"><Link to='/' >প্রথমসংবাদ</Link></h1>
            </div>
            <div className="right flex  ">
              {user ? (<Link to='/profile' ><img className="w-16 h-16 rounded-full " src={image} alt="no image" /></Link>) : <Link to='/login' > <AiOutlineUser style={fontStyle} /> </Link>}
            </div>
          </div>
        </div>
      </nav>
      <Sidebar show={showSidebar ? "block" :'hidden' }/>
    </>
  );
};

export default Navbar;
