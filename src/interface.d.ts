/**
 * 服务端返回的数据接口
 */
export interface ResponseInfo {
    success: string;
    status: number;
    msg: string;
    data: any;
}

/**
 * setData 的数据接口
 */
export interface StateData {
    [index: string]: any;
}