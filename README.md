## bahn-kursbuch
This NodeJS module is an API for http://kursbuch.bahn.de/hafas/kbview.exe.

## Code Example

```javascript
const kurbsbuch = require('bahn-kursbuch');

//Lookup KBS 360 entry
kurbsbuch.tableLookup("360").then(function(res) {
  console.log(res);
});

//Lookup every Kursbuch entry at "Osnabrück HBF" over "Halen"
kurbsbuch.stationLookup("008000294","","Halen").then(function(res) {
  console.log(res);
});

//Lookup every Kursbuch entry for "NWB" trains at "Osnabrück HBF"
kurbsbuch.stationLookup("008000294","","","NWB").then(function(res) {
  console.log(res);
});

//Lookup every Kursbuch entry for line "NWB 18" at "Osnabrück HBF"
kurbsbuch.stationLookup("008000294","NWB 18").then(function(res) {
  console.log(res);
});

//Lookup Kursbuch entries for train "NWB82300"
kurbsbuch.trainLookup("NWB82300").then(function(res) {
  console.log(res);
});
```

"008000294" gives the same results as "Osnabrück HBF", the ID's can be obtained for example with [db-hafas](https://github.com/derhuerst/db-hafas) (Could also be implemented through Kursbuch, maybe later).

## Installation

```bash
npm install bahn-kursbuch
```
