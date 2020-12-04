import pandas as pd

from hangulize import hangulize

<< << << < HEAD
# 예시
str = '한 글'.encode('UTF-8')
print(str)
== == == =
#str = '한 글'.encode('UTF-8')
# print(str)
>>>>>> > 2115419c548770816471d94426bbb62a06d4c1dc
print(hangulize(u"Giro d'Italia", 'ita'))
print(hangulize(u"Giro d'Italia", 'ita').encode('UTF-8'))
