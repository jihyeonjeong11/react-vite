
import type { MenuType } from "../constants";

import { useNavigate } from "react-router-dom";
import useMenuAnimation from "@/components/common/hooks/useMenuAnimation";
import menus from "../constants";

// 사용하지 않으므로 차후 지움 11/29


type MenuFunctionProps = {
    menus: MenuType;
    clickMenu: (e: React.SyntheticEvent) => void;
};

const useMenu = (): MenuFunctionProps => {
    
    const navigate = useNavigate();
    const clickMenu = (e: React.SyntheticEvent) => {
        const target = (e.target as HTMLLIElement).closest("li");
        if (target != null) {
            const menu = menus.find((obj) => obj.title == target.id);
            if(menu?.hasChildren) return null
            return navigate(menu?.href || '/')
        }
    };

    return {
        menus,
        clickMenu,
    };
};

export default useMenu;
