# Mimic
Mimic is a jQuery plugin to replicate markup.

## Usage

### Via Javascript
Replicate markup with id `myClone0` with a single line of Javascript.

    $('#myClone0').mimic(options);


### Via data attributes
Activate a clone without writing Javascript. Set `data-clone="true"` on the
source element. You can also specify options as data attributes.

    <div id="myClone0" data-clone="true" data-trigger="#cloneBtn">...</div>

###Options

Options can be passed via data attributes or JavaScript. For data attributes,
append the option name to data-, as in `data-limit="3"`.

*   `trigger` If a trigger string is provided, the clone event will be delegated
to this element.

*   `limit` Limits the amount of clones that can be shown. This number includes
the source element.

*   `removeElements` Specify selecters of elements that should be removed when
replicated. The data attribute should be specified like so:
`data-remove-elements="#myElement"`.

*   `removeClasses` Specify CSS classes that should be removed when replicated.
Be sure to add the dot before the class name, like so:
`data-remove-classes=".my-class"`.

*   `insertBeforeTrigger` This option will place the clone before the trigger.
By default the clone is place after the source. The data attribute should be
specified like so: `data-insert-before-trigger="true"`.

### HTML Attributes

*   `id="myClone0"` The source element needs to have an ID with a zero index.
The subsequent clones would be myClone1, myClone2, etc.

*   `class="mimic-ignore"` Add this class to a input element and the value of
that element will not be cleared when cloned.

### Methods

##### .mimic(options)

Activates your element to be cloned. Accepts an optional options `object`

    $('#myClone').mimic({
        trigger: "#myCloneBtn"
    })

##### .mimic('init')

Manually initializes a clone. Updates indexes of elements with an ID or existing
clones and shows or hides trigger if used.

    $('#myClone0').mimic('init')

##### .mimic('replicate')

Manually clones an element.

    $('#myClone0').mimic('replicate')

This is equivalent to:

    $('#myClone0').mimic()

##### .mimic('remove')

Manually removes a clone. Note that we call this method on the 'remove' link.

    $('#myClone1 [data-mimic-remove] a').mimic('remove')

### Events

The mimic class exposes a few events for hooking into cloning functionality.

*   `initialized` This event is fired after the `init` method is called.

*   `cloned` This event is fired after an element has been cloned. The cloned
element's ID and new index are passed as parameters.

*   `removed` This event is fired after an clone has been removed. The clone's
ID is passed as a parameter.

```
$('$myClone0').on('cloned', function (e, element_id, index) {
    // do something
})
```

