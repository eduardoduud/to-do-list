interface ButtonProps{
    label: string;
    secondary?: boolean;
    fullWidth?: boolean;
    large?: boolean;
    onClick: any;
    disabled?: boolean;
    outline?: boolean;
}

const Button: React.FC<ButtonProps> = ({
    label,
    secondary,
    fullWidth,
    large,
    onClick,
    disabled,
    outline
}) => {
    return ( 
        <button
            disabled={disabled}
            onClick={onClick}
            className={`
                disabled:opacity-70
                disable:cursor-not-allowed
                rounded-lg
                font-semibold
                hover:opacity-80
                transition
                border-2
                ${fullWidth ? 'w-full' : 'w-fit'}
                ${secondary ? 'bg-blue-500' : 'bg-emerald-500'}
                ${secondary ? 'text-white' : 'text-white'}
                ${secondary ? 'border-blue-500' : 'border-emerald-500'}
                ${large ? 'text-xl' : 'text-md'}
                ${large ? 'px-5' : 'px-4'}
                ${large ? 'py-3' : 'py-2'}
                ${outline ? 'bg-transparent' : ''}
                ${outline ? 'border-white' : ''}
                ${outline ? 'text-white' : ''}
            `}>
            {label}
        </button>
     );
}
 
export default Button;