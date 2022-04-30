import React, { useState } from "react";
import { Input } from "antd";

const SearchBar = ({
  label,
  handleSearch,
  handleSearchChange,
  searchText,
}: {
  label: string;
  handleSearchChange: Function;
  handleSearch: Function;
  searchText: string;
}) => {
  const [timer, setTimer] = useState<number | null>(null);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (timer) {
      clearTimeout(timer);
    }
    handleSearchChange(e.target.value);
    setTimer(setTimeout(handleSearch, 500, e.target.value));
  };

  return (
    <Input
      placeholder={label}
      onChange={handleChange}
      style={{ width: 200 }}
      value={searchText}
      allowClear
    />
  );
};

export default SearchBar;
