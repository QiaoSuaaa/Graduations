const goods=require('./goods/index');
const auth=require('./Auth/index')
const inviteCode=require('./inviteCode/index')
const character=require('./character/index')
module.exports=(app) => {
    app.use(goods.routes());
    app.use(auth.routes());
    app.use(character.routes());
    
    app.use(inviteCode.routes());
}