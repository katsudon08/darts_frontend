import React from "react";

const DartsButton = ({ rotate, dartsScore, children, clickEvent }: { rotate: number, dartsScore: number, children: React.ReactNode, clickEvent: (e: React.MouseEvent, num: number) => void }) => {
    switch (rotate) {
        case 0:
            return (
                <div className="absolute top-1 h-40 w-8 -translate-y-full -translate-x-1.5">
                    <button
                        className="flex justify-center h-full w-fit pt-2"
                        onClick={(e) => clickEvent(e, dartsScore)}
                    >
                        {children}
                    </button>
                </div>
            );
        case 18:
            return (
                <div className="absolute text-center top-1 h-40 w-10 -translate-y-full -translate-x-1.5 origin-bottom rotate-18">
                    <button
                        className="flex justify-center h-full w-full pt-2"
                        onClick={(e) => clickEvent(e, dartsScore)}
                    >
                        <span className="origin-center -rotate-18">
                            {children}
                        </span>
                    </button>
                </div>
            );
        case 36:
            return (
                <div className="absolute text-center top-1 h-40 w-12 -translate-y-full -translate-x-3 origin-bottom rotate-36">
                    <button
                        className="flex justify-center h-full w-full pt-2"
                        onClick={(e) => clickEvent(e, dartsScore)}
                    >
                        <span className="origin-center -rotate-36">
                            {children}
                        </span>
                    </button>
                </div>
            );
        case 54:
            return (
                <div className="absolute text-center top-1 h-40 w-12 -translate-y-full -translate-x-3 origin-bottom rotate-54">
                    <button
                        className="flex justify-center h-full w-full pt-2"
                        onClick={(e) => clickEvent(e, dartsScore)}
                    >
                        <span className="origin-center -rotate-54">
                            {children}
                        </span>
                    </button>
                </div>
            );
        case 72:
            return (
                <div className="absolute text-center top-1 h-40 w-12 -translate-y-full -translate-x-3 origin-bottom rotate-72">
                    <button
                        className="flex justify-center h-full w-full pt-2"
                        onClick={(e) => clickEvent(e, dartsScore)}
                    >
                        <span className="origin-center -rotate-72">
                            {children}
                        </span>
                    </button>
                </div>
            );
        case 90:
            return (
                <div className="absolute text-center top-1 h-40 w-12 -translate-y-full -translate-x-3 origin-bottom rotate-90">
                    <button
                        className="flex justify-center h-full w-full pt-2"
                        onClick={(e) => clickEvent(e, dartsScore)}
                    >
                        <span className="origin-center -rotate-90">
                            {children}
                        </span>
                    </button>
                </div>
            );
        case 108:
            return (
                <div className="absolute text-center top-1 h-40 w-12 -translate-y-full -translate-x-3 origin-bottom rotate-108">
                    <button
                        className="flex justify-center h-full w-full pt-2"
                        onClick={(e) => clickEvent(e, dartsScore)}
                    >
                        <span className="origin-center -rotate-108">
                            {children}
                        </span>
                    </button>
                </div>
            );
        case 126:
            return (
                <div className="absolute text-center top-1 h-40 w-12 -translate-y-full -translate-x-3 origin-bottom rotate-126">
                    <button
                        className="flex justify-center h-full w-full pt-2"
                        onClick={(e) => clickEvent(e, dartsScore)}
                    >
                        <span className="origin-center -rotate-126">
                            {children}
                        </span>
                    </button>
                </div>
            );
        case 144:
            return (
                <div className="absolute text-center top-1 h-40 w-12 -translate-y-full -translate-x-3 origin-bottom rotate-144">
                    <button
                        className="flex justify-center h-full w-full pt-2"
                        onClick={(e) => clickEvent(e, dartsScore)}
                    >
                        <span className="origin-center -rotate-144">
                            {children}
                        </span>
                    </button>
                </div>
            );
        case 162:
            return (
                <div className="absolute text-center top-1 h-40 w-12 -translate-y-full -translate-x-3 origin-bottom rotate-162">
                    <button
                        className="flex justify-center h-full w-full pt-2"
                        onClick={(e) => clickEvent(e, dartsScore)}
                    >
                        <span className="origin-center -rotate-162">
                            {children}
                        </span>
                    </button>
                </div>
            );
        case 180:
            return (
                <div className="absolute text-center top-1 h-40 w-12 -translate-y-full -translate-x-3 origin-bottom rotate-180">
                    <button
                        className="flex justify-center h-full w-full pt-2"
                        onClick={(e) => clickEvent(e, dartsScore)}
                    >
                        <span className="origin-center -rotate-180">
                            {children}
                        </span>
                    </button>
                </div>
            );
        case 198:
            return (
                <div className="absolute text-center top-1 h-40 w-12 -translate-y-full -translate-x-3 origin-bottom rotate-198">
                    <button
                        className="flex justify-center h-full w-full pt-2"
                        onClick={(e) => clickEvent(e, dartsScore)}
                    >
                        <span className="origin-center -rotate-198">
                            {children}
                        </span>
                    </button>
                </div>
            );
        case 216:
            return (
                <div className="absolute text-center top-1 h-40 w-12 -translate-y-full -translate-x-3 origin-bottom rotate-216">
                    <button
                        className="flex justify-center h-full w-full pt-2"
                        onClick={(e) => clickEvent(e, dartsScore)}
                    >
                        <span className="origin-center -rotate-216">
                            {children}
                        </span>
                    </button>
                </div>
            );
        case 234:
            return (
                <div className="absolute text-center top-1 h-40 w-12 -translate-y-full -translate-x-3 origin-bottom rotate-234">
                    <button
                        className="flex justify-center h-full w-full pt-2"
                        onClick={(e) => clickEvent(e, dartsScore)}
                    >
                        <span className="origin-center -rotate-234">
                            {children}
                        </span>
                    </button>
                </div>
            );
        case 252:
            return (
                <div className="absolute text-center top-1 h-40 w-12 -translate-y-full -translate-x-3 origin-bottom rotate-252">
                    <button
                        className="flex justify-center h-full w-full pt-2"
                        onClick={(e) => clickEvent(e, dartsScore)}
                    >
                        <span className="origin-center -rotate-252">
                            {children}
                        </span>
                    </button>
                </div>
            );
        case 270:
            return (
                <div className="absolute text-center top-1 h-40 w-12 -translate-y-full -translate-x-3 origin-bottom rotate-270">
                    <button
                        className="flex justify-center h-full w-full pt-2"
                        onClick={(e) => clickEvent(e, dartsScore)}
                    >
                        <span className="origin-center -rotate-270">
                            {children}
                        </span>
                    </button>
                </div>
            );
        case 288:
            return (
                <div className="absolute text-center top-1 h-40 w-12 -translate-y-full -translate-x-3 origin-bottom rotate-288">
                    <button
                        className="flex justify-center h-full w-full pt-2"
                        onClick={(e) => clickEvent(e, dartsScore)}
                    >
                        <span className="origin-center -rotate-288">
                            {children}
                        </span>
                    </button>
                </div>
            );
        case 306:
            return (
                <div className="absolute text-center top-1 h-40 w-12 -translate-y-full -translate-x-3 origin-bottom rotate-306">
                    <button
                        className="flex justify-center h-full w-full pt-2"
                        onClick={(e) => clickEvent(e, dartsScore)}
                    >
                        <span className="origin-center -rotate-306">
                            {children}
                        </span>
                    </button>
                </div>
            );
        case 324:
            return (
                <div className="absolute text-center top-1 h-40 w-12 -translate-y-full -translate-x-3 origin-bottom rotate-324">
                    <button
                        className="flex justify-center h-full w-full pt-2"
                        onClick={(e) => clickEvent(e, dartsScore)}
                    >
                        <span className="origin-center -rotate-324">
                            {children}
                        </span>
                    </button>
                </div>
            );
        case 342:
            return (
                <div className="absolute text-center top-1 h-40 w-8 -translate-y-full -translate-x-2 origin-bottom rotate-342">
                    <button
                        className="flex justify-center h-full w-full pt-2"
                        onClick={(e) => clickEvent(e, dartsScore)}
                    >
                        <span className="origin-center -rotate-342">
                            {children}
                        </span>
                    </button>
                </div>
            );
    }
}

export default DartsButton;