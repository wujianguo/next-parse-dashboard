'use client';

import { useSearchParams } from 'next/navigation';
import { AppCard, AppCardProps } from "./components/app-card";

export default function IndexPage() {
  const searchParams = useSearchParams();
  const appName = searchParams.get('appName') || '';
  const appId = searchParams.get('appId') || '';
  const masterKey = searchParams.get('masterKey') || '';
  const serverURL = searchParams.get('serverURL') || '';
  const app: AppCardProps = { appName, appId, masterKey, serverURL };
  const apps = [app];

  return (
    <section className="container grid items-center gap-6 pb-8 pt-6 md:py-10">
      <div className="items-start justify-center gap-6 rounded-lg md:grid lg:grid-cols-2 xl:grid-cols-3">
        {apps.map((app: AppCardProps) => (
          <a href={`/apps/${app.appName}`} key={app.appId}><AppCard key={app.appId} app={app} /></a>
        ))}
      </div>
    </section>
  );
}
