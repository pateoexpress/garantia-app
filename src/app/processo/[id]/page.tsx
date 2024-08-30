import db from "@/db/db";
import React from "react";

interface ProcessoInfoPageProps {
  params: {
    id: string;
  };
}

const ProcessoInfoPage: React.FC<ProcessoInfoPageProps> = async ({ params }) => {
  const { id } = params;

  const res = await db.erro_consultor.findUnique({ where: { xata_id: id } });

  const localDate = res?.data ? new Date(res.data.toLocaleString('en-US', { timeZone: 'UTC' })) : null;

  return (
    <div>
      <h1>{res?.consultor}</h1>
      <p>{res?.categoria}</p>
      <p>{localDate?.toLocaleDateString('pt-BR')}</p>
      <p>{res?.inconsistencias}</p>
      <p>{res?.orientacao}</p>
      <p>{res?.os}</p>
    </div>
  );
};

export default ProcessoInfoPage;
