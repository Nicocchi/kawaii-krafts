import React, { createContext, useContext, useEffect, useRef, useState } from "react";
import { Link } from "react-router-dom";

const DropdownContext = createContext({
  open: false,
  setOpen: () => {},
});

export const Dropdown = ({ children, ...props }) => {
  const [open, setOpen] = useState(false);
  const dropdownRef = useRef(null);


  useEffect(() => {
    function close(e) {
        if (!dropdownRef.current.contains(e.target)) {
            setOpen(false);
        }
    };

    if (open) {
        window.addEventListener("click", close);
    }

    return function removeListener() {
        window.removeEventListener("click", close);
    }
  }, [open]);

  return (
    <DropdownContext.Provider value={{ open, setOpen }}>
      <div ref={dropdownRef} className="relative m-1">{children}</div>
    </DropdownContext.Provider>
  );
};

export const DropdownButton = ({ children, ...props }) => {
  const { open, setOpen } = useContext(DropdownContext);

  function toggleOpen() {
    setOpen(!open);
  }

  return (
    <button onClick={toggleOpen} className="dropdown-button">
      {children}
      <svg
        xmlns="http://www.w3.org/2000/svg"
        fill="none"
        viewBox="0 0 24 24"
        width={15}
        height={15}
        strokeWidth={4}
        stroke="currentColor"
        className={` ${open ? "rotate-180" : "rotate-0"}`}
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          d="M19.5 8.25l-7.5 7.5-7.5-7.5"
        />
      </svg>
    </button>
  );
};

Dropdown.Button = DropdownButton;

export const DropdownContent = ({ children }) => {
  const { open } = useContext(DropdownContext);

  return (
    <div
      className={`dropdown-content ${
        open ? "shadow-md" : "hidden"
      }`}
    >
      {children}
    </div>
  );
};

Dropdown.Content = DropdownContent;

export const DropdownList = ({ children, ...props }) => {
  const { setOpen } = useContext(DropdownContext);

  return (
    <ul
      onClick={() => setOpen(false)}
      className="divide-y divide-gray-200 text-gray-700 dropdown-list"
      {...props}
    >
      {children}
    </ul>
  );
};

Dropdown.List = DropdownList;

export const DropdownItem = ({ children, ...props }) => {
  return (
    <li>
      <div className="dropdown-item" {...props}>
        {children}
      </div>
    </li>
  );
};

Dropdown.Item = DropdownItem;
