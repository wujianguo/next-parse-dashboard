import useSWR from "swr";
import { Circle } from "lucide-react"
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"

export interface AppCardProps {
  appName: string;
  appId: string;
  masterKey: string;
  serverURL: string;
  iconName?: string;
}

const fetcher = (data: string[]) => fetch(`${data[1]}${data[0]}`, { headers: { 'X-Parse-Application-Id': data[2], 'X-Parse-Master-Key': data[3] } }).then((res) => {
  if (!res.ok) {
    throw new Error(res.statusText);
  }
  return res.json();
})

export function AppCard({ app }: { app: AppCardProps }) {
  const { data, error } = useSWR(["/serverInfo", app.serverURL, app.appId, app.masterKey], fetcher);
  return (
    <Card>
      <CardHeader className="grid grid-cols-[1fr_110px] items-start gap-4 space-y-0">
        <CardTitle>{app.appName}</CardTitle>
        <div className="flex items-center space-x-1">
          {data?.parseServerVersion ? `${data?.parseServerVersion}` : ''} {error ? `${error}` : ''}
        </div>
      </CardHeader>
      <CardContent>
        <div className="flex space-x-4 text-sm text-muted-foreground">
          <div className="flex items-center">
            <Circle className="mr-1 h-3 w-3 fill-sky-400 text-sky-400" />
            {app.serverURL}
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
