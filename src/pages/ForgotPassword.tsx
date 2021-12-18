import React, {ChangeEvent, FormEvent, useState} from 'react';
import {getAuth, sendPasswordResetEmail} from 'firebase/auth'
import {ReactComponent as ArrowRightIcon} from "../assets/svg/keyboardArrowRightIcon.svg";
import {Link, useNavigate} from "react-router-dom";

const ForgotPassword = () => {
    const [email, setEmail] = useState('')

    const navigate = useNavigate()

    const onChange = (e:ChangeEvent<HTMLInputElement>) => {
         setEmail(e.target.value)
    }
    const onSubmit = async (e:FormEvent<HTMLFormElement>) => {
        e.preventDefault()
        try {
            const auth = getAuth()
            await sendPasswordResetEmail(auth, email)
            navigate('/')

        }catch (e) {
            console.log(e)
        }
    }

    return (
        <div className={'pageContainer'}>
            <header>
                <p className={'pageHeader'}>Forgot Password</p>
            </header>
            <main>
                <form onSubmit={onSubmit}>
                    <input
                        placeholder={'Email'}
                        id={'email'}
                        value={email}
                        onChange={onChange}
                        className={'emailInput'}
                        type="email"
                    />
                    <Link className={'forgotPasswordLink'} to={'/sign-in'}>Sign In</Link>
                    <div className={'signInBar'}>
                       <div className={'signInText'}>
                           Send Reset Link
                       </div>
                        <button className={'signInButton'}>
                            <ArrowRightIcon fill={'#fff'} width={'34px'} height={'34px'}/>
                        </button>
                    </div>
                </form>
            </main>

        </div>
    );
};

export default ForgotPassword;
