import subprocess
import sys
import os
dirAbs = os.path.dirname(os.path.abspath(__file__))
uuid = sys.argv[1]
host1 = sys.argv[2]
host2 = sys.argv[3]
file = open(dirAbs+'/user.txt')
file_w = open('/var/www/html/imap_log/'+uuid+'.txt', "w")
file_w.write('Error Items\n')
for i in file:
    s = i.split(',')
    user1 = s[0].strip()
    pass1 = s[1].strip()
    user2 = s[2].strip()
    pass2 = s[3].strip()
    try:
        subprocess.check_call(['imapsync', '--host1', host1, '--user1', user1, '--password1',
                               pass1, '--host2', host2, '--user2', user2, '--password2', pass2])
    except subprocess.CalledProcessError:
        file_w.write(user1 + ' --> ' + user2 + '\n') 

