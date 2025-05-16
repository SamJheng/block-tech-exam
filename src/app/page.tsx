"use client";

import Button from '@mui/material/Button';
import { Card, Input, Switch, TextField } from "@mui/material";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

export default function Home() {
  const [searchBy, setSearchBy] = useState(true);
  const [searchLabel, setSearchLabel] = useState("Address");
  const [searchValue, setSearchValue] = useState("");
  const [loading, setLoading] = useState(false);
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
    setLoading(true);
    router.push(path);
  };
  return (
    <div className="flex items-center justify-center max-w-[1200px] mx-auto min-h-screen font-[family-name:var(--font-geist-sans)]">
      <Card className="p-8 mb-8">
        <h1 className="text-4xl font-bold mb-2">Block Tech App</h1>
        <div className="flex items-center gap-2 mb-2">
          <p className="text-2xl">Hash</p>
          <Switch onChange={(e)=>{setSearchBy(e.target.checked)}} defaultChecked />
          <p className="text-2xl">Address</p>
        </div>
        <div className="flex items-center gap-4 mb-4">
          <TextField onChange={(e)=>{setSearchValue(e.target.value)}} className='w-full' id="outlined-basic" label={searchLabel} variant="outlined" />
        </div>
        <div className="flex items-center gap-4 mb-2">
          <Button loading={loading} onClick={handleSearch} className='rounded-2xl w-3xl'  variant="contained" color="primary">
            Search
          </Button>

        </div>
      </Card>
      
    </div>
  );
}
