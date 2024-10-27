'use server';
import { google } from 'googleapis';
import { startOfDay } from 'date-fns';
import { requireUser } from '@/_helpers/helper';
import prisma from '@/lib/db';

export const getCalendarEvents = async ({
  start,
  end,
}: {
  start: Date;
  end: Date;
}) => {
  const oAuth2Client = await getOauthClient();
  // console.log(oAuth2Client);
  const events = await google
    .calendar({ version: 'v3', auth: oAuth2Client })
    .events.list({
      auth: oAuth2Client,
      calendarId: 'primary',
      eventTypes: ['default'],
      timeMin: start.toISOString(),
      timeMax: end.toISOString(),
      maxResults: 2500,
      singleEvents: true,
      // orderBy: 'startTime',
    });
    console.log(events)

  return (
    events.data.items
      ?.map((event) => {
        if (event.start?.date !== null && event.end?.date !== null) {
          return {
            start: startOfDay(event.start?.date as string),
            end: startOfDay(event.end?.date as string),
          };
        }
        if (event.start?.dateTime !== null && event.end?.dateTime !== null) {
          return {
            start: new Date(event.start?.dateTime as string),
            end: new Date(event.end?.dateTime as string),
          };
        }
      })
      .filter((date) => date !== null) || []
  );
};

const getOauthClient = async () => {
  const session = await requireUser();
  const user = await prisma.user.findUnique({
    where: {
      id: session.user?.id,
    },
    select: {
      accounts: true,
    },
  });
  const client = new google.auth.OAuth2({
    clientId: process.env.AUTH_GOOGLE_ID,
    clientSecret: process.env.AUTH_GOOGLE_SECRET,
    redirectUri: process.env.AUTH_GOOGLE_REDIRECT,
  });
  client.setCredentials({ access_token: user?.accounts[0].access_token });

  return client;
};
