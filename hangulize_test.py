from hangulize import hangulize
#<< << << < HEAD
# 예시
str = '한 글'.encode('UTF-8') # 출력 방식
print(str)
#>>>>>> > 2115419c548770816471d94426bbb62a06d4c1dc
print(hangulize(u"Giro d'Italia", 'ita'))
# >>> 지로 디탈리아
print(hangulize(u"Giro d'Italia", 'ita').encode('UTF-8')) # 이 방식으로 전달해야함
# >>> b'\xec\xa7\x80\xeb\xa1\x9c \xeb\x94\x94\xed\x83\x88\xeb\xa6\xac\xec\x95\x84'