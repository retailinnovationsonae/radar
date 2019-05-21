// to run: start a powershell command line on root folder of this file, and then:
// node scrape_highlights.js

var fs = require('fs');
var json2csv = require('json2csv').Parser;
var request = require('request');
var cheerio = require('cheerio');
const chalk = require('chalk');
const utf8 = require('utf8');
var windows1252 = require('windows-1252');
var iconv = require('iconv-lite');
const fixUtf8 = require('fix-utf8')
const csvparser = require('csv-parser');

var sitelist = [];
var metalist = [];

fs.createReadStream('../server/_URLs_to_scrape.csv')
.pipe(csvparser())
.on('data', function(data){
    try {
        sitelist.push(data.main_link)
        // for(var i=0, len=data.length; i<len; i++) {
        //   console.log(data.length); //Will print every csv line as a newline
        // }
    }
    catch(err) {
        //error handler
    }
})
.on('end',function(){
    sitelist = sitelist.filter(function (el) {
      return el != null;
    });
    (async function(){
        let json = await crawl(function (result) {
            global.test=result;
            // console.log(result);
        });
    })();
});  

function crawl(callback) {

// fs.readFile('../data/_URLs_to_scrape.csv', 'utf8', function readFileCallback(err, data){
//     if (err){
//         console.log(err);
//     } else {
//     obj = JSON.parse(data); //now it an object
//     obj.table.push({id: 2, square:3}); //add some data
//     json = JSON.stringify(obj); //convert it back to json
//     fs.writeFile('myjsonfile.json', json, 'utf8', callback); // write it back 
// }});

    progress = sitelist.length;
    for (site in sitelist) {
        // var url = 'http://www.thprd.org/activities/schedules/aquatic-fitness-water-fitness-class?cs_id=' + pools[pool];
        var url = sitelist[site];

        request(url, (function(site) { return function(err, resp, body) {
            if (body) {
                console.log(site,"|",chalk.green(sitelist[site]));
                $ = cheerio.load(body);
                // DEFINE METADATA FIELDS
                titleobj = $('meta[property="og:title" i]').eq(0).attr('content');
                console.log("(1) Title | ",titleobj);
                if (!titleobj) {titleobj = $("title").text().trim().replace(/\s\s+/g, ',').split(',')[0]; console.log("(2) Title | ",titleobj);}
                descobj = $('meta[property="og:description" i]').eq(0).attr('content');
                if (!descobj) {descobj = $("meta[name='description' i]").eq(0).attr("content");}
                imgobj = $('meta[property="og:image" i]').attr('content');
                if (imgobj) {console.log("Image | ",imgobj)}

                // BUILD METADATA LIST
                metalist[site]={};
                if (sitelist[site]) (metalist[site].url=sitelist[site]);
                if (titleobj) (metalist[site].title=titleobj);
                if (descobj) (metalist[site].description=descobj);
                if (imgobj) (metalist[site].image=imgobj);
            } else {console.log("html body was empty")}


            progress--;
            if (progress===0) {
                // console.log(metalist);
                json = JSON.stringify(metalist,null,2);
                fs.writeFile('./data/metadataFromURLs.json', json, 'utf8', (err) => {  
                    if (err) throw err;
                    console.log('Metadata written to file');
                });
                 
                const fields = [];
                try {
                    // console.log(metalist)
                    // console.log("-------------------LOLOLOLOL-----------------")
                    const parser = new json2csv(fields);
                    // var csv = windows1252.encode(parser.parse(metalist));
                    var csv = parser.parse(metalist);
                    // csv = iconv.decode(csv, 'win1252');
                    // csv = iconv.encode(csv, 'ISO-8859-1');
                    csv=fixUtf8(csv);
                    csv = iconv.encode(csv, 'win1252');
                    // console.log(csv)
                    fs.writeFile('_scrapedURLs.csv', csv, 'latin1', (err) => {  
                        if (err) throw err;
                        console.log('CSV written to file');
                    });
                } catch (err) {
                  console.error(err);
                }
            };

            // console.log($("title").text().trim().replace(/\s\s+/g, ',').split(','));
            // console.log($("meta[name='description' i]").eq(0).attr("content"));

            // console.log($('meta[property="og:url"]').eq(0).attr('content'));
            // console.log($('meta[property="og:locale" i]').eq(0).attr('content'));
            // console.log($('meta[property="og:locale:alternate" i]').eq(0).attr('content'));
            // console.log($('meta[property="og:title" i]').eq(0).attr('content'));
            // console.log($('meta[property="og:type" i]').eq(0).attr('content'));
            // console.log($('meta[property="og:description" i]').eq(0).attr('content'));
            // console.log($('meta[property="og:determiner" i]').eq(0).attr('content'));
            // console.log($('meta[property="og:site_name" i]').eq(0).attr('content'));
            // console.log($('meta[property="og:image" i]').attr('content'));
            // console.log(metalist[sitelist[site]].title);
            console.log(chalk.red("------------------------------------------------------"));
            callback(metalist);
            // console.log($("meta[name='Viewport' i]").attr("content"));
            // console.log($("meta[name='Viewport' i]").attr("content"));
        }})(site));
    }
};

// crawl(function (result) {
//     global.test=result;
// });

// Start an IIFE to use `await` at the top level
(async function(){
    let json = await crawl(function (result) {
        global.test=result;
        // console.log(result);
    });
})();