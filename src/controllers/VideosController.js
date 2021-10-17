const path = require("path");
const fs = require("fs/promises");
const slugify = require("slugify");


module.exports = class VideosController{
    static async VideosGet(req, res){
        let dbPath = path.join(__dirname, "..", "modules", "db.json");
        let dbFile = await fs.readFile(dbPath, "utf-8");
        let db = await JSON.parse(dbFile);

        res.status(200).json({
            ok: true,
            videos: db.Videos
        })
    }

    static async VideoPost(req, res){
        let dbPath = path.join(__dirname, "..", "modules", "db.json");
        let dbFile = await fs.readFile(dbPath, "utf-8");
        let db = await JSON.parse(dbFile);

        let slug = slugify(req.body.title, { remove: /[*+~.()'"!:@]/g, lower: true});
       
        let {title, description, view} = req.body
        let video = db.Videos.find(el => el.slug === slug);

        if(video){
            res.status(400).json({
                ok: false,
                message: " This video title already exist!"
            })
            return
        }

        video = {
            id: db.Videos.length + 1,
            title,
            description,
            view,
            slug
        }

        db.Videos.push(video);

        await fs.writeFile(dbPath, JSON.stringify(db));

        res.status(201).json({
            ok: true,
            message: "Created",
            video
        })
    }

    static async VideoPatch(req,res){
        let dbPath = path.join(__dirname, "..", "modules", "db.json");
        let dbFile = await fs.readFile(dbPath, "utf-8");
        let db = await JSON.parse(dbFile);

        let slug = req.params.slug;
       
        let {title, description, view} = req.body

        let video = db.Videos.find(el => el.slug === slug);

        if(!video){
            res.status(400).json({
                ok: false,
                message: " Invalid video"
            })
            return
        }

        video = {...video, ...req.body };

        let videoIndex = db.Videos.findIndex(el => el.slug === video.slug);

        if(req.body.title){
            video.slug = slugify(req.body.title, {remove: /[*+~.()'"!:@]/g, lower: true})
        }

        db.Videos[videoIndex] = video;

        await fs.writeFile(dbPath, JSON.stringify(db));

        res.status(200).json({
            ok: true,
            message: "Updated",
            video
        })
    }  

    static async VideoGet(req, res){
        let dbPath = path.join(__dirname, "..", "modules", "db.json");
        let dbFile = await fs.readFile(dbPath, "utf-8");
        let db = await JSON.parse(dbFile);

        const {slug} = req.params;


        let video = db.Videos.find(el => el.slug === slug);

        if(!video){
            res.status(400).json({
                ok: false,
                message: "Invalid video",
            })
            return
        }

        res.status(200).json({
            ok: true,
            message: "video are found",
            video
        })
    }

    static async VideoDel(req, res){
        let dbPath = path.join(__dirname, "..","modules", "db.json");
        let dbFile = await fs.readFile(dbPath, "utf-8");
        let db = await JSON.parse(dbFile);


        let video = db.Videos.find(el => el.slug === req.params.slug);

        if(!video){
            res.status(400).json({
                ok: false,
                message: "Video not found"
            })
            return
        }

        let videoIndex = db.Videos.findIndex(el => el.slug == video.slug);

        db.Videos.splice(videoIndex, 1);

        await fs.writeFile(dbPath, JSON.stringify(db));

        res.status(200).json({
            ok: true,
            message: "Deleted"
        })
    }
    
    
}