module("Tests without options");

test("Test if elements can be cloned", function() {
    $('#source0').mimic();
    ok($('#source1').length, "The initial element was cloned");
    ok($('#input1').length, "The input's ID was incremented");
    $('#source0').mimic();
    ok($('#source2').length, "A second element was cloned");
    $('#source0').mimic();
    ok($('#source3').length, "A third element was cloned");
    equal($('#qunit-fixture').children('div:last').attr('id'), "source1", "The initial clone is the last one");
});

module("Tests with options");

test("Test if elements can be cloned with a trigger", function() {
    $('#source0').mimic({ "trigger": "#clone_btn" });
    ok(!$('#source1').length, "No element has been cloned yet");
    ok($('#source0 [data-mimic-remove] a').is(':hidden'), "The remove link is hidden on the the source");
    $('#clone_btn').trigger('click');
    ok($('#source1').length, "An element was cloned");
    ok($('#source1 [data-mimic-remove] a').is(':visible'), "The remove link is shown on the the clone");
});

test("Test if elements can be cloned up to a limit of 3", function() {
    $('#source0').mimic({
        "trigger": "#clone_btn",
        "limit": 3
    });
    $('#clone_btn')
        .trigger('click')
        .trigger('click');
    ok($('#clone_btn').is(':hidden'), "The clone link is hidden after three clones");
    $('#source2 [data-mimic-remove] a').trigger('click');
    ok($('#clone_btn').is(':visible'), "The clone link is shown after a clone is removed");
});

test("Test if elements are renamed when there is a limit of 3", function() {
    $('#source0').mimic({
        "trigger": "#clone_btn",
        "limit": 3
    });
    $('#clone_btn')
        .trigger('click')
        .trigger('click');
    ok($('#source1').length, "div#source1 exists on initial clone");
    ok($('#source2').length, "div#source2 exists on initial clone");
    $('#source1 [data-mimic-remove] a').trigger('click');
    stop(); 
    //pause 
    setTimeout(function() {
       //Make assertion 
        ok($('#source1').length, "div#source1 exists after removing div#source1");
        ok(!$('#source2').length, "div#source2 doesn't exist after removing div#source1");
       // After the assertion called, restart the test
       start();
    }, 50);

});

test("Test removing a class on a clone", function() {
    $('#source0').mimic({
        "trigger": "#clone_btn",
        "removeClasses": ".monkey"
    });
    ok($('#source0 .monkey').length, "The source has a div with a 'monkey' class");
    $('#clone_btn').trigger('click');
    ok(!$('#source1 .monkey').length, "The clone doesn't have a 'monkey' class");
});

test("Test removing an element on a clone", function() {
    $('#source0').mimic({
        "trigger": "#clone_btn",
        "removeElements": "#horse"
    });
    ok($('#source0 #horse').length, "The source has div#horse");
    $('#clone_btn').trigger('click');
    ok(!$('#source1 #horse').length, "The clone doesn't have div#horse");
});

test("Test adding a clone before a trigger", function() {
    $('#source0').mimic({
        "trigger": "#clone_btn",
        "insertBeforeTrigger": true
    });
    $('#clone_btn')
        .trigger('click')
        .trigger('click');
    equal($('#qunit-fixture').children('div:last').attr('id'), "source2", "The last clone is #source2");
});

module("Test callbacks");

module("Test data attributes");