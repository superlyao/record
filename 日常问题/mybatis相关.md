## 使用@Select注解的问题

- 如果要使用`<if>`标签,要用`<script>`标签包裹起来
- sql中的大于符号和小于符号不要直接使用，可以使用转义字符
- `<if>`标签中的取值，直接取值，不要使用#{}，这样会被mybatis编译成 ?

## mybatis 数据权限拦截器
- 参考博客 https://my.oschina.net/lihaoshan/blog/1860563  https://www.cnblogs.com/linjunwei2017/p/8920767.html

- 相关代码实现
```java
@Slf4j
@Intercepts({@Signature(type = StatementHandler.class, method = "prepare", args = {Connection.class, Integer.class})})
public class DataScopeInterceptor extends AbstractSqlParserHandler implements Interceptor {

	@Override
	public Object intercept(Invocation invocation) throws Throwable {
		StatementHandler statementHandler = (StatementHandler) PluginUtils.realTarget(invocation.getTarget());
		MetaObject metaObject = SystemMetaObject.forObject(statementHandler);
		this.sqlParser(metaObject);
		// 先判断是不是SELECT操作
		MappedStatement mappedStatement = (MappedStatement) metaObject.getValue("delegate.mappedStatement");
		if (!SqlCommandType.SELECT.equals(mappedStatement.getSqlCommandType())) {
			return invocation.proceed();
		}

		BoundSql boundSql = (BoundSql) metaObject.getValue("delegate.boundSql");
		String originalSql = boundSql.getSql();
		Object parameterObject = boundSql.getParameterObject();

		//查找参数中包含DataScope类型的参数
		DataScope dataScope = findDataScopeObject(parameterObject);

		if (dataScope == null) {
			return invocation.proceed();
		} else {
			String scopeName = dataScope.getScopeName();
			List<Integer> deptIds = dataScope.getDeptIds();
			if (StrUtil.isNotBlank(scopeName) && CollectionUtil.isNotEmpty(deptIds)) {
				String join = CollectionUtil.join(deptIds, ",");
				originalSql = "select * from (" + originalSql + ") temp_data_scope where temp_data_scope." + scopeName + " in (" + join + ")";
				metaObject.setValue("delegate.boundSql.sql", originalSql);
			}
			return invocation.proceed();
		}
	}

	/**
	 * 生成拦截对象的代理
	 *
	 * @param target 目标对象
	 * @return 代理对象
	 */
	@Override
	public Object plugin(Object target) {
		if (target instanceof StatementHandler) {
			return Plugin.wrap(target, this);
		}
		return target;
	}

	/**
	 * mybatis配置的属性
	 *
	 * @param properties mybatis配置的属性
	 */
	@Override
	public void setProperties(Properties properties) {

	}

	/**
	 * 查找参数是否包括DataScope对象
	 *
	 * @param parameterObj 参数列表
	 * @return DataScope
	 */
	private DataScope findDataScopeObject(Object parameterObj) {
		if (parameterObj instanceof DataScope) {
			return (DataScope) parameterObj;
		} else if (parameterObj instanceof Map) {
			for (Object val : ((Map<?, ?>) parameterObj).values()) {
				if (val instanceof DataScope) {
					return (DataScope) val;
				}
			}
		}
		return null;
	}

}
```