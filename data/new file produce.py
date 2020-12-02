file=open('data.txt','r')
data=file.read().split('#')
for i in range(1,len(data)):
    with open(data[i].split('"')[1]+'.json','a') as newfile:
        newfile.write('{')
        for j in range(0,len(data[i])-1):
            newfile.write(data[i][j])
        newfile.write('}')


        


