import { CurrentUser } from '../types/current-user';

/**
 * @see https://umijs.org/zh-CN/plugins/plugin-access
 * */
export default function access(
  initialState: { currentUser?: CurrentUser; buttonList: Record<string, boolean> } | undefined,
) {
  const { buttonList } = initialState ?? {};
  return buttonList;
}
