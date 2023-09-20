import React, { useState } from 'react';
import { database } from './FirebaseConfig';
import { createUserWithEmailAndPassword, signInWithEmailAndPassword } from 'firebase/auth';
import { useNavigate } from 'react-router-dom';

const RegisterAndLogin = () => {
  const [login, setLogin] = useState(false);
  const history = useNavigate();

  const bgStyles = {
    backgroundImage: "url(https://images.unsplash.com/photo-1531315630201-bb15abeb1653?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1935&q=80)",
    backgroundSize: 'cover',
    backgroundRepeat: 'no-repeat',
    backgroundPosition: 'center center'
  };

  const handleSignIn = (e) => {
    e.preventDefault();
    const email = e.target.email.value;
    const password = e.target.password.value;

    signInWithEmailAndPassword(database, email, password)
      .then(data => {
        history("/home");
      })
      .catch(err => {
        alert(err.code);
      });
  }

  return (
    <div style={bgStyles} className='w-full h-calc flex flex-col justify-center items-center gap-8'>
      <h1 className='text-3xl text-center font-bold'>Login to your 99 Gallery</h1>
      
      <form onSubmit={handleSignIn} className='sm:w-2/6 flex flex-col gap-5'>
        <div className='flex flex-col gap-4 rounded-md'>
          <input
            className='py-4 px-4 rounded-t-md'
            name='email'
            type="email"
            placeholder='Email' />
          <input
            className='p-4 px-4 rounded-b-md'
            name='password'
            type="password"
            placeholder='password' />
        </div>
        <button className='text-white font-bold bg-green rounded-md py-3'>Sign In</button>
      </form>
    </div>
  )
}

export default RegisterAndLogin;
