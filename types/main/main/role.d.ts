export declare namespace Role {
  interface RoleItem {
    name: string;
    id?: string;
    memo: string;
    orderNo: string;
    parentId?: string;
    roleNo: string;
    children: RoleItem[];

    /**
     * 会返回3种值 ‘0’ 能删除， ‘1’不能删除 ‘‘ 能删除
     */
    isDeleted: string;
  }
}

/**
 * 角色管理菜单
 */
declare namespace RoleMenu {
  interface RoleTableItem {
    button: string;
    childKey: string;
    key: string;
    parentKey: string;
    selectable: boolean;

    title: string;

    children: RoleTableItem[];
  }

  interface RoleTable {
    chooseData: string[];
    menus: RoleTableItem[];
  }

  interface TreeItemForCheck {
    key: string;
    title: string;
    selectable: boolean;
    children?: TreeItemForCheck[];
  }

  interface RoleMenuContent {
    menus: TreeItemForCheck[];
    chooseData: string[];
  }

  interface RoleMenuData extends TypeUtil.RequestResult {
    data: RoleMenuContent;
  }

  interface SaveRoleMenuParams {
    roleId: string;
    roleMenuIds: string;
  }
}

/**
 * 角色管理场馆
 */
declare namespace RoleVenue {
  interface RoleVenueItem {
    key: string;
    title: string;
    selectable: boolean;
    children: RoleVenueItem[];
  }
}

declare namespace RoleUser {
  interface RoleUserItem {
    name: string;
    userName: string;
    phone: string;
  }
}
