#Anthor:JLeRen
#Emil:1074149914@qq.com
这是一个axios的封装，包含了请求拦截器以及响应拦截器，在项目的src/api中。并没有封装post、get、delete、put.....（个人习惯）。
#使用
想使用只需要在index.js
中注册 Vue.prototype.$axios = AxiosService.axiosService;
#备注
使用了ElementUI 所以需要引入
