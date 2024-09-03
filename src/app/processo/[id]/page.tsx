import db from "@/db/db";
import React from "react";

interface ProcessoInfoPageProps {
  params: {
    id: string;
  };
}

const ProcessoInfoPage: React.FC<ProcessoInfoPageProps> = async ({
  params,
}) => {
  const { id } = params;

  const res = await db.erro_consultor.findUnique({ where: { xata_id: id } });

  const localDate = res?.data
    ? new Date(res.data.toLocaleString("en-US", { timeZone: "UTC" }))
    : null;

  return (
    <div className="max-w-3xl mx-auto p-6 bg-white shadow-lg rounded-lg mt-10">
      <h1 className="text-2xl font-bold text-gray-800 mb-4">
        {res?.consultor}
      </h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div className="bg-gray-100 p-4 rounded-lg">
          <h2 className="text-lg font-semibold text-gray-700">OS</h2>
          <p className="text-gray-600">{res?.os}</p>
        </div>
        <div className="bg-gray-100 p-4 rounded-lg">
          <h2 className="text-lg font-semibold text-gray-700">Data</h2>
          <p className="text-gray-600">
            {localDate?.toLocaleDateString("pt-BR")}
          </p>
        </div>
        <div className="bg-gray-100 p-4 rounded-lg">
          <h2 className="text-lg font-semibold text-gray-700">Categoria</h2>
          <p className="text-gray-600">{res?.categoria}</p>
        </div>
        <div className="bg-gray-100 p-4 rounded-lg">
          <h2 className="text-lg font-semibold text-gray-700">
            Inconsistência
          </h2>
          <p className="text-gray-600">{res?.inconsistencias}</p>
        </div>
        <div className="bg-gray-100 p-4 rounded-lg sm:col-span-2">
          <h2 className="text-lg font-semibold text-gray-700">Orientação</h2>
          <p className="text-gray-600">{res?.orientacao}</p>
        </div>
      </div>
    </div>
  );
};

export default ProcessoInfoPage;
