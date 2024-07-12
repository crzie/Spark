import { Button, Carousel, Input, message, Progress } from "antd";
import { SearchProps } from "antd/es/input";
import { useEffect, useRef, useState } from "react";
import { ContributionCalendar } from "react-contribution-calendar";
import { FaCalendar, FaLocationDot } from "react-icons/fa6";
import { Cursor, useTypewriter } from "react-simple-typewriter";
import bannerimage from "../../assets/bannerimage2.png";
import icon from "../../assets/icon22.png";
import xpIcon from "../../assets/XPIcon.png";
import { useAuth } from "../../hooks/useAuth";
import { EventData } from "../../models/EventData";
import { fetchImage, getAllEvents, participateEvent } from "../../services/firebase";

const HomePage = () => {
    const { details } = useAuth();
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
    const [filteredEvents, setFilteredEvents] = useState<
        FirebaseDocument<EventData>[]
    >([]);

    const upcomingEventsRef = useRef<HTMLDivElement>(null);

    const scrollToUpcomingEvents = () => {
        if (upcomingEventsRef.current) {
            upcomingEventsRef.current.scrollIntoView({ behavior: "smooth" });
        }
    };

    useEffect(() => {
        getAllEvents().then((eventData) => {
            setAllEvents(eventData);
            setFilteredEvents(eventData);
        });
        initializeProgress();
    }, []);


    const data: InputData[] = [
        {
            "2024-01-01": { level: 2, data: { myData: "Davis" } },
        },
        {
            "2024-07-01": { level: 1, data: { myData: "You gain 100Xp" } },
        },
        {
            "2024-07-05": { level: 3, data: { myData: "Event A" } },
        },
        {
            "2024-07-10": { level: 4, data: { myData: "Event B" } },
        },
        {
            "2024-07-15": { level: 2, data: { myData: "Volunteer Work" } },
        },
        {
            "2024-02-20": { level: 3, data: { myData: "Project X" } },
        },
        {
            "2024-03-12": { level: 1, data: { myData: "Presentation" } },
        },
        {
            "2024-04-25": { level: 2, data: { myData: "Workshop" } },
        },
        {
            "2024-05-08": { level: 4, data: { myData: "Holiday" } },
        },
        {
            "2024-06-30": { level: 4, data: { myData: "Seminar" } },
        },
        {
            "2023-07-12": { level: 2, data: { myData: "Project A" } },
        },
        {
            "2023-08-05": { level: 1, data: { myData: "Event X" } },
        },
        {
            "2023-09-20": { level: 3, data: { myData: "Workshop B" } },
        },
        {
            "2023-10-15": { level: 4, data: { myData: "Seminar C" } },
        },
        {
            "2023-11-07": { level: 2, data: { myData: "Hackathon D" } },
        },
        {
            "2023-12-25": { level: 1, data: { myData: "Holiday Event" } },
        },
        {
            "2024-01-08": { level: 3, data: { myData: "Training Session" } },
        },
        {
            "2024-02-14": { level: 2, data: { myData: "Project Launch" } },
        },
        {
            "2024-03-30": { level: 1, data: { myData: "Charity Drive" } },
        },
        {
            "2024-04-22": { level: 4, data: { myData: "Conference" } },
        },
        {
            "2024-05-19": { level: 1, data: { myData: "Event Y" } },
        },
        {
            "2024-06-10": { level: 2, data: { myData: "Volunteer Work" } },
        },
        {
            "2024-07-04": { level: 3, data: { myData: "Meeting" } },
        },
    ];


    if (!details) {
        data.splice(0, data.length);
    }

    const currentDate = new Date();
    const oneYearAgo = new Date(currentDate);
    oneYearAgo.setFullYear(currentDate.getFullYear() - 1);
    const formatDate = (date: Date) => date.toISOString().split("T")[0];
    const startDate = formatDate(oneYearAgo);
    const endDate = formatDate(currentDate);

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
        setLevel(Math.round(currentLevel));
    };
    const onSearch: SearchProps["onSearch"] = (value, _e, info) => {
        const filtered: any = allEvents.filter((event) =>
            event.data.name.toLowerCase().includes(value.toLowerCase())
        );
        setFilteredEvents(filtered);
    };
    const refresh = () => {
        setAllEvents([...allEvents]);
    }
    const { Search } = Input;
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
                        percent={currExp / requiredExp * 100}
                        strokeColor="#047857"
                        format={() => (
                            <div className="gap-2 flex flex-col">
                                <p className="text-emerald-700">{level}</p>
                                <p className="text-xs">
                                    {details ? <>
                                        Increase your Level <br />
                                        By Participating in Events
                                    </> :
                                        <>
                                            Login to see your progress
                                        </>}
                                </p>
                            </div>
                        )}
                        size={[190, 190]}
                    />
                    <div className="text-emerald-700 text-xl font-semibold">
                        {currExp} / {requiredExp} XP
                    </div>
                </div>
            </div>

            <div className="box-border p-4">
                <div className="bg-emerald-100 rounded-2xl border-2 border-emerald-200">
                    <div
                        className="ml-16 mr-16 my-10 flex items-center justify-between"
                        ref={upcomingEventsRef}
                    >
                        <h1 className="text-5xl font-semibold">
                            Upcoming <span className="text-lime-600">Events</span>
                        </h1>
                        <div className="">
                            <Search
                                placeholder="input search text"
                                onSearch={onSearch}
                                style={{ width: 400, paddingTop: 15 }}
                            />
                        </div>
                    </div>
                    {filteredEvents?.map((document) => (
                        <EventDetailCard key={document.id} doc={document} refresh={refresh} />
                    ))}
                </div>
            </div>
        </div>
    );
};

const EventDetailCard = ({ doc, refresh }: { doc: FirebaseDocument<EventData>, refresh: () => void }) => {
    const { user } = useAuth();
    const [imgUrl, setImgUrl] = useState<string[]>([]);
    const event = doc.data;

    useEffect(() => {
        for (const path of event.galleryPaths) {
            fetchImage(path).then((url) => {
                setImgUrl((prev) => [...prev, url]);
            });
        }
    }, []);

    const handleParticipation = () => {
        if (!user) return;
        message.success("Participated in the event");
        participateEvent(doc.id).then(() => {
            event.participantIds.push(user.uid);
            refresh();
        });
    }

    const active = user && !event.participantIds.includes(user.uid);
    const btnClass = "w-28 h-8 mt-2 " + (active ? " bg-emerald-800" : " bg-gray-400 text-gray-700")

    return (
        <div className="ml-16 mr-16 my-10 gap-10 flex justify-between">
            <div className="w-1/2">
                <Carousel autoplay>
                    {imgUrl.map((image) => (
                        <div key={image}>
                            <img
                                src={image}
                                alt=""
                                className="w-full aspect-video object-cover"
                            />
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
                    className={btnClass}
                    disabled={!active}
                    onClick={handleParticipation}
                >
                    Participate
                </Button>
            </div>
        </div>
    );
};

export default HomePage;
