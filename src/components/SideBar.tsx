import { FC } from "react";
import {
  BarChartIcon,
  GearIcon,
  HomeIcon,
  FilePlusIcon,
  Pencil2Icon,
} from "@radix-ui/react-icons";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";

const Sidebar: FC = () => {
  return (
    <div className="w-15 min-h-[calc(100vh-66px)] bg-slate-900 text-white flex flex-col pt-10">
      <nav className="flex-1">
        <ul>
          <li className="hover:bg-slate-700 flex justify-center">
            <TooltipProvider>
              <Tooltip>
                <TooltipTrigger>
                  <a
                    href="/garantia"
                    className="flex items-center p-4"
                  >
                    <HomeIcon className="w-6 h-6 mr-2" />
                  </a>
                </TooltipTrigger>
                <TooltipContent side="right">
                  <p>Home</p>
                </TooltipContent>
              </Tooltip>
            </TooltipProvider>
          </li>
          <li className="hover:bg-slate-700 flex justify-center">
            <TooltipProvider>
              <Tooltip>
                <TooltipTrigger>
                  <a
                    href="/garantia/formconsultor"
                    className="flex items-center p-4"
                  >
                    <Pencil2Icon className="w-6 h-6 mr-2" />
                  </a>
                </TooltipTrigger>
                <TooltipContent side="right">
                  <p>FormConsultor</p>
                </TooltipContent>
              </Tooltip>
            </TooltipProvider>
          </li>
          <li className="hover:bg-slate-700 flex justify-center">
            <TooltipProvider>
              <Tooltip>
                <TooltipTrigger>
                  <a
                    href="/garantia/formtecnico"
                    className="flex items-center p-4"
                  >
                    <FilePlusIcon className="w-6 h-6 mr-2" />
                  </a>
                </TooltipTrigger>
                <TooltipContent side="right">
                  <p>FormTecnico</p>
                </TooltipContent>
              </Tooltip>
            </TooltipProvider>
          </li>
          <li className="hover:bg-slate-700 flex justify-center">
            <TooltipProvider>
              <Tooltip>
                <TooltipTrigger>
                  <a
                    href="/garantia/dashboard"
                    className="flex items-center p-4"
                  >
                    <BarChartIcon className="w-6 h-6 mr-2" />
                  </a>
                </TooltipTrigger>
                <TooltipContent side="right">
                  <p>DashBoard</p>
                </TooltipContent>
              </Tooltip>
            </TooltipProvider>
          </li>
          <li className="hover:bg-slate-700 flex justify-center">
            <TooltipProvider>
              <Tooltip>
                <TooltipTrigger>
                  <a href="/garantia/config" className="flex items-center p-4">
                    <GearIcon className="w-6 h-6 mr-2" />
                  </a>
                </TooltipTrigger>
                <TooltipContent side="right">
                  <p>Configurações</p>
                </TooltipContent>
              </Tooltip>
            </TooltipProvider>
          </li>
        </ul>
      </nav>
    </div>
  );
};

export default Sidebar;
