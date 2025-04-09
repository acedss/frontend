import { Home, Music2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";

export default function NotFoundPage() {
    const navigate = useNavigate();

    return (
        <div className='flex items-center justify-center h-screen pb-20 bg-gradient-to-b from-black via-purple-900 to-black'>
            <div className='px-4 space-y-8 text-center'>
                {/* Large animated musical note */}
                <div className='flex justify-center animate-bounce'>
                    <Music2 className='w-24 h-24 text-emerald-500' />
                </div>

                {/* Error message */}
                <div className='space-y-4'>
                    <h1 className='font-bold text-white text-7xl'>404</h1>
                    <h2 className='text-2xl font-semibold text-white'>Page not found</h2>
                    <p className='max-w-md mx-auto text-neutral-400'>
                        Looks like this track got lost in the shuffle. Let's get you back to the music.
                    </p>
                </div>

                {/* Action buttons */}
                <div className='flex flex-col items-center justify-center gap-4 mt-8 sm:flex-row'>
                    <Button
                        onClick={() => navigate(-1)}
                        variant='outline'
                        className='w-full text-white bg-neutral-800 hover:bg-neutral-700 border-neutral-700 sm:w-auto'
                    >
                        Go Back
                    </Button>
                    <Button
                        onClick={() => navigate("/")}
                        className='w-full text-white = hover:bg-emerald-600 sm:w-auto'
                    >
                        <Home className='w-4 h-4 mr-2' />
                        Back to Home
                    </Button>
                </div>
            </div>
        </div>
    );
}
