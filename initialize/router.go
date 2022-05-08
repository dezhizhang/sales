package initialize

import "github.com/gin-gonic/gin"

func Router() *gin.Engine  {
	Router := gin.Default()
	// 配置路由组
	group := Router.Group("/api/v1")
	routers.
}
