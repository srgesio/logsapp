export function env() {
    if (!process.env.NEXT_PUBLIC_ENVIROMENT) {
        throw new Error("ENVIROMENT not set")
    }

    const environment = process.env.NEXT_PUBLIC_ENVIROMENT;

    if (!process.env.NEXT_PUBLIC_DEV_API_URL) throw new Error("DEV_API_URL not set")
    if (!process.env.NEXT_PUBLIC_PROD_API_URL) throw new Error("PROD_API_URL not set")

    const API_URL = process.env.NEXT_PUBLIC_ENVIROMENT === "DEV" ? process.env.NEXT_PUBLIC_DEV_API_URL : process.env.NEXT_PUBLIC_PROD_API_URL;

    return {
        environment,
        apiURL: API_URL
    }
}