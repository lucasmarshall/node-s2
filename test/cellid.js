var test = require('tap').test,
    s2 = require('../');

test('S2CellId', function(t) {

    t.test('basic constructor', function(t) {
        var cell = new s2.S2CellId();
        t.ok(cell, 'generates cellid object');
        t.ok(cell.level(), 'level');
        t.equal(cell.toToken(), 'X', 'toToken');
        t.equal(cell.toString(), "Invalid: 0000000000000000", 'toString');
        t.ok(cell.toPoint() instanceof s2.S2Point, 'toPoint');
        t.ok(cell.parent() instanceof s2.S2CellId, 'parent');
        t.ok(cell.prev() instanceof s2.S2CellId, 'prev');
        t.ok(cell.next() instanceof s2.S2CellId, 'next');
        t.ok(cell.rangeMin() instanceof s2.S2CellId, 'rangeMin');
        t.ok(cell.rangeMax() instanceof s2.S2CellId, 'rangeMax');
        t.ok(cell.child(0) instanceof s2.S2CellId, 'rangeMax');
        t.equal(cell.isFace(), true, 'isFace');
        t.equal((new s2.S2LatLng(cell.toPoint())).toString(), '-35.264390,-45.000000');
        t.end();
    });

    t.test('latlng constructor', function(t) {
        var fromlat = new s2.S2CellId(new s2.S2LatLng(40, 20));
        t.ok(fromlat, 'generates cellid object from latlng');
        t.equal((new s2.S2LatLng(fromlat.toPoint())).toString(), '40.000000,20.000000', 'gets values');
        t.equal(typeof fromlat.id(), 'number', '.id');
        t.equal(Math.round(fromlat.toLatLng().lng()), 20, '.toLatLng');
        t.equal(Math.round(fromlat.toLatLng().lat()), 40, '.toLatLng');
        t.equal(fromlat.level(), 30);
        t.equal(fromlat.toString(), '0/212231203032221333101101033102');
        t.equal(fromlat.parent().level(), 29);
        t.equal(fromlat.parent().toString(), '0/21223120303222133310110103310');
        t.equal(fromlat.parent(10).level(), 10);
        t.end();
    });

    t.test('point constructor', function(t) {
        var frompoint = new s2.S2CellId(new s2.S2LatLng(40, 20).toPoint());
        t.ok(frompoint, 'generates cellid object from point');
        t.equal((new s2.S2LatLng(frompoint.toPoint())).toString(), '40.000000,20.000000', 'gets values');
        t.end();
    });

    t.test('string constructor', function(t) {
        var frompoint = new s2.S2CellId(new s2.S2LatLng(40, 20).toPoint());
        t.ok(frompoint);
        t.equal(frompoint.id().toString(), '1394736912195528700');
        var fromid = new s2.S2CellId(frompoint.id().toString());
        t.equal(fromid.id().toString(), '1394736912195528700');
        t.end();
    });

    t.test('token constructor', function(t) {
        var frompoint = new s2.S2CellId(new s2.S2LatLng(40, 20).toPoint());
        t.ok(frompoint);
        t.equal(frompoint.toToken(), '135b19d4fe8a27a5');
        t.equal((new s2.S2CellId()).fromToken(frompoint.toToken()).toToken(), '135b19d4fe8a27a5');
        t.end();
    });

    t.test('contains', function(t) {
        var childcell = new s2.S2CellId(new s2.S2LatLng(40, 20));
        t.ok(childcell);
        var parentcell = childcell.parent();
        var grandparentcell = parentcell.parent();
        t.ok(parentcell.contains(childcell), 'parent contains child');
        t.ok(grandparentcell.contains(childcell), 'grandparent contains child');
        t.ok(grandparentcell.contains(parentcell), 'grandparent contains parent');
        t.notOk(childcell.contains(parentcell), 'child does not contain parent');
        t.notOk(childcell.contains(grandparentcell), 'child does not contain grandparent');
        t.notOk(parentcell.contains(grandparentcell), 'parent does not contain grandparent');
        t.end();
    });

    t.end();
});
