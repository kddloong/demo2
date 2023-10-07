const areaRoutes = [
  {
    path: '/area',
    name: '场地',
    icon: 'IPshijiantongji',
    routes: [
      {
        path: '/area',
        redirect: '/area/workplace',
      },
      {
        name: '工作台',
        icon: 'IPshijiantongji',
        path: '/area/workplace',
        component: './area/schedule',
      },
    ],
  },
];

export { areaRoutes };
