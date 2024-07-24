"use client";

import { useState, useEffect } from "react";

interface AutocompleteProps {
  equipment: Array<{
    id: string;
    name: string;
    quantity: number;
    categories: { id: string; name: string }[];
  }>;
  onSelect: (item: { id: string; name: string; quantity: number }) => void;
}

export default function Autocomplete({ equipment, onSelect }: AutocompleteProps) {
  const [query, setQuery] = useState("");
  const [suggestions, setSuggestions] = useState<typeof equipment>([]);
  
  useEffect(() => {
    if (query.length > 0) {
      const filtered = equipment.filter(item => 
        item.name.toLowerCase().includes(query.toLowerCase())
      );
      setSuggestions(filtered);
    } else {
      setSuggestions([]);
    }
  }, [query, equipment]);

  return (
    <div className="relative">
      <input
        type="text"
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        placeholder="Введите название препарата"
        className="input input-bordered w-full"
      />
      {suggestions.length > 0 && (
        <ul className="absolute left-0 right-0 bg-white border mt-1 rounded shadow-lg z-10">
          {suggestions.map((item) => (
            <li
              key={item.id}
              className="p-2 cursor-pointer hover:bg-gray-200"
              onClick={() => {
                onSelect(item);
                setQuery("");
                setSuggestions([]);
              }}
            >
              {item.name}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
