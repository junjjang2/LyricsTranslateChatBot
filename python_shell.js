const utf8 = require('utf8');
var fs = require('fs');

const { PythonShell } = require("python-shell");

function transliteration(detlang, body){
  PythonShell.run("transliteration.py", {
    mode: 'text',
    pythonPath: 'C:/Users/82103/AppData/Local/Programs/Python/Python38/python.exe',
    pythonOptions: ['-u'],
    scriptPath: 'LyricsTranslateChatBot',
    args: [detlang, body]
  }, function(err, data) {
    if (err) throw err;
    //console.log(data);
    let rep = data[0].toString().replace(/\\x|'/g, '').replace('b', '').replace(/ /g, '20').replace(/\\n/g, '0a');
    //console.log(rep);
    const buf1 = Buffer.from(rep, 'hex');
    var sentence = buf1.toString('utf-8');
    console.log(sentence);
    //return sentence;
  });
}

//transliteration('ja', '東京スカイツリーへのお越しは');
//transliteration('de', 'Guten Tag');
