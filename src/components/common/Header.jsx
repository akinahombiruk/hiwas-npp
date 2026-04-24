import { Home, Info, Build, Work, Contacts } from "@mui/icons-material"
import { NavLink } from "react-router-dom"
import React from "react"


export const Header = () => {
  return (
    <>
      {/* Top Header */}
      <header className="sticky-header">
        <div className="center-text">ህዋስ</div>
      </header>

      {/* Bottom Navigation */}
      <nav className="bottom-nav">
        <NavLink
          to="/"
          className={({ isActive }) => (isActive ? "active" : "")}
          aria-label="Home"
        >
          <Home />
        </NavLink>
        <NavLink
          to="/about"
          className={({ isActive }) => (isActive ? "active" : "")}
          aria-label="About"
        >
          <Info />
        </NavLink>
        <NavLink
          to="/services"
          className={({ isActive }) => (isActive ? "active" : "")}
          aria-label="Services"
        >
          <Build />
        </NavLink>
        <NavLink
          to="/portfolio"
          className={({ isActive }) => (isActive ? "active" : "")}
          aria-label="Portfolio"
        >
          <Work />
        </NavLink>
        <NavLink
          to="/contact"
          className={({ isActive }) => (isActive ? "active" : "")}
          aria-label="Contact"
        >
          <Contacts />
        </NavLink>
      </nav>
    </>
  )
}
