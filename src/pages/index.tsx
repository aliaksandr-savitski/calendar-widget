import Head from 'next/head';

import MonthView from '@views/MonthView';

export default function HomePage() {
  return (
    <div>
      <Head>
        <title>Calendar Widget</title>
        <meta name="description" content="Calendar Widget" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main>
        <MonthView />
      </main>
    </div>
  );
}
