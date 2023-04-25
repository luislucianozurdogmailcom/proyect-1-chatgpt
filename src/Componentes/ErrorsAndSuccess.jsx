
const Error = (arg) => {
    return (
        <div id='up-wrong' className='fixed left-0 w-full p-[1.6%] text-white bg-red-500 shadow-lg text-center'>
            { arg.children }
        </div>
    )
}

const Success = (arg) => (
    <div id='up-success' className='fixed font-bold left-0 w-full p-[1.6%] bg-green-500 shadow-lg text-center'>
        { arg.children }
    </div>
)

const TextCopied = (arg) => (
    <div id='text-copied' className='fixed font-bold left-0 w-full p-[.5%] bg-gray-800 shadow-lg text-green-500 text-center'>
        { arg.children }
    </div>
)

export {
    Error,
    Success,
    TextCopied
}