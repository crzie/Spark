import Title from "antd/es/typography/Title";
const CharityCard = ({
  name,
  description,
  bannerPath,
  donation,
  location,
  charityStart,
  charityEnd,
  charityStatus,
}: Charity) => {
  return (
    <div className="max-w-lg mx-auto bg-white rounded-lg shadow-lg border border-gray-200">
      <div className="flex">
        <div className="bg-emerald-400 p-4 text-white">
          <span className="font-bold text-lg">DONATION</span>
        </div>
        <div className="flex-grow p-4">
          <div className="flex items-center justify-between mb-2">
            <img
              src={bannerPath}
              alt={name}
              className=" w-14 h-14 object-cover"
            />
            <span className="text-emerald-600 font-bold">
              {donation} POINTS
            </span>
          </div>
          <p className="text-gray-700 text-sm">{description}</p>
          <div className="flex justify-between items-end mt-4">
            <span className="text-gray-500 text-xs">
              Location: {location}
              <br />
              Start: {charityStart.toDateString()}
              <br />
              End: {charityEnd.toDateString()}
            </span>
            <button
              className={`py-1 px-4 rounded ${
                charityStatus === "active"
                  ? "bg-emerald-700 text-white"
                  : "bg-gray-400 text-gray-700"
              }`}
              disabled={charityStatus !== "active"}
            >
              {charityStatus === "active" ? "Redeem" : "Inactive"}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

const RedeemPage = () => {
  const charityData: Charity[] = [
    {
      name: "UNICEF",
      description:
        "Donate to UNICEF to help children in need around the world.",
      bannerPath: "src/assets/unicefLogo.png",
      donation: 10,
      location: "Global",
      charityStart: new Date("2024-01-01"),
      charityEnd: new Date("2024-12-31"),
      charityStatus: "active",
    },
    {
      name: "Red Cross",
      description:
        "Support the Red Cross in providing disaster relief and emergency assistance.",
      bannerPath: "src/assets/redCross.png",
      donation: 200,
      location: "Global",
      charityStart: new Date("2024-01-01"),
      charityEnd: new Date("2024-12-31"),
      charityStatus: "active",
    },
    {
      name: "Oxfam",
      description:
        "Contribute to Oxfam's efforts to fight poverty and injustice.",
      bannerPath: "src/assets/oxFam.png",
      donation: 200,
      location: "Global",
      charityStart: new Date("2024-01-01"),
      charityEnd: new Date("2024-12-31"),
      charityStatus: "active",
    },
    {
      name: "World Food Programme",
      description:
        "Donate to the World Food Programme to combat hunger worldwide.",
      bannerPath: "src/assets/wfp.png",
      donation: 200,
      location: "Global",
      charityStart: new Date("2024-01-01"),
      charityEnd: new Date("2024-12-31"),
      charityStatus: "active",
    },
  ];

  return (
    <>
      <Title level={1} className="text-center">
        Redeem
      </Title>
      <Title level={3} className="text-center">
        My Points: 808008080
      </Title>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mx-32 my-10 grow">
        {charityData.map((charity, index) => (
          <CharityCard key={index} {...charity} />
        ))}
      </div>
    </>
  );
};

export default RedeemPage;
