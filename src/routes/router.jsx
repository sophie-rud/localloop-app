import { createBrowserRouter } from "react-router-dom";
import App from "../App.jsx";
import MinimalLayout from "../layouts/MinimalLayout/MinimalLayout.jsx";

export const router = createBrowserRouter ([
    {
        element: <MinimalLayout />,
        children: [
            {
                path: "login",
                element: <Login/>
            },
            {
                path: "signup",
                element: <SignUp/>
            },
        ]
    },
    {
        path: "/",
        element: (
            <App/>
        ),
        children: [
            {
                index: true,
                element: <Home/>
            },
            {
                path: "tracks",
                element: (
                    <Track />
                ),
                children: [
                    {
                        index: true,
                        element: (<TracksPage />)
                    },
                    {
                        path: ":trackId",
                        element: (<TrackDetailsPage />),
                        children: [
                            {
                                path: "step/:stepId",
                                element: (<TrackStepPage />),
                            }
                        ]
                    },
                ]
            },
            {
                path: "user",
                element: (
                    <PrivateRoute>
                        <Outlet />
                    </PrivateRoute>
                ),
                children: [
                    {
                        path: "profile",
                        element: (<UserProfilePage />),
                    },
                    {
                        path: "tracks/favorites",
                        element: (<FavoriteTracksPage />),
                    },
                    {
                        path: "tracks/create",
                        element: (<CreateTrackPage />),
                    },
                    {
                        path: "tracks/edit/:trackId",
                        element: (<EditTrackPage />),
                    },
                    {
                        path: "tracks/myTracks",
                        element: (<MyTracksPage />),
                    },
                ]
            },
        ]
    },
    {
        path: "admin/",
        element: (
            <PrivateRoute>
                <AdminLayout/>
            </PrivateRoute>
        ),
        children: [
            {
                path: "profile",
                element: (<AdminProfilePage />),
            },
            {
                path: "users",
                element: (<UsersDashboardPage />),
            },
            {
                path: "tracks",
                element: (<TracksDashboardPage />),
            },
            {
                path: "steps",
                element: (<StepsDashboardPage />),
            },
            {
                path: "places",
                element: (<PlacesDashboardPage />),
                children: [
                    {
                        path: "create",
                        element: (<CreatePlacePage />),
                    },
                    {
                        path: "edit/:placeId",
                        element: (<EditPlacePage />),
                    },
                ]
            },
        ]
    }
])