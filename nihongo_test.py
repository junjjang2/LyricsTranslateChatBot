from janome.tokenizer import Tokenizer
t = Tokenizer()
for token in t.tokenize(u'東京スカイツリーへのお越しは'):
    print(token.__str__().split(',')[8], end='')