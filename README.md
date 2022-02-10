# Getting Started



## Prerequisites
- Node JS
- Mongo DB

## Steps to start the application
1. Clone the repo
```bash
git clone https://github.com/sourabh14/codeial.git
```
2. Install express, ejs and mongoose
```bash
cd task-master/
npm install express
npm install ejs
npm install mongoose
```
3. Start Mongo DB server
```bash
sudo systemctl start mongod
sudo systemctl status mongod
```
4. Start Node web server
```bash
node index.js
```
5. The app will be running at http://localhost:8000/