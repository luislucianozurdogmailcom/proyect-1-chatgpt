import React, { Fragment, useState } from 'react';
import Navbar from '../Componentes/Navbar';
import { Modal } from './Modal';
import { Error, Success } from '../Componentes/ErrorsAndSuccess';
import avatar from '../assets/avatar.png'; // Corregir la importación aquí
import styled from 'styled-components';
//import 'bootstrap/dist/css/bootstrap.min.css';


const Profileview = () => {

    const user = {
        username: "Frailejón", 
        password: "******", // Puede ser encriptada en el servidor
        fullname: "Frailejón Ernesto Pérez",
        status: "Activo",
        date_create: "21/07/2020",
        email: "Frailejon@mail.com",
        category: "Planta",
        profile_avatar: avatar,
        is_active: true,
        business_name: "Cuidar el agua",
        business_code: "AGU-001",
        days_caduced: "30 días",
        payment_date: "30/07/2020",
    };


    const [formData, setFormData] = useState({
        username: user.username, 
        password: user.password, // Puede ser encriptada en el servidor
        fullname: user.fullname,
        email: user.email,
        profile_avatar: user.profile_avatar,
        is_active: user.is_active,
        business_name: user.business_name,
        business_code: user.business_code,
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({
            ...formData,
            [name]: value,
        });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        // Actualizar la información del usuario en el servidor
        console.log('Datos del formulario enviados:', formData);
    };

    return (
        <Fragment>
            <div className='flex flex-row w-full h-full'>
                <Navbar></Navbar>
                {/* <div className='h-full w-10p bg-black'></div> */}
                <div className='profile-container container p-12'>
                    <form className='p-8' onSubmit={handleSubmit}>
                        <div className='profile-header'>
                            <img
                                src={user.profile_avatar}
                                alt={`${user.username}'s avatar`}
                                className='avatar w-32 h-32 rounded-full mx-auto'
                            />
                        </div>
                        
                        <div className='profile-info mt-4'>

                            <div className='row'>
                                <div className='col-12 col-md-4'>
                                    <LabelProfile className='block text-sm mt-4 mb-1' htmlFor='name'>
                                        Username
                                    </LabelProfile>
                                    <input
                                        type='text'
                                        id='username'
                                        name='username'
                                        value={formData.username}
                                        onChange={handleChange}
                                        className='border rounded w-full px-3 py-2'
                                    />

                                </div>
                                <div className='col-12 col-md-4'>
                                    <LabelProfile className='block text-sm mt-4 mb-1' htmlFor='email'>
                                        Password
                                    </LabelProfile>
                                    <input
                                        type='password'
                                        id='password'
                                        name='password'
                                        value={formData.password}
                                        onChange={handleChange}
                                        className='border rounded w-full px-3 py-2'
                                    />

                                </div>

                                <div className='col-12 col-md-4'>
                                    <LabelProfile className='block text-sm mt-4 mb-1' htmlFor='email'>
                                        Fullname
                                    </LabelProfile>
                                    <input
                                        type='text'
                                        id='fullname'
                                        name='fullname'
                                        value={formData.fullname}
                                        onChange={handleChange}
                                        className='border rounded w-full px-3 py-2'
                                    />

                                </div>
                            </div>

                            <div className='row'>
                                <div className='col-12 col-md-4'>
                                <LabelProfile className='block text-sm mt-4 mb-1' htmlFor='email'>
                                Status
                            </LabelProfile>
                            <p className='border rounded w-full px-3 py-2'>
                                {user.status}
                            </p>

                                </div>
                                <div className='col-12 col-md-4'>
                                <LabelProfile className='block text-sm mt-4 mb-1' htmlFor='email'>
                                Date Create
                            </LabelProfile>
                            <p className='border rounded w-full px-3 py-2'>
                                {user.date_create}
                            </p>

                                </div>
                                <div className='col-12 col-md-4'>
                                <LabelProfile className='block text-sm mt-4 mb-1' htmlFor='email'>
                                Email
                            </LabelProfile>
                            <input
                                type='email'
                                id='email'
                                name='email'
                                value={formData.email}
                                onChange={handleChange}
                                className='border rounded w-full px-3 py-2'
                            />

                                </div>
                            </div>

                            <div className='row'>
                                <div className='col-12 col-md-4'>
                                    <LabelProfile className='block text-sm mt-4 mb-1' htmlFor='email'>
                                        Category
                                    </LabelProfile>
                                    <p className='border rounded w-full px-3 py-2'>
                                        {user.category}
                                    </p>
                                </div>

                                <div className='col-12 col-md-4'>
                                    <LabelProfile className='block text-sm mt-4 mb-1' htmlFor='email'>
                                        Days Caduced
                                    </LabelProfile>
                                    <p className='border rounded w-full px-3 py-2'>
                                        {user.days_caduced}
                                    </p>

                                </div>
                                <div className='col-12 col-md-4'>
                                    <LabelProfile className='block text-sm mt-4 mb-1' htmlFor='email'>
                                        Payment Date
                                    </LabelProfile>

                                    <p className='border rounded w-full px-3 py-2'>
                                        {user.payment_date}
                                    </p>

                                </div>

                            </div>

                            <LabelProfile className='block text-sm mt-4 mb-1' htmlFor='email'>
                                        Profile Avatar
                                    </LabelProfile>
                                    <input
                                        type="file"
                                        name="profile_avatar"
                                        id="profile_avatar"
                                        accept="image/*"
                                        onChange={handleChange}
                                        className='border rounded w-full px-3 py-2'
                                    />
                            <button
                                type='submit'
                                className='bg-blue-500 text-white px-4 py-2 mt-4 rounded'
                            >
                                Guardar cambios
                            </button>
                        </div>
                    </form>
                </div>

                {/** MODAL */}
                <Modal />
                <Error>Is not possible close the session right now</Error>
                <Success>The session is closed!</Success>
            </div>
        </Fragment>
    );
}; 

export default Profileview;

const LabelProfile = styled.label`
    font-weight: bold;
    padding-left: 0.5em 
`;
