# BarakoSkoniai
Paskutini kart atnaujinta: 2023-10-25

### Usefull comands:

``cd <folderio_pavadinimas>`` - pereiti i folderi esanti dabartiniame forderi  
``cd ..`` - sugrizti vienu folderiu  
  
Siulau VsCode turet du cmd terminalus ("split terminal")  
![image](https://github.com/MatasSioma/BarakoSkoniai/assets/55746081/1a46f91c-14ed-4338-a52c-846b312ceb4c)

Abiejose folderiuose (client ir server):  
``npm install `` - tame folderyje kur yra "packadge.json" parsius arba istrins reikalingus/nereikalingas bibliotekas (packadge'us)  
``npm start`` - paleisti puslapi, tada rezultatas matosi http://localhost:3000/  

#### Darbas su git'u
  
Skirtas kurti naujus features ir negadinti "main" - prduction branch'o  
Jei kas neaisku, klauskit ChatGpt...  
  
Naujas branchas: ``git checkout -b <new-branch-name>``  
Pareiti i kita branch: ``git checkout <branch-name>``  
Budami kazkokiame branche, parsisiusti pakeitimus is "source-branch": ``git merge <source-branch>``  
Istrinti branch kai jo nebereikia: ``git branch -d <branch-name>``  
Issiusti pakeitimus i GitHuba: ``git push`` jau padarius kazkiek commit'u...  
  
Yra daug daugiau komandu kurias reik zinot ka daro kaip ``git fetch`` , pull, push, ....  
Siulau paziuret video kaip naudot git'a. Labai svarbu ir ateiciai.  

### Basic set-upas
  
1. Parsisiusti Git https://git-scm.com/downloads  
2. "Prisijungiame"  
``git config --global user.name "Vardenis Pavardenis (betkas reliai)"``  
``git config --global user.email johndoe@example.com``  
3. tada consoleje tam folderi, kuriam norit kad butu failai:  
``git clone https://github.com/MatasSioma/BarakoSkoniai.git``  
4. Tureti node.js https://nodejs.org/en/download  
5. Ikelti .env faila i server folderi. Jis randasi teams chefai grupeje, ten saugomi slaptazodziai kurie leidzia prisijungt prie DB ir negali but gitHube  
  
Galutinis variantas:  
![image](https://github.com/MatasSioma/BarakoSkoniai/assets/55746081/6ff8fd60-b32a-4560-842c-5792befaf44f)


### Doumenu bazes set-up

Parsisiunskit "graphical user interface" kad nereiketu maltis komdinej eilutej: https://ftp.postgresql.org/pub/pgadmin/pgadmin4/v7.7/windows/pgadmin4-7.7-x64.exe (pgAdmin4)
prisijungti prie pacio serverio: tik atsidarius programa "add new server"  
Name: BS.db (betkas)  
"Connection tab'as"  
hostname/address: 194.31.55.150  
Maintenance database: postgres  
username: chefas  
password: 'Klausti' 
Savepassword: ON  
![image](https://github.com/MatasSioma/BarakoSkoniai/assets/55746081/792f4064-56ef-4738-afb4-14d3890a8b08)

Ir galesit daryt viska ka sirdis geidzia su duomenu baze....
