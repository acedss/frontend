import { axiosInstance } from "@/lib/axios"
import { useAuth } from "@clerk/clerk-react"
import { useState, useEffect } from "react"
import { Loader } from "lucide-react"
import { useAuthStore } from "@/stores/useAuthStore";
import { useChatStore } from "@/stores/useChatStore";


const updateApiToken = (token: string | null) => {
    if (token) axiosInstance.defaults.headers.common['Authorization'] = `Bearer ${token}`
    else delete axiosInstance.defaults.headers.common['Authorization']
};

const AuthProvider = ({ children }: { children: React.ReactNode }) => {
    const { getToken, userId } = useAuth()
    const [loading, setLoading] = useState(true)
    const { checkAdminStatus } = useAuthStore()
    const { initSocket, disconnectSocket } = useChatStore()

    useEffect(() => {
        const initAuth = async () => {
            try {
                const token = await getToken()
                updateApiToken(token)
                if (token) {
                    await checkAdminStatus();
                    //  init socket
                    if (userId) initSocket(userId)


                };
            } catch (error) {
                updateApiToken(null)
                console.log("Error in auth provider ", error)
            } finally {
                setLoading(false)
            }
        };
        initAuth();

        return () => {
            disconnectSocket()
        }

    }, [getToken, checkAdminStatus, userId, initSocket, disconnectSocket])
    if (loading) return (
        <div className="flex items-center justify-center w-full h-screen">
            <Loader className="size-8 text-emerald-50 animate-spin" />
        </div>
    )

    return <>{children}</>;
}
export default AuthProvider

function initUserSocket(userId: string) {
    throw new Error("Function not implemented.");
}
