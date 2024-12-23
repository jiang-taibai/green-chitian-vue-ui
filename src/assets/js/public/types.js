/**
 * @typedef {Object} Result     请求结果
 * @property {Number} code      编码：1成功，0和其它数字为失败
 * @property {String} message   信息
 * @property {Object} data      数据
 */

/**
 * @template T
 * @typedef {Object} Page           请求分页结果
 * @property {Number} current       当前页
 * @property {Number} pages         总页数
 * @property {Array.<T>} records    记录数组
 * @property {Number} size          每页大小
 * @property {Number} total         总记录数
 */

/**
 * @typedef {Object} Field          农田
 * @property {Number} id            农田 ID
 * @property {String} fieldClass    农田类型
 * @property {String} committee     所属村委会
 */

/**
 * @typedef {Object} FertilizationRecord  施肥记录
 * @property {Number} id                记录 ID
 * @property {Number} fertilizerId      化肥 ID
 * @property {String} applicationDate   施肥日期
 * @property {Number} quantityUsed      使用的化肥数量
 * @property {String} unit              使用量的计量单位
 * @property {String} cropType          作物类型
 * @property {Number} fieldId           地块 ID
 * @property {Number} userId            用户 ID
 * @property {String} username          用户名
 * @property {String} method            施肥方法
 * @property {String} weatherConditions  天气状况
 * @property {String} soilMoisture      土壤湿度
 * @property {String} notes             备注信息
 * @property {Array} imageIds           图片 ID 数组
 * @property {String} location          位置
 * @property {String} createTime        记录创建时间
 * @property {String} updateTime        记录更新时间
 * @property {String} feildName         田地字段名称
 * @property {String} fertilizerName    肥料名称
 */

/**
 * @typedef {Object} FertilizerType   化肥类型
 * @property {Number} id              类型 ID
 * @property {String} typeName        类型名称
 * @property {Number} parentId        父类型 ID
 * @property {Array.<FertilizerType>} children 子类型数组
 * @property {Array.<Fertilizer>} fertilizers  化肥数组
 */

/**
 * @typedef {Object} Fertilizer       化肥
 * @property {Number} id              化肥 ID
 * @property {String} name            化肥名称
 * @property {Number} typeId          化肥类型 ID
 * @property {String} composition      化肥成分
 * @property {String} manufacturer     生产厂家
 * @property {String} productionDate   生产日期
 * @property {String} expiryDate       过期日期
 * @property {String} batchNumber      批次号
 * @property {Number} price            价格
 * @property {String} unit             计量单位
 * @property {Number} stockQuantity    库存数量
 * @property {String} description      描述
 * @property {String} createTime       创建时间
 * @property {String} updateTime       更新时间
 */