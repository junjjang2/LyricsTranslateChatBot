const utf8 = require('utf8');
var fs = require('fs');
var os = require('fs');
var iconv = require('iconv-lite');

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
  /*
    fs.writeFile("LyricsTranslateChatBot/text.txt", '한글', function(err){});
    let str = os.readFileSync("LyricsTranslateChatBot/input.txt");
    console.log("한글");
    console.log(str.toString());
    let str_kr = iconv.decode(str, 'utf-8');
    //console.log(srt_kr.toString());5

    var st = iconv.encode('한 글', 'utf-8');
    var hex = st.toString('hex');
    console.log(st);
    console.log(hex);
    const buf = Buffer.from(hex, 'hex');
    console.log(buf.toString('utf8'));
    console.log(iconv.decode(hex, 'utf-8'));
    fs.writeFileSync('text.txt', hex, {encoding:'hex'});
    */
});