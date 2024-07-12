import { Button, Input, Typography } from "antd";
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import logo from '../../assets/SparkLogoTextUnder.png';
import { createAccount } from '../../services/firebase';
const { Title } = Typography;
const SignUp = () => {
    const [username, setUsername] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const [error, setError] = useState("");
    const navigate = useNavigate();

    const handleSubmit = (event: { preventDefault: () => void; }) => {
        event.preventDefault();
        if (password !== confirmPassword) {
            setError("Passwords do not match");
            return;
        }
        createAccount(email, password, username)
            .then(() => {
                navigate("/");
            })
            .catch((error) => {
                setError(error.message);
            })
    }

    return (
        <div className='w-screen h-screen flex justify-center items-center bg-green-white '>
            <div className='w-3/4 h-3/4 bg-red-500 flex items-center justify-between rounded-2xl' style={{ backgroundColor: '#A1DEBB' }}>
                <div className='w-1/2 h-full flex items-center justify-center'>
                    <img className='w-100 h-1/2' src={logo} alt="" />
                </div>
                <form className='w-1/2 h-full bg-white flex flex-col justify-center' onSubmit={handleSubmit}>
                    <h1 className='pb-5 w-full flex flex-col items-center text-5xl font-normal'>Register</h1>
                    <div className='flex flex-col items-center '>
                        <div className='w-3/5 flex flex-col items-baseline'>
                            <Title level={5} >Username</Title>
                            <Input placeholder="Choose a username" className='border-black'
                                onChange={(e) => { setUsername(e.target.value) }} />
                        </div>
                        <div className='w-3/5 flex flex-col items-baseline'>
                            <Title level={5} >Email</Title>
                            <Input placeholder="Enter your email" type='email' className='border-black '
                                onChange={(e) => { setEmail(e.target.value) }} />
                        </div>
                        <div className='w-3/5 flex flex-col items-baseline'>
                            <Title level={5} >Password</Title>
                            <Input.Password placeholder="Enter your password" type='password' className='border-black '
                                onChange={(e) => { setPassword(e.target.value) }} />
                        </div>
                        <div className='w-3/5 flex flex-col items-baseline'>
                            <Title level={5} >Confirm Password</Title>
                            <Input.Password placeholder="Re-enter your password" type='password' className='border-black '
                                onChange={(e) => { setConfirmPassword(e.target.value) }} />
                        </div>
                        <div className='w-3/5 flex flex-col items-center gap-4 pt-10'>
                            <Button type="primary" className='w-1/2' htmlType="submit" style={{ backgroundColor: '#0B6A3C' }}>Register</Button>
                            <Title level={5} >Already Have an Account? <a href="/signin">Login</a></Title>
                        </div>
                    </div>
                </form>
            </div>
        </div>
    )
}

export default SignUp