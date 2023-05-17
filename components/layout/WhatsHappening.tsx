import useUsers from "@/hooks/useUsers";

import Avatar from "../Avatar";

const WhatsHappening = () => {
    const { data: users = [] } = useUsers();

    if (users.length === 0) {
        return null;
    }

    return (
    <div className="px-6 py-4 hidden lg:block resize-none">
        <div className="bg-neutral-800 rounded-xl p-4">
            <h2 className="text-white text-xl font-semibold">Who to follow</h2>
            <div className="flex flex-col gap-6 mt-4">
                {users.map((user: Record<string, any>) => (
                    <div key={user.id} className="flex flex-row gap-4">
                        <Avatar userId={user.id}/>
                        <div className="flex flex-col break-all">
                            <p className="
                                text-white 
                                font-semibold
                                text-sm
                                ">
                                {user.name}
                            </p>
                            <p className="text-neutral-400 text-sm">
                                @{user.username}
                            </p>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    </div>
    )
}
export default WhatsHappening;