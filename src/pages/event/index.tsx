import Head from 'next/head';

import NewEventView from '@views/NewEventView';

export default function HomePage() {
  return (
    <div>
      <Head>
        <title>Calendar Widget</title>
        <meta name="description" content="Calendar Widget" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main>
        <h1>Calendar Widget</h1>
        <NewEventView />
      </main>
    </div>
  );
}
