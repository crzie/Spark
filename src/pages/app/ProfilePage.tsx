import { Button, Col, Progress, Row } from "antd";
import profileIcon from "../../assets/profile-icon.png";
import { useAuth } from "../../hooks/useAuth";
import movingCoinIcon from "../../assets/moving-coin-icon.gif";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import {IoIosSearch } from "react-icons/io";
import bannerImage from "../../assets/bannerimage2.png";
import xpIcon from "../../assets/XPIcon.png";

const ProfilePage = () => {
  const { user, details } = useAuth();
  const [currExp, setCurrExp] = useState(0);
  const [requiredExp, setRequiredExp] = useState(0);
  const [level, setLevel] = useState(0);

  const [events, setEvents] = useState<EventData[]>([
    {
      bannerPath: "",
      bounty: 100000,
      confirmed: true,
      description:
        'Central Park hosted "Green Earth Day," bringing together thousands of volunteers for environmental conservation. Activities included tree planting, educational workshops, and a park cleanup. The event aimed to raise awareness about climate change and promote eco-friendly practices, emphasizing community efforts to protect the planet.',
      eventEnd: new Date(),
      eventStart: new Date(),
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
      eventEnd: new Date(),
      eventStart: new Date(),
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
    const baseXp = 10000;
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

  const updateProfileImage = async (file: File) => {};

  const EventCard = ({ event }: { event: EventData }) => {
    const startDate = event.eventStart;

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
          <img src={profileIcon} alt="" width={150} />
          <div className="flex flex-col gap-3">
            <p className="font-semibold text-4xl">{details?.username}</p>
            <p className="text-emerald-700 text-xl">{user?.email}</p>
          </div>
        </div>
        <Link to="/">
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
        </Link>
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
                percent={currExp / requiredExp}
                strokeColor="#047857"
                format={() => <p className="text-emerald-700">{level}</p>}
                size={[170, 170]}
              />
              <div className="text-emerald-700 text-xl font-semibold">
                {currExp} / {requiredExp}
              </div>
            </div>
          </Col>
        </Row>
        <div className="flex flex-col items-center w-full bg-emerald-50 rounded-2xl shadow gap-4 p-6 my-8">
          <p className="text-gray-500 text-xl self-start font-semibold">
            Participated Events
          </p>
          {events.map((event) => (
            <EventCard event={event} />
          ))}
        </div>
      </div>
    </div>
  );
};

export default ProfilePage;
