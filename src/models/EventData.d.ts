import { Timestamp } from "firebase/firestore";

type EventData = {
    name: string;
    description: string;
    bannerPath: string;
    galleryPaths: string[];
    participantIds: string[];
    bounty: number;
    location: string;
    eventStart: Timestamp;
    eventEnd: Timestamp;
    verified: boolean;
    confirmed: boolean;
}