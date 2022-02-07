import { lazy } from "react";

const MainRoute = [
    {
        path: 'members',
        layout: 'admin',
        component: lazy(() => import('../../Views/TeamMembers'))
    }

]

export default MainRoute
