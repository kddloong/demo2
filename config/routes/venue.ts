const ticketRoutes = [
  {
    path: '/menu33',
    name: '售卖',
    icon: 'jixianguanli',
    routes: [
      {
        path: '/menu33',
        redirect: '/menu33/check',
      },
      {
        name: '工作台',
        icon: 'IPshijiantongji',
        path: '/menu33/check',
        component: './menu33/check',
      },
    ],
  },
];

export { ticketRoutes };
