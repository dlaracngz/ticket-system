import React from "react";
import { FiSearch } from "react-icons/fi";

type Props = {
  value: string;
  onChange: (value: string) => void;
};

const Search = ({ value, onChange }: Props) => {
  return (
    <div>
      <div className="relative w-full max-w-lg my-4">
        <input
          value={value}
          onChange={(e) => onChange(e.target.value)}
          type="text"
          placeholder="Talep ara..."
          className="w-full rounded-xl border border-gray-200 bg-white py-2 pl-11 pr-4 outline-none transition-all text-sm"
        />
        <FiSearch
          size={18}
          className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500"
        />
      </div>
    </div>
  );
};

export default Search;
