import { FaSearch } from "react-icons/fa";
import "./SearchBar.css";

const SearchBar = () => {
  return (
    <div className="input-wrapper">
    <FaSearch id="search-icon" />
    <input
      placeholder="Type to search..."
      value={""}
      onChange={() => {}}
    />
  </div>
  )
}

export default SearchBar