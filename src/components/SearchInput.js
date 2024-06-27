import React, { useState, useEffect } from "react";
import axios from "axios";
import "../styles/searchInput.css";

const SearchInput = () => {
  const [banks, setBanks] = useState([]);
  const [filteredBanks, setFilteredBanks] = useState([]);
  const [isDropdown, setIsDropdown] = useState(false);

  // fetch data
  useEffect(() => {
    const fetchBanks = async () => {
      try {
        const response = await axios.get("http://localhost:8000/api/banks/");
        setBanks(response.data);
        setFilteredBanks(response.data);
      } catch (error) {
        console.error("Error fetching banks:", error);
      }
    };
    fetchBanks();
  }, []);

  const toggleDropdown = () => {
    setFilteredBanks(banks); //重置filter為所有銀行
    setIsDropdown(!isDropdown);
  };

  const Dropdown = ({ data, onSelect, selectedId }) => {
    return (
      <ul className="dropdown">
        {data.map((item) => (
          <li
            key={item.id}
            className={`dropdown-item ${
              item.id === selectedId ? "selected" : ""
            }`}
          >
            {item.code} {item.name}
          </li>
        ))}
      </ul>
    );
  };

  return (
    <div className="bank">
      <h2 className="bank-name">銀行名稱</h2>
      <div className="search-input-container">
        <div className="input-container">
          <input
            className="bank-input"
            type="text"
            placeholder="請輸入關鍵字或銀行代碼..."
            onClick={toggleDropdown}
          />
          <button onClick={toggleDropdown} className="dropdown-toggle-button">
            ▼
          </button>
        </div>
        {isDropdown && filteredBanks.length > 0 && (
          <Dropdown data={filteredBanks} />
        )}
      </div>
      <p className="input-hint">可使用下拉選單或直接輸入關鍵字查詢</p>
    </div>
  );
};

export default SearchInput;
