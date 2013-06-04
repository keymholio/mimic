(function ($) {

    "use strict"; // jshint ;_;

    /*global $, window: false, location: false */

    /* Mimic CLASS DEFINITION
    * ==================== */

    var Mimic = function (element, options) {
        var obj = this;
        this.element = $(element);
        this.options = this.element.data();
        this.indicies = [];
        this.last_index = 0;
        if ($(this.options.mimicEl).length === 1) {
            $(this.options.mimicEl).attr('id').replace(/\d/, function(str) { 
                obj.last_index = parseInt(str) + 1; 
            });
        }
        if (this.options.limit) {
            for (var i=0; i<this.options.limit; i++) { 
                this.indicies.push(i);
                if ( i === this.options.limit) {
                    this.last_index = i; 
                }
            } 
        }

    };

    Mimic.prototype = {

        constructor: Mimic,

       replicate: function () {
            var $mimic_el = $(this.options.mimicEl),
                $clone = $mimic_el.clone(),
                index = this.last_index++;
                
            // check if the element we're trying to replicate exists
            if ($mimic_el.length === 1) {
                // update element's ID
                $clone.attr('id', $clone.attr('id').replace(/\d/, index));
                // update children's ID and names
                $clone.find('[id]').each(function() { 
                    $(this).attr('id', $(this).attr('id').replace(/\d/, index) );
                });
                $clone.find('[name]').each(function() { 
                    $(this).attr('name', $(this).attr('name').replace(/\d/, index) );
                });
              
                // adding the remove link
                var $removelink_container = $clone.find('[data-mimic-remove]');
                $removelink_container.append('<a href="#">Remove</a>');
                var $removelink = $removelink_container.children('a');
                $removelink.attr({
                    'data-mimic-remove': '#' + $clone.attr('id'),
                    'data-mimic-src': this.element.data('mimicEl')
                });              
              
                // insert the clone before trigger
                $clone.insertBefore(this.element);
              
                // update indicies
                this.indicies.push(index);

            } else {
                console.log("Mimicked element doesn't exist or is referring to too many elements: " + this.options.mimicEl);
            }
        },
      
        remove: function () {
            $(this.options.mimicRemove).remove();
        }
    };


    /* Mimic PLUGIN DEFINITION
    * ===================== */

    $.fn.mimic = function (option) {
        return this.each(function () {
            var $this = $(this),
                $el = $el ? $el : "",
                data = $this.data('mimic');
            if (!data) {
                $this.data('mimic', (data = new Mimic(this)));
            }
            if (typeof option === 'string') {
               data[option]();
            } else {
               data['replicate']();
            }
        });
    };

    $.fn.mimic.Constructor = Mimic;


    /* Mimic DATA-API
     * ============ */

    $(function () {
        // for links
        $('body').on("click", "[data-mimic-el]", function (e) {
            e.preventDefault();
            $(this).mimic();
        });
      
        $('body').on("click", "[data-mimic-remove] a", function (e) {
            e.preventDefault();
            $(this).mimic('remove'); 
        });
    });
}(window.jQuery));