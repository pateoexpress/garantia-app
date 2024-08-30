import React from "react";
import DashboardCard from "../_components/CardsDash";
import db from "@/db/db";
import { currentUser } from "@clerk/nextjs/server";
import DashFilter from "../_components/DashFilter";
import Example from "../_components/BarChart";

async function getProcessPending(filial: string, month?: string) {
  const whereClause: any = {
    status: false,
    filial: filial,
  };

  if (month) {
    const [year, monthNum] = month.split("-");
    const nextMonth = (parseInt(monthNum) % 12) + 1;
    const nextYear = nextMonth === 1 ? parseInt(year) + 1 : parseInt(year);

    whereClause.data = {
      gte: new Date(`${year}-${monthNum}-01`),
      lt: new Date(`${nextYear}-${nextMonth.toString().padStart(2, "0")}-01`),
    };
  }

  const data = await db.erro_consultor.count({
    where: whereClause,
  });

  return data.toString();
}

async function getProcessConcl(filial: string, month?: string) {
  const whereClause: any = {
    status: true,
    filial: filial,
  };

  if (month) {
    const [year, monthNum] = month.split("-");
    const nextMonth = (parseInt(monthNum) % 12) + 1;
    const nextYear = nextMonth === 1 ? parseInt(year) + 1 : parseInt(year);

    whereClause.data = {
      gte: new Date(`${year}-${monthNum}-01`),
      lt: new Date(`${nextYear}-${nextMonth.toString().padStart(2, "0")}-01`),
    };
  }

  const data = await db.erro_consultor.count({
    where: whereClause,
  });

  return data.toString();
}

async function getMonthlyCounts(filial: string) {
  const months = [
    "01", "02", "03", "04", "05", "06", 
    "07", "08", "09", "10", "11", "12"
  ];

  const data = await Promise.all(months.map(async (month) => {
    const startDate = new Date(`2024-${month}-01`);
    const endDate = new Date(startDate);
    endDate.setMonth(startDate.getMonth() + 1);

    const [pending, completed] = await Promise.all([
      db.erro_consultor.count({
        where: {
          status: false,
          filial: filial,
          data: {
            gte: startDate,
            lt: endDate
          }
        }
      }),
      db.erro_consultor.count({
        where: {
          status: true,
          filial: filial,
          data: {
            gte: startDate,
            lt: endDate
          }
        }
      })
    ]);

    return {
      month,
      pending,
      completed
    };
  }));

  return data;
}

function formatData(data: any[]) {
  const formattedData = data.map(item => ({
    name: new Date(`2024-${item.month}-01`).toLocaleString('default', { month: 'short' }).toUpperCase(),
    uv: item.pending,
    pv: item.completed
  }));
  
  return formattedData;
}




async function DashBoard({
  searchParams,
}: {
  searchParams?: { [key: string]: string | string[] | undefined };
}) {
  const user = await currentUser();
  const filial = user?.publicMetadata.filial as string;
  const month = searchParams?.month as string | undefined;

  const [pendentes, concluidos, monthlyData] = await Promise.all([
    getProcessPending(filial, month),
    getProcessConcl(filial, month),
    getMonthlyCounts(filial)
  ]);

  const formattedMonthlyData = formatData(monthlyData);

  return (
    <div className="space-y-10 w-full">
      <div className="grid grid-cols-1 md:grid-cols-6 gap-10 w-full">
        <div className="col-span-6 md:col-span-2">
          <DashFilter />
          <div className="flex flex-col pt-5 pl-2 gap-4">
            <span className="text-lg font-bold text-slate-800 underline">
              {filial.toUpperCase()}
            </span>
          </div>
        </div>
        <div className="col-span-6 md:col-span-2">
          <DashboardCard
            title="Pendentes"
            subtitle={"pending"}
            body={pendentes}
          />
        </div>
        <div className="col-span-6 md:col-span-2">
          <DashboardCard
            title="Concluídos"
            subtitle={"Done"}
            body={concluidos}
          />
        </div>
      </div>

      <div className="w-full">
        <div className="bg-gray-100 p-6 rounded-lg shadow-md">
        <Example data={formattedMonthlyData} />
        </div>
      </div>
    </div>
  );
}

export default DashBoard;
