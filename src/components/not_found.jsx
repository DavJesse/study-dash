/**
 * @function NotFound
 * @description A React component that renders a 404 Not Found page.
 *
 * @returns {JSX.Element} A JSX element representing the 404 Not Found page.
 *
 * @example
 * // Usage:
 * <NotFound />
 */
export function NotFound() {
    return (
        <div className="min-h-screen h-screen w-screen flex items-center justify-center relative">
            <div className="h-100 w-105 flex flex-col align-middle justify-center gap-30">
            <div className="green-circle w-30 h-30 rounded-full"></div>
            <div className="orange-circle w-30 h-30 rounded-full self-end"></div>
                <div className='h-fit w-80 bg-white/15 absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 rounded-[10px] backdrop-blur-md border border-white/10 shadow-[0_0_40px_rgba(8,7,16,0.6)] px-[35px] py-[50px] flex flex-col justify-center gap-6 z-10'>
                    <h1 className="text-3xl font-bold text-blue-600 mx-auto">404</h1>
                    <p className="text-white text-lg mx-auto">Page Not Found</p>
                    <button
                        onClick={() => window.location.href = '/'}
                        className='my-auto h-10 bg-white text-[#080710] p-0 text-lg font-semibold rounded-[5px] cursor-pointer'
                    >Return Home</button>
                </div>
            </div>
        </div>
    )
}