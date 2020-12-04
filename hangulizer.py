import pandas as pd

from hangulize import hangulize

# 예시
str = '한 글'.encode('UTF-8')
print(str)
print(hangulize(u"Giro d'Italia", 'ita'))
print(hangulize(u"Giro d'Italia", 'ita').encode('UTF-8'))
