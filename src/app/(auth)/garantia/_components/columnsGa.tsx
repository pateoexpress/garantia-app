"use client";

import { useRouter } from "next/navigation";
import { ColumnDef } from "@tanstack/react-table";
import { erro_consultor } from "@prisma/client";
import {
  MoreHorizontal,
  LucideTrash,
  CircleEllipsis,
  CircleCheckBig,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

const ActionCell: React.FC<{ record: erro_consultor }> = ({ record }) => {
  const router = useRouter();

  const handleStatusUpdate = async () => {
    try {
      const response = await fetch(`/api/markasdone?id=${record.xata_id}`, {
        method: "PATCH",
      });
      if (response.ok) {
        router.refresh();
      } else {
        console.log("Fail to update Status");
      }
    } catch (error) {
      console.error("Error updating record:", error);
    }
  };

  const handleDelete = async () => {
    try {
      const response = await fetch(`/api/deleteRecord?id=${record.xata_id}`, {
        method: "DELETE",
      });

      if (response.ok) {
        router.refresh();
      } else {
        console.error("Failed to delete record");
      }
    } catch (error) {
      console.error("Error deleting record:", error);
    }
  };

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
            onClick={() => router.push(`/processo/${record.xata_id}`)}
          >
            <CircleEllipsis className="mr-2 h-4 w-4" />
            <span>Info</span>
          </DropdownMenuItem>
          <DropdownMenuSeparator />
          <DropdownMenuItem variant="done" onClick={handleStatusUpdate}>
            <CircleCheckBig className="mr-2 h-4 w-4" />
            <span>Concluído</span>
          </DropdownMenuItem>
          <DropdownMenuSeparator />
          <DropdownMenuItem variant="destructive" onClick={handleDelete}>
            <LucideTrash className="mr-2 h-4 w-4" />
            <span>Deletar</span>
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    </div>
  );
};

export const columns: ColumnDef<erro_consultor>[] = [
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
    cell: ({ row }) => <ActionCell record={row.original} />,
  },
];
