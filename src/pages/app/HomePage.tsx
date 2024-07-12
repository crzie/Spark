import { Button, Progress } from "antd";
import bannerimage from "../../assets/bannerimage2.png";
import { useTypewriter, Cursor } from "react-simple-typewriter";
import { ContributionCalendar } from "react-contribution-calendar";
import { Carousel } from "antd";
import { FaCalendar, FaLocationDot } from "react-icons/fa6";
import icon from "../../assets/icon22.png";
import xpIcon from "../../assets/XPIcon.png";
import { useEffect, useRef, useState } from "react";
import { useAuth } from "../../hooks/useAuth";
import { fetchImage, getAllEvents } from "../../services/firebase";
import { EventData } from "../../models/EventData";
const HomePage = () => {
    const { user, details } = useAuth();
    const [text] = useTypewriter({
        words: ["Volunteer"],
        loop: 0,
        typeSpeed: 200,
        deleteSpeed: 200,
        delaySpeed: 1000,
    });
    const [text2] = useTypewriter({
        words: ["Event"],
        loop: 0,
        typeSpeed: 200,
        deleteSpeed: 200,
        delaySpeed: 1000,
    });

    const [currExp, setCurrExp] = useState(0);
    const [requiredExp, setRequiredExp] = useState(0);
    const [level, setLevel] = useState(0);
    const [allEvents, setAllEvents] = useState<FirebaseDocument<EventData>[]>([]);

    const upcomingEventsRef = useRef<HTMLDivElement>(null);

    const scrollToUpcomingEvents = () => {
        if (upcomingEventsRef.current) {
            upcomingEventsRef.current.scrollIntoView({ behavior: "smooth" });
        }
    };

    useEffect(() => {
        getAllEvents().then((eventData) => {
            setAllEvents(eventData);
        });
    }, []);

    const data: InputData[] = [
        {
            "2024-01-01": { level: 2, data: { Davis: "ikan" } },
        },
        {
            "2023-07-09": { level: 1, data: {} },
        },
    ];
    const currentDate = new Date();
    const oneYearAgo = new Date(currentDate);
    oneYearAgo.setFullYear(currentDate.getFullYear() - 1);
    const formatDate = (date: Date) => date.toISOString().split("T")[0];
    const startDate = formatDate(oneYearAgo);
    const endDate = formatDate(currentDate);

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

        setCurrExp(currentUserXp);
        setRequiredExp(currentXpRequirement);
        setLevel(currentLevel);
    };

    return (
        <div className="h-full mb-10">
            <img src={bannerimage} alt="" className="w-full -mt-20 -z-50" />
            <div className="gap-5 flex flex-col -mt-80 ml-12 ">
                <h1 className="font-semibold text-5xl select-none">
                    Be a <span className="text-lime-600">{text}</span>
                    <span className="text-emerald-700">
                        <Cursor />
                    </span>
                </h1>
                <h1 className="font-semibold select-none">
                    Join the Sparkles Community !
                </h1>
                <Button
                    type="primary"
                    className="w-28 h-10"
                    style={{ backgroundColor: "#0B6A3C" }}
                    onClick={scrollToUpcomingEvents}
                >
                    Volunteer
                </Button>
            </div>
            <div className="gap-5 flex flex-col justify-end items-end mr-10 -mt-12">
                <h1 className="font-semibold text-5xl select-none">
                    Create an <span className="text-lime-600">{text2}</span>
                    <span className="text-emerald-700 select-none">
                        <Cursor />
                    </span>
                </h1>
                <h1 className="font-semibold">Provide Event for Those in need !</h1>
                <Button
                    type="primary"
                    className="w-28 h-10"
                    href="/create"
                    style={{ backgroundColor: "#0B6A3C" }}
                >
                    Create
                </Button>
            </div>

            <div className="w-full flex mt-28">
                <div className="w-3/4 h-80 bg-emerald-100 border-2 border-emerald-200 ml-5 rounded-xl flex flex-col justify-center items-center">
                    <div className="w-full flex items-center ml-12">
                        <img src={icon} alt="" className="w-100 h-24" />
                        <div className="flex flex-col">
                            <h1 className="text-2xl font-bold">
                                Activity <span className="text-lime-600">Stats</span>
                            </h1>
                            <h1 style={{ fontSize: "" }}>How Sparkling Are You?</h1>
                        </div>
                    </div>
                    <ContributionCalendar
                        data={data}
                        theme={"grass"}
                        start={startDate}
                        end={endDate}
                        daysOfTheWeek={["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"]}
                        textColor="#000"
                        startsOnSunday={true}
                        includeBoundary={true}
                        cx={15}
                        cy={15}
                        cr={2}
                        onCellClick={(e, data) => console.log(data)}
                        scroll={false}
                        style={{ fontWeight: "normal", fontSize: "small", width: "60vw" }}
                    />
                </div>

                <div className="w-1/4 h-80 ml-4 mr-4 rounded-xl bg-emerald-100 border-2 border-emerald-200 flex flex-col justify-center items-center">
                    <div className="text-black text-xl font-bold mb-3">Experience</div>
                    <Progress
                        type="dashboard"
                        percent={currExp / requiredExp}
                        strokeColor="#047857"
                        format={() => (
                            <div className="gap-2 flex flex-col">
                                <p className="text-emerald-700">{level}</p>
                                <p className="text-xs">
                                    Increase your Level <br />
                                    By Participating in Events
                                </p>
                            </div>
                        )}
                        size={[190, 190]}
                    />
                    <div className="text-emerald-700 text-xl font-semibold">
                        {currExp} / {requiredExp}
                    </div>
                </div>
            </div>

            <div className="box-border p-4">
                <div className="bg-emerald-100 rounded-2xl border-2 border-emerald-200">
                    <div className="ml-16 mr-16 pt-10 pb-2" ref={upcomingEventsRef}>
                        <h1 className="text-5xl font-semibold">
                            Upcoming <span className="text-lime-600">Events</span>
                        </h1>
                    </div>
                    {allEvents.map((document) => (
                        <EventDetailCard key={document.id} event={document.data} />
                    ))}
                </div>
            </div>
        </div>
    );
};

