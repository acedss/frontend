import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Music } from "lucide-react"
import { SongsTable } from "./SongsTable"
import { AddSongDialog } from "./AddSongDialog"

export const SongsTabContent = () => {
    return (
        <Card className="border-purple-700 bg-purple-800/20">
            <CardHeader>
                <div className="flex items-center justify-between">
                    <div >
                        <CardTitle className="flex items-center gap-2">
                            <Music className="text-purple-500 size-5" /> Song Library
                        </CardTitle>
                        <CardDescription>Manage Your music track</CardDescription>
                    </div>
                    <AddSongDialog />
                </div>
            </CardHeader>
            <CardContent>
                <SongsTable />
            </CardContent>
        </Card>
    )
}
