export function NotFound() {
    return (
        <div className="min-h-screen h-fit w-screen relative">
            <div className='h-fit w-80 bg-white/15 absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 rounded-[10px] backdrop-blur-md border border-white/10 shadow-[0_0_40px_rgba(8,7,16,0.6)] px-[35px] py-[50px] flex flex-col justify-center gap-6 z-10'>
                <h1 className="text-3xl font-bold text-white">404</h1>
                <p className="text-white text-lg">Page Not Found</p>
            </div>
        </div>
    )
}