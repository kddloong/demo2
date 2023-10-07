import { MergeRequestTableParams, TypeUtil } from '../../types/utils';
import { get, post } from '@/services/request/request_tools';
import { CLIENT_VERSION as version } from '@/utils/utils';
import { File } from '../../types/file';

//文件下载(私有下载)：预签名方式 生成临时访问url
export async function privateDownload(key: string): Promise<string> {
  return post(`/third-service/${version}/third/file/private-download`, { key });
}

// 已上传文件分页查询
export async function getUploadFileList(
  params: MergeRequestTableParams<{ relatedId: string }>,
): Promise<TypeUtil.RequestResult<File.FileInfo[]>> {
  return get(`/third-service/${version}/third/uploadfile/list`, params);
}

//保存-修改已上传文件
export async function saveOrUpdateFileName(params: File.FileInfo): Promise<TypeUtil.RequestResult> {
  return post(`/third-service/${version}/third/uploadfile/saveOrUpdate`, params);
}

// 删除已上传文件记录
export async function deleteUploadFile(ids: string): Promise<TypeUtil.RequestResult> {
  return post(`/third-service/${version}/third/uploadfile/delete`, { ids });
}
