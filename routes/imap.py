import subprocess
import sys
import os
dirAbs = os.path.dirname(os.path.abspath(__file__))
file = open(dirAbs+'/user.txt')
file_w = open(dirAbs+'/error_user.txt', "w")
host1 = sys.argv[1]
host2 = sys.argv[2]
for i in file:
    s = i.split(',')
    user1 = s[0].strip()
    pass1 = s[1].strip()
    user2 = s[2].strip()
    pass2 = s[3].strip()
    try:
        subprocess.check_call(['imapsync', '--host1', host1, '--user1', user1, '--password1',
                               pass1, '--host2', host2, '--user2', user1, '--password2', pass1])
        # subprocess.check_call(['imapsync','--host1','139.162.26.199','--user1',i.strip(),'--password1','bangkok999','--host2','mail-02.thaidata.cloud','--user2',i.strip(),'--password2','bangkok999'])
    except subprocess.CalledProcessError:
        file_w.write(i)
