//On the Server
1. Change nodemon to node in package.json
2. Create a .Profile file

//CONTINOUS DEPLOYMENT IN NETLIFY
npm run build


//On the client
1. Change API Url to that of Heroku

//CONTONOUS DEPLYMENT IN HEROKU
$ git add .
$ git commit -am "make it better"
$ git push heroku master



//GENERAL GIT COMMANDS
//Initial commit
git remote add origin https://---

//Push codes to git (Frontend)
git push -u origin master

//Push code option 2 (Backend)
 git push -f origin master

//Push code to git (mobile)
git push -u origin main


//WHEN EVERTYTHING ELSE REFUSED TO WORK
git push origin master --force


//WABBIS WEBSITE
To deploy to production, 
1. I removed the PORT in .env file.
2. I manually added the env variables in Heroku dashboard. i.e (mongodb url & SECRET KEY)
3. I moved nodemon from dev depencies to dependencies.
4. Change the url of the api in the frontend (axios)  to that of heroku.



IOROT LICENSE
CDD6D-D0774-F23C0-7EB3N


//USER TEMPLATE
{
    "name": "Oni James",
    "email": "onijames4@gmail.com",
    "memberCategory": [ "staff" ],
    "yearOfGraduation": "",
    "userId": "",
    "title": "",
    "bio": "",
    "profilePicture": "",
    "currentLocation": "",
    "placeofWork": "",
    "designation": "",
    "affiliation": ""
  }