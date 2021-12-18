import React, {ChangeEvent, useEffect, useState} from 'react';
import {getAuth, updateProfile} from 'firebase/auth'
import {useNavigate} from "react-router-dom";
import {updateDoc, doc} from 'firebase/firestore'
import {db} from '../firebase.config'

type FormType = {
    name: string
    email: string
}

const Profile = () => {
    const auth = getAuth()
    const navigate = useNavigate()
    const [changeDetails, setChangeDetails] = useState(false)

    const [formData, setFormData] = useState<FormType>({
        // @ts-ignore
        name: auth.currentUser?.displayName,
        // @ts-ignore
        email: auth.currentUser?.email

    })
    const {name, email} = formData
    const onLogout = () => {
        auth.signOut()
        navigate('/')

    }
    const onSubmit = async () => {
       try {
           if (auth.currentUser?.displayName !== name){
              await updateProfile(auth.currentUser!, {
                  displayName: name
              })
               // @ts-ignore
               const userRef = doc(db, 'users', auth.currentUser?.uid)
               await updateDoc(userRef, {
                   name
               })
           }
       }catch (e) {
           console.log(e)
       }
    }
    const onChange = (e: ChangeEvent<HTMLInputElement>) => {
        setFormData((prevState:any) => ({
            ...prevState,
            [e.target.id]: e.target.value
        }))
    }



    return (
        <div className={'profile'}>
            <header className={'profileHeader'}>
                <p className={'pageHeader'}>
                    My Profile
                </p>
                <button
                    onClick={onLogout}
                    type={'button'}
                    className={'logOut'}>
                    Logout
                </button>
            </header>
            <main>
                <div className={'profileDetailsHeader'}>
                    <p className={'profileDetailsText'}>
                        Personal Details
                    </p>
                    <p className={'changePersonalDetails'} onClick={() => {
                        changeDetails && onSubmit()
                        setChangeDetails((prevState) => !prevState)
                    }}>
                        {changeDetails? 'done': 'change'}
                    </p>
                </div>
                <div className={'profileCard'}>
                    <form>
                        <input
                            className={!changeDetails? 'profileName': 'profileNameActive'}
                            disabled={!changeDetails}
                            value={name}
                            onChange={onChange}
                            id={'name'}
                            type="text"/>
                        <input
                            className={!changeDetails? 'profileEmail': 'profileEmailActive'}
                            disabled={!changeDetails}
                            value={email}
                            onChange={onChange}
                            id={'email'}
                            type="text"/>
                    </form>
                </div>
            </main>
        </div>
    );
};

export default Profile;
