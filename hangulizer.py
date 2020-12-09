from hangulize import hangulize

def trans(t_lang, lines):
    results = ""
    for line in lines:
        results += hangulize(u'%s' % line, t_lang) + u'\n'
    return results.encode('UTF-8')