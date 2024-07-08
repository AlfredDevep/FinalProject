import React, { useContext, useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { getAuth, createUserWithEmailAndPassword ,onAuthStateChanged,browserSessionPersistence, inMemoryPersistence, setPersistence, signInWithEmailAndPassword, signInWithRedirect } from 'firebase/auth';
import firebase from 'firebase/compat/app';
import { auth } from '../firebase/config';
import { useNavigate } from 'react-router-dom';
import { initializeApp } from 'firebase/app';
import { GoogleAuthProvider } from 'firebase/auth/web-extension';
import Home from './Home';
import Swal from 'sweetalert2';

export const LoginForm = () => {


  const { register, handleSubmit, formState: { errors } } = useForm();
  const [registrando, setRegistrando]=useState(false)
  //const [email, setEmail] =useState("email");
  //agruegue esta funcion la cual hizo que el codigo me funcionara
  const functAutenticacion = async(e)=>{
    e.preventDefault();
    
    const email = e.target.email.value;
    const password = e.target.password.value;
    //console.log(email);
    if (registrando){
      await createUserWithEmailAndPassword(auth, email, password);
      navigate('/home');
    }
    else{
      await signInWithEmailAndPassword(auth, email, password)
      
    }
    }


  const navigate = useNavigate();

  return (
    
    <div className='fondo' style={{backgroundImage: 'url(https://images6.alphacoders.com/523/523275.jpg)'}}>
    
    <div className="d-flex justify-content-center align-items-center vh-100">
    
      <form onSubmit={functAutenticacion/**Aca cambie la funcion */}  className="p-4 border rounded bg-light">
        <div className="mb-3">
          <label htmlFor="email" className="form-label">Email</label>
          <input id="email" type="email" className="form-control" placeholder="Ingresa tu email" {...register('email', { required: 'El email es requerido' })} />
          {errors.email && <p className="text-danger">{errors.email.message}</p>}
        </div>
        <div className="mb-3">
          <label htmlFor="password" className="form-label">Password</label>
          <input id="password" type="password" className="form-control" placeholder="Ingresa tu contraseña" {...register('password', { required: 'La contraseña es requerida' })} />
          {errors.password && <p className="text-danger">{errors.password.message}</p>}
        </div>
        <button type="submit" className="btn btn-primary w-100" >Iniciar sesión</button>
        <button  type="button" className="btn btn-secondary w-100 mt-2" onClick={() => navigate('/home')}>Regresar</button>
      </form>
    </div>
</div>

  );
};

export default LoginForm;


