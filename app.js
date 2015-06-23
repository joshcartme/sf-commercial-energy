
function zipcode(zip, na2010, noncompliance2010, compliance2010, na2011, noncompliance2011, compliance2011, na2012, noncompliance2012, compliance2012, na2013, noncompliance2013, compliance2013, na2014, noncompliance2014, compliance2014, total){
    this.zipcode = zip;
    this.na2010 = na2010;
    this.noncompliance2010 = noncompliance2010;
    this.compliance2010 = compliance2010;
    this.na2011 = na2011;
    this.noncompliance2011 = noncompliance2011;
    this.compliance2011 = compliance2011;
    this.na2012 = na2012;
    this.noncompliance2012 = noncompliance2012;
    this.compliance2012 = compliance2012;
    this.na2013 = na2013;
    this.noncompliance2013 = noncompliance2013;
    this.compliance2013 = compliance2013;
    this.na2014 = na2014;
    this.noncompliance2014 = noncompliance2014;
    this.compliance2014 = compliance2014;
    this.total = total;
};

zipcode.prototype.complianceEnd = function(year){
    return (this['compliance' + year] / this.total * 100) || 1
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
                        'noncompliance2010': (compliance2010 === 'Did Not Comply' ? 1 : 0),
                        'na2010': (compliance2010 === 'N/A' ? 1 : 0),
                        'compliance2011': (compliance2011 === 'Complied' ? 1 : 0),
                        'noncompliance2011': (compliance2011 === 'Did Not Comply' ? 1 : 0),
                        'na2011': (compliance2011 === 'N/A' ? 1 : 0),
                        'compliance2012': (compliance2012 === 'Complied' ? 1 : 0),
                        'noncompliance2012': (compliance2012 === 'Did Not Comply' ? 1 : 0),
                        'na2012': (compliance2012 === 'N/A' ? 1 : 0),
                        'compliance2013': (compliance2013 === 'Complied' ? 1 : 0),
                        'noncompliance2013': (compliance2013 === 'Did Not Comply' ? 1 : 0),
                        'na2013': (compliance2013 === 'N/A' ? 1 : 0),
                        'compliance2014': (compliance2014 === 'Complied' ? 1 : 0),
                        'noncompliance2014': (compliance2014 === 'Did Not Comply' ? 1 : 0),
                        'na2014': (compliance2014 === 'N/A' ? 1 : 0),
                        'total': 1
                    }
                } else {
                    _this.zipcodes[zipcode].compliance2010 += (compliance2010 === 'Complied' ? 1 : 0);
                    _this.zipcodes[zipcode].noncompliance2010 += (compliance2010 === 'Did Not Comply' ? 1 : 0);
                    _this.zipcodes[zipcode].na2010 += (compliance2010 === 'N/A' ? 1 : 0);
                    _this.zipcodes[zipcode].compliance2011 += (compliance2011 === 'Complied' ? 1 : 0);
                    _this.zipcodes[zipcode].noncompliance2011 += (compliance2011 === 'Did Not Comply' ? 1 : 0);
                    _this.zipcodes[zipcode].na2011 += (compliance2011 === 'N/A' ? 1 : 0);
                    _this.zipcodes[zipcode].compliance2012 += (compliance2012 === 'Complied' ? 1 : 0);
                    _this.zipcodes[zipcode].noncompliance2012 += (compliance2012 === 'Did Not Comply' ? 1 : 0);
                    _this.zipcodes[zipcode].na2012 += (compliance2012 === 'N/A' ? 1 : 0);
                    _this.zipcodes[zipcode].compliance2013 += (compliance2013 === 'Complied' ? 1 : 0);
                    _this.zipcodes[zipcode].noncompliance2013 += (compliance2013 === 'Did Not Comply' ? 1 : 0);
                    _this.zipcodes[zipcode].na2013 += (compliance2013 === 'N/A' ? 1 : 0);
                    _this.zipcodes[zipcode].compliance2014 += (compliance2014 === 'Complied' ? 1 : 0);
                    _this.zipcodes[zipcode].noncompliance2014 += (compliance2014 === 'Did Not Comply' ? 1 : 0);
                    _this.zipcodes[zipcode].na2014 += (compliance2014 === 'N/A' ? 1 : 0);
                    _this.zipcodes[zipcode].total += 1;

                }
            });
            var zipcodesArr = [];
            for (var zip in _this.zipcodes){
                zipcodesArr.push(
                    new zipcode(
                        zip,
                        _this.zipcodes[zip].na2010, _this.zipcodes[zip].noncompliance2010, _this.zipcodes[zip].compliance2010,
                        _this.zipcodes[zip].na2011, _this.zipcodes[zip].noncompliance2011, _this.zipcodes[zip].compliance2011,
                        _this.zipcodes[zip].na2012, _this.zipcodes[zip].noncompliance2012, _this.zipcodes[zip].compliance2012,
                        _this.zipcodes[zip].na2013, _this.zipcodes[zip].noncompliance2013, _this.zipcodes[zip].compliance2013,
                        _this.zipcodes[zip].na2014, _this.zipcodes[zip].noncompliance2014, _this.zipcodes[zip].compliance2014,
                        _this.zipcodes[zip].total
                    )
                );
            }
            zipcodesArr.sort(function(a, b){
                if(a.zipcode > b.zipcode){
                    return 1;
                } else if(a.zipcode < b.zipcode){
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
        setTimeout(function(){
            _this.ractive.set('loading', false);
        }, 1000);
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
