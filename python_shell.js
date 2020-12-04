const utf8 = require('utf8');
var fs = require('fs');

const { PythonShell } = require("python-shell");
let options = {
    mode: 'text',
  scriptPath: "LyricsTranslateChatBot",
  args: ["value1", "value2", "value3"]
};

PythonShell.run("hangulize_test.py", options, function(err, data) {
  if (err) throw err;
  //console.log(iconv.decode("한글", 'EUC-KR5').toString());
  console.log(data);
  let rep = data[2].toString().replace(/\\x|'/g, '').replace('b', '').replace(' ', '20');
  //console.log(rep);
  const buf1 = Buffer.from(rep, 'hex');
  var sentence = buf1.toString('utf-8');
  console.log(sentence);

  fs.writeFileSync("LyricsTranslateChatBot/text.txt", buf1.toString('utf-8'), function(err){});
});