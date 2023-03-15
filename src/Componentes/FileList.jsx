import React from 'react'
import { addFiles, removeFiles} from '../Reducers/filesSelected'
import { addFilesM, removeFilesM} from '../Reducers/filesModified'
import { useState } from 'react'
import { useSelector, useDispatch } from 'react-redux'

const FileList = () => {
  
    const list_filesSelected      = useSelector((state) => state.filesSelected.list_filesSelected);
    const list_filesModified      = useSelector((state) => state.filesModified.list_filesModified);
    const dispatch                = useDispatch();

    const handleCheckbox = (item) => {
        
        // Si es true lo que seleccionamos lo agregamos a list_filesSelected y sino lo eliminamos
        if(item.target.checked){
            dispatch(addFilesM(item.target.id));
        }else{
            dispatch(removeFilesM(item.target.id));
        }
        
    }

    function unixTimeToDate(unixTime) {
        return new Date(unixTime );
    }

    const handleSubmit = (item) => {
        item.preventDefault();
        
        list_filesModified.forEach((elemento, indice) => {
            dispatch(removeFiles(elemento));
        });

        list_filesSelected.forEach((elemento, indice) => {
            dispatch(removeFilesM(elemento.name))
        });

        console.log(list_filesSelected)
    }
  
    return (
    <form className='flex flex-col w-90p h-1/2 m-auto rounded-xl p-2 border-2 overflow-hidden'>
        
        {/* Datos de columna */}
        <div className='grid grid-row grid-cols-7 gap-2 items-center text-gray-500 h-14'>
            
            <div className='h-8 w-8 border-2 rounded-lg m-auto'></div>

            <div className='col-span-2'>
                File name
            </div>

            <div className='col-span-2'>
                File size
            </div>

            <div className='col-span-2'>
                Last uploaded
            </div>
        </div>

        <div className='w-full mt-1 h-1px bg-gray-300'></div>

        {/* Datos de los archivos */}

        <table className='max-h-full max-w-full overflow-scroll block'>
        {list_filesSelected.map((file)=>(
            

            <tr className='grid grid-row grid-cols-7 gap-2 items-center h-20'>

                <input type="checkbox" name={file.name} onChange={handleCheckbox} id={file.name} className='hidden'/>
                <label for={file.name} className={(list_filesModified.includes(file.name) ? 'bg-gray-700 ' : '') + 'h-8 w-8 border-2 rounded-lg m-auto'}></label> 


                <div className='col-span-2 flex flex-row justify-start items-center'>

                <svg width="44" height="44" viewBox="0 0 44 44" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M31.5096 19.4305H20.7957C19.8215 19.4305 18.8872 19.0435 18.1983 18.3546C17.5094 17.6657 17.1224 16.7314 17.1224 15.7571V5.04329C17.1224 4.96211 17.0902 4.88425 17.0328 4.82684C16.9754 4.76943 16.8975 4.73718 16.8163 4.73718H9.77578C8.47681 4.73718 7.23105 5.2532 6.31254 6.1717C5.39403 7.09021 4.87802 8.33598 4.87802 9.63494V34.1237C4.87802 35.4227 5.39403 36.6685 6.31254 37.587C7.23105 38.5055 8.47681 39.0215 9.77578 39.0215H26.9179C28.2169 39.0215 29.4627 38.5055 30.3812 37.587C31.2997 36.6685 31.8157 35.4227 31.8157 34.1237V19.7366C31.8157 19.6554 31.7834 19.5775 31.726 19.5201C31.6686 19.4627 31.5908 19.4305 31.5096 19.4305ZM24.4691 31.6749H12.2247C11.8999 31.6749 11.5885 31.5459 11.3589 31.3162C11.1292 31.0866 11.0002 30.7752 11.0002 30.4504C11.0002 30.1257 11.1292 29.8142 11.3589 29.5846C11.5885 29.355 11.8999 29.226 12.2247 29.226H24.4691C24.7938 29.226 25.1052 29.355 25.3349 29.5846C25.5645 29.8142 25.6935 30.1257 25.6935 30.4504C25.6935 30.7752 25.5645 31.0866 25.3349 31.3162C25.1052 31.5459 24.7938 31.6749 24.4691 31.6749ZM24.4691 25.5527H12.2247C11.8999 25.5527 11.5885 25.4237 11.3589 25.194C11.1292 24.9644 11.0002 24.653 11.0002 24.3282C11.0002 24.0035 11.1292 23.692 11.3589 23.4624C11.5885 23.2328 11.8999 23.1038 12.2247 23.1038H24.4691C24.7938 23.1038 25.1052 23.2328 25.3349 23.4624C25.5645 23.692 25.6935 24.0035 25.6935 24.3282C25.6935 24.653 25.5645 24.9644 25.3349 25.194C25.1052 25.4237 24.7938 25.5527 24.4691 25.5527Z" fill="#2A85FF"/>
                    <path d="M30.8378 16.7208L19.8324 5.71535C19.811 5.69407 19.7838 5.6796 19.7541 5.67374C19.7245 5.66789 19.6939 5.67092 19.666 5.68245C19.6381 5.69398 19.6142 5.7135 19.5974 5.73855C19.5806 5.76361 19.5715 5.79307 19.5714 5.82325V15.7573C19.5714 16.082 19.7004 16.3935 19.93 16.6231C20.1597 16.8527 20.4711 16.9817 20.7959 16.9817H30.7299C30.7601 16.9816 30.7895 16.9726 30.8146 16.9557C30.8396 16.9389 30.8592 16.915 30.8707 16.8872C30.8822 16.8593 30.8852 16.8286 30.8794 16.799C30.8735 16.7694 30.8591 16.7422 30.8378 16.7208Z" fill="#2A85FF"/>
                </svg>
                    {file.name}
                </div>

                <div className='col-span-2'>
                    {file.size/1000} &nbsp; kb
                </div>

                <div className='col-span-2'>
                    {unixTimeToDate(file.lastModified).toLocaleDateString()}
                </div>
            </tr>
            

            ))}
        </table>
        <button onClick={handleSubmit} className={(list_filesModified.length == 0 || list_filesSelected.length == 0 ? 'hidden ' : '')+'bg-red-500 w-1/6 mx-auto h-10 rounded-lg'}>
            Remove
        </button>
        
    </form>
  )
}

export default FileList