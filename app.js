
function zipcode(){
    this.zipcode = '';
    this.compliance = {
        'compliedCount': 0,
        'unCompliedCount': 0,
        'other': 0
    };
};

function energyViz(){
    this.zipcodes = {};
    this.ractive = new Ractive({
        el: '#drawing',
        template: '#list-item',
        data: {
            'zipcodes': [],
            'loading': true
        }
    });
};

energyViz.prototype.loadData = function(url){
    var _this = this;
    
    // return the promise
    return fetch(url, {
        method: 'get'
    }).then(function(rsp) {
        return rsp.json().then(function(json){
            var zipcode;
            var compliance2010, compliance2011, compliance2012, compliance2013, compliance2014;
            json.data.forEach(function(row){
                zipcode = row[11];
                compliance2010 = row[16];
                compliance2011 = row[17];
                compliance2012 = row[18];
                compliance2013 = row[19];
                compliance2014 = row[20];
                if (_this.zipcodes[zipcode] == undefined){
                    _this.zipcodes[zipcode] = {
                        'compliance2010': (compliance2010 === 'Complied' ? 1 : 0),
                        'compliance2011': (compliance2011 === 'Complied' ? 1 : 0),
                        'compliance2012': (compliance2012 === 'Complied' ? 1 : 0),
                        'compliance2013': (compliance2013 === 'Complied' ? 1 : 0),
                        'compliance2014': (compliance2014 === 'Complied' ? 1 : 0),
                        'total': 1
                    }
                } else {
                    _this.zipcodes[zipcode].compliance2010 += (compliance2010 === 'Complied' ? 1 : 0);
                    _this.zipcodes[zipcode].compliance2011 += (compliance2011 === 'Complied' ? 1 : 0);
                    _this.zipcodes[zipcode].compliance2012 += (compliance2012 === 'Complied' ? 1 : 0);
                    _this.zipcodes[zipcode].compliance2013 += (compliance2013 === 'Complied' ? 1 : 0);
                    _this.zipcodes[zipcode].compliance2014 += (compliance2014 === 'Complied' ? 1 : 0);
                    _this.zipcodes[zipcode].total += 1;

                }
            });
            var zipcodesArr = [];
            for (var zip in _this.zipcodes){
                zipcodesArr.push({
                    'zipcode': zip,
                    'compliance2010': _this.zipcodes[zip].compliance2010,
                    'compliance2011': _this.zipcodes[zip].compliance2011,
                    'compliance2012': _this.zipcodes[zip].compliance2012,
                    'compliance2013': _this.zipcodes[zip].compliance2013,
                    'compliance2014': _this.zipcodes[zip].compliance2014,
                    'total': _this.zipcodes[zip].total
                })
            };
            zipcodesArr.sort(function(a, b){
                if(a > b){
                    return 1;
                } else if(a < b){
                    return -1;
                }
                return 0;
            });
            _this.zipcodes = zipcodesArr;
        });
    }).catch(function(err) {
        console.log(err);
    });
};

energyViz.prototype.go = function(){
    var _this = this;
    return this.loadData('./data.json').then(function(){
        _this.ractive.set('zipcodes', _this.zipcodes);
        _this.ractive.set('loading', false);
    });
};

var setup = function(){
    var viz = new energyViz();
    viz.go();
}

function ready(fn) {
    if (document.readyState != 'loading'){
        fn();
    } else {
        document.addEventListener('DOMContentLoaded', fn);
    }
};

ready(setup);
