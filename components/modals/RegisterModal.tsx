import axios from "axios";
import toast from "react-hot-toast";

import { useCallback, useState } from "react";
import { signIn } from "next-auth/react";

import useLoginModal from "@/hooks/useLoginModal";
import useRegisterModal from "@/hooks/useRegisterModal";

import Input from "../Input";
import Modal from "../Modal";

const RegisterModal = () => {
    const LoginModal = useLoginModal();
    const RegisterModal = useRegisterModal();

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [name, setName] = useState('');
    const [username, setUsername] = useState('');
    const [isLoading, setIsLoading] = useState(false);

    const onToggle = useCallback(() => {
        if (isLoading) {
            return;
        }

        RegisterModal.onClose();
        LoginModal.onOpen();
    }, [LoginModal, RegisterModal, isLoading]);

    const onSubmit = useCallback(async () => {
        try {
            setIsLoading(true);

            const emailRegex = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
            if (!emailRegex.test(email)) {
                toast.error('Invalid e-mail address');
                throw new Error('');
            }

            await axios.post('/api/register', {
                email,
                password,
                name
            })

            toast.success('Account created.');

            signIn('credentials', {
                email,
                password
            })
            
            RegisterModal.onClose();
        } catch (error) {
            console.log(error);
        } finally {
            setIsLoading(false);
        }
    }, [RegisterModal, email, password, name]);

    const bodyContent = (
        <div className="flex flex-col gap-4">
            <Input 
                placeholder="Name"
                onChange={(e) => setName(e.target.value)}
                value={name}
                disabled={isLoading}
            />
            <Input 
                placeholder="DO NOT USE A REAL E-MAIL"
                onChange={(e) => setEmail(e.target.value)}
                value={email}
                disabled={isLoading}
            />
            <Input 
                placeholder="DO NOT USE A REAL PASSWORD"
                type="password"
                onChange={(e) => setPassword(e.target.value)}
                value={password}
                disabled={isLoading}
            />           
        </div>
    )

    const footerContent = (
        <div className="text-neutral-400 text-center mt-4">
            <p>Already have an account?
                <span
                    onClick={onToggle} 
                    className="
                        text-white
                        cursor-pointer
                        hover:underline
                        pl-1
                    "
                >Sign in!</span>
            </p>
        </div>
    )

    return ( 
        <Modal 
            disabled={isLoading}
            isOpen={RegisterModal.isOpen}
            title="Create your account!"
            actionLabel="Register"
            onClose={RegisterModal.onClose}
            onSubmit={onSubmit}
            body={bodyContent}
            footer={footerContent}
        />
     );
}
 
export default RegisterModal;