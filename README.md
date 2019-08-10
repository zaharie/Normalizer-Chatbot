A normalizer written by me used on [PedeLogo!](https://www.pedelogo.online/)
contact: zaharie@pedelogo.online

Facebook entry exemple
const Normalizer = require ("normalizer-chatbot");
let normalizer = new Normalizer();
//facebook input
msg.source = "facebook"
normalizer.normalizeInput(msg).then((result)=>{
console.log(result);
});
