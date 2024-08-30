"use client";

import { useRouter } from "next/navigation";
import { ColumnDef } from "@tanstack/react-table";
import { MoreHorizontal } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

export type Record = {
  xata_createdat: Date;
  xata_updatedat: Date;
  xata_id: string;
  xata_version: number;
  data: Date;
  os: number;
  consultor: string;
  categoria: string;
  orientacao: string;
  filial: string | null;
  inconsistencias: string;
  status: boolean;
};

const ActionCell: React.FC<{ payment: Record }> = ({ payment }) => {
  const router = useRouter();

  return (
    <div className="text-right">
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button variant="ghost" className="h-8 w-8 p-0">
            <span className="sr-only">Open menu</span>
            <MoreHorizontal className="h-4 w-4" />
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="end">
          <DropdownMenuLabel>Ações</DropdownMenuLabel>
          <DropdownMenuSeparator />
          <DropdownMenuItem
            onClick={() => router.push(`/processo/${payment.xata_id}`)}
          >
            Informações
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    </div>
  );
};

export const columns: ColumnDef<Record>[] = [
  {
    accessorKey: "status",
    header: "Status",
    cell: ({ row }) => {
      const status = row.getValue("status") as string;

      const statusColor = {
        false: "bg-yellow-500",
        true: "bg-green-500",
      }[status];

      return (
        <div className="flex items-center">
          <span
            className={`inline-block w-2 h-2 rounded-full ${statusColor} mr-2`}
          />
          {status ? "Concluído" : "Pendente"}
        </div>
      );
    },
  },

  {
    accessorKey: "os",
    header: () => <div className="">OS</div>,
    filterFn: (row, columnId, filterValue) => {
      const osValue = row.getValue(columnId) as number;
      const osValueStr = osValue.toString();
      const filterValueStr = filterValue.toString();
      return osValueStr.includes(filterValueStr);
    },
    cell: ({ row }) => {
      const rowValue = row.getValue("os") as number;
      return <div className="">{rowValue}</div>;
    },
  },

  {
    accessorKey: "consultor",
    header: () => <div className="text-center">Consultor</div>,
    cell: ({ row }) => {
      const rowValue = row.getValue("consultor") as string;
      return <div className="text-center">{rowValue}</div>;
    },
  },
  {
    accessorKey: "categoria",
    header: () => <div className="text-center">Categoria</div>,
    cell: ({ row }) => {
      const rowValue = row.getValue("categoria") as string;
      return <div className="text-center">{rowValue}</div>;
    },
  },

  {
    accessorKey: "filial",
    header: () => <div className="">Filial</div>,
    cell: ({ row }) => {
      const rowValue = row.getValue("filial") as string;
      return <div className="">{rowValue.toUpperCase()}</div>;
    },
  },
  {
    id: "actions",
    cell: ({ row }) => <ActionCell payment={row.original} />,
  },
];
