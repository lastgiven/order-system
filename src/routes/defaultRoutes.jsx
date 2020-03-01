import AdminProducts from "../views/admin/Products";
import AdminOrders from "../views/admin/Orders";
import AdminLanding from "../views/admin/Landing";
import GeneralOrders from "../views/general/Orders";
import GeneralLanding from "../views/general/Landing";

const indexRoutes = [
	{ path: "/admin/orders", component: AdminOrders },
	{ path: "/admin/products", component: AdminProducts },
	{ path: "/admin", component: AdminLanding },
	{ path: "/orders", component: GeneralOrders },
	{ path: "/", component: GeneralLanding },
];

export default indexRoutes;
