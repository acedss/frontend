import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Library } from "lucide-react"
import { AlbumsTable } from "./AlbumsTable"
import { AddAlbumDialog } from "./AddAlbumDialog"

export const AlbumsTabContent = () => {
  return (
    <Card className="border-purple-700 bg-purple-800/20/20">
      <CardHeader>

        <div className='flex items-center justify-between'>
          <div>
            <CardTitle className='flex items-center gap-2'>
              <Library className='w-5 h-5 text-violet-500' />
              Albums Library
            </CardTitle>
            <CardDescription>Manage your album collection</CardDescription>
          </div>
          <AddAlbumDialog />
        </div>
      </CardHeader>

      <CardContent>
        <AlbumsTable />
      </CardContent>
    </Card>
  )
}
