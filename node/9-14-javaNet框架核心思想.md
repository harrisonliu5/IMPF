# JAVANET框架核心思想

## 多层框架

表现层UI(User Interface layer)Web Componnet -> 业务逻辑层BLL(Business Logic Layer) -> 数据访问层工厂类DALFactory(Data access layer Factory) -> 数据访问接口层IDAL(Interface Data access layer)  -> 数据访问层DLL(Data access layer) -> 数据访问封装层SqlServer(SQL Server Data access layer) -> 数据库集群

## JavaWeb 发展历程

jsp指令元素(import) jsp 动作元素

jsp内置对象 ( session 、 request 、 response )

Javabean 对象 可重用组件化思想

页面相当的复杂，无前后端概念

### JavaWeb 多层架构

UI ->(APO=>Spring(AOP))-> 路由层Action ->(struts.xml => DI(IoC))-> 业务处理层Service -> 持久化访问层PO(Persistant Object) -> hibernate.cfg.xml -> 数据库接口DAO(Data Access Object) -> 数据库集群

el 表达式和jstl 标签 <x:if>