import urllib.request, re
html = urllib.request.urlopen("https://www.tribocor.co.in/aerosols").read().decode('utf-8')
for match in re.findall(r'<img[^>]+src="([^"]+)"', html):
    print(match)
