"use client";
import React, { useState } from "react";
import Navbar from "react-bootstrap/Navbar";
import Button from "react-bootstrap/Button";
import Image from "next/image";
import Nav from "react-bootstrap/Nav";
import { navItems } from "@/utils";
import MenuOpenIcon from "@mui/icons-material/MenuOpen";
import CloseIcon from "@mui/icons-material/Close";

export default function ClientNavbar() {
  const [showNavbar, setShowNavbar] = useState(false);

  function handleShowNavBar() {
    setShowNavbar(!showNavbar);
  }
  return (
    <Navbar className="fixed-top p-5 pt-3 pb-3 h-20  " bg="light" expand="md">
      <div className="image-container">
        <a href="/">
          <Image
            src="/images/logo.png"
            width={191}
            height={76}
            alt="leaf-holiday-logo"
            priority={true}
          />
        </a>
      </div>
      <div className="nav-container d-flex flex-row align-items-end w-100 flex-lg-column">
        <Button variant="success" className="p-2">
          <span className="d-flex gap-2">
            Mount Kailash (Fixed Departure 2024)
          </span>
        </Button>
        <div className="nav-list">
          <Nav className="justify-content-end">
            {navItems.map((navItem) => (
              <Nav.Link key={navItem.id} href={navItem.path}>
                {navItem.label}
              </Nav.Link>
            ))}
          </Nav>
        </div>
        <span onClick={handleShowNavBar} className="d-md-none">
          {showNavbar ? <MenuOpenIcon /> : <CloseIcon />}
        </span>
      </div>
    </Navbar>
  );
}
