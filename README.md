## bahn-kursbuch
This NodeJS module is an API for http://kursbuch.bahn.de/hafas/kbview.exe.

## Code Example

```javascript
const kursbuch = require('bahn-kursbuch');

//Lookup KBS 360 entry
kursbuch.tableLookup("360").then(function(res) {
  console.log(res);
});

//Lookup every Kursbuch entry at "Osnabrück HBF" over "Halen"
kursbuch.stationLookup("008000294","","Halen").then(function(res) {
  console.log(res);
});

//Lookup every Kursbuch entry for "NWB" trains at "Osnabrück HBF"
kursbuch.stationLookup("008000294","","","NWB").then(function(res) {
  console.log(res);
});

//Lookup every Kursbuch entry for line "NWB 18" at "Osnabrück HBF"
kursbuch.stationLookup("008000294","NWB 18").then(function(res) {
  console.log(res);
});

//Lookup Kursbuch entries for train "NWB82300"
kursbuch.trainLookup("NWB82300").then(function(res) {
  console.log(res);
});
```

"008000294" gives the same results as "Osnabrück HBF", the ID's can be obtained for example with [db-hafas](https://github.com/derhuerst/db-hafas) (Could also be implemented through Kursbuch, maybe later).

## Output format example
```javascript
kursbuch.trainLookup("NWB82300").then(function(res) {
  console.log(res);
});
```
Returns:
```
[ { doc: 'http://kursbuch.bahn.de/hafas/kbview.exe/dn/KB392_Mo_Fr_H_Mo_Fr_G24112017.pdf?filename=KB392_Mo_Fr_H_Mo_Fr_G24112017.pdf&orig=',
    kbs: '392',
    line: 'NWB 18',
    route: 'Wilhelmshaven - Oldenburg - Cloppenburg - Osnabrück',
    date: '24.11.2017' } ]
```
## Installation

```bash
npm install bahn-kursbuch
```
