"use client";

import Button from '@mui/material/Button';
import { Input, Switch, TextField } from "@mui/material";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

export default function Home() {
  const [searchBy, setSearchBy] = useState(true);
  const [searchLabel, setSearchLabel] = useState("Address");
  const [searchValue, setSearchValue] = useState("");
  const router = useRouter();
  useEffect(() => {
    if (searchBy) {
      setSearchLabel("Address");
    }else{
      setSearchLabel("Hash");
    }
  }, [searchBy]);
  const handleSearch = () => {
    const path = searchBy
      ? `/account/${searchValue}`
      : `/transaction/${searchValue}`;

    router.push(path);
  };
  return (
    <div className="max-w-[1200px] mx-auto min-h-screen p-8 pb-20 sm:p-20 font-[family-name:var(--font-geist-sans)]">
      <h1 className="text-4xl font-bold mb-2">Block Tech App</h1>
      <div className="flex items-center gap-2 mb-2">
        <p className="text-2xl">Hash</p>
        <Switch onChange={(e)=>{setSearchBy(e.target.checked)}} defaultChecked />
        <p className="text-2xl">Address</p>
      </div>
      <div className="flex items-center gap-4 mb-2">
        <TextField onChange={(e)=>{setSearchValue(e.target.value)}} className='flex-4/5' id="outlined-basic" label={searchLabel} variant="outlined" />
        <Button onClick={handleSearch} className='flex-1/5 rounded-2xl'  variant="contained" color="primary">
          Search
        </Button>
      </div>
    </div>
  );
}
