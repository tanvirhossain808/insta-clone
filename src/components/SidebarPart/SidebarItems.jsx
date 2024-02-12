import SidebarCreatePost from "./SidebarCreatePost";
import SidebarHome from "./SidebarHome";
import SidebarNotification from "./SidebarNotification";
import SidebarProfileLink from "./SidebarProfileLink";
import SidebarSearch from "./SidebarSearch";

const SidebarItems = () => {
    return (
        <>
            <SidebarHome />
            <SidebarSearch />
            <SidebarNotification />
            <SidebarCreatePost />
            <SidebarProfileLink />
        </>
    );
};

export default SidebarItems;