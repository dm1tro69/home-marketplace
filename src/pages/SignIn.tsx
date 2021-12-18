import React, {ChangeEvent, FC, FormEvent, useState} from 'react';
import {toast} from "react-toastify";
import {Link, useNavigate} from "react-router-dom";
import {getAuth, signInWithEmailAndPassword} from 'firebase/auth'
import {ReactComponent as ArrowRightIcon} from "../assets/svg/keyboardArrowRightIcon.svg";
import visibilityIcon from '../assets/svg/visibilityIcon.svg'

interface ISignIn {
    email: string
    password: string
}

const SignIn:FC = () => {
    const navigate = useNavigate()
    const [showPassword, setShowPassword] = useState(false)
    const [formData, setFormData] = useState<ISignIn>({
        email: '',
        password: ''
    })
    const {email, password} = formData

    const onChange = (e:ChangeEvent<HTMLInputElement>) => {
       setFormData((prevState) => ({
           ...prevState,
        [e.target.id]: e.target.value
       }))
    }
    const onSubmit = async (e:FormEvent<HTMLFormElement>) => {
        e.preventDefault()
        try {
            const auth = getAuth()

            const userCredential = await signInWithEmailAndPassword(auth, email, password)
            if (userCredential.user){
                navigate('/profile')
            }
        }catch (e) {
            console.log(e)
        }

    }


    return (
        <>
            <div className={'pageContainer'}>
                <header>
                    <p className={'pageHeader'}>Welcome Back!</p>
                </header>
                <main>
                    <form onSubmit={onSubmit}>
                        <input
                            onChange={onChange}
                            value={email}
                            id={'email'}
                            placeholder={'Email'}
                            className={'emailInput'}
                            type={'email'}
                        />
                        <div className={'passwordInputDiv'}>
                            <input
                                className={'passwordInput'}
                                id={'password'}
                                onChange={onChange}
                                value={password}
                                placeholder={'Password'}
                                type={showPassword ? 'text': 'password'}
                            />
                            <img
                                onClick={() => setShowPassword((prevState) => !prevState)}
                                className={'showPassword'}
                                src={visibilityIcon}
                                alt="img"/>
                        </div>
                        <Link className={'forgotPasswordLink'} to={'/forgot-password'}>Forgot Password</Link>
                        <div className={'signInBar'}>
                            <p className={'signInText'}>
                                Sign In
                            </p>
                            <button className={'signInButton'}>
                                <ArrowRightIcon fill={'#ffffff'} width={'34px'} height={'34px'}/>
                            </button>
                        </div>
                    </form>
                    <Link className={'registerLink'} to={'/sign-up'}>Sign Up Instead</Link>

                </main>
            </div>
        </>
    );
};

export default SignIn;
