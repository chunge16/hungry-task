const http = require('http')
const path = require('path')
const fs = require('fs')
const url = require('url')

let routes = {
  '/a': function(req, res){
    res.end(JSON.stringify(req.query))
  },

  '/b': function(req, res){
    res.end('match /b')
  },

  '/a/c': function(req, res){
    res.end('match /a/c')
  },

  '/search': function(req, res){
    let data = {
      username: req.body.username,
      password: req.body.password
    }
    res.write(JSON.stringify(data))
    res.end()
  }
}

function staticRoot(staticPath, req, res) {
  let pathObj = url.parse(req.url, true)

  if (pathObj.pathname === '/') {
    pathObj.pathname += 'index.html'
  }

  let filePath = path.join(staticPath, pathObj.pathname)
  console.log('filePath ', filePath)

  fs.readFile(filePath, 'binary', function(err, fileContent){
    if(err){
      console.log('404')
      res.writeHead(404, 'not found')
      let filePath = path.join(staticPath, '404.html')
      const error = fs.readFileSync(filePath, 'utf-8')
      res.end(error)
    }else{
      console.log('ok')
      res.writeHead(200, 'OK')
      res.write(fileContent, 'binary')
      res.end()
    }
  })

}

function routePath(req, res){
  let pathObj = url.parse(req.url, true)
  let handleFn = routes[pathObj.pathname]
  if(handleFn){
    req.query = pathObj.query
    // post json 解析
    let body = []
    req.on('data', function(chunk){
      body.push(chunk);
    }).on('end', function(){
      body = Buffer.concat(body).toString()
      req.body = parseBody(body)
      handleFn(req, res)
    })
  }else {
    staticRoot(path.resolve(__dirname, 'sample'), req, res)
  }
}

function parseBody(body){
  let obj = {}
  body.split('&').forEach(function(str){
    obj[str.split('=')[0]] = str.split('=')[1]
  })
  return obj
}

const server = http.createServer(function(req, res){
  routePath(req, res)
})
console.log('open http://localhost:9000')
server.listen(9000)

