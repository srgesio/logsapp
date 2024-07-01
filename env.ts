export function env() {
    if (!process.env.NEXT_PUBLIC_API_URL) {
        throw new Error("NEXT_PUBLIC_API_URL not set")
    }

    return {
        apiURL: process.env.NEXT_PUBLIC_API_URL
    }
}