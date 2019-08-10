A normalizer written by me used on [Enfoca!](https://www.goenfoca.com.br/)
contact: zaharie@goenfoca.com.br

Facebook entry exemple
const Normalizer = require ("normalizer-chatbot");
let normalizer = new Normalizer();
//facebook input
msg.source = "facebook"
normalizer.normalizeInput(msg).then((result)=>{
console.log(result);
});