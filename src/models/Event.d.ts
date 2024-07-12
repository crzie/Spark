type Event = {
    name: string;
    description: string;
    bannerPath: string;
    galleryPaths: string[];
    participantIds: string[];
    bounty: number;
    location: string;
    eventStart: Date;
    eventEnd: Date;
}