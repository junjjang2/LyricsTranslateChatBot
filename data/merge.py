def merge(ef, ff):
    while True:
        en = ef.readline()
        kr = ff.readline()
        #print(kr)
        if not en:
            break
        res.write(en.strip() + '\t' + kr.strip() + '\n')
    ef.close()
    ff.close()

print("START")
res = open("result2.txt", 'w', encoding='utf8')


ef = open("giga-fren.release2.en", 'r')
ff = open("giga-fren.release2.fr", 'rt', encoding='utf8')
merge(ef, ff)


ef = open("newstest2013.en", 'r')
ff = open("newstest2013.fr", 'rt', encoding='utf8')
merge(ef, ff)

res.close()

print("END")