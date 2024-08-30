import { DataTable } from "@/components/ui/data-table";
import React from "react";
import { columns } from "./_components/columnsGa";
import db from "@/db/db";
import { currentUser } from "@clerk/nextjs/server";

async function GarantiaPage() {
  const user = await currentUser();
  const filial = user?.publicMetadata.filial as string;

  const res = await db.erro_consultor.findMany({
    where: {
      status: false,
      filial: filial,
    },
  });

  return (
    <section className="container mx-auto py-2">
      <DataTable columns={columns} data={res} />
    </section>
  );
}

export default GarantiaPage;
