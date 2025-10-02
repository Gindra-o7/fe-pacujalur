import ForbiddenPage from "@/pages/publics/forbidden.page";
import LandingPage from "@/pages/publics/landing.page";
import NotFoundPage from "@/pages/publics/not-found.page";
import LoginPage from "@/pages/publics/login.page";
import JalurPage from "@/pages/publics/jalur.page"
import GalleryPage from "@/pages/publics/galeri.page";
import EventPage from "@/pages/publics/events.page";

export const generalRouter = [
	{
		path: "/",
		element: <LandingPage />,
	},
	{
		path: "/beranda",
		element: <LandingPage />,
	},
	{
		path: "/forbidden",
		element: <ForbiddenPage />,
	},
	{
		path: "*",
		element: <NotFoundPage />,
	},
	{
		path: "/login",
		element: <LoginPage />,
	},
	{
		path: "/jalur",
		element: <JalurPage />,
	},
	{
		path: "/gallery",
		element: <GalleryPage />,
	},
	{
		path: "/event",
		element: <EventPage />,
	}
]
