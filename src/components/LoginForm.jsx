import React from 'react';
import { useForm } from 'react-hook-form';
import { browserSessionPersistence, inMemoryPersistence, setPersistence, signInWithEmailAndPassword, signInWithRedirect } from 'firebase/auth';
import { auth} from '../firebase/config';
import { useNavigate } from 'react-router-dom';
import { getAuth } from 'firebase/auth';
import { GoogleAuthProvider } from 'firebase/auth/web-extension';

export const LoginForm = () => {
  const { register, handleSubmit, formState: { errors } } = useForm();
  const navigate = useNavigate();

  const onSubmitForm = async (data) => {
     try {
      await signInWithEmailAndPassword(auth.setPersistence, data.email, data.password);
      navigate('/home');
    } catch (error) {
      console.error(error.message);
    }
  };

  return (
    <div className='fondo' style={{backgroundImage: 'url(https://images6.alphacoders.com/523/523275.jpg)'}}>
    
    <div className="d-flex justify-content-center align-items-center vh-100">
      <form onSubmit={handleSubmit(onSubmitForm)} className="p-4 border rounded bg-light">
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
        <button type="submit" className="btn btn-primary w-100">Iniciar sesión</button>
        <button  type="button" className="btn btn-secondary w-100 mt-2">Regresar</button>
      </form>
    </div>
</div>
  );
};

export default LoginForm;