const EventDetailCard = ({ event }: { event: EventData }) => {
    const [imgUrl, setImgUrl] = useState<string[]>([])

    useEffect(() => {
        for (const path of event.galleryPaths) {
            fetchImage(path).then((url) => {
                setImgUrl((prev) => [...prev, url])
            })
        }
    }, [])

    return (
        <div className="ml-16 mr-16 my-10 gap-10 flex justify-between">
            <div className="w-1/2">
                <Carousel autoplay>
                    {imgUrl.map((image) => (
                        <div key={image}>
                            <img src={image} alt="" className="w-full aspect-video object-cover" />
                        </div>
                    ))}
                </Carousel>
            </div>
            <div className="w-1/2 flex flex-col gap-1 justify-center">
                <h1 className="text-3xl font-semibold">{event.name}</h1>
                <p className="ml-1 font-normal">{event.description}</p>
                <p className="flex items-center gap-1">
                    <FaLocationDot />
                    {event.location}
                </p>
                <p className="flex items-center gap-1">
                    <FaCalendar />
                    {event.eventStart.toDate().toLocaleDateString() +
                        " - " +
                        event.eventEnd.toDate().toLocaleDateString()}
                </p>
                <p className="flex items-center gap-0.5">
                    {" "}
                    <img src={xpIcon} alt="" className="w-4 h-4" />
                    {event.bounty}
                </p>
                <Button
                    type="primary"
                    className="w-28 h-8 mt-2"
                    style={{ backgroundColor: "#0B6A3C" }}
                >
                    Participate
                </Button>
            </div>
        </div>
    );
};

export default HomePage;
