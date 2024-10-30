import React from "react";
import PropTypes from "prop-types";

const Header = ({onSearch}) => {
  const [search, setSearch] = React.useState("");
  return (
    <div className="flex items-center justify-between p-4 fixed top-0 left-0 w-full z-[9999] bg-black ">
      <div className="flex items-center gap-8">
        <h1 className="text-[30px] uppercase text-red-700 font-bold">Movie</h1>
        <nav className="hidden md:flex items-center space-x-5">
          <a href="#" className="hover:text-red-700">
            Home
          </a>
          <a href="#" className="hover:text-red-700">
            About
          </a>
          <a href="#" className="hover:text-red-700">
            Contact
          </a>
        </nav>
      </div>

      <div className="flex items-center space-x-5">
        <input
          type="text"
          placeholder="Search for movies"
          className="border border-gray-300 p-2 rounded-md text-black"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
        <button
          className="bg-red-700 text-white px-3 py-1 rounded-lg"
          onClick={() => onSearch(search)}
        >
          Search
        </button>
      </div>
    </div>
  );
};

Header.propTypes = {
  onSearch: PropTypes.func.isRequired,
};

export default Header;
