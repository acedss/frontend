import { ResizableHandle, ResizablePanel, ResizablePanelGroup } from "@/components/ui/resizable"
import { Outlet } from "react-router-dom"
import { LeftSidebar } from "./components/LeftSidebar"
import AudioPlayer from "./components/AudioPlayer"
import { PlaybackControls } from "./components/PlaybackControls"
import { useEffect, useState } from "react"
import FriendsActivity from "./components/FriendsActivity"

const MainLayout = () => {
    const [isMobile, setIsMobile] = useState(false);

    useEffect(() => {
        const checkMobile = () => {
            setIsMobile(window.innerWidth < 768);
        };

        checkMobile();
        window.addEventListener("resize", checkMobile);
        return () => window.removeEventListener("resize", checkMobile);
    }, []);

    return <div className="flex flex-col h-screen text-white bg-gradient-to-b from-purple-950/30 to-purple-900/5">
        <ResizablePanelGroup direction={"horizontal"} className="flex flex-1 h-full p-2 overflow-hidden">
            <AudioPlayer />
            {/* Left side bar */}
            <ResizablePanel defaultSize={20} minSize={isMobile ? 0 : 10} maxSize={30}>
                <LeftSidebar />
            </ResizablePanel>

            <ResizableHandle className="w-2 transition-colors bg-black rounded-lg" />

            {/* Main content */}
            <ResizablePanel defaultSize={isMobile ? 80 : 60}>
                <Outlet />
            </ResizablePanel>

            {!isMobile && (
                <>
                    <ResizableHandle className="w-2 transition-colors bg-black rounded-lg" />

                    {/* rightside bar */}
                    <ResizablePanel defaultSize={20} minSize={0} maxSize={25} collapsedSize={0}>
                        <FriendsActivity />
                    </ResizablePanel>
                </>
            )}

        </ResizablePanelGroup>
        <PlaybackControls />
    </div>
}

export default MainLayout