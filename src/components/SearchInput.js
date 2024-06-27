import React, { useState, useEffect } from "react";
import axios from "axios";

const SearchInput = () => {
  const [banks, setBanks] = useState([]);

  useEffect(() => {
    const fetchBanks = async () => {
      try {
        const response = await axios.get("http://localhost:8000/api/banks/");
        setBanks(response.data);
      } catch (error) {
        console.error("Error fetching banks:", error);
      }
    };
    fetchBanks();
  }, []);

  return <div>SearchInput</div>;
};

export default SearchInput;
