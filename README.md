# BarakoSkoniai

Ka reikia set-up'int:
1. Parsisiuskit "git" programa. https://git-scm.com/downloads
2. Susikurkite GitHub accounta. https://github.com/
3. consolej pas save: (tarsi prisijungiame)
$ ``git config --global user.name "Vardenis Pavardenis (betkas reliai)"``
$ ``git config --global user.email johndoe@example.com``

4. tada consoleje tam folderi, kuriam norit kad butu failai:
``git clone https://github.com/MatasSioma/BarakoSkoniai.git``

GIT yra "bread and butter" programavimo. Taip kad video paziuret ir aiskintis kas cia vyksta labai svarbu ir ateiciai.

6. Back-end'ui atsisiuskit node.js is https://nodejs.org/en/download ir po to per komandine eilute pasirinke ta pati folderi i kuri atlikot 4. punkta parasykit:
$ ``npm install npm -global``
$ ``npm init``
$ ``npm install express`` (ir tada tam folderi turetu atsirast folder'is: "node_modules")
galutinis variantas atrodo taip:
![image](https://github.com/MatasSioma/BarakoSkoniai/assets/55746081/1b6b8f8c-469a-4737-8e4f-47bcded79ad4)

Tada pasibandymui: $ ``node app.js`` ir browseri http://localhost:3000/, ir turit matyti puslapi su "Hello Word!"
Visam sitam reikalui dar paziurekit video: https://www.youtube.com/watch?v=huc9RWb0yX4

6. Duomenu baze. Parsisiunskit "graphical user interface" kad nereiketu maltis komdinej eilutej: https://ftp.postgresql.org/pub/pgadmin/pgadmin4/v7.7/windows/pgadmin4-7.7-x64.exe (pgAdmin4)
7. prisijungti prie pacio serverio: tik atsidarius programa "add new server"
Name: BS.db (betkas)
hostname/address: 194.31.55.150
username: chefas
password: BarakoSkoniai1
Savepassword: ON
![image](https://github.com/MatasSioma/BarakoSkoniai/assets/55746081/792f4064-56ef-4738-afb4-14d3890a8b08)

Ir galesit daryt viska ka sirdis geidzia su duomenu baze...
