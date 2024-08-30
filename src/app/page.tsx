import db from "@/db/db";
import { Record, columns } from "./_components/columns";
import { DataTable } from "@/components/ui/data-table";

async function getData(): Promise<Record[]> {


  const res = await db.erro_consultor.findMany({
    where: {
      status: false,
    },
  });

  return res
 
}

export default async function DemoPage() {
  const data = await getData();

  return (
    <div className="container mx-auto py-2">
      <DataTable columns={columns} data={data} />
    </div>
  );
}
