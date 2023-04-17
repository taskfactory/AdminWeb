import request from "../request.jsx"

// GetSources 获取数据源列表
export const GetSources = (page, pageSize, sname) => {
    return request({
        method:"get",
        url:"source/list",
        params:{
            sname:sname,
            page:page,
            pageSize:pageSize,
        },
    })
}

// UpsertSource 更新或创建数据源
export const UpsertSource = (sname, desc, id) => {
    return request({
        method:"post",
        url:"source/upsert",
        params:{},
        data:{
            id:id,
            sname:sname,
            desc:desc,
        },
    })
}