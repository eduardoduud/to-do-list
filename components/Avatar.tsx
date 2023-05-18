import useUser from "@/hooks/useUser";
import Image from "next/image";

import { useRouter } from "next/router";
import { useCallback } from "react";
import Button from "./Button";

interface AvatarProps {
    userId: string;
    isLarge?: boolean;
    hasBorder?: boolean;
}

const Avatar: React.FC<AvatarProps> = ({
    userId,
    isLarge,
    hasBorder
}) => {
    const { data: fetchedUser } = useUser(userId);
    const router = useRouter();

    const onClick = useCallback((event: any) => {
        event.stopPropagation();

        const url = `/users/${userId}`;

        router.push(url);
    }, [router, userId]);

    return (
        <div>
            <Button 
                label="Logout"
                onClick={onClick}
            />
        </div>
     );
}
 
export default Avatar;