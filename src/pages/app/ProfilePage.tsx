import { Card, Col, Progress, Row } from "antd"
import profileIcon from "../../assets/profile-icon.png"
import { useAuth } from "../../hooks/useAuth"
import movingCoinIcon from "../../assets/moving-coin-icon.gif"
import { useEffect, useState } from "react"
import { Link } from "react-router-dom"
import { IoIosArrowForward } from "react-icons/io";

const ProfilePage = () => {
    const { user, details } = useAuth()
    const [currExp, setCurrExp] = useState(0)
    const [requiredExp, setRequiredExp] = useState(0)
    const [level, setLevel] = useState(0)

    useEffect(() => {
        initializeProgress()
    }, [])

    // level: 10000 + 120% * level
    const initializeProgress = () => {
        const baseXp = 10000
        const levelModifier = 1.2

        let currentXpRequirement = baseXp
        let currentUserXp = details?.xp ?? 0
        let currentLevel = 1

        while (currentUserXp > currentXpRequirement) {
            currentLevel += 1
            currentUserXp -= currentXpRequirement
            currentXpRequirement *= levelModifier
        }

        setCurrExp(currentUserXp)
        setRequiredExp(currentXpRequirement)
        setLevel(currentLevel)
    }

    const updateProfileImage = async (file: File) => {

    }

    return (
        <div className="px-16 py-4">
            <div className="flex items-center gap-5">
                <img src={profileIcon} alt="" width={350} />
                <div className="flex flex-col gap-3">
                    <p className="font-semibold text-4xl">{details?.username}</p>
                    <p className="text-emerald-700 text-xl">{user?.email}</p>
                </div>
            </div>
            <div className="mx-24">
                <Row gutter={[60, 60]} className="mt-6">
                    <Col span={12}>
                        <div className="flex flex-col items-center justify-center w-full bg-emerald-50 rounded-2xl shadow gap-4 select-none h-80">
                            <img src={movingCoinIcon} alt="coin" width={160} />
                            <p className="text-yellow-400 text-xl font-bold">{details?.coin}</p>
                        </div>
                    </Col>
                    <Col span={12}>
                        <div className="flex flex-col items-center justify-center w-full bg-emerald-50 rounded-2xl shadow gap-2 select-none h-80">
                            <Progress
                                type="dashboard"
                                percent={currExp / requiredExp}
                                strokeColor="#047857"
                                format={() => <p className="text-emerald-700">{level}</p>}
                                size={[200, 200]}
                            />
                            <div className="text-emerald-700 text-xl font-semibold">{currExp} / {requiredExp}</div>
                        </div>
                    </Col>
                    <Col span={12}>
                        <Link
                            to="/"
                        >
                            <div className="flex items-center justify-between w-full bg-emerald-50 rounded-2xl shadow gap-4 h-16 px-6">
                                <p className="text-gray-500 text-xl">View Past Events</p>
                                <IoIosArrowForward fontSize="1.4rem" className="text-gray-500" />
                            </div>
                        </Link>
                    </Col>
                    <Col span={12}>
                        <Link
                            to="/"
                        >
                            <div className="flex items-center justify-between w-full bg-emerald-50 rounded-2xl shadow gap-4 h-16 px-6">
                                <p className="text-gray-500 text-xl">View Charity History</p>
                                <IoIosArrowForward fontSize="1.4rem" className="text-gray-500" />
                            </div>
                        </Link>
                    </Col>
                </Row>
            </div>


        </div>
    )
}

export default ProfilePage