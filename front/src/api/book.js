import request from '@/utils/request'

export function getAllBook(pageNo,pageSize,searchInfo) {
    return request({
        url: '/book/all_books',
        method: 'get',
        params: {
            page_no: pageNo,
            page_size: pageSize,
            search_info: searchInfo
        }
    })
}