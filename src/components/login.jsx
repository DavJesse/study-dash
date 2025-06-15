import logoPath from '../assets/images/logo/logo.png';

export function LoginForm() {
    return (
    <div className="h-fit w-fit">
        <div className="w-full h-full absolute -translate-x-1/2 -translate-y-1/2 left-1/2 top-1/2">
            <div className="green-circle w-35 h-35 absolute rounded-full left-[-8%] top-[6%] md:left-[20%] md:top-[22%] lg:left-[36%] lg:top-[12%] xl:left-[36%] xl:top-[12%]"></div>
            <div className="orange-circle w-35 h-35 absolute rounded-full right-[-8%] bottom-[6%] md:right-[20%] md:bottom-[22%] xl:right-[36%] xl:bottom-[12%] 2xl:right-[36%] 2xl:bottom-[12%]"></div>
        </div>

        <form className='h-fit w-80 bg-white/15 absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 rounded-[10px] backdrop-blur-md border border-white/10 shadow-[0_0_40px_rgba(8,7,16,0.6)] px-[35px] py-[50px] flex flex-col justify-center gap-6'>
            <img src={logoPath} alt="Logo" className='h-30 w-auto max-w-full object-contain'></img>
                <div className='flex flex-col justify-center'>
                    <label htmlFor="username" className='block text-white text-base font-medium'>Username</label>
                    <input type="text" placeholder="Username or Email" id="username" className='block h-10 bg-white/10 text-white rounded px-[10px] mb-2 text-sm font-light'></input>

                    <label htmlFor="password" className='block text-white text-base font-medium'>Password</label>
                    <input type="password" placeholder="Password" id="password" className='block h-10 bg-white/10 text-white rounded px-[10px] text-sm font-light'></input>

                    <button className='mt-10 h-10 bg-white text-[#080710] p-0 text-lg font-semibold rounded-[5px] cursor-pointer'>Log In</button>
                </div>
        </form>
    </div>
    )
}