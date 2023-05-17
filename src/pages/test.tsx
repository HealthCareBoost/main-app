export default function IndexPage() {
  return (
    <>
      <section className="hidden lg:block">
        <div className="overflow-hidden rounded-md border border-slate-200 bg-gradient-to-b from-rose-500 to-indigo-700 shadow-2xl dark:border-slate-800">
          <div
            role="menubar"
            className="flex h-10 items-center space-x-1 rounded-none border border-none border-slate-300 bg-white p-1 dark:border-slate-700 dark:bg-slate-900"
            tabIndex={0}
            data-orientation="horizontal"
            style={{ outline: "none" }}
          >
            <button
              type="button"
              role="menuitem"
              aria-haspopup="menu"
              aria-expanded="false"
              data-state="closed"
              className="flex cursor-default select-none items-center rounded-[0.2rem] py-1.5 px-3 text-sm font-bold outline-none focus:bg-slate-100 data-[state=open]:bg-slate-100 dark:focus:bg-slate-700 dark:data-[state=open]:bg-slate-700"
              tabIndex={-1}
              data-orientation="horizontal"
              data-radix-collection-item=""
            >
              Music
            </button>
            <button
              type="button"
              role="menuitem"
              aria-haspopup="menu"
              aria-expanded="false"
              data-state="closed"
              className="relative flex cursor-default select-none items-center rounded-[0.2rem] py-1.5 px-3 text-sm font-medium outline-none focus:bg-slate-100 data-[state=open]:bg-slate-100 dark:focus:bg-slate-700 dark:data-[state=open]:bg-slate-700"
              tabIndex={-1}
              data-orientation="horizontal"
              data-radix-collection-item=""
            >
              File
              <span className="absolute top-1 right-0 flex h-5 w-5 animate-bounce items-center justify-center">
                <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-sky-400 opacity-75"></span>
                <span className="relative inline-flex h-3 w-3 rounded-full bg-sky-500"></span>
              </span>
            </button>
            <button
              type="button"
              role="menuitem"
              aria-haspopup="menu"
              aria-expanded="false"
              data-state="closed"
              className="flex cursor-default select-none items-center rounded-[0.2rem] py-1.5 px-3 text-sm font-medium outline-none focus:bg-slate-100 data-[state=open]:bg-slate-100 dark:focus:bg-slate-700 dark:data-[state=open]:bg-slate-700"
              tabIndex={-1}
              data-orientation="horizontal"
              data-radix-collection-item=""
            >
              Edit
            </button>
            <button
              type="button"
              role="menuitem"
              aria-haspopup="menu"
              aria-expanded="false"
              data-state="closed"
              className="flex cursor-default select-none items-center rounded-[0.2rem] py-1.5 px-3 text-sm font-medium outline-none focus:bg-slate-100 data-[state=open]:bg-slate-100 dark:focus:bg-slate-700 dark:data-[state=open]:bg-slate-700"
              tabIndex={-1}
              data-orientation="horizontal"
              data-radix-collection-item=""
            >
              View
            </button>
            <button
              type="button"
              role="menuitem"
              aria-haspopup="menu"
              aria-expanded="false"
              data-state="closed"
              className="flex cursor-default select-none items-center rounded-[0.2rem] py-1.5 px-3 text-sm font-medium outline-none focus:bg-slate-100 data-[state=open]:bg-slate-100 dark:focus:bg-slate-700 dark:data-[state=open]:bg-slate-700"
              tabIndex={-1}
              data-orientation="horizontal"
              data-radix-collection-item=""
            >
              Account
            </button>
          </div>
          <div className="p-8">
            <div className="rounded-md bg-white shadow-2xl transition-all dark:bg-slate-900">
              <div className="grid grid-cols-4 xl:grid-cols-5">
                <aside className="pb-12">
                  <div className="px-8 py-6">
                    <p className="flex items-center text-2xl font-semibold tracking-tight">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="24"
                        height="24"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        className="mr-2"
                      >
                        <path d="M9 18V5l12-2v13"></path>
                        <circle cx="6" cy="18" r="3"></circle>
                        <circle cx="18" cy="16" r="3"></circle>
                      </svg>
                      Music
                    </p>
                  </div>
                  <div className="space-y-4">
                    <div className="px-6 py-2">
                      <h2 className="mb-2 px-2 text-lg font-semibold tracking-tight">
                        Discover
                      </h2>
                      <div className="space-y-1">
                        <button className="inline-flex h-9 w-full items-center justify-start rounded-md bg-slate-100 px-2 text-sm font-medium text-slate-900 transition-colors hover:bg-slate-200 focus:outline-none focus:ring-2 focus:ring-slate-400 focus:ring-offset-2 active:scale-95 disabled:pointer-events-none disabled:opacity-50 data-[state=open]:bg-slate-100 dark:bg-slate-700 dark:text-slate-100 dark:hover:bg-slate-800 dark:hover:text-slate-100 dark:focus:ring-slate-400 dark:focus:ring-offset-slate-900 dark:data-[state=open]:bg-slate-800">
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            width="24"
                            height="24"
                            viewBox="0 0 24 24"
                            fill="none"
                            stroke="currentColor"
                            strokeWidth="2"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            className="mr-2 h-4 w-4"
                          >
                            <circle cx="12" cy="12" r="10"></circle>
                            <polygon points="10 8 16 12 10 16 10 8"></polygon>
                          </svg>
                          Listen Now
                        </button>
                        <button className="inline-flex h-9 w-full items-center justify-start rounded-md bg-transparent px-2 text-sm font-medium transition-colors hover:bg-slate-100 focus:outline-none focus:ring-2 focus:ring-slate-400 focus:ring-offset-2 active:scale-95 disabled:pointer-events-none disabled:opacity-50 data-[state=open]:bg-transparent dark:text-slate-100 dark:hover:bg-slate-800 dark:hover:text-slate-100 dark:focus:ring-slate-400 dark:focus:ring-offset-slate-900 dark:data-[state=open]:bg-transparent">
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            width="24"
                            height="24"
                            viewBox="0 0 24 24"
                            fill="none"
                            stroke="currentColor"
                            strokeWidth="2"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            className="mr-2 h-4 w-4"
                          >
                            <rect x="3" y="3" width="7" height="7"></rect>
                            <rect x="14" y="3" width="7" height="7"></rect>
                            <rect x="14" y="14" width="7" height="7"></rect>
                            <rect x="3" y="14" width="7" height="7"></rect>
                          </svg>
                          Browse
                        </button>
                        <button className="inline-flex h-9 w-full items-center justify-start rounded-md bg-transparent px-2 text-sm font-medium transition-colors hover:bg-slate-100 focus:outline-none focus:ring-2 focus:ring-slate-400 focus:ring-offset-2 active:scale-95 disabled:pointer-events-none disabled:opacity-50 data-[state=open]:bg-transparent dark:text-slate-100 dark:hover:bg-slate-800 dark:hover:text-slate-100 dark:focus:ring-slate-400 dark:focus:ring-offset-slate-900 dark:data-[state=open]:bg-transparent">
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            width="24"
                            height="24"
                            viewBox="0 0 24 24"
                            fill="none"
                            stroke="currentColor"
                            strokeWidth="2"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            className="mr-2 h-4 w-4"
                          >
                            <circle cx="12" cy="12" r="2"></circle>
                            <path d="M4.93 19.07a10 10 0 0 1 0-14.14"></path>
                            <path d="M7.76 16.24a6 6 0 0 1-1.3-1.95 6 6 0 0 1 0-4.59 6 6 0 0 1 1.3-1.95"></path>
                            <path d="M16.24 7.76a6 6 0 0 1 1.3 2 6 6 0 0 1 0 4.59 6 6 0 0 1-1.3 1.95"></path>
                            <path d="M19.07 4.93a10 10 0 0 1 0 14.14"></path>
                          </svg>
                          Radio
                        </button>
                      </div>
                    </div>
                    <div className="px-6 py-2">
                      <h2 className="mb-2 px-2 text-lg font-semibold tracking-tight">
                        Library
                      </h2>
                      <div className="space-y-1">
                        <button className="inline-flex h-9 w-full items-center justify-start rounded-md bg-transparent px-2 text-sm font-medium transition-colors hover:bg-slate-100 focus:outline-none focus:ring-2 focus:ring-slate-400 focus:ring-offset-2 active:scale-95 disabled:pointer-events-none disabled:opacity-50 data-[state=open]:bg-transparent dark:text-slate-100 dark:hover:bg-slate-800 dark:hover:text-slate-100 dark:focus:ring-slate-400 dark:focus:ring-offset-slate-900 dark:data-[state=open]:bg-transparent">
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            width="24"
                            height="24"
                            viewBox="0 0 24 24"
                            fill="none"
                            stroke="currentColor"
                            strokeWidth="2"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            className="mr-2 h-4 w-4"
                          >
                            <path d="M21 15V6"></path>
                            <path d="M18.5 18a2.5 2.5 0 1 0 0-5 2.5 2.5 0 0 0 0 5Z"></path>
                            <path d="M12 12H3"></path>
                            <path d="M16 6H3"></path>
                            <path d="M12 18H3"></path>
                          </svg>
                          Playlists
                        </button>
                        <button className="inline-flex h-9 w-full items-center justify-start rounded-md bg-transparent px-2 text-sm font-medium transition-colors hover:bg-slate-100 focus:outline-none focus:ring-2 focus:ring-slate-400 focus:ring-offset-2 active:scale-95 disabled:pointer-events-none disabled:opacity-50 data-[state=open]:bg-transparent dark:text-slate-100 dark:hover:bg-slate-800 dark:hover:text-slate-100 dark:focus:ring-slate-400 dark:focus:ring-offset-slate-900 dark:data-[state=open]:bg-transparent">
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            width="24"
                            height="24"
                            viewBox="0 0 24 24"
                            fill="none"
                            stroke="currentColor"
                            strokeWidth="2"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            className="mr-2 h-4 w-4"
                          >
                            <circle cx="8" cy="18" r="4"></circle>
                            <path d="M12 18V2l7 4"></path>
                          </svg>
                          Songs
                        </button>
                        <button className="inline-flex h-9 w-full items-center justify-start rounded-md bg-transparent px-2 text-sm font-medium transition-colors hover:bg-slate-100 focus:outline-none focus:ring-2 focus:ring-slate-400 focus:ring-offset-2 active:scale-95 disabled:pointer-events-none disabled:opacity-50 data-[state=open]:bg-transparent dark:text-slate-100 dark:hover:bg-slate-800 dark:hover:text-slate-100 dark:focus:ring-slate-400 dark:focus:ring-offset-slate-900 dark:data-[state=open]:bg-transparent">
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            width="24"
                            height="24"
                            viewBox="0 0 24 24"
                            fill="none"
                            stroke="currentColor"
                            strokeWidth="2"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            className="mr-2 h-4 w-4"
                          >
                            <path d="M19 21v-2a4 4 0 0 0-4-4H9a4 4 0 0 0-4 4v2"></path>
                            <circle cx="12" cy="7" r="4"></circle>
                          </svg>
                          Made for You
                        </button>
                        <button className="inline-flex h-9 w-full items-center justify-start rounded-md bg-transparent px-2 text-sm font-medium transition-colors hover:bg-slate-100 focus:outline-none focus:ring-2 focus:ring-slate-400 focus:ring-offset-2 active:scale-95 disabled:pointer-events-none disabled:opacity-50 data-[state=open]:bg-transparent dark:text-slate-100 dark:hover:bg-slate-800 dark:hover:text-slate-100 dark:focus:ring-slate-400 dark:focus:ring-offset-slate-900 dark:data-[state=open]:bg-transparent">
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            width="24"
                            height="24"
                            viewBox="0 0 24 24"
                            fill="none"
                            stroke="currentColor"
                            strokeWidth="2"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            className="mr-2 h-4 w-4"
                          >
                            <path d="m12 8-9.04 9.06a2.82 2.82 0 1 0 3.98 3.98L16 12"></path>
                            <circle cx="17" cy="7" r="5"></circle>
                          </svg>
                          Artists
                        </button>
                        <button className="inline-flex h-9 w-full items-center justify-start rounded-md bg-transparent px-2 text-sm font-medium transition-colors hover:bg-slate-100 focus:outline-none focus:ring-2 focus:ring-slate-400 focus:ring-offset-2 active:scale-95 disabled:pointer-events-none disabled:opacity-50 data-[state=open]:bg-transparent dark:text-slate-100 dark:hover:bg-slate-800 dark:hover:text-slate-100 dark:focus:ring-slate-400 dark:focus:ring-offset-slate-900 dark:data-[state=open]:bg-transparent">
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            width="24"
                            height="24"
                            viewBox="0 0 24 24"
                            fill="none"
                            stroke="currentColor"
                            strokeWidth="2"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            className="mr-2 h-4 w-4"
                          >
                            <path d="m16 6 4 14"></path>
                            <path d="M12 6v14"></path>
                            <path d="M8 8v12"></path>
                            <path d="M4 4v16"></path>
                          </svg>
                          Albums
                        </button>
                      </div>
                    </div>
                    <div className="py-2">
                      <h2 className="relative px-8 text-lg font-semibold tracking-tight">
                        Playlists
                        <span className="absolute top-1 right-28 flex h-5 w-5 animate-bounce items-center justify-center">
                          <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-sky-400 opacity-75"></span>
                          <span className="relative inline-flex h-3 w-3 rounded-full bg-sky-500"></span>
                        </span>
                      </h2>
                      <div
                        dir="ltr"
                        className="relative h-[230px] overflow-hidden px-4"
                        style={{ position: "relative" }}
                        //   "
                        //     ;
                        //     --radix-scroll-area-corner-width: 0px;
                        //     --radix-scroll-area-corner-height: 0px;
                        //   "
                      >
                        <style>
                          {/* [data-radix-scroll-area-viewport] {
                        scrollbar-width: none;
                        -ms-overflow-style: none;
                        -webkit-overflow-scrolling: touch;
                      }
                      [data-radix-scroll-area-viewport]::-webkit-scrollbar {
                        display: none;
                      } */}
                        </style>
                        <div
                          data-radix-scroll-area-viewport=""
                          className="h-full w-full rounded-[inherit]"
                          style={{ overflow: "hidden scroll" }}
                          // "overflow: hidden scroll"
                        >
                          <div className="table min-w-full">
                            <div className="space-y-1 p-2">
                              <button className="inline-flex h-9 w-full items-center justify-start rounded-md bg-transparent px-2 text-sm font-normal transition-colors hover:bg-slate-100 focus:outline-none focus:ring-2 focus:ring-slate-400 focus:ring-offset-2 active:scale-95 disabled:pointer-events-none disabled:opacity-50 data-[state=open]:bg-transparent dark:text-slate-100 dark:hover:bg-slate-800 dark:hover:text-slate-100 dark:focus:ring-slate-400 dark:focus:ring-offset-slate-900 dark:data-[state=open]:bg-transparent">
                                <svg
                                  xmlns="http://www.w3.org/2000/svg"
                                  width="24"
                                  height="24"
                                  viewBox="0 0 24 24"
                                  fill="none"
                                  stroke="currentColor"
                                  strokeWidth="2"
                                  strokeLinecap="round"
                                  strokeLinejoin="round"
                                  className="mr-2 h-4 w-4"
                                >
                                  <path d="M21 15V6"></path>
                                  <path d="M18.5 18a2.5 2.5 0 1 0 0-5 2.5 2.5 0 0 0 0 5Z"></path>
                                  <path d="M12 12H3"></path>
                                  <path d="M16 6H3"></path>
                                  <path d="M12 18H3"></path>
                                </svg>
                                Recently Added
                              </button>
                              <button className="inline-flex h-9 w-full items-center justify-start rounded-md bg-transparent px-2 text-sm font-normal transition-colors hover:bg-slate-100 focus:outline-none focus:ring-2 focus:ring-slate-400 focus:ring-offset-2 active:scale-95 disabled:pointer-events-none disabled:opacity-50 data-[state=open]:bg-transparent dark:text-slate-100 dark:hover:bg-slate-800 dark:hover:text-slate-100 dark:focus:ring-slate-400 dark:focus:ring-offset-slate-900 dark:data-[state=open]:bg-transparent">
                                <svg
                                  xmlns="http://www.w3.org/2000/svg"
                                  width="24"
                                  height="24"
                                  viewBox="0 0 24 24"
                                  fill="none"
                                  stroke="currentColor"
                                  strokeWidth="2"
                                  strokeLinecap="round"
                                  strokeLinejoin="round"
                                  className="mr-2 h-4 w-4"
                                >
                                  <path d="M21 15V6"></path>
                                  <path d="M18.5 18a2.5 2.5 0 1 0 0-5 2.5 2.5 0 0 0 0 5Z"></path>
                                  <path d="M12 12H3"></path>
                                  <path d="M16 6H3"></path>
                                  <path d="M12 18H3"></path>
                                </svg>
                                Recently Played
                              </button>
                              <button className="inline-flex h-9 w-full items-center justify-start rounded-md bg-transparent px-2 text-sm font-normal transition-colors hover:bg-slate-100 focus:outline-none focus:ring-2 focus:ring-slate-400 focus:ring-offset-2 active:scale-95 disabled:pointer-events-none disabled:opacity-50 data-[state=open]:bg-transparent dark:text-slate-100 dark:hover:bg-slate-800 dark:hover:text-slate-100 dark:focus:ring-slate-400 dark:focus:ring-offset-slate-900 dark:data-[state=open]:bg-transparent">
                                <svg
                                  xmlns="http://www.w3.org/2000/svg"
                                  width="24"
                                  height="24"
                                  viewBox="0 0 24 24"
                                  fill="none"
                                  stroke="currentColor"
                                  strokeWidth="2"
                                  strokeLinecap="round"
                                  strokeLinejoin="round"
                                  className="mr-2 h-4 w-4"
                                >
                                  <path d="M21 15V6"></path>
                                  <path d="M18.5 18a2.5 2.5 0 1 0 0-5 2.5 2.5 0 0 0 0 5Z"></path>
                                  <path d="M12 12H3"></path>
                                  <path d="M16 6H3"></path>
                                  <path d="M12 18H3"></path>
                                </svg>
                                Top Songs
                              </button>
                              <button className="inline-flex h-9 w-full items-center justify-start rounded-md bg-transparent px-2 text-sm font-normal transition-colors hover:bg-slate-100 focus:outline-none focus:ring-2 focus:ring-slate-400 focus:ring-offset-2 active:scale-95 disabled:pointer-events-none disabled:opacity-50 data-[state=open]:bg-transparent dark:text-slate-100 dark:hover:bg-slate-800 dark:hover:text-slate-100 dark:focus:ring-slate-400 dark:focus:ring-offset-slate-900 dark:data-[state=open]:bg-transparent">
                                <svg
                                  xmlns="http://www.w3.org/2000/svg"
                                  width="24"
                                  height="24"
                                  viewBox="0 0 24 24"
                                  fill="none"
                                  stroke="currentColor"
                                  strokeWidth="2"
                                  strokeLinecap="round"
                                  strokeLinejoin="round"
                                  className="mr-2 h-4 w-4"
                                >
                                  <path d="M21 15V6"></path>
                                  <path d="M18.5 18a2.5 2.5 0 1 0 0-5 2.5 2.5 0 0 0 0 5Z"></path>
                                  <path d="M12 12H3"></path>
                                  <path d="M16 6H3"></path>
                                  <path d="M12 18H3"></path>
                                </svg>
                                Top Albums
                              </button>
                              <button className="inline-flex h-9 w-full items-center justify-start rounded-md bg-transparent px-2 text-sm font-normal transition-colors hover:bg-slate-100 focus:outline-none focus:ring-2 focus:ring-slate-400 focus:ring-offset-2 active:scale-95 disabled:pointer-events-none disabled:opacity-50 data-[state=open]:bg-transparent dark:text-slate-100 dark:hover:bg-slate-800 dark:hover:text-slate-100 dark:focus:ring-slate-400 dark:focus:ring-offset-slate-900 dark:data-[state=open]:bg-transparent">
                                <svg
                                  xmlns="http://www.w3.org/2000/svg"
                                  width="24"
                                  height="24"
                                  viewBox="0 0 24 24"
                                  fill="none"
                                  stroke="currentColor"
                                  strokeWidth="2"
                                  strokeLinecap="round"
                                  strokeLinejoin="round"
                                  className="mr-2 h-4 w-4"
                                >
                                  <path d="M21 15V6"></path>
                                  <path d="M18.5 18a2.5 2.5 0 1 0 0-5 2.5 2.5 0 0 0 0 5Z"></path>
                                  <path d="M12 12H3"></path>
                                  <path d="M16 6H3"></path>
                                  <path d="M12 18H3"></path>
                                </svg>
                                Top Artists
                              </button>
                              <button className="inline-flex h-9 w-full items-center justify-start rounded-md bg-transparent px-2 text-sm font-normal transition-colors hover:bg-slate-100 focus:outline-none focus:ring-2 focus:ring-slate-400 focus:ring-offset-2 active:scale-95 disabled:pointer-events-none disabled:opacity-50 data-[state=open]:bg-transparent dark:text-slate-100 dark:hover:bg-slate-800 dark:hover:text-slate-100 dark:focus:ring-slate-400 dark:focus:ring-offset-slate-900 dark:data-[state=open]:bg-transparent">
                                <svg
                                  xmlns="http://www.w3.org/2000/svg"
                                  width="24"
                                  height="24"
                                  viewBox="0 0 24 24"
                                  fill="none"
                                  stroke="currentColor"
                                  strokeWidth="2"
                                  strokeLinecap="round"
                                  strokeLinejoin="round"
                                  className="mr-2 h-4 w-4"
                                >
                                  <path d="M21 15V6"></path>
                                  <path d="M18.5 18a2.5 2.5 0 1 0 0-5 2.5 2.5 0 0 0 0 5Z"></path>
                                  <path d="M12 12H3"></path>
                                  <path d="M16 6H3"></path>
                                  <path d="M12 18H3"></path>
                                </svg>
                                Logic Discography
                              </button>
                              <button className="inline-flex h-9 w-full items-center justify-start rounded-md bg-transparent px-2 text-sm font-normal transition-colors hover:bg-slate-100 focus:outline-none focus:ring-2 focus:ring-slate-400 focus:ring-offset-2 active:scale-95 disabled:pointer-events-none disabled:opacity-50 data-[state=open]:bg-transparent dark:text-slate-100 dark:hover:bg-slate-800 dark:hover:text-slate-100 dark:focus:ring-slate-400 dark:focus:ring-offset-slate-900 dark:data-[state=open]:bg-transparent">
                                <svg
                                  xmlns="http://www.w3.org/2000/svg"
                                  width="24"
                                  height="24"
                                  viewBox="0 0 24 24"
                                  fill="none"
                                  stroke="currentColor"
                                  strokeWidth="2"
                                  strokeLinecap="round"
                                  strokeLinejoin="round"
                                  className="mr-2 h-4 w-4"
                                >
                                  <path d="M21 15V6"></path>
                                  <path d="M18.5 18a2.5 2.5 0 1 0 0-5 2.5 2.5 0 0 0 0 5Z"></path>
                                  <path d="M12 12H3"></path>
                                  <path d="M16 6H3"></path>
                                  <path d="M12 18H3"></path>
                                </svg>
                                Bedtime Beats
                              </button>
                              <button className="inline-flex h-9 w-full items-center justify-start rounded-md bg-transparent px-2 text-sm font-normal transition-colors hover:bg-slate-100 focus:outline-none focus:ring-2 focus:ring-slate-400 focus:ring-offset-2 active:scale-95 disabled:pointer-events-none disabled:opacity-50 data-[state=open]:bg-transparent dark:text-slate-100 dark:hover:bg-slate-800 dark:hover:text-slate-100 dark:focus:ring-slate-400 dark:focus:ring-offset-slate-900 dark:data-[state=open]:bg-transparent">
                                <svg
                                  xmlns="http://www.w3.org/2000/svg"
                                  width="24"
                                  height="24"
                                  viewBox="0 0 24 24"
                                  fill="none"
                                  stroke="currentColor"
                                  strokeWidth="2"
                                  strokeLinecap="round"
                                  strokeLinejoin="round"
                                  className="mr-2 h-4 w-4"
                                >
                                  <path d="M21 15V6"></path>
                                  <path d="M18.5 18a2.5 2.5 0 1 0 0-5 2.5 2.5 0 0 0 0 5Z"></path>
                                  <path d="M12 12H3"></path>
                                  <path d="M16 6H3"></path>
                                  <path d="M12 18H3"></path>
                                </svg>
                                Feeling Happy
                              </button>
                              <button className="inline-flex h-9 w-full items-center justify-start rounded-md bg-transparent px-2 text-sm font-normal transition-colors hover:bg-slate-100 focus:outline-none focus:ring-2 focus:ring-slate-400 focus:ring-offset-2 active:scale-95 disabled:pointer-events-none disabled:opacity-50 data-[state=open]:bg-transparent dark:text-slate-100 dark:hover:bg-slate-800 dark:hover:text-slate-100 dark:focus:ring-slate-400 dark:focus:ring-offset-slate-900 dark:data-[state=open]:bg-transparent">
                                <svg
                                  xmlns="http://www.w3.org/2000/svg"
                                  width="24"
                                  height="24"
                                  viewBox="0 0 24 24"
                                  fill="none"
                                  stroke="currentColor"
                                  strokeWidth="2"
                                  strokeLinecap="round"
                                  strokeLinejoin="round"
                                  className="mr-2 h-4 w-4"
                                >
                                  <path d="M21 15V6"></path>
                                  <path d="M18.5 18a2.5 2.5 0 1 0 0-5 2.5 2.5 0 0 0 0 5Z"></path>
                                  <path d="M12 12H3"></path>
                                  <path d="M16 6H3"></path>
                                  <path d="M12 18H3"></path>
                                </svg>
                                I miss Y2K Pop
                              </button>
                              <button className="inline-flex h-9 w-full items-center justify-start rounded-md bg-transparent px-2 text-sm font-normal transition-colors hover:bg-slate-100 focus:outline-none focus:ring-2 focus:ring-slate-400 focus:ring-offset-2 active:scale-95 disabled:pointer-events-none disabled:opacity-50 data-[state=open]:bg-transparent dark:text-slate-100 dark:hover:bg-slate-800 dark:hover:text-slate-100 dark:focus:ring-slate-400 dark:focus:ring-offset-slate-900 dark:data-[state=open]:bg-transparent">
                                <svg
                                  xmlns="http://www.w3.org/2000/svg"
                                  width="24"
                                  height="24"
                                  viewBox="0 0 24 24"
                                  fill="none"
                                  stroke="currentColor"
                                  strokeWidth="2"
                                  strokeLinecap="round"
                                  strokeLinejoin="round"
                                  className="mr-2 h-4 w-4"
                                >
                                  <path d="M21 15V6"></path>
                                  <path d="M18.5 18a2.5 2.5 0 1 0 0-5 2.5 2.5 0 0 0 0 5Z"></path>
                                  <path d="M12 12H3"></path>
                                  <path d="M16 6H3"></path>
                                  <path d="M12 18H3"></path>
                                </svg>
                                Runtober
                              </button>
                              <button className="inline-flex h-9 w-full items-center justify-start rounded-md bg-transparent px-2 text-sm font-normal transition-colors hover:bg-slate-100 focus:outline-none focus:ring-2 focus:ring-slate-400 focus:ring-offset-2 active:scale-95 disabled:pointer-events-none disabled:opacity-50 data-[state=open]:bg-transparent dark:text-slate-100 dark:hover:bg-slate-800 dark:hover:text-slate-100 dark:focus:ring-slate-400 dark:focus:ring-offset-slate-900 dark:data-[state=open]:bg-transparent">
                                <svg
                                  xmlns="http://www.w3.org/2000/svg"
                                  width="24"
                                  height="24"
                                  viewBox="0 0 24 24"
                                  fill="none"
                                  stroke="currentColor"
                                  strokeWidth="2"
                                  strokeLinecap="round"
                                  strokeLinejoin="round"
                                  className="mr-2 h-4 w-4"
                                >
                                  <path d="M21 15V6"></path>
                                  <path d="M18.5 18a2.5 2.5 0 1 0 0-5 2.5 2.5 0 0 0 0 5Z"></path>
                                  <path d="M12 12H3"></path>
                                  <path d="M16 6H3"></path>
                                  <path d="M12 18H3"></path>
                                </svg>
                                Mellow Days
                              </button>
                              <button className="inline-flex h-9 w-full items-center justify-start rounded-md bg-transparent px-2 text-sm font-normal transition-colors hover:bg-slate-100 focus:outline-none focus:ring-2 focus:ring-slate-400 focus:ring-offset-2 active:scale-95 disabled:pointer-events-none disabled:opacity-50 data-[state=open]:bg-transparent dark:text-slate-100 dark:hover:bg-slate-800 dark:hover:text-slate-100 dark:focus:ring-slate-400 dark:focus:ring-offset-slate-900 dark:data-[state=open]:bg-transparent">
                                <svg
                                  xmlns="http://www.w3.org/2000/svg"
                                  width="24"
                                  height="24"
                                  viewBox="0 0 24 24"
                                  fill="none"
                                  stroke="currentColor"
                                  strokeWidth="2"
                                  strokeLinecap="round"
                                  strokeLinejoin="round"
                                  className="mr-2 h-4 w-4"
                                >
                                  <path d="M21 15V6"></path>
                                  <path d="M18.5 18a2.5 2.5 0 1 0 0-5 2.5 2.5 0 0 0 0 5Z"></path>
                                  <path d="M12 12H3"></path>
                                  <path d="M16 6H3"></path>
                                  <path d="M12 18H3"></path>
                                </svg>
                                Eminem Essentials
                              </button>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </aside>
                <div className="col-span-3 border-l border-l-slate-200 dark:border-l-slate-700 xl:col-span-4">
                  <div className="h-full px-8 py-6">
                    <div
                      dir="ltr"
                      data-orientation="horizontal"
                      className="h-full space-y-6"
                    >
                      <div className="space-between flex items-center">
                        <div
                          role="tablist"
                          aria-orientation="horizontal"
                          className="inline-flex items-center justify-center rounded-md bg-slate-100 p-1 dark:bg-slate-800"
                          tabIndex={0}
                          data-orientation="horizontal"
                          style={{ outline: "none" }}
                        >
                          <button
                            type="button"
                            role="tab"
                            aria-selected="true"
                            aria-controls="radix-:R2l5j6i:-content-music"
                            data-state="active"
                            className="relative inline-flex min-w-[100px] items-center justify-center rounded-[0.185rem] px-3 py-1.5 text-sm font-medium text-slate-700 transition-all disabled:pointer-events-none disabled:opacity-50 data-[state=active]:bg-white data-[state=active]:text-slate-900 data-[state=active]:shadow-sm dark:text-slate-200 dark:data-[state=active]:bg-slate-900 dark:data-[state=active]:text-slate-100"
                            tabIndex={-1}
                            data-orientation="horizontal"
                            data-radix-collection-item=""
                          >
                            Music
                            <span className="absolute top-1 right-2 flex h-5 w-5 animate-bounce items-center justify-center">
                              <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-sky-400 opacity-75"></span>
                              <span className="relative inline-flex h-3 w-3 rounded-full bg-sky-500"></span>
                            </span>
                          </button>
                          <button
                            type="button"
                            role="tab"
                            aria-selected="false"
                            aria-controls="radix-:R2l5j6i:-content-podcasts"
                            data-state="inactive"
                            className="inline-flex min-w-[100px] items-center justify-center rounded-[0.185rem] px-3 py-1.5 text-sm font-medium text-slate-700 transition-all disabled:pointer-events-none disabled:opacity-50 data-[state=active]:bg-white data-[state=active]:text-slate-900 data-[state=active]:shadow-sm dark:text-slate-200 dark:data-[state=active]:bg-slate-900 dark:data-[state=active]:text-slate-100"
                            tabIndex={-1}
                            data-orientation="horizontal"
                            data-radix-collection-item=""
                          >
                            Podcasts
                          </button>
                          <button
                            type="button"
                            role="tab"
                            aria-selected="false"
                            aria-controls="radix-:R2l5j6i:-content-live"
                            data-state="inactive"
                            data-disabled=""
                            disabled
                            className="inline-flex min-w-[100px] items-center justify-center rounded-[0.185rem] px-3 py-1.5 text-sm font-medium text-slate-700 transition-all disabled:pointer-events-none disabled:opacity-50 data-[state=active]:bg-white data-[state=active]:text-slate-900 data-[state=active]:shadow-sm dark:text-slate-200 dark:data-[state=active]:bg-slate-900 dark:data-[state=active]:text-slate-100"
                            tabIndex={-1}
                            data-orientation="horizontal"
                            data-radix-collection-item=""
                          >
                            Live
                          </button>
                        </div>
                        <div className="ml-auto mr-4">
                          <h3 className="text-sm font-semibold">
                            Welcome back
                          </h3>
                        </div>
                        <button
                          className="relative inline-flex h-10 w-10 items-center justify-center rounded-full bg-transparent py-2 px-4 text-sm font-medium transition-colors hover:bg-slate-100 focus:outline-none focus:ring-2 focus:ring-slate-400 focus:ring-offset-2 active:scale-95 disabled:pointer-events-none disabled:opacity-50 data-[state=open]:bg-transparent dark:text-slate-100 dark:hover:bg-slate-800 dark:hover:text-slate-100 dark:focus:ring-slate-400 dark:focus:ring-offset-slate-900 dark:data-[state=open]:bg-transparent"
                          type="button"
                          aria-haspopup="menu"
                          aria-expanded="false"
                          data-state="closed"
                        >
                          <span className="relative flex h-10 w-10 shrink-0 overflow-hidden rounded-full">
                            <img
                              className="aspect-square h-full w-full"
                              alt="@shadcn"
                              src="https://github.com/shadcn.png"
                            />
                          </span>
                          <span className="absolute right-0 top-0 flex h-5 w-5 animate-bounce items-center justify-center">
                            <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-sky-400 opacity-75"></span>
                            <span className="relative inline-flex h-3 w-3 rounded-full bg-sky-500"></span>
                          </span>
                        </button>
                      </div>
                      <div
                        data-state="active"
                        data-orientation="horizontal"
                        role="tabpanel"
                        aria-labelledby="radix-:R2l5j6i:-trigger-music"
                        tabIndex={0}
                        className="mt-2 rounded-md border border-none border-slate-200 p-0 dark:border-slate-700"
                        style={{ animationDuration: "0s" }} //"animation-duration: 0s"
                      >
                        <div className="flex items-center justify-between">
                          <div className="space-y-1">
                            <h2 className="text-2xl font-semibold tracking-tight">
                              Listen Now
                            </h2>
                            <p className="text-sm text-slate-500 dark:text-slate-400">
                              Top picks for you. Updated daily.
                            </p>
                          </div>
                        </div>
                        <div
                          data-orientation="horizontal"
                          role="none"
                          className="my-4 h-[1px] w-full bg-slate-200 dark:bg-slate-700"
                        ></div>
                        <div className="relative">
                          <span className="absolute right-auto left-24 top-32 z-30 flex h-5 w-5 animate-bounce items-center justify-center">
                            <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-sky-400 opacity-75"></span>
                            <span className="relative inline-flex h-3 w-3 rounded-full bg-sky-500"></span>
                          </span>
                          <div className="relative flex space-x-4">
                            <div className="w-[250px] space-y-3">
                              <span
                                data-state="closed"
                                // style="-webkit-touch-callout: none"
                              >
                                <div
                                  className="relative w-full pb-[133%]"
                                  // "
                                  //   position: relative;
                                  //   width: 100%;
                                  //   padding-bottom: 133.33333333333334%;
                                  // "
                                  data-radix-aspect-ratio-wrapper=""
                                >
                                  <div
                                    className="absolute inset-0 overflow-hidden rounded-md"

                                    //   style="
                                    //     position: absolute;
                                    //     top: 0;
                                    //     right: 0;
                                    //     bottom: 0;
                                    //     left: 0;
                                    //   "
                                  >
                                    <img
                                      alt="Async Awakenings"
                                      sizes="100vw"
                                      srcSet="
                                    https%3A%2F%2Fimages.unsplash.com%2Fphoto-1547355253-ff0740f6e8c1%3Fw%3D300%26dpr%3D2%26q%3D80&amp;w=640&amp;q=75   640w,
                                    https%3A%2F%2Fimages.unsplash.com%2Fphoto-1547355253-ff0740f6e8c1%3Fw%3D300%26dpr%3D2%26q%3D80&amp;w=750&amp;q=75   750w,
                                    https%3A%2F%2Fimages.unsplash.com%2Fphoto-1547355253-ff0740f6e8c1%3Fw%3D300%26dpr%3D2%26q%3D80&amp;w=828&amp;q=75   828w,
                                    https%3A%2F%2Fimages.unsplash.com%2Fphoto-1547355253-ff0740f6e8c1%3Fw%3D300%26dpr%3D2%26q%3D80&amp;w=1080&amp;q=75 1080w,
                                    https%3A%2F%2Fimages.unsplash.com%2Fphoto-1547355253-ff0740f6e8c1%3Fw%3D300%26dpr%3D2%26q%3D80&amp;w=1200&amp;q=75 1200w,
                                    https%3A%2F%2Fimages.unsplash.com%2Fphoto-1547355253-ff0740f6e8c1%3Fw%3D300%26dpr%3D2%26q%3D80&amp;w=1920&amp;q=75 1920w,
                                    https%3A%2F%2Fimages.unsplash.com%2Fphoto-1547355253-ff0740f6e8c1%3Fw%3D300%26dpr%3D2%26q%3D80&amp;w=2048&amp;q=75 2048w,
                                    https%3A%2F%2Fimages.unsplash.com%2Fphoto-1547355253-ff0740f6e8c1%3Fw%3D300%26dpr%3D2%26q%3D80&amp;w=3840&amp;q=75 3840w
                                  "
                                      src="https%3A%2F%2Fimages.unsplash.com%2Fphoto-1547355253-ff0740f6e8c1%3Fw%3D300%26dpr%3D2%26q%3D80&amp;w=3840&amp;q=75"
                                      decoding="async"
                                      data-nimg="fill"
                                      className="absolute inset-0 h-full w-full object-cover transition-all hover:scale-105"
                                      loading="lazy"
                                      // style="
                                      //   position: absolute;
                                      //   height: 100%;
                                      //   width: 100%;
                                      //   left: 0;
                                      //   top: 0;
                                      //   right: 0;
                                      //   bottom: 0;
                                      //   color: transparent;
                                      // "
                                    />
                                  </div>
                                </div>
                              </span>
                              <div className="space-y-1 text-sm">
                                <h3 className="font-medium leading-none">
                                  Async Awakenings
                                </h3>
                                <p className="text-xs text-slate-500 dark:text-slate-400">
                                  Nina Netcode
                                </p>
                              </div>
                            </div>
                            <div className="w-[250px] space-y-3">
                              <span
                                data-state="closed"
                                // style="-webkit-touch-callout: none"
                              >
                                <div
                                  // style="
                                  //   position: relative;
                                  //   width: 100%;
                                  //   padding-bottom: 133.33333333333334%;
                                  // "
                                  className="relative w-full pb-[133%]"
                                  data-radix-aspect-ratio-wrapper=""
                                >
                                  <div
                                    className="absolute inset-0 overflow-hidden rounded-md"
                                    //   style="
                                    //     position: absolute;
                                    //     top: 0;
                                    //     right: 0;
                                    //     bottom: 0;
                                    //     left: 0;
                                    //   "
                                  >
                                    <img
                                      alt="The Art of Reusability"
                                      sizes="100vw"
                                      srcSet="
                                    https%3A%2F%2Fimages.unsplash.com%2Fphoto-1576075796033-848c2a5f3696%3Fw%3D300%26dpr%3D2%26q%3D80&amp;w=640&amp;q=75   640w,
                                    https%3A%2F%2Fimages.unsplash.com%2Fphoto-1576075796033-848c2a5f3696%3Fw%3D300%26dpr%3D2%26q%3D80&amp;w=750&amp;q=75   750w,
                                    https%3A%2F%2Fimages.unsplash.com%2Fphoto-1576075796033-848c2a5f3696%3Fw%3D300%26dpr%3D2%26q%3D80&amp;w=828&amp;q=75   828w,
                                    https%3A%2F%2Fimages.unsplash.com%2Fphoto-1576075796033-848c2a5f3696%3Fw%3D300%26dpr%3D2%26q%3D80&amp;w=1080&amp;q=75 1080w,
                                    https%3A%2F%2Fimages.unsplash.com%2Fphoto-1576075796033-848c2a5f3696%3Fw%3D300%26dpr%3D2%26q%3D80&amp;w=1200&amp;q=75 1200w,
                                    https%3A%2F%2Fimages.unsplash.com%2Fphoto-1576075796033-848c2a5f3696%3Fw%3D300%26dpr%3D2%26q%3D80&amp;w=1920&amp;q=75 1920w,
                                    https%3A%2F%2Fimages.unsplash.com%2Fphoto-1576075796033-848c2a5f3696%3Fw%3D300%26dpr%3D2%26q%3D80&amp;w=2048&amp;q=75 2048w,
                                    https%3A%2F%2Fimages.unsplash.com%2Fphoto-1576075796033-848c2a5f3696%3Fw%3D300%26dpr%3D2%26q%3D80&amp;w=3840&amp;q=75 3840w
                                  "
                                      src="https%3A%2F%2Fimages.unsplash.com%2Fphoto-1576075796033-848c2a5f3696%3Fw%3D300%26dpr%3D2%26q%3D80&amp;w=3840&amp;q=75"
                                      decoding="async"
                                      data-nimg="fill"
                                      className="absolute inset-0 h-full w-full object-cover transition-all hover:scale-105"
                                      loading="lazy"
                                      // style="
                                      //   position: absolute;
                                      //   height: 100%;
                                      //   width: 100%;
                                      //   left: 0;
                                      //   top: 0;
                                      //   right: 0;
                                      //   bottom: 0;
                                      //   color: transparent;
                                      // "
                                    />
                                  </div>
                                </div>
                              </span>
                              <div className="space-y-1 text-sm">
                                <h3 className="font-medium leading-none">
                                  The Art of Reusability
                                </h3>
                                <p className="text-xs text-slate-500 dark:text-slate-400">
                                  Lena Logic
                                </p>
                              </div>
                            </div>
                            <div className="w-[250px] space-y-3">
                              <span
                                data-state="closed"
                                // style="-webkit-touch-callout: none"
                              >
                                <div
                                  // style="
                                  //   position: relative;
                                  //   width: 100%;
                                  //   padding-bottom: 133.33333333333334%;
                                  // "
                                  className="relative w-full pb-[133%]"
                                  data-radix-aspect-ratio-wrapper=""
                                >
                                  <div
                                    className="absolute inset-0 overflow-hidden rounded-md"
                                    //   style="
                                    //     position: absolute;
                                    //     top: 0;
                                    //     right: 0;
                                    //     bottom: 0;
                                    //     left: 0;
                                    //   "
                                  >
                                    <img
                                      alt="Stateful Symphony"
                                      sizes="100vw"
                                      srcSet="
                                    https%3A%2F%2Fimages.unsplash.com%2Fphoto-1606542758304-820b04394ac2%3Fw%3D300%26dpr%3D2%26q%3D80&amp;w=640&amp;q=75   640w,
                                    https%3A%2F%2Fimages.unsplash.com%2Fphoto-1606542758304-820b04394ac2%3Fw%3D300%26dpr%3D2%26q%3D80&amp;w=750&amp;q=75   750w,
                                    https%3A%2F%2Fimages.unsplash.com%2Fphoto-1606542758304-820b04394ac2%3Fw%3D300%26dpr%3D2%26q%3D80&amp;w=828&amp;q=75   828w,
                                    https%3A%2F%2Fimages.unsplash.com%2Fphoto-1606542758304-820b04394ac2%3Fw%3D300%26dpr%3D2%26q%3D80&amp;w=1080&amp;q=75 1080w,
                                    https%3A%2F%2Fimages.unsplash.com%2Fphoto-1606542758304-820b04394ac2%3Fw%3D300%26dpr%3D2%26q%3D80&amp;w=1200&amp;q=75 1200w,
                                    https%3A%2F%2Fimages.unsplash.com%2Fphoto-1606542758304-820b04394ac2%3Fw%3D300%26dpr%3D2%26q%3D80&amp;w=1920&amp;q=75 1920w,
                                    https%3A%2F%2Fimages.unsplash.com%2Fphoto-1606542758304-820b04394ac2%3Fw%3D300%26dpr%3D2%26q%3D80&amp;w=2048&amp;q=75 2048w,
                                    https%3A%2F%2Fimages.unsplash.com%2Fphoto-1606542758304-820b04394ac2%3Fw%3D300%26dpr%3D2%26q%3D80&amp;w=3840&amp;q=75 3840w
                                  "
                                      src="https%3A%2F%2Fimages.unsplash.com%2Fphoto-1606542758304-820b04394ac2%3Fw%3D300%26dpr%3D2%26q%3D80&amp;w=3840&amp;q=75"
                                      decoding="async"
                                      data-nimg="fill"
                                      className="absolute inset-0 h-full w-full object-cover transition-all hover:scale-105"
                                      loading="lazy"
                                      // style="
                                      //   position: absolute;
                                      //   height: 100%;
                                      //   width: 100%;
                                      //   left: 0;
                                      //   top: 0;
                                      //   right: 0;
                                      //   bottom: 0;
                                      //   color: transparent;
                                      // "
                                    />
                                  </div>
                                </div>
                              </span>
                              <div className="space-y-1 text-sm">
                                <h3 className="font-medium leading-none">
                                  Stateful Symphony
                                </h3>
                                <p className="text-xs text-slate-500 dark:text-slate-400">
                                  Beth Binary
                                </p>
                              </div>
                            </div>
                            <div className="w-[250px] space-y-3">
                              <span
                                data-state="closed"
                                // style="-webkit-touch-callout: none"
                              >
                                <div
                                  // style="
                                  //   position: relative;
                                  //   width: 100%;
                                  //   padding-bottom: 133.33333333333334%;
                                  // "
                                  className="relative w-full pb-[133%]"
                                  data-radix-aspect-ratio-wrapper=""
                                >
                                  <div
                                    className="absolute inset-0 overflow-hidden rounded-md"
                                    //   style="
                                    //     position: absolute;
                                    //     top: 0;
                                    //     right: 0;
                                    //     bottom: 0;
                                    //     left: 0;
                                    //   "
                                  >
                                    <img
                                      alt="React Rendezvous"
                                      sizes="100vw"
                                      srcSet="
                                    https%3A%2F%2Fimages.unsplash.com%2Fphoto-1598295893369-1918ffaf89a2%3Fw%3D300%26dpr%3D2%26q%3D80&amp;w=640&amp;q=75   640w,
                                    https%3A%2F%2Fimages.unsplash.com%2Fphoto-1598295893369-1918ffaf89a2%3Fw%3D300%26dpr%3D2%26q%3D80&amp;w=750&amp;q=75   750w,
                                    https%3A%2F%2Fimages.unsplash.com%2Fphoto-1598295893369-1918ffaf89a2%3Fw%3D300%26dpr%3D2%26q%3D80&amp;w=828&amp;q=75   828w,
                                    https%3A%2F%2Fimages.unsplash.com%2Fphoto-1598295893369-1918ffaf89a2%3Fw%3D300%26dpr%3D2%26q%3D80&amp;w=1080&amp;q=75 1080w,
                                    https%3A%2F%2Fimages.unsplash.com%2Fphoto-1598295893369-1918ffaf89a2%3Fw%3D300%26dpr%3D2%26q%3D80&amp;w=1200&amp;q=75 1200w,
                                    https%3A%2F%2Fimages.unsplash.com%2Fphoto-1598295893369-1918ffaf89a2%3Fw%3D300%26dpr%3D2%26q%3D80&amp;w=1920&amp;q=75 1920w,
                                    https%3A%2F%2Fimages.unsplash.com%2Fphoto-1598295893369-1918ffaf89a2%3Fw%3D300%26dpr%3D2%26q%3D80&amp;w=2048&amp;q=75 2048w,
                                    https%3A%2F%2Fimages.unsplash.com%2Fphoto-1598295893369-1918ffaf89a2%3Fw%3D300%26dpr%3D2%26q%3D80&amp;w=3840&amp;q=75 3840w
                                  "
                                      src="https%3A%2F%2Fimages.unsplash.com%2Fphoto-1598295893369-1918ffaf89a2%3Fw%3D300%26dpr%3D2%26q%3D80&amp;w=3840&amp;q=75"
                                      decoding="async"
                                      data-nimg="fill"
                                      className="absolute inset-0 h-full w-full object-cover transition-all hover:scale-105"
                                      loading="lazy"
                                      // style="
                                      //   position: absolute;
                                      //   height: 100%;
                                      //   width: 100%;
                                      //   left: 0;
                                      //   top: 0;
                                      //   right: 0;
                                      //   bottom: 0;
                                      //   color: transparent;
                                      // "
                                    />
                                  </div>
                                </div>
                              </span>
                              <div className="space-y-1 text-sm">
                                <h3 className="font-medium leading-none">
                                  React Rendezvous
                                </h3>
                                <p className="text-xs text-slate-500 dark:text-slate-400">
                                  Ethan Byte
                                </p>
                              </div>
                            </div>
                          </div>
                        </div>
                        <div className="mt-6 space-y-1">
                          <h2 className="text-2xl font-semibold tracking-tight">
                            Made for You
                          </h2>
                          <p className="text-sm text-slate-500 dark:text-slate-400">
                            Your personal playlists. Updated daily.
                          </p>
                        </div>
                        <div
                          data-orientation="horizontal"
                          role="none"
                          className="my-4 h-[1px] w-full bg-slate-200 dark:bg-slate-700"
                        ></div>
                        <div className="relative">
                          <span className="absolute top-32 right-auto left-16 z-30 flex h-5 w-5 animate-bounce items-center justify-center">
                            <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-sky-400 opacity-75"></span>
                            <span className="relative inline-flex h-3 w-3 rounded-full bg-sky-500"></span>
                          </span>
                          <div
                            dir="ltr"
                            className="relative overflow-hidden"
                            //   style="
                            //     position: relative;
                            //     --radix-scroll-area-corner-width: 0px;
                            //     --radix-scroll-area-corner-height: 0px;
                            //   "
                          >
                            {/* <style>
                          [data-radix-scroll-area-viewport] {
                            scrollbar-width: none;
                            -ms-overflow-style: none;
                            -webkit-overflow-scrolling: touch;
                          }
                          [data-radix-scroll-area-viewport]::-webkit-scrollbar {
                            display: none;
                          }
                        </style> */}
                            <div
                              data-radix-scroll-area-viewport=""
                              className="h-full w-full overflow-scroll rounded-[inherit]"
                              // style="overflow: scroll"
                            >
                              <div className="table min-w-full">
                                <div className="flex space-x-4 pb-4">
                                  <div className="w-[150px] space-y-3">
                                    <span
                                      data-state="closed"
                                      //   style="-webkit-touch-callout: none"
                                    >
                                      <div
                                        className="relative w-full pb-[100%]"
                                        // style={{}}
                                        //     position: relative;
                                        //     width: 100%;
                                        //     padding-bottom: 100%;

                                        data-radix-aspect-ratio-wrapper=""
                                      >
                                        <div
                                          className=" absolute inset-0 overflow-hidden rounded-md"
                                          // style="
                                          //   position: absolute;
                                          //   top: 0;
                                          //   right: 0;
                                          //   bottom: 0;
                                          //   left: 0;
                                          // "
                                        >
                                          <img
                                            alt="Async Awakenings"
                                            sizes="100vw"
                                            srcSet="
                                          https%3A%2F%2Fimages.unsplash.com%2Fphoto-1580428180098-24b353d7e9d9%3Fw%3D300%26dpr%3D2%26q%3D80&amp;w=640&amp;q=75   640w,
                                          https%3A%2F%2Fimages.unsplash.com%2Fphoto-1580428180098-24b353d7e9d9%3Fw%3D300%26dpr%3D2%26q%3D80&amp;w=750&amp;q=75   750w,
                                          https%3A%2F%2Fimages.unsplash.com%2Fphoto-1580428180098-24b353d7e9d9%3Fw%3D300%26dpr%3D2%26q%3D80&amp;w=828&amp;q=75   828w,
                                          https%3A%2F%2Fimages.unsplash.com%2Fphoto-1580428180098-24b353d7e9d9%3Fw%3D300%26dpr%3D2%26q%3D80&amp;w=1080&amp;q=75 1080w,
                                          https%3A%2F%2Fimages.unsplash.com%2Fphoto-1580428180098-24b353d7e9d9%3Fw%3D300%26dpr%3D2%26q%3D80&amp;w=1200&amp;q=75 1200w,
                                          https%3A%2F%2Fimages.unsplash.com%2Fphoto-1580428180098-24b353d7e9d9%3Fw%3D300%26dpr%3D2%26q%3D80&amp;w=1920&amp;q=75 1920w,
                                          https%3A%2F%2Fimages.unsplash.com%2Fphoto-1580428180098-24b353d7e9d9%3Fw%3D300%26dpr%3D2%26q%3D80&amp;w=2048&amp;q=75 2048w,
                                          https%3A%2F%2Fimages.unsplash.com%2Fphoto-1580428180098-24b353d7e9d9%3Fw%3D300%26dpr%3D2%26q%3D80&amp;w=3840&amp;q=75 3840w
                                        "
                                            src="https%3A%2F%2Fimages.unsplash.com%2Fphoto-1580428180098-24b353d7e9d9%3Fw%3D300%26dpr%3D2%26q%3D80&amp;w=3840&amp;q=75"
                                            decoding="async"
                                            data-nimg="fill"
                                            className="absolute inset-0 object-cover transition-all hover:scale-105"
                                            loading="lazy"
                                            //   style="
                                            //     position: absolute;
                                            //     height: 100%;
                                            //     width: 100%;
                                            //     left: 0;
                                            //     top: 0;
                                            //     right: 0;
                                            //     bottom: 0;
                                            //     color: transparent;
                                            //   "
                                            style={{
                                              color: "transparent",
                                            }}
                                          />
                                        </div>
                                      </div>
                                    </span>
                                    <div className="space-y-1 text-sm">
                                      <h3 className="font-medium leading-none">
                                        Async Awakenings
                                      </h3>
                                      <p className="text-xs text-slate-500 dark:text-slate-400">
                                        Nina Netcode
                                      </p>
                                    </div>
                                  </div>
                                  <div className="w-[150px] space-y-3">
                                    <span
                                      data-state="closed"
                                      //   style="-webkit-touch-callout: none"
                                    >
                                      <div
                                        className="relative w-full pb-[100%]"
                                        //   style={{}}
                                        //     position: relative;
                                        //     width: 100%;
                                        //     padding-bottom: 100%;

                                        data-radix-aspect-ratio-wrapper=""
                                      >
                                        <div
                                          className=" absolute inset-0 overflow-hidden rounded-md"
                                          // style="
                                          //   position: absolute;
                                          //   top: 0;
                                          //   right: 0;
                                          //   bottom: 0;
                                          //   left: 0;
                                          // "
                                        >
                                          <img
                                            alt="Stateful Symphony"
                                            sizes="100vw"
                                            srcSet="
                                          https%3A%2F%2Fimages.unsplash.com%2Fphoto-1606542758304-820b04394ac2%3Fw%3D300%26dpr%3D2%26q%3D80&amp;w=640&amp;q=75   640w,
                                          https%3A%2F%2Fimages.unsplash.com%2Fphoto-1606542758304-820b04394ac2%3Fw%3D300%26dpr%3D2%26q%3D80&amp;w=750&amp;q=75   750w,
                                          https%3A%2F%2Fimages.unsplash.com%2Fphoto-1606542758304-820b04394ac2%3Fw%3D300%26dpr%3D2%26q%3D80&amp;w=828&amp;q=75   828w,
                                          https%3A%2F%2Fimages.unsplash.com%2Fphoto-1606542758304-820b04394ac2%3Fw%3D300%26dpr%3D2%26q%3D80&amp;w=1080&amp;q=75 1080w,
                                          https%3A%2F%2Fimages.unsplash.com%2Fphoto-1606542758304-820b04394ac2%3Fw%3D300%26dpr%3D2%26q%3D80&amp;w=1200&amp;q=75 1200w,
                                          https%3A%2F%2Fimages.unsplash.com%2Fphoto-1606542758304-820b04394ac2%3Fw%3D300%26dpr%3D2%26q%3D80&amp;w=1920&amp;q=75 1920w,
                                          https%3A%2F%2Fimages.unsplash.com%2Fphoto-1606542758304-820b04394ac2%3Fw%3D300%26dpr%3D2%26q%3D80&amp;w=2048&amp;q=75 2048w,
                                          https%3A%2F%2Fimages.unsplash.com%2Fphoto-1606542758304-820b04394ac2%3Fw%3D300%26dpr%3D2%26q%3D80&amp;w=3840&amp;q=75 3840w
                                        "
                                            src="https%3A%2F%2Fimages.unsplash.com%2Fphoto-1606542758304-820b04394ac2%3Fw%3D300%26dpr%3D2%26q%3D80&amp;w=3840&amp;q=75"
                                            decoding="async"
                                            data-nimg="fill"
                                            className="object-cover transition-all hover:scale-105"
                                            loading="lazy"
                                            //   style="
                                            //     position: absolute;
                                            //     height: 100%;
                                            //     width: 100%;
                                            //     left: 0;
                                            //     top: 0;
                                            //     right: 0;
                                            //     bottom: 0;
                                            //     color: transparent;
                                            //   "
                                            style={{
                                              position: "absolute",
                                              top: 0,
                                              left: 0,
                                              right: 0,
                                              bottom: 0,
                                              color: "transparent",
                                            }}
                                          />
                                        </div>
                                      </div>
                                    </span>
                                    <div className="space-y-1 text-sm">
                                      <h3 className="font-medium leading-none">
                                        Stateful Symphony
                                      </h3>
                                      <p className="text-xs text-slate-500 dark:text-slate-400">
                                        Beth Binary
                                      </p>
                                    </div>
                                  </div>
                                  <div className="w-[150px] space-y-3">
                                    <span
                                      data-state="closed"
                                      //style="-webkit-touch-callout: none"
                                    >
                                      <div
                                        className="relative w-full pb-[100%]"
                                        //   style={{}}
                                        //     position: relative;
                                        //     width: 100%;
                                        //     padding-bottom: 100%;

                                        data-radix-aspect-ratio-wrapper=""
                                      >
                                        <div
                                          className=" absolute inset-0 overflow-hidden rounded-md"
                                          // style="
                                          //   position: absolute;
                                          //   top: 0;
                                          //   right: 0;
                                          //   bottom: 0;
                                          //   left: 0;
                                          // "
                                        >
                                          <img
                                            alt="Stateful Symphony"
                                            sizes="100vw"
                                            srcSet="
                                          https%3A%2F%2Fimages.unsplash.com%2Fphoto-1598062548091-a6fb6a052562%3Fw%3D300%26dpr%3D2%26q%3D80&amp;w=640&amp;q=75   640w,
                                          https%3A%2F%2Fimages.unsplash.com%2Fphoto-1598062548091-a6fb6a052562%3Fw%3D300%26dpr%3D2%26q%3D80&amp;w=750&amp;q=75   750w,
                                          https%3A%2F%2Fimages.unsplash.com%2Fphoto-1598062548091-a6fb6a052562%3Fw%3D300%26dpr%3D2%26q%3D80&amp;w=828&amp;q=75   828w,
                                          https%3A%2F%2Fimages.unsplash.com%2Fphoto-1598062548091-a6fb6a052562%3Fw%3D300%26dpr%3D2%26q%3D80&amp;w=1080&amp;q=75 1080w,
                                          https%3A%2F%2Fimages.unsplash.com%2Fphoto-1598062548091-a6fb6a052562%3Fw%3D300%26dpr%3D2%26q%3D80&amp;w=1200&amp;q=75 1200w,
                                          https%3A%2F%2Fimages.unsplash.com%2Fphoto-1598062548091-a6fb6a052562%3Fw%3D300%26dpr%3D2%26q%3D80&amp;w=1920&amp;q=75 1920w,
                                          https%3A%2F%2Fimages.unsplash.com%2Fphoto-1598062548091-a6fb6a052562%3Fw%3D300%26dpr%3D2%26q%3D80&amp;w=2048&amp;q=75 2048w,
                                          https%3A%2F%2Fimages.unsplash.com%2Fphoto-1598062548091-a6fb6a052562%3Fw%3D300%26dpr%3D2%26q%3D80&amp;w=3840&amp;q=75 3840w
                                        "
                                            src="https%3A%2F%2Fimages.unsplash.com%2Fphoto-1598062548091-a6fb6a052562%3Fw%3D300%26dpr%3D2%26q%3D80&amp;w=3840&amp;q=75"
                                            decoding="async"
                                            data-nimg="fill"
                                            className="object-cover transition-all hover:scale-105"
                                            loading="lazy"
                                            //   style="
                                            //     position: absolute;
                                            //     height: 100%;
                                            //     width: 100%;
                                            //     left: 0;
                                            //     top: 0;
                                            //     right: 0;
                                            //     bottom: 0;
                                            //     color: transparent;
                                            //   "
                                            style={{
                                              position: "absolute",
                                              top: 0,
                                              left: 0,
                                              right: 0,
                                              bottom: 0,
                                              color: "transparent",
                                            }}
                                          />
                                        </div>
                                      </div>
                                    </span>
                                    <div className="space-y-1 text-sm">
                                      <h3 className="font-medium leading-none">
                                        Stateful Symphony
                                      </h3>
                                      <p className="text-xs text-slate-500 dark:text-slate-400">
                                        Beth Binary
                                      </p>
                                    </div>
                                  </div>
                                  <div className="w-[150px] space-y-3">
                                    <span
                                      data-state="closed"
                                      //style="-webkit-touch-callout: none"
                                    >
                                      <div
                                        className="relative w-full pb-[100%]"
                                        //   style={{}}
                                        //     position: relative;
                                        //     width: 100%;
                                        //     padding-bottom: 100%;

                                        data-radix-aspect-ratio-wrapper=""
                                      >
                                        <div
                                          className="absolute inset-0 overflow-hidden rounded-md"
                                          // style="
                                          //   position: absolute;
                                          //   top: 0;
                                          //   right: 0;
                                          //   bottom: 0;
                                          //   left: 0;
                                          // "
                                        >
                                          <img
                                            alt="The Art of Reusability"
                                            sizes="100vw"
                                            srcSet="
                                          https%3A%2F%2Fimages.unsplash.com%2Fphoto-1626759486966-c067e3f79982%3Fw%3D300%26dpr%3D2%26q%3D80&amp;w=640&amp;q=75   640w,
                                          https%3A%2F%2Fimages.unsplash.com%2Fphoto-1626759486966-c067e3f79982%3Fw%3D300%26dpr%3D2%26q%3D80&amp;w=750&amp;q=75   750w,
                                          https%3A%2F%2Fimages.unsplash.com%2Fphoto-1626759486966-c067e3f79982%3Fw%3D300%26dpr%3D2%26q%3D80&amp;w=828&amp;q=75   828w,
                                          https%3A%2F%2Fimages.unsplash.com%2Fphoto-1626759486966-c067e3f79982%3Fw%3D300%26dpr%3D2%26q%3D80&amp;w=1080&amp;q=75 1080w,
                                          https%3A%2F%2Fimages.unsplash.com%2Fphoto-1626759486966-c067e3f79982%3Fw%3D300%26dpr%3D2%26q%3D80&amp;w=1200&amp;q=75 1200w,
                                          https%3A%2F%2Fimages.unsplash.com%2Fphoto-1626759486966-c067e3f79982%3Fw%3D300%26dpr%3D2%26q%3D80&amp;w=1920&amp;q=75 1920w,
                                          https%3A%2F%2Fimages.unsplash.com%2Fphoto-1626759486966-c067e3f79982%3Fw%3D300%26dpr%3D2%26q%3D80&amp;w=2048&amp;q=75 2048w,
                                          https%3A%2F%2Fimages.unsplash.com%2Fphoto-1626759486966-c067e3f79982%3Fw%3D300%26dpr%3D2%26q%3D80&amp;w=3840&amp;q=75 3840w
                                        "
                                            src="https%3A%2F%2Fimages.unsplash.com%2Fphoto-1626759486966-c067e3f79982%3Fw%3D300%26dpr%3D2%26q%3D80&amp;w=3840&amp;q=75"
                                            decoding="async"
                                            data-nimg="fill"
                                            className="object-cover transition-all hover:scale-105"
                                            loading="lazy"
                                            //   style="
                                            //     position: absolute;
                                            //     height: 100%;
                                            //     width: 100%;
                                            //     left: 0;
                                            //     top: 0;
                                            //     right: 0;
                                            //     bottom: 0;
                                            //     color: transparent;
                                            //   "
                                            style={{
                                              position: "absolute",
                                              top: 0,
                                              left: 0,
                                              right: 0,
                                              bottom: 0,
                                              color: "transparent",
                                            }}
                                          />
                                        </div>
                                      </div>
                                    </span>
                                    <div className="space-y-1 text-sm">
                                      <h3 className="font-medium leading-none">
                                        The Art of Reusability
                                      </h3>
                                      <p className="text-xs text-slate-500 dark:text-slate-400">
                                        Lena Logic
                                      </p>
                                    </div>
                                  </div>
                                  <div className="w-[150px] space-y-3">
                                    <span
                                      data-state="closed"
                                      //   style="-webkit-touch-callout: none"
                                    >
                                      <div
                                        className="relative w-full pb-[100%]"
                                        //   style={{}}
                                        //     position: relative;
                                        //     width: 100%;
                                        //     padding-bottom: 100%;

                                        data-radix-aspect-ratio-wrapper=""
                                      >
                                        <div
                                          className=" absolute inset-0 overflow-hidden rounded-md"
                                          // style="
                                          //   position: absolute;
                                          //   top: 0;
                                          //   right: 0;
                                          //   bottom: 0;
                                          //   left: 0;
                                          // "
                                        >
                                          <img
                                            alt="Thinking Components"
                                            sizes="100vw"
                                            srcSet="
                                          https%3A%2F%2Fimages.unsplash.com%2Fphoto-1576075796033-848c2a5f3696%3Fw%3D300%26dpr%3D2%26q%3D80&amp;w=640&amp;q=75   640w,
                                          https%3A%2F%2Fimages.unsplash.com%2Fphoto-1576075796033-848c2a5f3696%3Fw%3D300%26dpr%3D2%26q%3D80&amp;w=750&amp;q=75   750w,
                                          https%3A%2F%2Fimages.unsplash.com%2Fphoto-1576075796033-848c2a5f3696%3Fw%3D300%26dpr%3D2%26q%3D80&amp;w=828&amp;q=75   828w,
                                          https%3A%2F%2Fimages.unsplash.com%2Fphoto-1576075796033-848c2a5f3696%3Fw%3D300%26dpr%3D2%26q%3D80&amp;w=1080&amp;q=75 1080w,
                                          https%3A%2F%2Fimages.unsplash.com%2Fphoto-1576075796033-848c2a5f3696%3Fw%3D300%26dpr%3D2%26q%3D80&amp;w=1200&amp;q=75 1200w,
                                          https%3A%2F%2Fimages.unsplash.com%2Fphoto-1576075796033-848c2a5f3696%3Fw%3D300%26dpr%3D2%26q%3D80&amp;w=1920&amp;q=75 1920w,
                                          https%3A%2F%2Fimages.unsplash.com%2Fphoto-1576075796033-848c2a5f3696%3Fw%3D300%26dpr%3D2%26q%3D80&amp;w=2048&amp;q=75 2048w,
                                          https%3A%2F%2Fimages.unsplash.com%2Fphoto-1576075796033-848c2a5f3696%3Fw%3D300%26dpr%3D2%26q%3D80&amp;w=3840&amp;q=75 3840w
                                        "
                                            src="https%3A%2F%2Fimages.unsplash.com%2Fphoto-1576075796033-848c2a5f3696%3Fw%3D300%26dpr%3D2%26q%3D80&amp;w=3840&amp;q=75"
                                            decoding="async"
                                            data-nimg="fill"
                                            className="object-cover transition-all hover:scale-105"
                                            loading="lazy"
                                            //   style="
                                            //     position: absolute;
                                            //     height: 100%;
                                            //     width: 100%;
                                            //     left: 0;
                                            //     top: 0;
                                            //     right: 0;
                                            //     bottom: 0;
                                            //     color: transparent;
                                            //   "
                                            style={{
                                              position: "absolute",
                                              top: 0,
                                              left: 0,
                                              right: 0,
                                              bottom: 0,
                                              color: "transparent",
                                            }}
                                          />
                                        </div>
                                      </div>
                                    </span>
                                    <div className="space-y-1 text-sm">
                                      <h3 className="font-medium leading-none">
                                        Thinking Components
                                      </h3>
                                      <p className="text-xs text-slate-500 dark:text-slate-400">
                                        Lena Logic
                                      </p>
                                    </div>
                                  </div>
                                  <div className="w-[150px] space-y-3">
                                    <span
                                      data-state="closed"
                                      //   style="-webkit-touch-callout: none"
                                    >
                                      <div
                                        className="relative w-full pb-[100%]"
                                        //   style={{}}
                                        //     position: relative;
                                        //     width: 100%;
                                        //     padding-bottom: 100%;

                                        data-radix-aspect-ratio-wrapper=""
                                      >
                                        <div
                                          className="absolute inset-0 overflow-hidden rounded-md"
                                          // style="
                                          //   position: absolute;
                                          //   top: 0;
                                          //   right: 0;
                                          //   bottom: 0;
                                          //   left: 0;
                                          // "
                                        >
                                          <img
                                            alt="Functional Fury"
                                            sizes="100vw"
                                            srcSet="
                                          https%3A%2F%2Fimages.unsplash.com%2Fphoto-1606542758304-820b04394ac2%3Fw%3D300%26dpr%3D2%26q%3D80&amp;w=640&amp;q=75   640w,
                                          https%3A%2F%2Fimages.unsplash.com%2Fphoto-1606542758304-820b04394ac2%3Fw%3D300%26dpr%3D2%26q%3D80&amp;w=750&amp;q=75   750w,
                                          https%3A%2F%2Fimages.unsplash.com%2Fphoto-1606542758304-820b04394ac2%3Fw%3D300%26dpr%3D2%26q%3D80&amp;w=828&amp;q=75   828w,
                                          https%3A%2F%2Fimages.unsplash.com%2Fphoto-1606542758304-820b04394ac2%3Fw%3D300%26dpr%3D2%26q%3D80&amp;w=1080&amp;q=75 1080w,
                                          https%3A%2F%2Fimages.unsplash.com%2Fphoto-1606542758304-820b04394ac2%3Fw%3D300%26dpr%3D2%26q%3D80&amp;w=1200&amp;q=75 1200w,
                                          https%3A%2F%2Fimages.unsplash.com%2Fphoto-1606542758304-820b04394ac2%3Fw%3D300%26dpr%3D2%26q%3D80&amp;w=1920&amp;q=75 1920w,
                                          https%3A%2F%2Fimages.unsplash.com%2Fphoto-1606542758304-820b04394ac2%3Fw%3D300%26dpr%3D2%26q%3D80&amp;w=2048&amp;q=75 2048w,
                                          https%3A%2F%2Fimages.unsplash.com%2Fphoto-1606542758304-820b04394ac2%3Fw%3D300%26dpr%3D2%26q%3D80&amp;w=3840&amp;q=75 3840w
                                        "
                                            src="https%3A%2F%2Fimages.unsplash.com%2Fphoto-1606542758304-820b04394ac2%3Fw%3D300%26dpr%3D2%26q%3D80&amp;w=3840&amp;q=75"
                                            decoding="async"
                                            data-nimg="fill"
                                            className="object-cover transition-all hover:scale-105"
                                            loading="lazy"
                                            style={{
                                              position: "absolute",
                                              height: "100%",
                                              width: "100%",
                                              left: 0,
                                              top: 0,
                                              right: 0,
                                              bottom: 0,
                                              color: "transparent",
                                            }}
                                          />
                                        </div>
                                      </div>
                                    </span>
                                    <div className="space-y-1 text-sm">
                                      <h3 className="font-medium leading-none">
                                        Functional Fury
                                      </h3>
                                      <p className="text-xs text-slate-500 dark:text-slate-400">
                                        Beth Binary
                                      </p>
                                    </div>
                                  </div>
                                  <div className="w-[150px] space-y-3">
                                    <span
                                      data-state="closed"
                                      // style={{-webkit-touch-callout: none}}
                                    >
                                      <div
                                        style={{
                                          position: "relative",
                                          width: "100%",
                                          paddingBottom: "100%",
                                        }}
                                        data-radix-aspect-ratio-wrapper=""
                                      >
                                        <div
                                          className="overflow-hidden rounded-md"
                                          style={{
                                            position: "absolute",
                                            top: 0,
                                            right: 0,
                                            bottom: 0,
                                            left: 0,
                                          }}
                                        >
                                          <img
                                            alt="React Rendezvous"
                                            sizes="100vw"
                                            srcSet="
                                          https%3A%2F%2Fimages.unsplash.com%2Fphoto-1598295893369-1918ffaf89a2%3Fw%3D300%26dpr%3D2%26q%3D80&amp;w=640&amp;q=75   640w,
                                          https%3A%2F%2Fimages.unsplash.com%2Fphoto-1598295893369-1918ffaf89a2%3Fw%3D300%26dpr%3D2%26q%3D80&amp;w=750&amp;q=75   750w,
                                          https%3A%2F%2Fimages.unsplash.com%2Fphoto-1598295893369-1918ffaf89a2%3Fw%3D300%26dpr%3D2%26q%3D80&amp;w=828&amp;q=75   828w,
                                          https%3A%2F%2Fimages.unsplash.com%2Fphoto-1598295893369-1918ffaf89a2%3Fw%3D300%26dpr%3D2%26q%3D80&amp;w=1080&amp;q=75 1080w,
                                          https%3A%2F%2Fimages.unsplash.com%2Fphoto-1598295893369-1918ffaf89a2%3Fw%3D300%26dpr%3D2%26q%3D80&amp;w=1200&amp;q=75 1200w,
                                          https%3A%2F%2Fimages.unsplash.com%2Fphoto-1598295893369-1918ffaf89a2%3Fw%3D300%26dpr%3D2%26q%3D80&amp;w=1920&amp;q=75 1920w,
                                          https%3A%2F%2Fimages.unsplash.com%2Fphoto-1598295893369-1918ffaf89a2%3Fw%3D300%26dpr%3D2%26q%3D80&amp;w=2048&amp;q=75 2048w,
                                          https%3A%2F%2Fimages.unsplash.com%2Fphoto-1598295893369-1918ffaf89a2%3Fw%3D300%26dpr%3D2%26q%3D80&amp;w=3840&amp;q=75 3840w
                                        "
                                            src="https%3A%2F%2Fimages.unsplash.com%2Fphoto-1598295893369-1918ffaf89a2%3Fw%3D300%26dpr%3D2%26q%3D80&amp;w=3840&amp;q=75"
                                            decoding="async"
                                            data-nimg="fill"
                                            className="absolute inset-0 h-full w-full object-cover transition-all hover:scale-105"
                                            loading="lazy"
                                            style={{
                                              color: "transparent",
                                            }}
                                          />
                                        </div>
                                      </div>
                                    </span>
                                    <div className="space-y-1 text-sm">
                                      <h3 className="font-medium leading-none">
                                        React Rendezvous
                                      </h3>
                                      <p className="text-xs text-slate-500 dark:text-slate-400">
                                        Ethan Byte
                                      </p>
                                    </div>
                                  </div>
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                      <div
                        data-state="inactive"
                        data-orientation="horizontal"
                        role="tabpanel"
                        aria-labelledby="radix-:R2l5j6i:-trigger-podcasts"
                        hidden
                        tabIndex={0}
                        className="mt-2 h-full flex-col rounded-md border border-none border-slate-200 p-0 data-[state=active]:flex dark:border-slate-700"
                      ></div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
