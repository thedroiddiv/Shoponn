import * as React from "react";
import { Redirect, Route } from "react-router-dom";
import { isAuthenticated } from "../pages/auth/helper/auth.helper";

interface AdminRouteProps {
    exact?: boolean,
    path: string,
    component: React.ComponentType<any>;
}

export default function AdminRoute({ component: Component, ...rest }: AdminRouteProps) {
    return (
        <Route
            render={props =>
                (isAuthenticated() && (isAuthenticated()?.role === 1)) ? (
                    <Component {...props} />
                ) : (
                    <Redirect
                        to={{
                            pathname: "/signin",
                            state: { from: props.location }
                        }}
                    />
                )
            }
        />
    )
}