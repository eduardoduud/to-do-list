interface Button2Props{
    label: string;
    secondary?: boolean;
    fullWidth?: boolean;
    large?: boolean;
    onClick: any;
    disabled?: boolean;
    outline?: boolean;
}

const Button2: React.FC<Button2Props> = ({
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
                rounded-md
                font-semibold
                hover:bg-red-500
                ease-in-out
                delay-150
                hover:scale-95
                duration-200
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
 
export default Button2;