import React from "react"
import {Switch, Route, Redirect} from "react-router-dom"
import {LinksPage} from "./pages/LinksPage"
import {AuthPage} from "./pages/AuthPage"
import {CreatePage} from "./pages/CreatePage"
import {DeteilPage} from "./pages/DeteilPage"

export const useRoutes = isAuthenticated => {
if(isAuthenticated){
    return(
        <Switch>
            <Route path="/links" exact>
                <LinksPage />
            </Route>
            <Route path="/create" exact>
                <CreatePage />
            </Route>
            <Route path="/deteil/:id" exact>
                <DeteilPage />
            </Route>
            <Redirect to = "/create" />
        </Switch>
    )
}
return (
        <Switch>
            <Route path = "/" exact>
                <AuthPage />
            </Route>
            <Redirect to = "/" />
        </Switch> 
)
}