import createRouter from 'router5';
import browserPlugin from 'router5-plugin-browser';

const router = createRouter(
  [{name: 'home', path: '/?foo'}], //
  {defaultRoute: 'home'},
);

router.usePlugin(browserPlugin());

export default router;
