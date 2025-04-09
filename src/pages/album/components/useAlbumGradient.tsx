import { useEffect, useState, useMemo } from "react";

const getRandomGradientFromUrl = (url: any) => {
    if (!url) return "linear-gradient(to bottom, #5038a0, #000)"; // Default if no image

    let hash = 0;
    for (let i = 0; i < url.length; i++) {
        hash = url.charCodeAt(i) + ((hash << 5) - hash);
    }

    const hue = hash % 360;
    const primaryColor = `hsl(${hue}, 70%, 50%)`;
    const secondaryColor = `hsl(${hue}, 70%, 20%)`;

    return `linear-gradient(to bottom, ${primaryColor}, ${secondaryColor}, #000)`;
};

const useAlbumGradient = (imageUrl: any) => {
    const [gradient, setGradient] = useState("bg-black");
    const randomGradient = useMemo(() => getRandomGradientFromUrl(imageUrl), [imageUrl]);

    useEffect(() => {
        if (!imageUrl) {
            setGradient("bg-black");
            return;
        }

        setGradient(randomGradient);
    }, [imageUrl, randomGradient]);

    return gradient;
};

export default useAlbumGradient;
