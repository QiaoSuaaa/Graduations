
//2最低普通用户只可浏览，类似访客 1管理员,只可对比自己等级低进行修改用户和商品， 0 超级管理员只有一个 
const defaultCharacter=[{
    name:'user',
    title:'普通用户',
    power:{
        user:[2],
        Goods:[2],
        Users:[2]
    }
}
,{
    name:'admin',
    title:'管理员',
    power:{
        user:[1],
        Goods:[1],
        Users:[1]
    }
},
{
    name:'superAdmin',
    title:'超级管理员',
    power:{
        user:[0],
        Goods:[0],
        Users:[0]
    }
},]

module.exports={
    defaultCharacter
}