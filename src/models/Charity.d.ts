type Charity = {
    name: string;
    description: string;
    bannerPath: string;
    donation: number;
    location: string;
    charityStart: Date;
    charityEnd: Date;
    charityStatus: "active" | "inactive";
}