import * as React from "react";
import { Redirect, Route } from "react-router-dom";
import { isAuthenticated } from "../pages/auth/helper/auth.helper";

interface ProtectedRouteProps {
    exact?: boolean,
    path: string,
    component: React.ComponentType<any>;
}

export default function ProtectedRoute({ component:Component, ...rest }: ProtectedRouteProps) {
    return (
        <Route
        render = { props =>
            (isAuthenticated() && (isAuthenticated()?.role===0)) ? (
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



// interface IProps {
//     exact?: boolean;
//     path: string;
//     component: React.ComponentType<any>;
// }

// const LoggedOutRoute = ({
//     component: Component,
//     ...otherProps
// }: IProps) => (
//     <>
//         <header>Logged Out Header</header>
//         <Route
//             render={otherProps => (
//                 <>
//                     <Component {...otherProps} />
//                 </>
//             )}
//         />
//         <footer>Logged Out Footer</footer>
//     </>
// );

// export default LoggedOutRoute;