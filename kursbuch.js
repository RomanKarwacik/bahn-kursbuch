const http = require('http');
const util = require('util');

//Unknown Parameters:
// &controlpattern=Q&orig=sT
// orig=sS&oblig_st=1

/*
var st_name = "Ganderkesee"; //Muss Eindeutig sein (Name oder ID), station mode
var st_filter = ""; //Muss Eindeutig sein (Name oder ID), station mode
var cat_name = "NWB"; //Typ des vehikels, station mode
var searchmode = "station"; //[station, tableplus, train]
var table_nr = ""; //tableplus mode
var line_nr = ""; //station mode
var train_nr = ""; //train mode
*/

var baseurl = "http://kursbuch.bahn.de/hafas/kbview.exe/dn";

function stationLookup (st_name, line_nr="", st_filter="", cat_name="") {
	return makeRequest("station",st_name,"",line_nr,"",st_filter,cat_name,"");
}

function tableLookup (table_nr) {
	return makeRequest("tableplus","",table_nr,"","","","","");
}

function trainLookup (train_nr) {
	return makeRequest("train","","","",train_nr,"","","");
}

function makeRequest (searchmode="station", st_name="", table_nr="", line_nr="", train_nr="", st_filter="", cat_name="", opt_args="") {
	//sanity checking
	if ((searchmode == "station") && (st_name != "" || line_nr != "")) {
		throw new Error('In station mode you have to provide a station name or a line number!');
	}
	if ((searchmode == "tableplus") && (table_nr == "")) {
		throw new Error('In table lookup mode you have to provide a table number!');
	}
	if ((searchmode == "train") && (train_nr == "")) {
		throw new Error('In train lookup mode you have to provide a train number!');
	}
	var request = baseurl + "?st_name=" + st_name + "&line_nr=" + line_nr + "&table_nr=" + table_nr + "&st_filter=" + st_filter + "&cat_name=" + cat_name + "&searchmode="+ searchmode+ "&mainframe=result&dosearch=1&oblig_st=1" + opt_args;
	var response;
	//getting data
	return new Promise(function(resolve, reject) {
		http.get(request, (resp) => {
			resp.setEncoding('utf8');
			var body;
			resp.on('data', function(chunk) {
				body += chunk;
			});
			resp.on('end', function() {
				//console.log(response);
				response = body.substring(body.indexOf("Stand"),body.indexOf("nach oben"));
				
				//parsing
				var linksregex = /^<a href=\n"[\s\S]*?"/gm;
				var kbsregex = /target="_blank">[0-9.,]*?</gm;
				var lineregex = /50px">[\s\S]*?</gm;
				var strregex = /500px">[\s\S]*?</gm;
				var standregex = /30px">[\s\S]*?</gm;
				var links = response.match(linksregex);
				var kbs = response.match(kbsregex);
				var lines = response.match(lineregex);
				var str = response.match(strregex);
				var stand = response.match(standregex);

				if (links == null || kbs == null || lines == null || str == null || stand == null) {
					reject('RegEx failed, probably the site changed!');
				}

				var res = [];
				for (var i = 0; i < links.length; i++) {
					res.push({	"doc" : links[i].substring("<a href=\n\"".length,links[i].length-1),
								"kbs" : kbs[i].substring("target=\"_blank\">".length,kbs[i].length-1),
								"line" : lines[i].substring("px>\"\n\n>".length,lines[i].length-2).replace("\n",""),
								"route" : decodeHTML(str[i].substring("\npx>\"\n\n>".length,str[i].length-2)),
								"date" : stand[i].substring("px>\"\n\n>".length,stand[i].length-2)
					});
				}
				resolve(res);
			});
		});
	});
}

function decodeHTML (str) {
	return str.replace(/&#(\d+);/g, function(match, dec) {
		return String.fromCharCode(dec);
	});
}

module.exports = { stationLookup, tableLookup, trainLookup, makeRequest };


function test () {
	tableLookup("360").then(function(res) {
		console.log(res);
	});
}