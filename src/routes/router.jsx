import {createBrowserRouter, Outlet} from "react-router-dom";
import App from "../App.jsx";
import MinimalLayout from "../layouts/MinimalLayout/MinimalLayout.jsx";
import Home from "../pages/Home/Home.jsx";
import LoginPage from "../pages/SignupAndLogin/LoginPage/LoginPage.jsx";
import SignupPage from "../pages/SignupAndLogin/SignupPage/SignupPage.jsx";
import PrivateRoute from "./PrivateRoute.jsx";
import TracksPage from "../pages/Tracks/TracksPage/TracksPage.jsx";
import OneTrackDetailsPage from "../pages/Tracks/OneTrackDetailsPage/OneTrackDetailsPage.jsx";
import OneStepDetailsPage from "../pages/Steps/OneStepDetailsPage/OneStepDetailsPage.jsx";
import UserProfilePage from "../pages/User/ProfilePage/UserProfilePage.jsx";
import FavoriteTracksPage from "../pages/Tracks/FavoriteTracksPage/FavoriteTracksPage.jsx";
import MyTracksPage from "../pages/Tracks/MyTracksPage/MyTracksPage.jsx";
import AdminLayout from "../layouts/AdminLayout/AdminLayout.jsx";
import AdminProfilePage from "../pages/Admin/ProfilePage/AdminProfilePage.jsx";
import CreateTrackPage from "../pages/Tracks/CreateTrackPage/CreateTrackPage.jsx";
import EditTrackPage from "../pages/Tracks/EditTrackPage/EditTrackPage.jsx";
import CreateStepPage from "../pages/Steps/CreateStepPage/CreateStepPage.jsx";
import EditStepPage from "../pages/Steps/EditStepPage/EditStepPage.jsx";
import UsersDashboardPage from "../pages/Admin/UsersDashboardPage/UsersDashboardPage.jsx";
import TracksDashboardPage from "../pages/Admin/TracksDashboardPage/TracksDashboardPage.jsx";
import PlacesDashboardPage from "../pages/Admin/PlacesDashboardPage/PlacesDashboardPage.jsx";
import MapPage from "../pages/Map/MapPage.jsx";

export const router = createBrowserRouter ([
    {
        element: <MinimalLayout />,
        children: [
            {
                path: "login",
                element: <LoginPage/>
            },
            {
                path: "signup",
                element: <SignupPage/>
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
                element: (<TracksPage/>)
            },
            {
                path: "tracks/:id",
                element: (<OneTrackDetailsPage/>)
            },
            {
                path: "tracks/:trackId/steps/:stepId",
                element: (<OneStepDetailsPage/>),
            },
            {
                path: "map",
                element: (<MapPage/>),
            },
            {
                path: "user/:id",
                element: (
                    // <PrivateRoute>
                        <Outlet />
                    // </PrivateRoute>
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
                        path: "tracks/:trackId/edit",
                        element: (<EditTrackPage />),
                    },
                    {
                        path: "tracks/:trackId/steps/create",
                        element: (<CreateStepPage />),
                    },
                    {
                        path: "tracks/:trackId/steps/:stepId/edit",
                        element: (<EditStepPage />),
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
            // <PrivateRoute>
                <AdminLayout/>
            // </PrivateRoute>
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
                path: "places",
                element: (<PlacesDashboardPage />),
            },
        ]
    }
])
