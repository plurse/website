import { NextResponse } from "next/server";

interface RequestBody {
  email: string;
  username?: string;
  feedback?: string;
}

interface RequestBodyInterface {
    updateEnabled: boolean;
    email?: string;
    listIds: number[];
    attributes?: { [key: string]: string };
}

function getErrorMessage(error: unknown): string {
  if (error instanceof Error) {
    return error.message;
  } else if (typeof error === 'string') {
    return error;
  } else {
    return 'An unknown error occurred';
  }
}

export async function POST(req: Request) {
  try {
    const { email, username, feedback }: RequestBody = await req.json();

    const BREVO_API_KEY = process.env.BREVO_API_KEY;
    const BREVO_LIST_ID = parseInt(process.env.BREVO_FEEDBACK_LIST_ID || "9");

    if (!BREVO_API_KEY) {
      return NextResponse.json({ error: "Brevo API key missing" }, { status: 500 });
    }

    // Build request body for Brevo
    const requestBody: RequestBodyInterface = {
      updateEnabled: true,
      listIds: [BREVO_LIST_ID],
    };

    if (email) requestBody.email = email;
    if (username || feedback) {
      requestBody.attributes = {};
      if (username) requestBody.attributes.USERNAME = username;
      if (feedback) requestBody.attributes.FEEDBACK = feedback;
    }

    const res = await fetch("https://api.brevo.com/v3/contacts", {
      method: "POST",
      headers: {
        accept: "application/json",
        "api-key": BREVO_API_KEY,
        "content-type": "application/json",
      },
      body: JSON.stringify(requestBody),
    });

    const data = await res.json();

    if (!res.ok) {
      return NextResponse.json({ error: data.message || "Failed to submit feedback" }, { status: res.status });
    }

    return NextResponse.json({ success: true, data });
  } catch (err) {
    const errorMessage = getErrorMessage(err);
    return NextResponse.json({ error: errorMessage }, { status: 500 });
  }
}
