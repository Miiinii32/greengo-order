import { Icons } from '@/components/shared/Icons';

export const SIDEBAR_MENU = {
  sidebarHeader: {
    title: 'logo',
    url: '/',
    filePosition: '/logo.svg',
  },
  sidebarMain: [
    {
      title: '後台總覽',
      url: '/admin',
      icon: <Icons.adminReport />,
      needSecondLayer: false,
    },
    {
      title: '訂單管理',
      url: '/admin/order',
      icon: <Icons.adminOrder />,
      needSecondLayer: false,
    },
    {
      title: '商品管理',
      url: '/admin/product',
      icon: <Icons.adminProduct />,
      needSecondLayer: true,
      secondLayer: [
        {
          title: '基本食材',
          url: '/admin/product/ingredients',
        },
        {
          title: '固定POKE碗',
          url: '/admin/product/fixedPokes',
        },
        {
          title: '其他產品',
          url: '/admin/product/otherProducts',
        },
      ],
    },
  ],
  sidebarFooter: {
    title: '後台登出',
    url: '',
    icon: <Icons.adminLogout />,
  },
};
