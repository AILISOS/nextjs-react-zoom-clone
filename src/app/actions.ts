"use server"

import { currentUser } from "@clerk/nextjs";
import { StreamClient } from "@stream-io/node-sdk";

export async function getToken() {
    const streamApiKey = process.env.NEXT_PUBLIC_STTREAM_VIDEO_API_KEY
    const streamApiSecret = process.env.STREAM_VIDEO_API_SECRET


    if(!streamApiKey || !streamApiSecret) {
        throw new Error("Stream API key or token nnot set");
    }

    const user = await currentUser();

    console.log("Generating token for user: ", user?.id);

    if (!user) {
        throw new Error("User not authennticated");
    }

    const streamClient = new StreamClient(streamApiKey, streamApiSecret);

    const expirationTime = Math.floor(Date.now() / 1000) + 60 * 60;

    const issuedAt = Math.floor(Date.now() / 1000) - 60;

    const token = streamClient.createToken(user.id, expirationTime , issuedAt);

    console.log("Successfully generated token: ", token);

    return token;
}