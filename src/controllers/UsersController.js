const fs = require("fs/promises");
const path = require("path");


module.exports = class UserController{
    
    static async UsersGet(req, res){
        let dbPath = path.join(__dirname, "..", "modules", "db.json");
        let dbFile = await fs.readFile(dbPath, "utf-8");
        let db = await JSON.parse(dbFile);

        let users = db.Users 
        res.status(200).json({
            ok: true,
            users

        })
    }

    static async UserPost(req, res){
        let dbPath = path.join(__dirname, "..", "modules", "db.json");
        let dbFile = await fs.readFile(dbPath, "utf-8");
        let db = await JSON.parse(dbFile);

        let { username, password } = req.body;

        let user = db.Users.find(el => el.username.toLowerCase() == username.toLowerCase());

        if(user){
            res.status(400).json({
                ok: false,
                message: "This username already exist!"
            })
            return
        }

        user = {
            id: db.Users.length + 1,
            username,
            password
        }

        db.Users.push(user);

        await fs.writeFile(dbPath, JSON.stringify(db));

        res.status(201).json({
            ok: true,
            user
        })
        
    }
}