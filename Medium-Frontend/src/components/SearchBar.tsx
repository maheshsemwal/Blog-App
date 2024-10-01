import React, { useCallback, useRef } from 'react';
import { SearchIcon } from "lucide-react";
import { Input } from "./ui/input";
import { useRecoilState } from "recoil";
import { searchAtom } from "@/store/atom/atom";

export function SearchBar() {
  const [, setSearchValue] = useRecoilState(searchAtom);
  const timeoutRef = useRef<NodeJS.Timeout | null>(null);

  const debounce = useCallback((val: string) => {
    if (timeoutRef.current) clearTimeout(timeoutRef.current);
    timeoutRef.current = setTimeout(() => {
      setSearchValue(val);
      console.log(val);
    }, 500);
  }, [setSearchValue]);

  return (
    <div className="flex items-center border pl-10 pr-10 rounded-2xl">
      <SearchIcon />
      <Input
        type="search"
        placeholder="Search for a Blog..."
        className="md:w-[100px] lg:w-[300px] border-none outline-none focus:border-none"
        onChange={(e) => debounce(e.target.value)}
      />
    </div>
  );
}