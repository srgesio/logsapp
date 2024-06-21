"use client";
import { env } from "@/env";
import { ApolloClient, ApolloProvider, InMemoryCache } from "@apollo/client";


const { apiURL } = env()
const client = new ApolloClient({
    uri: apiURL,
    cache: new InMemoryCache(),
});

export default function ApolloWrapper({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    return <ApolloProvider client={client}>{children}</ApolloProvider>;
}