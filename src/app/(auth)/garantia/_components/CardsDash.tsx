import {
  Card,
  CardHeader,
  CardDescription,
  CardTitle,
  CardContent,
} from "@/components/ui/card";

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
          <div className="flex flex-row items-center gap-5">
            {title}{" "}
            <span
              className={`inline-block w-2 h-2 rounded-full ${
                subtitle === "pending" ? "bg-yellow-500" : "bg-green-500"
              } mr-2`}
            />
          </div>
        </CardTitle>
      </CardHeader>
      <CardContent>
        <p>{body}</p>
      </CardContent>
    </Card>
  );
}
