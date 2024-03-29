import React, { useContext, useState } from "react";
import { Link, NavLink, useLocation } from "react-router-dom";
import { AuthContext } from "../../providers/AuthProvider";
import classNames from "classnames";

function Navbar(props) {
	const auth = useContext(AuthContext);
	const [navbar, setNavbar] = useState(false);
	const location = useLocation();

	//3rd value is false for left-align, true for right-align
	const userPages = [
		["Home", "/", false],
		["Test", "/test", false],
		["Test 2", "/test2", false],
		["Logout", "/logout", true]
	];
	const guestPages = [
		["Home", "/", false],
		["Test", "/test", false],
		["Login", "/login", true],
		["Register", "/register", true]
	];

	const pages = (auth.user ? userPages : guestPages);

	function closeMobileBar(newPage) {
		if (location.pathname !== newPage) {
			setNavbar(false);
		}
	}

  return (
    <nav className="bg-heroblue-150 border-heroblue-500 shadow-md border-b-4 px-2 sm:px-4 py-2.5">
			<div className="lg:container flex flex-wrap justify-between lg:justify-start items-center mx-auto px-0 lg:px-4 lg:h-full">
				<div className="lg:hidden"></div>
				<Link to="/" onClick={() => closeMobileBar("/")} className="flex items-center lg:mr-4">
						<img src={require("../../assets/logo.webp")} className="h-16" alt="Hero Handbook Logo" />
				</Link>
				<button type="button" onClick={() => setNavbar(!navbar)}
					className="inline-flex items-center p-2 mr-3 text-sm text-gray-500
					lg:hidden hover:bg-gray-200 bg-gray-50 focus:outline-none focus:ring-2 focus:ring-gray-400"
				>
					<svg className="w-6 h-6" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fillRule="evenodd" 
						d="M3 5a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zM3 10a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zM3 15a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1z" 
						clipRule="evenodd"></path>
					</svg>
				</button>
				<div className={classNames("w-full lg:block lg:w-auto", { "hidden": !navbar })}>
					<ul className="flex mt-4 bg-gray-50 lg:bg-transparent border border-gray-100 
						lg:flex-row flex-col lg:mt-0 lg:text-sm lg:font-medium lg:border-0"
					>
						{pages.map((page) => { if (!page[2]) return (
							<li key={page} className="lg:-my-2.5">
								<NavLink to={page[1]} onClick={() => closeMobileBar(page[1])}
									className="flex items-center justify-center text-heroblue-800 py-2 lg:py-3 lg:w-[106px] text-center m-2 tracking-wider bg-heroblue-200
									lg:m-1 hover:text-white lg:hover:bg-heroblue-600 font-bold"
								>
									{page[0]}
								</NavLink>
							</li>
						); return (null); })}
					</ul>
				</div>
				<div className={classNames("w-full lg:block lg:w-auto lg:ml-auto", { "hidden": !navbar })}>
					<ul className="flex mt-4 bg-gray-50 lg:bg-transparent border border-gray-100 
						lg:flex-row flex-col lg:mt-0 lg:text-sm lg:font-medium lg:border-0"
					>
						{pages.map((page) => { if (page[2]) return (
							<li key={page} className="lg:-my-2.5">
								<NavLink to={page[1]} onClick={() => closeMobileBar(page[1])}
									className="flex items-center justify-center text-heroblue-800 py-2 lg:py-3 lg:w-[106px] text-center m-2 tracking-wider bg-heroblue-200
									lg:m-1 hover:text-white lg:hover:bg-heroblue-600 font-bold"
								>
									{page[0]}
								</NavLink>
							</li>
						); return (null); })}
					</ul>
				</div>
			</div>
		</nav>
  );
}

export default Navbar;
