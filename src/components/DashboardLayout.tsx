import { ReactNode } from 'react'

import logoP from '../assets/logos/logoP.png'
import logoW from '../assets/logos/logoW.png'

interface SidebarItem {
  id: string
  title: string
  subtitle: string
  icon: ReactNode
}

interface DashboardLayoutProps {
  children: ReactNode
  user?: any
  firstName?: string
  currentTab: string
  onTabChange: (tab: string) => void
  sidebarItems: SidebarItem[]
  onAnalyze?: () => void
  onLogout?: () => void
}

export default function DashboardLayout({
  children,
  user,
  firstName,
  currentTab,
  onTabChange,
  sidebarItems,
  onAnalyze,
  onLogout
}: DashboardLayoutProps) {
  return (
    <div className="min-h-screen bg-gray-100 dark:bg-gray-950 text-gray-900 dark:text-white transition-colors duration-300">

      {/* BACKGROUND */}
      <div className="fixed inset-0 -z-10 overflow-hidden">

        <div className="absolute inset-0 bg-gradient-to-br from-gray-100 via-gray-100 to-purple-100 dark:from-gray-950 dark:via-gray-950 dark:to-purple-950" />

        <div className="absolute top-0 left-0 w-[500px] h-[500px] bg-purple-500/10 blur-3xl rounded-full" />

        <div className="absolute bottom-0 right-0 w-[500px] h-[500px] bg-indigo-500/10 blur-3xl rounded-full" />
      </div>

      {/* HEADER */}
      <header className="h-16 border-b border-gray-200/60 dark:border-gray-800/60 bg-white/70 dark:bg-gray-900/70 backdrop-blur-xl sticky top-0 z-50">

        <div className="h-full px-6 flex items-center justify-between">

          {/* LOGO */}
          <div className="flex items-center">

            <img
              src={logoP}
              alt="Logo"
              className="h-10 object-contain block dark:hidden"
            />

            <img
              src={logoW}
              alt="Logo"
              className="h-10 object-contain hidden dark:block"
            />

          </div>
        </div>
      </header>

      {/* BODY */}
      <div className="flex">

        {/* SIDEBAR */}
        <aside className="hidden md:block w-[300px] min-h-[calc(100vh-64px)] p-5">

          <div className="h-full rounded-3xl bg-white/70 dark:bg-gray-900/70 backdrop-blur-xl border border-gray-200 dark:border-gray-800 shadow-2xl p-4">

            <nav className="flex flex-col gap-2">

              {sidebarItems.map((item) => (
                <button
                  key={item.id}
                  onClick={() => onTabChange(item.id)}
                  className={`group flex items-center gap-4 w-full p-4 rounded-2xl transition-all duration-200 text-left ${
                    currentTab === item.id
                      ? 'bg-gradient-to-r from-purple-600 to-indigo-600 text-white shadow-xl shadow-purple-900/30'
                      : 'hover:bg-gray-100 dark:hover:bg-gray-800/70 text-gray-800 dark:text-white'
                  }`}
                >

                  <div
                    className={`p-2 rounded-xl transition-all flex items-center justify-center ${
                      currentTab === item.id
                        ? 'bg-white/20 text-white'
                        : 'bg-gray-100 dark:bg-gray-800 text-gray-600 dark:text-gray-300'
                    }`}
                  >
                    {item.icon}
                  </div>

                  <div className="flex flex-col">
                    <p className="font-semibold leading-none">
                      {item.title}
                    </p>

                    <p
                      className={`text-xs mt-1 ${
                        currentTab === item.id
                          ? 'text-purple-100'
                          : 'text-gray-500 dark:text-gray-400'
                      }`}
                    >
                      {item.subtitle}
                    </p>
                  </div>

                </button>
              ))}

              {onLogout && (
                <>
                  <div className="my-4 border-t border-gray-200 dark:border-gray-800" />

                  <button
                    onClick={onLogout}
                    className="flex items-center gap-4 p-4 rounded-2xl text-red-500 hover:bg-red-500/10 transition-all duration-200"
                  >

                    <div className="p-2 rounded-xl bg-red-500/10 flex items-center justify-center">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className="w-5 h-5"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M17 16l4-4m0 0l-4-4m4 4H7"
                        />
                      </svg>
                    </div>

                    <span className="font-medium">
                      Logout
                    </span>

                  </button>
                </>
              )}

            </nav>

          </div>
        </aside>

        {/* CONTENT */}
        <main className="flex-1 p-6">
          <div className="max-w-5xl mx-auto">
            {children}
          </div>
        </main>

      </div>
    </div>
  )
}