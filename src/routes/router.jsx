import {createBrowserRouter, Outlet} from "react-router-dom";
import App from "../App.jsx";
import MinimalLayout from "../layouts/MinimalLayout/MinimalLayout.jsx";
import Home from "../pages/Home/Home.jsx";
import LoginPage from "../pages/SignupAndLogin/LoginPage/LoginPage.jsx";
import SignupPage from "../pages/SignupAndLogin/SignupPage/SignupPage.jsx";
import TracksPage from "../pages/Tracks/TracksPage/TracksPage.jsx";
import OneTrackDetailsPage from "../pages/Tracks/OneTrackDetailsPage/OneTrackDetailsPage.jsx";
import OneStepDetailsPage from "../pages/Steps/OneStepDetailsPage/OneStepDetailsPage.jsx";
import UserProfilePage from "../pages/User/ProfilePage/UserProfilePage.jsx";
import FavoriteTracksPage from "../pages/Tracks/FavoriteTracksPage/FavoriteTracksPage.jsx";
import AdminLayout from "../layouts/AdminLayout/AdminLayout.jsx";
import AdminProfilePage from "../pages/Admin/ProfilePage/AdminProfilePage.jsx";
import CreateOrEditTrackPage from "../pages/Tracks/CreateTrackPage/CreateOrEditTrackPage.jsx";
import UsersDashboardPage from "../pages/Admin/UsersDashboardPage/UsersDashboardPage.jsx";
import TracksDashboardPage from "../pages/Admin/TracksDashboardPage/TracksDashboardPage.jsx";
import PlacesDashboardPage from "../pages/Admin/PlacesDashboardPage/PlacesDashboardPage.jsx";
import MapPage from "../pages/Map/MapPage.jsx";
import PlacesPage from "../pages/Places/PlacesPage/PlacesPage.jsx";
import AdminRoute from "./AdminRoute.jsx";
import PrivateRoute from "./PrivateRoute.jsx";

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
                        element: (<CreateOrEditTrackPage />),
                    },
                    {
                        path: "tracks/:trackId/edit",
                        element: (<CreateOrEditTrackPage />),
                    },
                ]
            },
        ]
    },
    {
        path: "admin/:id",
        element: (
            <AdminRoute>
                <AdminLayout/>
            </AdminRoute>
        ),
        children: [
            {
                path: "profile",
                element: (<AdminProfilePage />),
            },
            {
                path: "usersDashboard",
                element: (<UsersDashboardPage />),
            },
            {
                path: "tracksDashboard",
                element: (<TracksDashboardPage />),
            },
            {
                path: "tracks/create",
                element: (<CreateOrEditTrackPage isAdminPage={true} />),
            },
            {
                path: "tracks/:trackId/edit",
                element: (<CreateOrEditTrackPage isAdminPage={true} />),
            },
            {
                path: "placesDashboard",
                element: (<PlacesDashboardPage />),
            },
            {
                path: "places",
                element: (<PlacesPage />),
            },
        ]
    }
])
