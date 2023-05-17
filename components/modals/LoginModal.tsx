import { useCallback, useState } from "react";
import { signIn } from "next-auth/react";

import useLoginModal from "@/hooks/useLoginModal";
import useRegisterModal from "@/hooks/useRegisterModal";

import Input from "../Input";
import Modal from "../Modal";
import router, { useRouter } from "next/router";
import useUser from "@/hooks/useUser";
import useCurrentUser from "@/hooks/useCurrentUser";
import useUsers from "@/hooks/useUsers";


const LoginModal = () => {
    const LoginModal = useLoginModal();
    const RegisterModal = useRegisterModal();

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [isLoading, setIsLoading] = useState(false);

    const onToggle = useCallback(() => {
        if (isLoading) {
            return;
        }

        LoginModal.onClose();
        RegisterModal.onOpen();
    }, [LoginModal, RegisterModal, isLoading]);

    const onSubmit = useCallback(async () => {
        try {
            setIsLoading(true);
            
            await signIn('credentials', {
                email,
                password
            })

            LoginModal.onClose();
        } catch (error) {
            console.log(error);
        } finally {
            setIsLoading(false);
        }
    }, [LoginModal, email, password]);

    const bodyContent = (
        <div className="flex flex-col gap-4">
            <Input 
                placeholder="Email"
                onChange={(e) => setEmail(e.target.value)}
                value={email}
                disabled={isLoading}
            />
            <Input 
                placeholder="Password"
                type="password"
                onChange={(e) => setPassword(e.target.value)}
                value={password}
                disabled={isLoading}
            />
            
        </div>
    )

    const footerContent = (
        <div className="text-neutral-400 text-center mt-4">
            <p>Do not have an account yet?
                <span
                    onClick={onToggle} 
                    className="
                        text-white
                        cursor-pointer
                        hover:underline
                        pl-1
                    "
                >Register!</span>
            </p>
        </div>
    )

    return ( 
        <Modal 
            disabled={isLoading}
            isOpen={LoginModal.isOpen}
            title="Login"
            actionLabel="Sign in"
            onClose={LoginModal.onClose}
            onSubmit={onSubmit}
            body={bodyContent}
            footer={footerContent}
        />
     );
}
 
export default LoginModal;