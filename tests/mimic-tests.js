module("Tests without options");

test("Test if elements can be cloned", function() {
    $('#source0').mimic();
    ok($('#source1').length, "The initial element was cloned");
    ok($('#input1').length, "The input's ID was incremented");
    $('#source0').mimic();
    ok($('#source2').length, "A second element was cloned");
    $('#source0').mimic();
    ok($('#source3').length, "A third element was cloned");
    equal($('#clone_btn').prev('div').attr('id'), "source1", "The initial clone is the last one");
});

test("Test that the inputs are being cleared", function () {
    ok($('#source0 .goat').val(), "The source0 goat input is 1 on load");
    ok($('#source0 .dolphin').val(), "The source0 dolphin input is 1 on load");
    $('#source0').mimic();
    ok(!$('#source1 .goat').val(), "The source1 goat input is empty after becoming a clone");
    ok($('#source1 .dolphin').val(), "The source1 dolphin input is 1 (ignored) after becoming a clone");
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
    ok($('#source1').length, "div#source1 exists after removing div#source1");
    ok(!$('#source2').length, "div#source2 doesn't exist after removing div#source1");
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
    equal($('#clone_btn').prev('div').attr('id'), "source2", "The last clone is #source2");
});

module("Test callbacks");

test("Test callbacks", function () {
    var init = 0,
        cloned = 0,
        cloned_element,
        cloned_index;
    $('#source0').on('initialized', function () {
        init = 1;
    });
    $('#source0').on('cloned', function (e, el, index) {
        cloned = 1;
        cloned_element = el;
        cloned_index = index;
    });
    $('#source0').mimic('init');
    ok (init, "The initialized event has been raised");
    $('#source0').mimic();
    ok (cloned, "The cloned event has been raised");
    equal(cloned_element, "#source1", "The cloned element's ID is #source1");
    ok (cloned_index, "The cloned index is 1");
});

module("Test data attributes");

test("Test when options are added with data attributes", function () {
    $('#source_w_data0').mimic('init');
    $('#clone_w_data_btn')
        .trigger('click')
        .trigger('click');
    ok($('#clone_w_data_btn').is(':hidden'), "The clone link is hidden after three clones");
    ok(!$('#source_w_data1 .monkey').length, "The clone doesn't have a 'monkey' class");
    ok(!$('#source_w_data1 #alligator').length, "The clone doesn't have div#alligator");
    equal($('#clone_w_data_btn').prev('div').attr('id'), "source_w_data2", "The last clone is #source_w_data2");
});

module("Test for existing clones");

test("Test whether the existing clones are registered with the plugin", function () {
    $('#source_w_clones0').removeData('mimic').mimic('init');
    equal($('#source_w_clones0').data('mimic').clones.length, 3, "There are three elements initialized");
});
