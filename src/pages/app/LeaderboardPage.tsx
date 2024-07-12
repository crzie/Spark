import { useEffect, useState } from "react";
import crownIcon from "../../assets/crown-icon.png";
import rankOneMedal from "../../assets/medal-rank-1.png";
import rankTwoMedal from "../../assets/medal-rank-2.png";
import rankThreeMedal from "../../assets/medal-rank-3.png";
import profileIcon from "../../assets/profile-icon.png";
import xpIcon from "../../assets/XPIcon.png";
import levelIcon from "../../assets/levelIcon.png";
import { fetchImage, getAllAccountDetails } from "../../services/firebase";
import { useAuth } from "../../hooks/useAuth";

const LeaderboardPage = () => {
  const { details } = useAuth();
  const [topUsers, setTopUsers] = useState<FirebaseDocument<UserDetails>[]>([]);

  useEffect(() => {
    getAllAccountDetails().then((data) => {
      setTopUsers(data);
    });
  }, []);

  const sorted = topUsers.sort((a, b) => b.data.xp - a.data.xp);

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

  const LeaderboardItems = ({ rank, user }: { rank: number; user: UserDetails }) => {
    const name = user === details ? "You" : user.username;
    const [image, setImage] = useState<string>("");

    useEffect(() => {
      fetchImage(user.imagePath).then((url) => {
        setImage(url);
      });
    }, [user.imagePath]);

    const img = !image ? profileIcon : image;

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
          <img src={img} alt="profile" className="rounded-full" width={48} height={48} />
          <p className="text-lg font-semibold">{name}</p>
        </div>
        <div className="flex gap-8 w-60">
          <div className="flex items-center gap-2">
            <img src={levelIcon} alt="xp" width={50} />
            <div className="text-emerald-800 font-semibold text-lg">
              {initializeProgress(user.xp)}
            </div>
          </div>
          <div className="flex items-center gap-3">
            <img src={xpIcon} alt="xp" width={40} />
            <div className="text-emerald-800 font-semibold text-lg">
              {user.xp}
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
        {sorted.map((user, i) => (
          <LeaderboardItems key={user.id} rank={i + 1} user={user.data} />
        ))}
      </div>
      <p className="text-lg">Become the next top sparkle!</p>
    </div>
  );
};

export default LeaderboardPage;
