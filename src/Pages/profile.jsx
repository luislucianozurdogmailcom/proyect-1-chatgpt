import React, { Fragment, useState, useEffect } from 'react';
import Navbar from '../Componentes/Navbar';
import { Modal } from './Modal';
import { Error, Success } from '../Componentes/ErrorsAndSuccess';
import avatar from '../assets/avatar.png'; // Corregir la importación aquí
import styled from 'styled-components';
//import 'bootstrap/dist/css/bootstrap.min.css';
import '../css/main.css'
import Http from '../Services/Services';

const user = {};

const openFile = (formData, setFormData) => {
    let input = document.getElementById('profile_avatar');
        input.click()
    let imageContainer = document.getElementById('profile_image');

    input.onchange = (ev) => {
        if(ev.target.files != undefined)
        {
            input.src = ev.target.result
        }
    } 
}

const getUserProfile = (setFormData) => {
    let url = Http.host + Http.routes.profile;
    Http.get(url,true, rs => {
        setFormData(rs);
    })
}


const Profileview = () => {


    const [formData, setFormData] = useState(user);

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

    useEffect(() => {
        getUserProfile(setFormData)
    },[])

    return (
        <Fragment>
            <div className='flex flex-row w-full h-full'>
                <Navbar></Navbar>
                {/* <div className='h-full w-10p bg-black'></div> */}
                <div className='profile-container container p-12'>
                    <form className='p-8' onSubmit={handleSubmit}>
                        
                        <div className='w-full flex justify-center items-center'>
                            <div id='profile_image' className={'bg-[url('+(formData.profile_avatar || '/logo_icon.png')+')] bg-cover rounded-full ring-4 ring-blue-200 overflow-hidden w-32 h-32 shadow-lg'}></div>
                            <div onClick={() => openFile(formData,setFormData)} className='rounded-full w-[35px] h-[35px] bg-blue-700 text-white absolute top-[15em] left-[56%] flex items-center justify-center text-xs cursor-pointer border-2 border-blue-200'>
                                <i className='fa fa-camera'></i>
                            </div>
                        </div>

                        <br />
                        <div className='text-center'>
                            <h1 className='font-bold text-4xl'>{formData.fullname || ''}</h1>
                            <span className='text-xs text-gray-400'>{formData.email || ''}</span>
                        </div>
                        <br />
                        
                        <div className='profile-info mt-4'>

                            <div className='row columns-3 flex items-center space-between xs-col'>
                                <div className='w-[50%] md:w-full sm:w-full xs-w-full'>
                                    <LabelProfile className='block text-sm mt-4 mb-1' htmlFor='name'>
                                        Username
                                    </LabelProfile>
                                    <input
                                        type='text'
                                        id='username'
                                        name='username'
                                        value={formData.username || ''}
                                        onChange={handleChange}
                                        className='border rounded w-full px-3 py-2'
                                    />

                                </div>
                                <div className='w-[50%] mx-[1em] md:w-full sm:w-full xs-w-full'>
                                    <LabelProfile className='block text-sm mt-4 mb-1' htmlFor='email'>
                                        Password
                                    </LabelProfile>
                                    <input
                                        type='password'
                                        id='password'
                                        name='password'
                                        value={formData.password || ''}
                                        onChange={handleChange}
                                        className='border rounded w-full px-3 py-2'
                                    />

                                </div>
                                <div className='w-[50%] md:w-full sm:w-full xs-w-full'>
                                    <LabelProfile className='block text-sm mt-4 mb-1' htmlFor='email'>
                                        Fullname
                                    </LabelProfile>
                                    <input
                                        type='text'
                                        id='fullname'
                                        name='fullname'
                                        value={formData.fullname || ''}
                                        onChange={handleChange}
                                        className='border rounded w-full px-3 py-2'
                                    />

                                </div>
                            </div>

                            <div className='row columns-3 flex items-center space-between xs-col'>
                                <div className='w-[50%] md:w-full sm:w-full xs-w-full'>
                                    <LabelProfile className='block text-sm mt-4 mb-1' htmlFor='email'>
                                        Status
                                    </LabelProfile>
                                    <p className='border rounded w-full px-3 py-2 bg-gray-100'>
                                        {formData.status || ''}
                                    </p>
                                </div>
                                <div className='w-[50%] mx-[1em] md:w-full sm:w-full xs-w-full'>
                                    <LabelProfile className='block text-sm mt-4 mb-1' htmlFor='email'>
                                        Date Create
                                    </LabelProfile>
                                    <p className='border rounded w-full px-3 py-2 bg-gray-100'>
                                        {new Date(formData.date_create).toLocaleDateString() || ''}
                                    </p>
                                </div>
                                <div className='w-[50%] md:w-full sm:w-full xs-w-full'>
                                    <LabelProfile className='block text-sm mt-4 mb-1' htmlFor='email'>
                                        Email
                                    </LabelProfile>
                                    <input
                                        type='email'
                                        id='email'
                                        name='email'
                                        value={formData.email || ''}
                                        onChange={handleChange}
                                        className='border rounded w-full px-3 py-2'
                                    />
                                </div>
                            </div>

                            <div className='row columns-3 flex items-center space-between xs-col'>
                                <div className='w-[50%] md:w-full sm:w-full xs-w-full'>
                                    <LabelProfile className='block text-sm mt-4 mb-1' htmlFor='email'>
                                        Category
                                    </LabelProfile>
                                    <p className='border rounded w-full px-3 py-2 bg-gray-100'>
                                        {formData.category || ''}
                                    </p>
                                </div>

                                <div className='w-[50%] mx-[1em] md:w-full sm:w-full xs-w-full'>
                                    <LabelProfile className='block text-sm mt-4 mb-1' htmlFor='email'>
                                        Days Caduced
                                    </LabelProfile>
                                    <p className='border rounded w-full px-3 py-2 bg-gray-100'>
                                        {formData.days_caduced || ''}
                                    </p>

                                </div>
                                <div className='w-[50%] md:w-full sm:w-full xs-w-full'>
                                    <LabelProfile className='block text-sm mt-4 mb-1' htmlFor='email'>
                                        Payment Date
                                    </LabelProfile>

                                    <p className='border rounded w-full px-3 py-2 bg-gray-100'>
                                        {new Date(formData.payment_date).toLocaleDateString() || ''}
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
