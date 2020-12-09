import hangulizer
#import keras_test
import kanzi_kana
import sys

lang_dict = {'ko': 'ko',     # from papago lang code to hangulize lang code
    'ja': 'jpn',   # 일본어
    'es': 'spa',   # 스페인어
    'de': 'deu', # 독일어
    'pt': 'por',   # 포르투갈어
    'vi': 'vie',   # 베트남어
    'ru': 'rus',   # 러시아어
    'hi': 'nn',   # 힌디어
    'en': 'nn',   # 영어
    'id': 'nn',   # 인도네시아어
    'th': 'nn',   # 태국어
    'fr': 'nn',   # 프랑스어
    'zh-cn': 'nn',    # 중국어 간체
    'zh-tw': 'nn',    # 중국어 번체
    'unk': 'nn',  # 알수없음
}

def main(t_lang, body):
    lang = lang_dict[t_lang]
    if lang == 'nn':
        print("지원하지 않는 언어입니다.".encode('UTF-8'))
        return
    lines = body.split('\n')
    if lang == 'jpn':
        lines = kanzi_kana.toKana(lines)
    return(hangulizer.trans(lang_dict[t_lang], lines))

if __name__ == "__main__":
    print(main(sys.argv[1], sys.argv[2]))
    