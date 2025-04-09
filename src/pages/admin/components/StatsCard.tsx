import { Card, CardContent } from "@/components/ui/card";

type StatsCardProps = {
    icon: React.ElementType;
    label: string;
    value: string;
    bgColor: string;
    iconColor: string;
}

export const StatsCard = ({ icon: Icon, bgColor, label, value, iconColor }: StatsCardProps) => {
    return (
        <Card className="transition-colors bg-zinc-800/50 border-zinc-700/50 hover:bg-zinc-800/80">
            <CardContent className="p-6 ">
                <div className="flex items-center gap-4">
                    <div className={`p-3 rounded-lg ${bgColor}`}>
                        <Icon className={`size-6 ${iconColor}`} />
                    </div>
                    <div>
                        <p className="text-sm to-zinc-400">{label}</p>
                        <p className="text-2xl font-bold">{value}</p>
                    </div>
                </div>
            </CardContent>

        </Card>
    )
}
