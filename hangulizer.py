from hangulize import hangulize

str = '한 글'.encode('UTF-8')
print(str)
print(hangulize(u"Giro d'Italia", 'ita'))
print(hangulize(u"Giro d'Italia", 'ita').encode('UTF-8'))