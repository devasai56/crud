import { lazy, Suspense } from "react"
import { BrowserRouter as AppRouter, Route, Routes, } from 'react-router-dom'
import TeamMembers from "../Views/TeamMembers"
import MainRoute from "./routes"
const Router = () => {
    return (
        <AppRouter>
            <Suspense fallback={<h1>Loading profile...</h1>}>
            <Routes>
                <Route path="/" element={<TeamMembers data={{key:1}}/>} />
                {
                    MainRoute?.map((i) => {
                        console.log(i)
                       return( 
                       <Route
                            
                            path={i?.path}
                            element={<i.component />}
                        />
                    )})
                }

                <Route
                    path="*"
                    element={
                        <main style={{ padding: "1rem" }}>
                        <p>There's nothing here!</p>
                        </main>
                    }
                    />
        
            </Routes>
            </Suspense>
        </AppRouter>
    )
}

export default Router