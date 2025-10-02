import { createBrowserRouter } from "react-router-dom";
import { generalRouter } from "./general.router";
import { adminRouter } from "./admin.router";

const router = createBrowserRouter([
	...generalRouter,
	...adminRouter,
]);

export default router;
