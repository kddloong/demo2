import { service, service2 } from './server';
import { msag } from '@/services/request/tools';
import { AxiosResponse } from 'axios';

/**
 * 封装get方法
 * @param url  请求url
 * @param params  请求参数
 * @returns {Promise}
 */
export function get<T>(url: string, params = {}): Promise<T> {
  return new Promise((resolve, reject) => {
    service
      .get(url, {
        params,
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded',
        },
      })
      .then((response: AxiosResponse<T>) => {
        resolve(response as T);
      })
      .catch((error) => {
        reject(error);
      });
  });
}

/**
 * 封装get方法
 * @param url  请求url
 * @param params  请求参数
 * @returns {Promise}
 */
export function get2<T>(url: string, params = {}): Promise<T> {
  return new Promise((resolve, reject) => {
    service2
      .get(url, {
        params,
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded',
        },
      })
      .then((response: AxiosResponse<T>) => {
        resolve(response as T);
      })
      .catch((error) => {
        reject(error);
      });
  });
}

/**
 * 封装post请求
 * @param url
 * @param data
 * @returns {Promise}
 */

export function post<T>(url: string, data = {}): Promise<T> {
  return new Promise((resolve, reject) => {
    service.post(url, data).then(
      (response: AxiosResponse<T>) => {
        // 关闭进度条
        resolve(response as T);
      },
      (err) => {
        reject(err);
      },
    );
  });
}

export function postFile<T>(url: string, data: Record<string, Blob> = {}) {
  return new Promise((resolve, reject) => {
    const formData = new FormData();

    formData.append('files', data.files);

    service
      .post(url, formData, {
        headers: {
          'Content-Type': 'multipart/form-data; boundary=----ZcyOpenBoundaryEEpIo3GVWKVCPrX8',
          thisType: 'file',
        },
      })
      .then(
        (response: AxiosResponse<T>) => {
          // 关闭进度条
          resolve(response);
        },
        (err) => {
          reject(err);
        },
      );
  });
}

export function jsonPost(url: string, data = {}) {
  return new Promise((resolve, reject) => {
    service
      .post(url, JSON.stringify(data), {
        headers: {
          'Content-Type': 'application/json',
        },
      })
      .then(
        (response) => {
          // 关闭进度条
          resolve(response);
        },
        (err) => {
          reject(err);
        },
      );
  });
}

/**
 * 封装patch请求
 * @param url
 * @param data
 * @returns {Promise}
 */
export function patch(url: string, data = {}) {
  return new Promise((resolve, reject) => {
    service.patch(url, data).then(
      (response) => {
        resolve(response.data);
      },
      (err) => {
        msag(err);
        reject(err);
      },
    );
  });
}

/**
 * 封装put请求
 * @param url
 * @param data
 * @returns {Promise}
 */

export function put<T>(url: string, data = {}): Promise<T> {
  return new Promise((resolve, reject) => {
    service.put(url, data).then(
      (response: AxiosResponse<T>) => {
        resolve(response as T);
      },
      (err) => {
        msag(err);
        reject(err);
      },
    );
  });
}

export function deleteRes<T>(url: string, data = {}): Promise<T> {
  return new Promise((resolve, reject) => {
    service
      .delete<T>(url, {
        data,
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded',
        },
      })
      .then(
        (response: AxiosResponse<T>) => {
          resolve(response as T);
        },
        (err) => {
          msag(err);
          reject(err);
        },
      );
  });
}
