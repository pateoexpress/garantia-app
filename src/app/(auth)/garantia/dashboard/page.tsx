import React from "react";
import DashboardCard from "../_components/CardsDash";
import db from "@/db/db";
import { currentUser } from "@clerk/nextjs/server";
import DashFilter from "../_components/DashFilter";
import Barchart from "../_components/BarChart";
import PieChartComponent from "../_components/PieChart";
import BarChartComponent from "../_components/InconBarChart";

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
    "01",
    "02",
    "03",
    "04",
    "05",
    "06",
    "07",
    "08",
    "09",
    "10",
    "11",
    "12",
  ];

  const data = await Promise.all(
    months.map(async (month) => {
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
              lt: endDate,
            },
          },
        }),
        db.erro_consultor.count({
          where: {
            status: true,
            filial: filial,
            data: {
              gte: startDate,
              lt: endDate,
            },
          },
        }),
      ]);

      return {
        month,
        pending,
        completed,
      };
    })
  );

  return data;
}

async function getCategoryWithCount(
  filial: string,
  month?: string,
  consultor?: string
) {
  const whereClause: any = {
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

  if (consultor) {
    whereClause.consultor = consultor;
  }

  const categorias = await db.erro_consultor.groupBy({
    by: ["categoria"],
    where: whereClause,
    _count: {
      categoria: true,
    },
  });

  return categorias.map((item) => ({
    categoria: item.categoria,
    count: item._count.categoria,
  }));
}

async function fetchBarChartData(
  filial: string,
  month?: string,
  consultor?: string,
  categoria?: string
) {
  const whereClause: any = {
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

  if (consultor) {
    whereClause.consultor = consultor;
  }

  if (categoria) {
    whereClause.categoria = categoria;
  }

  const inconsistencias = await db.erro_consultor.groupBy({
    by: ["inconsistencias"],
    where: whereClause,
    _count: {
      inconsistencias: true,
    },
  });

  return inconsistencias.map((item) => ({
    inconsistencia: item.inconsistencias,
    count: item._count.inconsistencias,
  }));
}

function formatData(data: any[]) {
  // Create an array to hold formatted data with months from January to December
  const monthsMap = [
    { name: 'JAN.', pendente: 0, concluido: 0 },
    { name: 'FEV.', pendente: 0, concluido: 0 },
    { name: 'MAR.', pendente: 0, concluido: 0 },
    { name: 'ABR.', pendente: 0, concluido: 0 },
    { name: 'MAI.', pendente: 0, concluido: 0 },
    { name: 'JUN.', pendente: 0, concluido: 0 },
    { name: 'JUL.', pendente: 0, concluido: 0 },
    { name: 'AGO.', pendente: 0, concluido: 0 },
    { name: 'SET.', pendente: 0, concluido: 0 },
    { name: 'OUT.', pendente: 0, concluido: 0 },
    { name: 'NOV.', pendente: 0, concluido: 0 },
    { name: 'DEZ.', pendente: 0, concluido: 0 },
  ];

  // Update monthsMap with actual data
  data.forEach((item) => {
    const monthIndex = parseInt(item.month, 10) - 1; // Convert month string to index (0-based)
    if (monthIndex >= 0 && monthIndex < monthsMap.length) {
      monthsMap[monthIndex].pendente = item.pending;
      monthsMap[monthIndex].concluido = item.completed;
    }
  });

  return monthsMap;
}


async function getConsultor(filial: string) {
  const consultor = db.consultores.findMany({
    where: {
      filial: filial,
    },
  });

  return consultor;
}

async function DashBoard({
  searchParams,
}: {
  searchParams?: { [key: string]: string | string[] | undefined };
}) {
  const user = await currentUser();
  const filial = user?.publicMetadata.filial as string;
  const month = searchParams?.month as string | undefined;
  const consultor = searchParams?.consultor as string | undefined;
  const category = searchParams?.categoria as string | undefined;

  const [pendentes, concluidos, monthlyData, consultores, categorias] =
    await Promise.all([
      getProcessPending(filial, month),
      getProcessConcl(filial, month),
      getMonthlyCounts(filial),
      getConsultor(filial),
      getCategoryWithCount(filial, month, consultor),
    ]);

  const pieChartData = categorias.map((cat) => ({
    name: cat.categoria,
    value: cat.count,
  }));


  const formattedMonthlyData = formatData(monthlyData);

  const showBarChart = category && consultor && month;

  const inconsistencias = showBarChart
    ? await fetchBarChartData(filial, month, consultor, category)
    : [];

  return (
    <div className="space-y-10 w-full">
      <div className="grid grid-cols-1 md:grid-cols-6 gap-10 w-full">
        <div className="col-span-6 md:col-span-2">
          <DashFilter consultores={consultores} />
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
          <Barchart data={formattedMonthlyData} />
        </div>
      </div>
      <div className="w-full">
        <div className="bg-gray-100 p-6 rounded-lg shadow-md">
          <PieChartComponent
            data={pieChartData}
            consultantName={consultor}
            month={month}
          />
        </div>
      </div>
      {showBarChart && (
        <div className="w-full">
          <div className="bg-gray-100 p-6 rounded-lg shadow-md">
            <BarChartComponent
              data={inconsistencias}
              month={month}
              consultantName={consultor}
              category={category}
            />
          </div>
        </div>
      )}
    </div>
  );
}

export default DashBoard;
