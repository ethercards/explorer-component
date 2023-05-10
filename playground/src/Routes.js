import CardTest from "./Views/Card/CardTest";
import Home from "./Views/Home/Home";
import PoolTest from "./Views/Pool/Pool";

const routes = [
	{
	  path: '/',
	  component: Home,
	  exact: true,
	},
	{
	  path: '/card-test',
	  component: CardTest,
	  exact: true,
	},
	{
	  path: '/dust-pool',
	  component: PoolTest,
	  exact: true,
	}];

export default routes;