import { useState } from "react";
import crownIcon from "../../assets/crown-icon.png";
import rankOneMedal from "../../assets/medal-rank-1.png";
import rankTwoMedal from "../../assets/medal-rank-2.png";
import rankThreeMedal from "../../assets/medal-rank-3.png";
import profileIcon from "../../assets/profile-icon.png";
import xpIcon from "../../assets/XPIcon.png";
import levelIcon from "../../assets/levelIcon.png";

type User = {
  name: string;
  exp: number;
};

const LeaderboardPage = () => {
  const initializeProgress = (exp: number) => {
    const baseXp = 5000;
    const levelModifier = 1.2;

    let currentXpRequirement = baseXp;
    let currentUserXp = exp ?? 0;
    let currentLevel = 1;

    while (currentUserXp > currentXpRequirement) {
      currentLevel += 1;
      currentUserXp -= currentXpRequirement;
      currentXpRequirement *= levelModifier;
    }
    return currentLevel;
  };

  const [topUsers, setTopUsers] = useState<User[]>([
    {
      name: "Tyo",
      exp: 173751,
    },
    {
      name: "Gaving",
      exp: 125199,
    },
    {
      name: "carni",
      exp: 115163,
    },
    {
      name: "devis",
      exp: 109456,
    },
  ]);

  const LeaderboardItems = ({ rank, user }: { rank: number; user: User }) => {
    const isTopThree = rank >= 1 && rank <= 3;

    return (
      <div
        className={
          "flex items-center justify-between px-11 bg-white w-11/12 m-auto shadow rounded-2xl h-24 select-none box-border" +
          (rank == 1
            ? " bg-yellow-200 border-2 border-yellow-400"
            : rank == 2
            ? " bg-gray-300 border-2 border-gray-400"
            : "")
        }
      >
        <div className="flex items-center gap-3 w-52">
          {rank == 1 ? (
            <img src={rankOneMedal} width={50} alt="medal" />
          ) : rank == 2 ? (
            <img src={rankTwoMedal} width={50} alt="medal" />
          ) : rank == 3 ? (
            <img src={rankThreeMedal} width={50} alt="medal" />
          ) : (
            <p
              className="flex justify-center items-center w-12 h-12 text-2xl text-emerald-800 
                  font-semibold border-2 border-emerald-800 rounded-full"
            >
              {rank}
            </p>
          )}
          <img src={profileIcon} alt="profile" width={48} />
          <p className="text-lg font-semibold">{user.name}</p>
        </div>
        <div className="flex gap-8 w-60">
          <div className="flex items-center gap-2">
            <img src={levelIcon} alt="xp" width={50} />
            <div className="text-emerald-800 font-semibold text-lg">
              {initializeProgress(user.exp)}
            </div>
          </div>
          <div className="flex items-center gap-3">
            <img src={xpIcon} alt="xp" width={40} />
            <div className="text-emerald-800 font-semibold text-lg">
              {user.exp}
            </div>
          </div>
        </div>
      </div>
    );
  };

  return (
    <div className="px-10 pt-0 mb-8 flex flex-col items-center grow gap-3">
      <img src={crownIcon} alt="leaderboard" width={100} />
      <h1 className="text-center text-4xl font-bold">Leaderboard</h1>
      <h4 className="text-center text-xl tracking-widest">
        Top 100 sparkles across the world
      </h4>
      <div className="flex flex-col w-full gap-4 mt-5">
        {topUsers.map((user, i) => (
          <LeaderboardItems rank={i + 1} user={user} />
        ))}
      </div>
      <p className="text-lg">Become the next top sparkle!</p>
    </div>
  );
};

export default LeaderboardPage;
