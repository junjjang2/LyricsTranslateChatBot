from janome.tokenizer import Tokenizer

def toKana(lines):
    t = Tokenizer()
    results = list()
    for line in lines:
        sentence = ''
        for token in t.tokenize(u'%s' % line):
            sentence += token.__str__().split(',')[8] # 카타가나만 추출
        results.append(sentence)
    return results

