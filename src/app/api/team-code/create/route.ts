import { HTTP_KEYS } from "@/types/http";
import { URLS } from "@/types/urls";

export async function POST(req: Request) {
    const body = await req.json()

    const response = await fetch(URLS.HTTP + HTTP_KEYS.TEAM_CODE_CREATE, {
        method: "POST",
        cache: "no-store",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(body)
    })

    const data = await response.text()

    return Response.json(data)
}