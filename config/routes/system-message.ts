const systemMessageRoutes = [
  {
    path: '/system-message',
    name: '系统消息',
    hideInMenu: true,
    // redirect: '/messageDetail-success',
    routes: [
      {
        path: '/system-message',
        redirect: '/system-message/notice-jump',
      },
      {
        name: '系统消息页面',
        path: '/system-message/notice-jump',
        component: '../components/SystemMessageJump/notice',
      },
      // {
      //   name: '系统消息页面',
      //   path: '/system-message/notice-fail',
      //   component: '../components/SystemMessageJump/notice/notice-fail-page',
      // },
    ],
  },
];

export { systemMessageRoutes };
