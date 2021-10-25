
const express = require('express');
const app = express();
const bodyParser = require('body-parser')
const MongoClient = require('mongodb').MongoClient
const fs = require('fs');
const path = require('path');
const ObjectId = require('mongodb').ObjectID




const multer = require('multer');

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, 'uploads')
  },
  filename: (req, file, cb) => {
    cb(null, file.fieldname + '-' + Date.now())
  }
});

const upload = multer({ storage: storage });

MongoClient.connect('mongodb+srv://troi:Troiana123@cluster0.lyfc9.mongodb.net/image-post?retryWrites=true&w=majority', { useUnifiedTopology: true })
  .then(client => {
    console.log('Connected to Database')
    const db = client.db('quote-tracker')
    console.log(db)
    const quotesCollection = db.collection('quotes')

    app.set('view engine', 'ejs')

    app.use(bodyParser.urlencoded({ extended: true }))
    app.use(bodyParser.json())
    app.use(express.static('public'))
    app.listen(4000, function () {
      console.log('listening on 3000')
    })

    var port = process.env.PORT || '4001'
    app.listen(port, err => {
      if (err)
        throw err
      console.log('Server listening on port', port)
    })
    app.post('/quotes', (req, res) => {
      quotesCollection.insertOne({ name: req.body.name, quote: req.body.quote })
        .then(result => {
          res.redirect('/')
        })
        .catch(error => console.error(error))
    })

    app.get('/', (req, res) => {
      db.collection('quotes').find().toArray()
        .then(results => {
          res.render('index.ejs', { quotes: results })
        })
        .catch(console.error)
    })

    // app.get('/liked', (req, res) => {
    //   db.collection('quotes').find({ color: "6b9bd0" }).toArray()
    //     .then(results => {
    //       res.render('index.ejs', { quotes: results })
    //     })
    //     .catch(console.error)
    // })

    // app.get('/authorSearch', (req, res) => {
    //   db.collection('quotes').find({ "name": { $regex: req.query.name, $options: "i" } }).toArray()
    //     .then(results => {
    //       res.render('index.ejs', { quotes: results })
    //     })
    //     .catch(console.error)
    // })


    // app.put('/quotes', (req, res) => {
    //   quotesCollection.findOneAndUpdate({ name: req.body.name, quote: req.body.quote, color: "000" },
    //     {
    //       $set: {
    //         name: req.body.name,
    //         quote: req.body.quote
    //       }
    //     },
    //     {
    //       upsert: true
    //     }
    //   )
    //     .then(result => {
    //       res.json('Success')
    //     })
    //     .catch(error => console.error(error))
    // })

    // app.put('/color', (req, res) => {
    //   db.collection('quotes')
    //     .findOneAndUpdate({ quote: req.body.quote, name: req.body.name },
    //       {
    //         $set: {
    //           'color': "6b9bd0"
    //         }
    //       }, {
    //       sort: { _id: -1 },
    //       upsert: true
    //     }, (err, result) => {
    //       if (err) return res.send(err)
    //       res.send(result)
    //     })
    // })

    app.post('/imageUpload', upload.single('image'), (req, res, next) => {
      console.log('starting image upload')
      var obj = {
        name: req.body.name,
        desc: req.body.desc,
        img: {
          data: fs.readFileSync(path.join(__dirname + '/uploads/' + req.file.filename)),
          contentType: 'image/png'
        }
      }
      console.log(obj)
      db.collection('quotes').insertOne(obj)
        .then(result => {
          res.redirect('/')
        })
        .catch(error => console.error(error))
      
    });


    app.delete('/quotes', (req, res) => {
      db.collection('quotes').findOneAndDelete({ _id: ObjectId(req.body.id)}, (err, result) => {
    
    
        if (err) return res.send(500, err)
        res.send('Message deleted!')
      })
    })
  });




  
  





// body parser should be placed before your handlers










