export default function AuthLayout({ title, subtitle, children }){
    return (
        <div className="bg-gray-100 dark:bg-gray-950">
            <div className="flex h-screen">

                {/* Lado esquerdo */}
                <div className="hidden lg:block lg:w-2/3 relative overflow-hidden bg-gradient-to-br from-gray-900 via-gray-900 to-purple-900">

                    <div className="absolute inset-0 bg-black/40 backdrop-blur-sm flex items-center justify-center px-20">
                        <img
                            className="w-[420px] drop-shadow-2xl"
                            src="https://media.discordapp.net/attachments/717097301692252192/1500324731331678379/path3.png?ex=69f805ca&is=69f6b44a&hm=8cf837fbdacf79a6ada8d4f87512a9f900ba06ff456f2f809d376f40b64ddcc8&=&format=webp&quality=lossless"
                            alt="logo"
                        />
                    </div>

                    <svg className="absolute bottom-0 left-0 w-full" viewBox="0 0 1440 320">
                        <path
                            fill="#f9fafb"
                            fillOpacity="1"
                            d="M0,0L40,42.7C80,85,160,171,240,197.3C320,224,400,192,480,154.7C560,117,640,75,720,74.7C800,75,880,117,960,154.7C1040,192,1120,224,1200,213.3C1280,203,1360,149,1400,122.7L1440,96L1440,320L0,320Z"
                        />
                    </svg>
                </div>

                {/* Lado direito */}
                <div className="flex items-center justify-center w-full lg:w-1/3 px-6">

                    <div className="w-full max-w-md">

                        {/* Card */}
                        <div className="bg-white/80 dark:bg-gray-900/80 backdrop-blur-xl shadow-2xl rounded-2xl p-8 border border-gray-200 dark:border-gray-800">

                            <h1 className="text-3xl font-bold text-center text-gray-800 dark:text-white">
                                {title}
                            </h1>

                            <p className="text-center text-sm text-gray-500 mt-2">
                                {subtitle}
                            </p>

                            <div className="mt-8 space-y-5">

                               {children}

                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}
