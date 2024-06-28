import React, { useState, useEffect } from "react";
import axios from "axios";
import "../styles/searchInput.css";

const SearchInput = () => {
  const [banks, setBanks] = useState([]);
  const [filteredBanks, setFilteredBanks] = useState([]);
  const [isBankDropdown, setIsBankDropdown] = useState(false);
  const [searchBankTerm, setSearchBankTerm] = useState("");
  const [selectedBank, setSelectedBank] = useState(null);
  const [branches, setBranches] = useState([]);
  const [filteredBranches, setFilteredBranches] = useState([]);
  const [isBranchDropdown, setIsBranchDropdown] = useState(false);
  const [searchBranchTerm, setSearchBranchTerm] = useState("");
  const [selectedBranch, setSelectedBranch] = useState(null);
  const [branchDetails, setBranchDetails] = useState(null);

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

  const toggleBankDropdown = () => {
    setFilteredBanks(banks); //重置filter為所有銀行
    setIsBankDropdown(!isBankDropdown);
  };

  const toggleBranchDropdown = () => {
    setFilteredBranches(branches);
    setIsBranchDropdown(!isBranchDropdown);
  };

  const handleBankInputChange = (e) => {
    const searchTerm = e.target.value;
    setSearchBankTerm(searchTerm);
    const filtered = banks.filter((bank) =>
      `${bank.code} ${bank.name}`
        .toLowerCase()
        .includes(searchTerm.toLowerCase())
    );
    setFilteredBanks(filtered);
    setIsBankDropdown(true);
  };

  const handleBranchInputChange = (e) => {
    const searchTerm = e.target.value;
    setSearchBranchTerm(searchTerm);
    const filtered = branches.filter((branch) =>
      `${branch.name}`.toLowerCase().includes(searchTerm.toLowerCase())
    );
    setFilteredBranches(filtered);
    setIsBranchDropdown(true);
  };

  const handleBankSelect = async (bankId, bankCode, bankName) => {
    try {
      const response = await axios.get(
        `http://localhost:8000/api/banks/${bankId}/branches/`
      );
      setBranches(response.data);
      setFilteredBranches(response.data);
      setSelectedBank(bankId);
      setSearchBankTerm(`${bankCode} ${bankName}`);
      setSelectedBranch(null);
      setSearchBranchTerm("");
      setBranchDetails(null);
      setIsBankDropdown(false);
    } catch (error) {
      console.error("Error fetching branches:", error);
    }
  };

  const handleBranchSelect = async (branchId, branchCode, branchName) => {
    try {
      const response = await axios.get(
        `http://localhost:8000/api/branches/${branchId}/`
      );
      setBranchDetails(response.data);
      setSelectedBranch(branchId);
      setSearchBranchTerm(branchName);
      setIsBranchDropdown(false);
      console.log(response.data);
    } catch (error) {
      console.error("Error fetching branch details:", error);
    }
  };

  const Dropdown = ({ data, onSelect, selectedId, displayKey }) => {
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
              onMouseDown={() => onSelect(item.id, item.code, item.name)}
            >
              {displayKey
                .split(" ")
                .map((key) => item[key])
                .join(" ")}
            </li>
          ))
        )}
      </ul>
    );
  };

  const BranchDetails = ({ data }) => {
    const copyBranchCode = () => {
      navigator.clipboard.writeText(data.code);
    };

    return (
      <div className="detail-container">
        <div className="detail-info">
          <div className="detail-area">
            <h2>
              {data.bank_name}({data.bank_code}){data.name}
            </h2>
            <div className="branch-code">
              <p>分行代碼: {data.code}</p>
              <button onClick={copyBranchCode}>複製代碼</button>
            </div>
            <p>地址: {data.address}</p>
            <p>電話: {data.phone}</p>
          </div>
          <div className="data-source">
            <p>
              資料來源:
              <a href="https://data.gov.tw/dataset/6041">政府資料開放平台</a>
            </p>
          </div>
        </div>
        <div className="button-area">
          <a href="/">
            <button>重新查詢</button>
          </a>
        </div>
      </div>
    );
  };

  return (
    <section>
      <div className="filter-area">
        <div className="bank">
          <h2 className="search-title">銀行名稱</h2>
          <div className="search-input-container">
            <div className="input-container">
              <input
                className="input"
                type="text"
                value={searchBankTerm}
                onChange={handleBankInputChange}
                placeholder="請輸入關鍵字或銀行代碼..."
                onClick={toggleBankDropdown}
                onBlur={() => setIsBankDropdown(false)}
              />
              <button
                onClick={toggleBankDropdown}
                onBlur={() => setIsBankDropdown(false)}
                className="dropdown-toggle-button"
              >
                ▼
              </button>
            </div>
            {isBankDropdown && (
              <Dropdown
                data={filteredBanks}
                onSelect={handleBankSelect}
                selectedId={selectedBank}
                displayKey="code name"
              />
            )}
          </div>
          <p className="input-hint">可使用下拉選單或直接輸入關鍵字查詢</p>
        </div>
        <div className="branch">
          <h2 className="search-title">分行名稱</h2>
          <div className="search-input-container">
            <div className="input-container">
              <input
                className="input"
                type="text"
                value={searchBranchTerm}
                onChange={handleBranchInputChange}
                placeholder="請選擇分行名稱"
                onClick={toggleBranchDropdown}
                onBlur={() => setIsBranchDropdown(false)}
                disabled={!selectedBank}
              />
              <button
                onClick={toggleBranchDropdown}
                onBlur={() => setIsBranchDropdown(false)}
                className="dropdown-toggle-button"
                disabled={!selectedBank}
              >
                ▼
              </button>
            </div>
            {isBranchDropdown && (
              <Dropdown
                data={filteredBranches}
                onSelect={handleBranchSelect}
                selectedId={selectedBranch}
                displayKey="name"
              />
            )}
          </div>
        </div>
      </div>
      {branchDetails && <BranchDetails data={branchDetails} />}
    </section>
  );
};

export default SearchInput;
