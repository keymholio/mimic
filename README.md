# Mimic
Mimic is a jQuery plugin to replicate markup. 

## Usage

### Via Javascript
Replicate markup with id `myClone0` with a single line of Javascript. Note: Your source clones need to have an ID starting with a 0 index.

    $('#myClone0').mimic(options);


### Via data attributes
Activate a clone without writing Javascript. Set `data-clone="true"` on the source element. You can also specify options as data attributes.

    <div id="myClone0" data-clone="true" data-trigger="#cloneBtn">...</div>

###Options

Options can be passed via data attributes or JavaScript. For data attributes, append the option name to data-, as in `data-limit="3"`.

<table>
    <tr>
        <th>Name</th>
        <th>type</th>
        <th>default</th>
        <th>description</th>
    </tr>
    <tr>
        <td>trigger</td>
        <td>string</td>
        <td>false</td>
        <td>If a trigger is provided, the clone event will be delegated to this element. </td>
    </tr>
    <tr>
        <td>limit</td>
        <td>number</td>
        <td>false</td>
        <td>Limits the amount of clones that can be shown. This number includes the source element.</td>
    </tr>
    <tr>
        <td>removeElements</td>
        <td>string</td>
        <td>false</td>
        <td>Specify selecters of elements that should be removed when replicated. The data attribute should be specified like so: data-remove-elements="#myElement".</td>
    </tr>
    <tr>
        <td>removeClasses</td>
        <td>string</td>
        <td>false</td>
        <td>Specify CSS classes that should be removed when replicated. Be sure to add the dot before the class name, like so: data-remove-classes=".my-class".</td>
    </tr>
    <tr>
        <td>insertBeforeTrigger</td>
        <td>boolean</td>
        <td>false</td>
        <td>This option will place the clone before the trigger. By default the clone is place after the source. The data attribute should be specified like so: data-insert-before-trigger="true".</td>
    </tr>
</table>

### Methods

##### .mimic(options)

Activates your element to be cloned. Accepts an optional options `object`

    $('#myClone').mimic({
        trigger: "#myCloneBtn"
    })

##### .mimic('init')

Manually initializes a clone. Updates indexes of elements with an ID or existing clones and shows or hides trigger if used.

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

<table>
    <tr>
        <th>Event</th>
        <th>Parameters</th>
        <th>Description</th>
    </tr>
    <tr>
        <td>initialized</td>
        <td>none</td>
        <td>This event is fired after the `init` method is called.</td>
    </tr>
    <tr>
        <td>cloned</td>
        <td>element_id, index</td>
        <td>This event is fired after an element has been cloned. The cloned element's ID and new index are passed as parameters.</td>
    </tr>
    <tr>
        <td>removed</td>
        <td>element_id</td>
        <td>This event is fired after an clone has been removed. The clone's ID is passed as a parameter.</td>
    </tr>
</table>

    $('$myClone0').on('cloned', function (e, element_id, index) {
        // do something
    })

