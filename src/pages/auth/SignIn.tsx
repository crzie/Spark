import { Button, Input, Typography } from "antd";
import { signInWithEmailAndPassword } from 'firebase/auth';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import logo from '../../assets/SparkLogoTextUnder.png';
import { auth } from '../../services/firebase';
const { Title } = Typography;

const SignIn = () => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState("");
    const navigate = useNavigate();

    const handleSubmit = (event: { preventDefault: () => void; }) => {
        event.preventDefault();
        signInWithEmailAndPassword(auth, email, password)
            .then(() => {
                navigate('/');
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
                    <p className='pb-5 w-full flex flex-col items-center text-5xl text-emerald-900 font-normal'>Login</p>
                    <div className='flex flex-col items-center '>
                        <div className='w-3/5 flex flex-col items-baseline'>
                            <Title level={5} >Email</Title>
                            <Input type='email' placeholder="Email" className='border-black '
                                onChange={(e) => { setEmail(e.target.value) }} />
                        </div>
                        <div className='w-3/5 flex flex-col items-baseline'>
                            <Title level={5} >Password</Title>
                            <Input.Password placeholder="Password" type='password' className='border-black '
                                onChange={(e) => { setPassword(e.target.value) }} />
                        </div>
                        {error && <p className='text-red-500 mt-4'>{error}</p>}
                        <div className='w-3/5 flex flex-col items-center mt-4'>
                            <Button type="primary" className='mb-3 w-1/2' htmlType="submit" style={{ backgroundColor: '#0B6A3C' }}>Login</Button>
                            <Title level={5} >Don't have account? <a href="/signup">Register</a></Title>
                        </div>
                    </div>
                </form>
            </div>
        </div>
    )
}

export default SignIn