# Mimic
Mimic is a jQuery plugin to replicate markup. 

## Usage

### Via Javascript
Replicate markup with id `myClone0` with a single line of Javascript

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