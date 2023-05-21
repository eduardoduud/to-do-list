interface LayoutProps {
    children: React.ReactNode;
}

const Layout: React.FC<LayoutProps> = ({ children }) => {
    return (
        <div className="">
            <div className="">
                {children}
            </div>
        </div>
     );
}
 
export default Layout;