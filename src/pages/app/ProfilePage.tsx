import { Col, Progress, Row } from "antd";
import { Timestamp } from "firebase/firestore";
import { useEffect, useState } from "react";
import { BsCamera } from "react-icons/bs";
import bannerImage from "../../assets/bannerimage2.png";
import movingCoinIcon from "../../assets/moving-coin-icon.gif";
import xpIcon from "../../assets/XPIcon.png";
import { useAuth } from "../../hooks/useAuth";
import { EventData } from "../../models/EventData";
import { fetchImage, updateProfileImage } from "../../services/firebase";
import accountIcon from "../../assets/profile-icon.png";

const ProfilePage = () => {
    const { user, details } = useAuth();
    const [currExp, setCurrExp] = useState(0);
    const [requiredExp, setRequiredExp] = useState(0);
    const [level, setLevel] = useState(0);

    const [events] = useState<EventData[]>([
        {
            bannerPath: "",
            bounty: 100000,
            confirmed: true,
            description:
                'Central Park hosted "Green Earth Day," bringing together thousands of volunteers for environmental conservation. Activities included tree planting, educational workshops, and a park cleanup. The event aimed to raise awareness about climate change and promote eco-friendly practices, emphasizing community efforts to protect the planet.',
            eventEnd: Timestamp.now(),
            eventStart: Timestamp.now(),
            galleryPaths: [],
            location: "Central Park",
            name: "Green Earth Day",
            participantIds: [],
            verified: true,
        },
        {
            bannerPath: "",
            bounty: 100000,
            confirmed: true,
            description:
                'Central Park hosted "Green Earth Day," bringing together thousands of volunteers for environmental conservation. Activities included tree planting, educational workshops, and a park cleanup. The event aimed to raise awareness about climate change and promote eco-friendly practices, emphasizing community efforts to protect the planet.',
            eventEnd: Timestamp.now(),
            eventStart: Timestamp.now(),
            galleryPaths: [],
            location: "Central Park",
            name: "Green Earth Day",
            participantIds: [],
            verified: true,
        },
    ]);

    useEffect(() => {
        initializeProgress();
    }, []);

    // xp: 10000 + 120% * 10000 * level
    const initializeProgress = () => {
        const baseXp = 5000;
        const levelModifier = 1.2;

        let currentXpRequirement = baseXp;
        let currentUserXp = details?.xp ?? 0;
        let currentLevel = 1;

        while (currentUserXp > currentXpRequirement) {
            currentLevel += 1;
            currentUserXp -= currentXpRequirement;
            currentXpRequirement *= levelModifier;
        }

        setCurrExp(Math.round(currentUserXp));
        setRequiredExp(Math.round(currentXpRequirement));
        setLevel(currentLevel);
    };

    const EventCard = ({ event }: { event: EventData }) => {
        const startDate = event.eventStart.toDate();

        return (
            <div className="flex w-full bg-white shadow-md h-52 rounded-lg">
                <img
                    className="object-cover rounded-l-lg"
                    src={bannerImage}
                    alt="banner"
                    width={200}
                />
                <div className="flex flex-col py-4 px-6 justify-between">
                    <div className="flex flex-col gap-1">
                        <p className="text-2xl font-semibold break-words max-w-full">
                            {event.name}
                        </p>
                        <p className="text-sm">
                            {event.description.substring(0, 300) +
                                (event.description.length > 300 ? "..." : "")}
                        </p>
                        <p className="text-emerald-800 font-medium mt-1">
                            Event Date:{" "}
                            {`${startDate.getDate()} ${startDate.toLocaleString("default", {
                                month: "long",
                            })} ${startDate.getFullYear()}`}
                        </p>
                    </div>
                    <div className="flex items-center gap-1 self-end mr-2">
                        <img src={xpIcon} alt="exp" width={28} />
                        <p className="text-emerald-800 font-bold">{event.bounty}</p>
                    </div>
                </div>
            </div>
        );
    };


    return (
        <div className="px-16 py-4">
            <div className="flex justify-between mx-24">
                <div className="flex items-center gap-5 mb-4">
                    <ProfileIcon />
                    <div className="flex flex-col gap-3">
                        <p className="font-semibold text-4xl">{details?.username ?? "Guest"}</p>
                        <p className="text-emerald-700 text-xl">{user?.email ?? ""}</p>
                    </div>
                </div>
                {/* <Link to="/edit-profile">
          <Button
            type="primary"
            className="self-start mt-5 mr-10 bg-emerald-800 font-semibold"
            onMouseEnter={(e) => {
              e.currentTarget.style.backgroundColor = "#047857";
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.backgroundColor = "#065f46";
            }}
            icon={<IoIosSearch />}
          >
            Edit
          </Button>
        </Link> */}
            </div>
            <div className="mx-24">
                <Row gutter={[60, 60]} className="mt-6">
                    <Col span={12}>
                        <div className="flex flex-col items-center justify-center w-full bg-emerald-50 rounded-2xl shadow gap-4 select-none h-80">
                            <p className="text-yellow-400 text-xl font-bold">Coins</p>
                            <img src={movingCoinIcon} alt="coin" width={160} />
                            <p className="text-yellow-400 text-xl font-bold">
                                {details?.coin}
                            </p>
                        </div>
                    </Col>
                    <Col span={12}>
                        <div className="flex flex-col items-center justify-center w-full bg-emerald-50 rounded-2xl shadow gap-2 select-none h-80">
                            <div className="text-emerald-700 text-xl font-bold mb-3">
                                Experience
                            </div>
                            <Progress
                                type="dashboard"
                                percent={currExp / requiredExp * 100}
                                strokeColor="#047857"
                                format={() => <p className="text-emerald-700">{level}</p>}
                                size={[170, 170]}
                            />
                            <div className="text-emerald-700 text-xl font-semibold">
                                {currExp} / {requiredExp}  XP
                            </div>
                        </div>
                    </Col>
                </Row>
                <div className="flex flex-col items-center w-full bg-emerald-50 rounded-2xl shadow gap-4 p-6 my-8">
                    <p className="text-gray-500 text-xl self-start font-semibold">
                        Participated Events
                    </p>
                    {user && events.map((event) => (
                        <EventCard event={event} />
                    ))}
                    {!user && <h1 className="text-2xl">Sign in to access this feature</h1>}
                </div>
            </div>
        </div>
    );
};

const ProfileIcon = () => {
    const { details } = useAuth();
    const [showEditPrompt, setShowEditPrompt] = useState(false);
    const [image, setImage] = useState<string>("");

    useEffect(() => {
        fetchImage(details?.imagePath ?? "").then((url) => {
            setImage(url);
        });
    }, [])

    const img = !image ? accountIcon : image;
    return (
        <label
            className={`flex flex-col relative justify-center items-center w-40 h-40 bg-center bg-cover cursor-pointer`}
            onMouseEnter={() => { setShowEditPrompt(true) }}
            onMouseLeave={() => { setShowEditPrompt(false) }}
        >
            <img src={img} alt="profile" className="w-40 h-40 rounded-full" />
            <div className={`${showEditPrompt ? "absolute flex" : "hidden"} flex-col justify-center items-center w-full h-full rounded-full bg-black bg-opacity-20 select-none`}>
                <BsCamera className="w-14 h-14" />
                <p className="font-semibold text-sm">Change Photo</p>
                <input type="file" hidden placeholder="image" onChange={
                    (e) => {
                        if (e.target.files) {
                            updateProfileImage(e.target.files[0]);
                        }
                    }} />
            </div>
        </label>
    )
}

export default ProfilePage;
