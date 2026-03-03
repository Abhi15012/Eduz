// app/api/send-push/+api.ts
import { StatusError } from 'expo-server'; // optional — nicer errors (SDK 54+)

type SendBody = {
  expoPushToken: string;
  title: string;
  body: string;
  data?: Record<string, any>; // e.g. { chatId: "abc", screen: "chat" }
};

export async function POST(request: Request) {
  try {
    const body: SendBody = await request.json();

    if (!body.expoPushToken || !body.title || !body.body) {
      throw new StatusError(400, 'Missing required fields');
    }

    const message = {
      to: body.expoPushToken,
      sound: 'default',
      title: body.title,
      body: body.body,
      data: body.data || {},
      priority: 'high',   
      ttl: 3600,         
    };

    const response = await fetch('https://exp.host/--/api/v2/push/send', {
      method: 'POST',
      headers: {
        'Accept': 'application/json',
        'Accept-encoding': 'gzip, deflate',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(message),
    });

    const result = await response.json();

    if (!response.ok || result.errors?.length > 0) {
      console.error('Expo push error:', result);
      throw new StatusError(500, 'Failed to send push');
    }

    return Response.json({ success: true, result });
  } catch (error) {
    console.error(error);
    if (error instanceof StatusError) {
      return new Response(error.message, { status: error.status });
    }
    return new Response('Internal error', { status: 500 });
  }
}