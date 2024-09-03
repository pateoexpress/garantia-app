import {
  Card,
  CardHeader,
  CardDescription,
  CardTitle,
  CardContent,
} from "@/components/ui/card";
import { FileCheck2, FileX2 } from "lucide-react";

type DashboardCardProps = {
  title: string;
  subtitle: string;
  body: string;
};

export default function DashboardCard({
  title,
  subtitle,
  body,
}: DashboardCardProps) {
  return (
    <Card>
      <CardHeader>
        <CardTitle>
          <div className="flex flex-row items-center justify-between">
            <div>
              {title}{" "}
              <span
                className={`inline-block w-2 h-2 rounded-full ${
                  subtitle === "pending" ? "bg-yellow-500" : "bg-green-500"
                } mr-2`}
              />
            </div>
            <div>
              {subtitle === "pending" ? (
                <FileX2 size={32} className="text-red-500" />
              ) : (
                <FileCheck2 size={32} className="text-green-500" />
              )}
            </div>
          </div>
        </CardTitle>
      </CardHeader>
      <CardContent>
        <p>{body}</p>
      </CardContent>
    </Card>
  );
}
