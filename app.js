var express = require('express');
const request = require('request');
const TARGET_URL = 'https://api.line.me/v2/bot/message/reply'
const TOKEN = 'CjlAiQiIFxcVN3h582dzJexrgg4xUvFZpjEfyOZSXNZtrkHsS5rDhzwAmhX0XmpTwaG6xMK7Y1u+0xKbUY/ZR7NW1CJXAxLM7Mx0eYX56iCYz+w9WyWCR83saMR+SeElwP/HWOpbluNn3LztSD0RqAdB04t89/1O/w1cDnyilFU='
const PAPAGO_TRANS_URL = 'https://openapi.naver.com/v1/papago/n2mt'
const PAPAGO_DETLENG_URL = 'https://openapi.naver.com/v1/papago/detectLangs'
const PAPAGO_ID = 'M7wy9fJ4QZiQ6EwEqRhR'
const PAPAGO_SECRET = 'EFpzluUTVm'
const MUSIXMATCH_KEY = '72339be60f896e74d71b76a69e6211e2'
const MUSIXMATCH_URL = 'https://api.musixmatch.com/ws/1.1/matcher.lyrics.get?'
const fs = require('fs');
const utf8 = require('utf8');
const path = require('path');
const HTTPS = require('https');
const domain = "www.shazamkazam.ml"
const sslport = 23023;
const bodyParser = require('body-parser');
var app = express();
var py = require('./python_shell.js')

var target_language = 'en'

app.use(bodyParser.json());
app.post('/hook', function (req, res) {

    var eventObj = req.body.events[0];
    var source = eventObj.source;
    var message = eventObj.message;

    // request log
    console.log('======================', new Date() ,'======================');
    console.log('[request]', req.body);
    console.log('[request source] ', eventObj.source);
    console.log('[request message]', eventObj.message);

    if(eventObj.message.text=="help" || eventObj.message.text=="도움말"){
        help(eventObj.replyToken);
    }else{
        get_lyrics(eventObj.replyToken, eventObj.message.text);
        //trans(eventObj.replyToken, eventObj.message.text);
    }

    res.sendStatus(200);
});

function help(replyToken){
    request.post(
        {
            url: TARGET_URL,
            headers: {
                'Authorization': `Bearer ${TOKEN}`
            },
            json: {
                "replyToken":replyToken,
                "messages":[
                    {
                        "type":"text",
                        "text":"\"가수, 노래명\"으로 입력해주세요.(영어, 일본어, 프랑스어 등 가능)"
                    }
                ]
            }
        },(error, response, body) => {
            console.log(body)
        });
}

function get_lyrics(replyToken, user_message){
    let artist, song, send_text;
    try{
        const words = user_message.split(",");
        artist = words[0].trim();
        song = words[1].trim();
        song = utf8.decode(song);
        console.log(words)
        console.log(artist, song)
    }
    catch{
        request.post(
            {
                url: TARGET_URL,
                headers: {
                    'Authorization': `Bearer ${TOKEN}`
                },
                json: {
                    "replyToken":replyToken,
                    "messages":[
                        {
                            "type":"text",
                            "text":"\"가수, 노래명\"으로 입력해주세요."
                        }
                    ]
                }
            },(error, response, body) => {
                console.log(body)
            });
            return;
    }
    request.get(
        {
            url: MUSIXMATCH_URL,
            qs:{
                format: 'json',
                q_artist: song,
                q_track: artist,
                apikey: MUSIXMATCH_KEY
            },
            json: true
        },(error, response, body) => {
            try{
            target_language = detect(body.message.body.lyrics.lyrics_body)
            if(!error && response.statusCode == 200){
                if(body.message.header.status_code == 200) {
                    console.log(body.message.body.lyrics.lyrics_body);
                    send_text = py.transliteration(target_language, body.message.body.lyrics.lyrics_body);
                }
                else{
                    console.log(body.message.header.status_code);
                    if(body.message.header.status_code == 404)
                        console.log("Wrong input type")
                        console.log(body.message)
                    send_text = "잘못된 가수나 노래명입니다.\n\"가수, 노래명\"으로 입력해주세요."

                }
            }
            else{
                console.log(response.statusCode)
                send_text = "서버에 오류가 발생했습니다. 다음에 다시 시도해주세요."
            }
            request.post(
                {
                    url: TARGET_URL,
                    headers: {
                        'Authorization': `Bearer ${TOKEN}`
                    },
                    json: {
                        "replyToken":replyToken,
                        "messages":[
                            {
                                "type":"text",
                                "text": send_text
                            }
                        ]
                    }
                },(error, response, body) => {
                    console.log(body)
                }
            );
            }
            catch(e){
                console.log(e)
            }
        });
}

function trans(replyToken, message) {
    request.post(
        {
            url: PAPAGO_TRANS_URL,
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8',
                'X-Naver-Client-Id': `${PAPAGO_ID}`,
                'X-Naver-Client-Secret': `${PAPAGO_SECRET}`
            },
            body: 'source=ko&target=' + target_language + '&text=' + message,
            json:true
        },(error, response, body) => {
            console.log(body);
            if(!error && response.statusCode == 200) {
                console.log(body.message);
                var transMessage = body.message.result.translatedText;
                request.post(
                    {
                        url: TARGET_URL,
                        headers: {
                            'Authorization': `Bearer ${TOKEN}`
                        },
                        json: {
                            "replyToken":replyToken,
                            "messages":[
                                {
                                    "type":"text",
                                    "text":transMessage
                                }
                            ]
                        }
                    },(error, response, body) => {
                        console.log(body)
                    });
            }
        });

}

function detect(replyToken, message) {
    request.post(
        {
            url: PAPAGO_DETLANG_URL,
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8',
                'X-Naver-Client-Id': `${PAPAGO_ID}`,
                'X-Naver-Client-Secret': `${PAPAGO_SECRET}`
            },
            form: {'query': query}
        },(error, response, body) => {
            console.log(body);
            if(!error && response.statusCode == 200) {
                console.log(body);
                target_language = body.langCode;
            }
            else{
                console.log('error: ' + response.statusCode);
            }
        }
    );
}

try {
    const option = {
      ca: fs.readFileSync('/etc/letsencrypt/live/' + domain +'/fullchain.pem'),
      key: fs.readFileSync(path.resolve(process.cwd(), '/etc/letsencrypt/live/' + domain +'/privkey.pem'), 'utf8').toString(),
      cert: fs.readFileSync(path.resolve(process.cwd(), '/etc/letsencrypt/live/' + domain +'/cert.pem'), 'utf8').toString(),
    };
  
    HTTPS.createServer(option, app).listen(sslport, () => {
      console.log(`[HTTPS] Server is started on port ${sslport}`);
    });
  } catch (error) {
    console.log('[HTTPS] HTTPS 오류가 발생하였습니다. HTTPS 서버는 실행되지 않습니다.');
    console.log(error);
  }
  