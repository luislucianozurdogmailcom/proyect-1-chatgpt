import React from 'react'

const SearchBar = () => {
  return (
    <div className='d-flex container mt-4'>
          
          
          {/* Barra buscadora */}
          <form action='especificar_endpoint' method='post' className='w-100 gris-buscador rounded-full d-flex flex-row'>
            
            {/* Boton de categorias */}
            <div className='bg-blue-500 rounded-full m-0 p-2 d-flex justify-content-center align-items-center text-white font-semibold text-sm'>
              <div className='m-1' style={{ fontSize: '0.8rem' }}>
                Categories
              </div>
               
              <svg width="11" height="7" viewBox="0 0 11 7" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M10.7823 1.59894L5.90633 6.48944C5.84828 6.54749 5.7854 6.5887 5.71768 6.61308C5.64996 6.63746 5.5774 6.64946 5.5 6.64907C5.4226 6.64907 5.35004 6.63707 5.28232 6.61308C5.2146 6.58909 5.15171 6.54787 5.09367 6.48944L0.203166 1.59894C0.0677218 1.46349 -2.3407e-07 1.29419 -2.4295e-07 1.09102C-2.51831e-07 0.887856 0.0725591 0.713714 0.217678 0.568595C0.362797 0.423476 0.532102 0.350917 0.725593 0.350917C0.919085 0.350917 1.08839 0.423476 1.23351 0.568595L5.5 4.83508L9.76649 0.568595C9.90193 0.43315 10.0689 0.365428 10.2674 0.365428C10.466 0.365428 10.6376 0.437988 10.7823 0.583107C10.9274 0.728225 11 0.89753 11 1.09102C11 1.28451 10.9274 1.45382 10.7823 1.59894Z" fill="white"/>
              </svg>
            </div>

            {/* Mensaje de búsqueda */}
            
            <input placeholder='Search message' className='text-black p-1 outline-none bg-transparent text-sm  h-12 w-41p' />


            {/*Botoncitos */}
            <div className='rounded-full h-100 flex flex-row justify-around items-center'>
                
                <button className='d-flex justify-content-center align-items-center m-3' type='reset'>
                    <svg width="15" height="15" viewBox="0 0 15 15" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M7.5 0.5C3.629 0.5 0.5 3.629 0.5 7.5C0.5 11.371 3.629 14.5 7.5 14.5C11.371 14.5 14.5 11.371 14.5 7.5C14.5 3.629 11.371 0.5 7.5 0.5ZM10.51 10.51C10.4452 10.5749 10.3683 10.6264 10.2836 10.6615C10.199 10.6966 10.1082 10.7147 10.0165 10.7147C9.92482 10.7147 9.83404 10.6966 9.74936 10.6615C9.66468 10.6264 9.58776 10.5749 9.523 10.51L7.5 8.487L5.477 10.51C5.34612 10.6409 5.1686 10.7144 4.9835 10.7144C4.7984 10.7144 4.62088 10.6409 4.49 10.51C4.35912 10.3791 4.28559 10.2016 4.28559 10.0165C4.28559 9.92485 4.30364 9.8341 4.33871 9.74942C4.37378 9.66475 4.42519 9.58781 4.49 9.523L6.513 7.5L4.49 5.477C4.35912 5.34612 4.28559 5.1686 4.28559 4.9835C4.28559 4.7984 4.35912 4.62088 4.49 4.49C4.62088 4.35912 4.7984 4.28559 4.9835 4.28559C5.1686 4.28559 5.34612 4.35912 5.477 4.49L7.5 6.513L9.523 4.49C9.58781 4.42519 9.66475 4.37378 9.74942 4.33871C9.8341 4.30364 9.92485 4.28559 10.0165 4.28559C10.1082 4.28559 10.1989 4.30364 10.2836 4.33871C10.3683 4.37378 10.4452 4.42519 10.51 4.49C10.5748 4.55481 10.6262 4.63174 10.6613 4.71642C10.6964 4.80109 10.7144 4.89185 10.7144 4.9835C10.7144 5.07515 10.6964 5.1659 10.6613 5.25058C10.6262 5.33525 10.5748 5.41219 10.51 5.477L8.487 7.5L10.51 9.523C10.776 9.789 10.776 10.237 10.51 10.51Z" fill="#ABB2BA"/>
                    </svg>
                </button> 
            
                <div className='barrita h-10 w-0.5 bg-gray-300'></div>
                
                <button className='d-flex justify-content-center align-items-center m-3' type='submit'>
                    <svg width="16" height="15" viewBox="0 0 16 15" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M14.3333 15L9.08333 9.75C8.66667 10.0833 8.1875 10.3472 7.64583 10.5417C7.10417 10.7361 6.52778 10.8333 5.91667 10.8333C4.40278 10.8333 3.12167 10.3089 2.07333 9.26C1.025 8.21111 0.500556 6.93 0.5 5.41667C0.5 3.90278 1.02444 2.62167 2.07333 1.57333C3.12222 0.525 4.40333 0.000555556 5.91667 0C7.43056 0 8.71167 0.524444 9.76 1.57333C10.8083 2.62222 11.3328 3.90333 11.3333 5.41667C11.3333 6.02778 11.2361 6.60417 11.0417 7.14583C10.8472 7.6875 10.5833 8.16667 10.25 8.58333L15.5 13.8333L14.3333 15ZM5.91667 9.16667C6.95833 9.16667 7.84389 8.80194 8.57333 8.0725C9.30278 7.34306 9.66722 6.45778 9.66667 5.41667C9.66667 4.375 9.30194 3.48944 8.5725 2.76C7.84306 2.03056 6.95778 1.66611 5.91667 1.66667C4.875 1.66667 3.98944 2.03139 3.26 2.76083C2.53056 3.49028 2.16611 4.37556 2.16667 5.41667C2.16667 6.45833 2.53139 7.34389 3.26083 8.07333C3.99028 8.80278 4.87556 9.16722 5.91667 9.16667Z" fill="#2A85FF"/>
                    </svg>
                </button>

            </div>
          
          </form>
         </div>
  )
}

export default SearchBar