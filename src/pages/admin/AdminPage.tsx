import { useAuthStore } from '@/stores/useAuthStore'
import { useEffect } from 'react'
import { DashboardStats } from './components/DashboardStats'

import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"

import { Album, Music } from 'lucide-react'
import { SongsTabContent } from './components/SongsTabContent'
import { AlbumsTabContent } from './components/AlbumsTabContent'
import { useMusicStore } from '@/stores/useMusicStore'
import Header from "./components/Header";


export const AdminPage = () => {
    const { isAdmin, isLoading } = useAuthStore()
    const { fetchSongs, fetchAlbums, fetchStats } = useMusicStore()

    useEffect(() => {
        fetchAlbums()
        fetchSongs()
        fetchStats()
    }, [])

    if (!isAdmin && !isLoading) return <div>Unauthorized</div>


    return (
        <div className='min-h-screen p-8 bg-fixed bg-gradient-to-b from-black via-purple-900 to-black text-zinc-100'>
            <Header />
            <DashboardStats />
            <Tabs defaultValue="songs" className='space-y-6'>
                <TabsList className='p-1 bg-sky-950/50 '>
                    <TabsTrigger value='songs' className='data-[state=active]:bg-purple-800/50 '>
                        <Music className='mr-2 size-4' />
                        Songs
                    </TabsTrigger>

                    <TabsTrigger value='albums' className='data-[state=active]:bg-purple-800/50 '>
                        <Album className='mr-2 size-4' />
                        Albums
                    </TabsTrigger>
                </TabsList>
                <TabsContent value='songs'>
                    <SongsTabContent />
                </TabsContent>
                <TabsContent value='albums'>
                    <AlbumsTabContent />
                </TabsContent>
            </Tabs>
        </div>
    )
}
