import { NextResponse } from "next/server";

interface RequestBody {
  email: string;
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
    const { email }: RequestBody = await req.json();

    const BREVO_API_KEY = process.env.BREVO_API_KEY;
    const BREVO_LIST_ID = parseInt(process.env.BREVO_LIST_ID || "8");

    if (!BREVO_API_KEY) {
      return NextResponse.json({ error: "Brevo API key missing" }, { status: 500 });
    }

    const requestBody: RequestBodyInterface = {
      email,
      listIds: [BREVO_LIST_ID],
      updateEnabled: true,
    };

    try {
        const res = await fetch("https://api.brevo.com/v3/contacts", {
            method: "POST",
            headers: {
                accept: "application/json",
                "api-key": BREVO_API_KEY,
                "content-type": "application/json",
            },
            body: JSON.stringify(requestBody),
        });

        const data = res;

        if (!res.ok) {
            return NextResponse.json({ error: data || "Failed to join waitlist" }, { status: res.status });
        }

        return NextResponse.json({ success: true, data });
    } catch (error) {
        console.error("Error connecting to Brevo API:", error);
        return NextResponse.json({ error: "Error connecting to Brevo API" }, { status: 500 });
    }
  } catch (err) {
    const errorMessage = getErrorMessage(err);
    return NextResponse.json({ error: errorMessage }, { status: 500 });
  }
}
