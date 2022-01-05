const fs = require('fs')
const stop_words = 'a,able,about,across,after,all,almost,also,am,among,an,and,any,are,as,at,be,because,been,but,by,can,cannot,could,dear,did,do,does,either,else,ever,every,for,from,get,got,had,has,have,he,her,hers,him,his,how,however,i,if,in,into,is,it,its,just,least,let,like,likely,may,me,might,most,must,my,neither,no,nor,not,of,off,often,on,only,or,other,our,own,rather,said,say,says,she,should,since,so,some,than,that,the,their,them,then,there,these,they,this,tis,to,too,twas,us,wants,was,we,were,what,when,where,which,while,who,whom,why,will,with,would,yet,you,your';
const stop_words_set = new Set(stop_words.split(','));

const keyToFreq = {};

fs.readFile('./pride-and-prejudice.txt', 'utf8' , (err, data) => {
  if (err) {
    console.error(err)
    return
  }
  // console.log(data)
  const words = data.split(/[^A-Za-z]/);
  words.forEach(ele => {
    if(ele.length<=1) return;
    let word = ele.toLocaleLowerCase();
    if(!stop_words_set.has(word)){
      if(word in keyToFreq){
        keyToFreq[word]++;
      }else{
        keyToFreq[word] = 1;
      }
    }
  });
  const res = Object.entries(keyToFreq).sort((a,b) => b[1]-a[1]).slice(0, 30);
  printResult(res);
})

function printResult(res){
  res.forEach(arr => console.log(`${arr[0]} - ${arr[1]}`));
}