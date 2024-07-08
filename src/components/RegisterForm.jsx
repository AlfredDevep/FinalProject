import  {React, useState } from 'react';
import { useForm } from 'react-hook-form';
import * as yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';
import { createUserWithEmailAndPassword } from 'firebase/auth';
import { auth } from '../firebase/config';
import { useNavigate } from 'react-router-dom';
import Swal from 'sweetalert2';

const schema = yup.object().shape({
  email: yup.string().email('Correo no válido').required('El correo es obligatorio'),
  password: yup.string().min(8, 'La contraseña debe tener al menos 8 caracteres').required('El password es obligatorio'),
  confirmPassword: yup.string().oneOf([yup.ref('password'), null], 'Las contraseñas deben coincidir').required('La confirmación de contraseña es obligatoria')
});

const RegisterForm = () => {
  const { register, handleSubmit, formState: { errors } } = useForm({
    resolver: yupResolver(schema)
  });
  const navigate = useNavigate();

  const onSubmitForm = async (data) => {
    try {
      Swal.fire({
        title: "Registrado",
        text: "Usuario agregado correctamente",
        icon: "success"
      });
      await createUserWithEmailAndPassword(auth, data.email, data.password);
      
     navigate('/home');
    } catch (error) {
      Swal.fire({
        icon: "error",
        title: "Oops...",
        text: "Usuario ya esta registrado",
        footer: '<a href="#">Why do I have this issue?</a>'
      });
  
    }
  };

  return (
    <div className="d-flex justify-content-center align-items-center vh-100">
      <form onSubmit={handleSubmit(onSubmitForm)} className="p-4 border rounded bg-light">
        <div className="mb-3">
          <label htmlFor="email" className="form-label" name="email">Email</label>
          <input id="email" 
          type="email" 
          className="form-control" placeholder="Ingresa tu email" 
            {...register('email', {required: 'El correo es requerido'})}/>
          {errors.email && <p className="text-danger">{errors.email.message}</p>}
        </div>
        <div className="mb-3">
          <label htmlFor="password" className="form-label">Password</label>
          <input id="password" type="password" 
            className="form-control" placeholder="Ingresa tu contraseña" 
            {...register('password', {required: 'Contrasenya requerida'})}/>
            {errors.password && <p className="text-danger">{errors.password.message}</p>}
        </div>
        <div className="mb-3">
          <label htmlFor="confirmPassword" className="form-label">Confirm Password</label>
          <input id="confirmPassword" 
            type="password" 
            className="form-control" 
            placeholder="Confirma tu contraseña" 
            {...register('confirmPassword',  {required: 'Contrasenya requerida'})} />
          {errors.confirmPassword && <p className="text-danger">{errors.confirmPassword.message}</p>}
        </div>
        <button type="submit" className="btn btn-primary w-100">Registrarse</button>
        <button onClick={() => navigate('/')} type="button" className="btn btn-secondary w-100 mt-2">Regresar</button>
      </form>
     
    </div>
  );
};

export default RegisterForm;


