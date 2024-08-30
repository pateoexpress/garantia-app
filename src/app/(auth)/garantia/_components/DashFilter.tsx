'use client'

import { Input } from '@/components/ui/input'
import { useRouter } from 'next/navigation';
import React from 'react';

function DashFilter() {
  const router = useRouter();
  const today = new Date();
  const currentYear = today.getFullYear();
  const currentMonth = (today.getMonth() + 1).toString().padStart(2, "0");
  const maxMonth = `${currentYear}-${currentMonth}`;


  const handleMonthChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const selectedMonth = event.target.value;
    router.push(`?month=${selectedMonth}`);
  };

  return (
    <div>
      <Input type="month" max={maxMonth} onChange={handleMonthChange} />
    </div>
  );
}

export default DashFilter;
