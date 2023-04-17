import axios from 'axios';

const apiDomain = "/api";

var request = axios.create({
    baseURL: apiDomain,//基准地址
    timeout: 5000
})

//拦截请求
request.interceptors.request.use((config) => {
    return {
        ...config,
        headers:{
            ...config.headers,
            ContentType:"application/json",
            AllowOrigin:"localhost:3002"
        }}
})

//拦截响应
request.interceptors.response.use((response) => {
    return response
}, function (error) {
    //对响应的错误做点什么
    return Promise.reject(error);
}
)

export default request;