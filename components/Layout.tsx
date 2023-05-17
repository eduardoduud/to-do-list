import WhatsHappening from "./layout/WhatsHappening";
import Sidebar from "./layout/Sidebar";

interface LayoutProps {
    children: React.ReactNode;
}

const Layout: React.FC<LayoutProps> = ({ children }) => {
    return ( 
        <div className="">
            {children}
        </div>
     );
}
 
export default Layout;