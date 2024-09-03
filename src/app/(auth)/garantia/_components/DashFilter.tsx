"use client";

import { Input } from "@/components/ui/input";
import { useRouter } from "next/navigation";
import { Consultores } from "@prisma/client";
import {
  Select,
  SelectTrigger,
  SelectContent,
  SelectItem,
  SelectValue,
  SelectGroup,
} from "@/components/ui/select";
import React, { useState } from "react";
import { Button } from "@/components/ui/button";

interface DashFilterProps {
  consultores: Consultores[];
}

function DashFilter({ consultores }: DashFilterProps) {
  const router = useRouter();
  const today = new Date();
  const currentYear = today.getFullYear();
  const currentMonth = (today.getMonth() + 1).toString().padStart(2, "0");
  const maxMonth = `${currentYear}-${currentMonth}`;

  const [selectedMonth, setSelectedMonth] = useState("");
  const [selectedConsultor, setSelectedConsultor] = useState("");

  const updateURL = (month: string, consultor: string) => {
    const params = new URLSearchParams();
    if (month) params.set("month", month);
    if (consultor) params.set("consultor", consultor);
    router.push(`?${params.toString()}`);
  };

  const handleMonthChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const month = event.target.value;
    setSelectedMonth(month);
    updateURL(month, selectedConsultor);
  };

  const handleConsultorChange = (value: string) => {
    setSelectedConsultor(value);
    updateURL(selectedMonth, value);
  };

  const clearFilters = () => {
    setSelectedMonth("");
    setSelectedConsultor("");
    router.push("/garantia/dashboard");
  };

  return (
    <div className="flex flex-row gap-5">
      <div className="flex flex-col gap-5">
        <Input
          className="w-[200px]"
          type="month"
          max={maxMonth}
          value={selectedMonth}
          onChange={handleMonthChange}
        />
        <Select value={selectedConsultor} onValueChange={handleConsultorChange}>
          <SelectTrigger className="w-[200px]">
            <SelectValue placeholder="Selecione um consultor" />
          </SelectTrigger>
          <SelectContent>
            <SelectGroup>
              {consultores.map((consultor) => (
                <SelectItem key={consultor.xata_id} value={consultor.name}>
                  {consultor.name}
                </SelectItem>
              ))}
            </SelectGroup>
          </SelectContent>
        </Select>
      </div>
      <div>
        <Button onClick={clearFilters} variant="outline" className="w-[180px]">
          Limpar Filtros
        </Button>
      </div>
    </div>
  );
}

export default DashFilter;
