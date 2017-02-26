/**
 * Created by zwei76 on 16/9/20.
 * lite EJS template engine for browser
 */
function liteEJS(template,data){
  if(!template||!data){
    console.log('模板引擎缺少参数，退出！');
    return;
  }
  var rule1 = /<%([^=]\s*?.*?)\s*?%>/gi;
  var wordList = [];
  var codeList = [];
  var result;
  var startIndex = 0;
  while ((result = rule1.exec(template))!==null){
    wordList.push(template.slice(startIndex,result.index));
    startIndex = result.index+result[0].length;
    codeList.push(result[1]);
  }
  wordList.push(template.slice(startIndex,template.length));
  codeList.push('');
  // console.log(wordList);
  // console.log(codeList);
  var run = "var final='';";
  for(var i=0;i<wordList.length;i++){
    wordList[i] = replaceEngine(wordList[i]);
    run += 'final += '+wordList[i]+';'+codeList[i];
  }
  run += 'return final;';
  // console.log(run);
  try {
    var final = new Function('data',run);
    return final(data);
  }catch (error){
    console.log('模板引擎出错，退出！\n'+error);
  }

  function replaceEngine(aim) {
    var rule2 = /<%=\s*?(.*?)%>/ig;
    var replaceList = aim.match(rule2);
    if (replaceList){
      for (var replaceCount = 0; replaceCount < replaceList.length; replaceCount++) {
        var replaceListAim = replaceList[replaceCount].replace(rule2, "$1");
        aim = aim.replace(replaceList[replaceCount],"'+"+replaceListAim+"+'");
      }
    }
    aim = "'"+aim+"'";
    return aim;
  }
}
