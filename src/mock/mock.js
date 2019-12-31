import Mock from 'mockjs' // 引入mockjs
 
const Random = Mock.Random; // Mock.Random 是一个工具类，用于生成各种随机数据

let size = [ 
	'300x250', '250x250', '240x400', '336x280', '180x150', '720x300', '468x60', '234x60', '88x31', 
	'120x90', '120x60', '120x240',  '125x125', '728x90', '160x600', '120x600', '300x600'
];

// 账号密码组、验证码
let loginArr = [], authCode = '';


// 根据数据模板生成模拟数据
/* @method Mock.mock( rurl, function( options ) )
 *	@author <http://mockjs.com/>
 */

// 验证登录
Mock.mock('/login/login', 'post', function(options){
	options.body = JSON.parse(options.body);

	let loginState = 'error';

	loginArr = JSON.parse(localStorage.getItem("loginArr")) || [];
	if(loginArr.length > 0){
		for (let i = 0; i < loginArr.length; i++) {
			if(options.body.account == loginArr[i].account && options.body.password == loginArr[i].password){
				loginState = 'success';
				break;
			}
		}
	}
	
	return loginState;
})

// 注册
Mock.mock('/main/register', 'post', function(options){
	options.body = JSON.parse(options.body);

	let registerRes = { status: 'success'};

	loginArr = JSON.parse(localStorage.getItem("loginArr")) || [];

	// 判断本地是否有用户账号
	if(loginArr.length > 0){
		for(let i = 0; i < loginArr.length; i++){
			if(options.body.account == loginArr[i].account){
				registerRes.status = 'error';
				registerRes.errCause = '该账号已存在';
				break;
			}
		}
	}

	if(registerRes.status == 'success'){
		// 存入本地存储
		loginArr.push(options.body);
		localStorage.setItem("loginArr",JSON.stringify(loginArr));
	}

	return registerRes;
})

// 重置密码
Mock.mock('/main/reset', 'post', function(options){
	options.body = JSON.parse(options.body);

	let resetRes = { status: 'error', errCause: '账号错误' };

	if(options.body.authCode.toLowerCase() != authCode){
		resetRes.errCause = '验证码错误';
	}else{
		loginArr = JSON.parse(localStorage.getItem("loginArr")) || [];

		// 更改密码
		if(loginArr.length > 0){
			for(let i = 0; i < loginArr.length; i++){
				if(options.body.account == loginArr[i].account){
					resetRes.status = 'success';
					resetRes.errCause = '';
					loginArr[i].password = options.body.password;
					localStorage.setItem("loginArr",JSON.stringify(loginArr));
					break;
				}
			}
		}
	}

	return resetRes;
})

// 验证码（图片）
Mock.mock('/main/authImg', 'post', function(options){
	authCode = Random.string('lower', 4);

	let authImg = Random.image( '100x40', Random.color(), '#FFFFFF', 'png', authCode );

	return authImg;
})

// 个人中心（用户信息）
Mock.mock('/userCenter/userInfo', 'post', function(options){
	let uname = Random.cname();
	let userInfo = {
		headImg: Random.image( '350x350', Random.color(), '#FFFFFF', 'png', uname ),
		name: uname
	}
	return userInfo;
})

// 商城
// 首页（轮播图）
Mock.mock('/shop/shop_index/slider','post',function(options){
	let arrLength = Random.integer(1,4);

	let sliderArr = [];

	for(let i = 0; i < arrLength; i++){
		sliderArr.push({
			"link": Random.url(),
		    // "imgSrc": Random.image('300x250', Random.color(), '#FFFFFF', 'png', Random.string(1,5))
		    "imgSrc": Random.image('300x150', Random.color(), '#FFFFFF', 'png', i+1)
		})
	}

	return sliderArr;
})
// 首页（公告）
Mock.mock('/shop/shop_index/news','post',function(options){
	let arrLength = Random.integer(1,4);

	let newsArr = [];

	for(let i = 0; i < arrLength; i++){
		newsArr.push({
			"title": Random.csentence(3, 10)
		})
	}

	return newsArr;
})
// 首页（分类）
Mock.mock('/shop/shop_index/classify','post',function(options){
	let arrLength = Random.integer(1,10);

	let classifyArr = [];

	for(let i = 0; i < arrLength; i++){
		classifyArr.push({
			"classifyId": Random.integer(1,100),
			"classifyName": Random.cword(2, 4),
		    "imgSrc": Random.image('125x125', Random.color(), '#FFFFFF', 'png', i+1)
		})
	}

	return classifyArr;
})
// 首页（商品列表）
Mock.mock('/shop/shop_index/goodsList','post',function(options){
	let arrLength = Random.integer(6,19);

	let goodsList = [];

	for(let i = 0; i < arrLength; i++){
		goodsList.push({
			"goodsId": Random.integer(1,1000),
			"goodsTitle": Random.cword(4, 10),
			"goodsDesc": Random.cword(4, 12),
			"goodsPrice": Random.float(20, 200, 2, 2),
		    "imgSrc": Random.image('125x125', Random.color(), '#FFFFFF', 'png', Random.integer(1,100))
		})
	}
	
	return goodsList;
})

// 底部菜单
Mock.mock('/shop/shop_footer/shopNumber','post',function(options){
	let shopNumber = Random.integer(0,20);
	return shopNumber;
})


