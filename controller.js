const colors = require('colors');
const fs = require('fs');
const path = require('path');
const _ = require('lodash');

function getFiles(req, res, dir) {
  let currentDir = dir;
  const query = req.query.path || '';
  const up = req.query.up;

  if (query) {
    currentDir = path.join(dir, query);
  }

  if (up) {
    currentDir = query;
  }

  console.log('Browsing: '.green, currentDir.cyan);
  
  fs.readdir(currentDir, function (err, files) {
    if (err) {
      throw err;
    }

    let data = [];

    files.filter(function (file) {
      return true;
    })
    .forEach(function (file) {
      try {
        data.push({ 
          name: file,
          isDirectory: fs.statSync(path.join(currentDir, file)).isDirectory(), 
          path: path.join(query, file),
          ext: path.extname(file)
        });
      }
      catch(e) {
        console.log('Error: ' + e);
      }

    });
    data = _.sortBy(data, function(f) { return f.Name; });
    data.push(currentDir);
    res.json(data);
  });
}

module.exports.getFiles = getFiles;