import React, { useState, useEffect } from "react";
import axios from "axios";
import "../styles/searchInput.css";

const SearchInput = () => {
  const [banks, setBanks] = useState([]);
  const [filteredBanks, setFilteredBanks] = useState([]);
  const [isDropdown, setIsDropdown] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");

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
        {data.length === 0 ? (
          <li className="dropdown-no-data">無相關資料</li>
        ) : (
          data.map((item) => (
            <li
              key={item.id}
              className={`dropdown-item ${
                item.id === selectedId ? "selected" : ""
              }`}
            >
              {item.code} {item.name}
            </li>
          ))
        )}
      </ul>
    );
  };

  const handleInputChange = (e) => {
    const searchTerm = e.target.value;
    setSearchTerm(searchTerm);
    const filtered = banks.filter((bank) =>
      `${bank.code} ${bank.name}`
        .toLowerCase()
        .includes(searchTerm.toLowerCase())
    );
    setFilteredBanks(filtered);
    setIsDropdown(true);
  };

  return (
    <div className="bank ref={containerRef}">
      <h2 className="bank-name">銀行名稱</h2>
      <div className="search-input-container">
        <div className="input-container">
          <input
            className="bank-input"
            type="text"
            value={searchTerm}
            onChange={handleInputChange}
            placeholder="請輸入關鍵字或銀行代碼..."
            onClick={toggleDropdown}
            onBlur={() => setIsDropdown(false)}
          />
          <button onClick={toggleDropdown} className="dropdown-toggle-button">
            ▼
          </button>
        </div>
        {isDropdown && <Dropdown data={filteredBanks} />}
      </div>
      <p className="input-hint">可使用下拉選單或直接輸入關鍵字查詢</p>
    </div>
  );
};

export default SearchInput;
