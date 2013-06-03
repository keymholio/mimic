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
                }).find('[name]').each(function() { 
                  $(this).attr('name', $(this).attr('name').replace(/\d/, index) );
                });

                // insert the clone before trigger
                $clone.insertBefore(this.element);

            } else {
                console.log("Mimicked element doesn't exist or is referring to too many elements: " + this.options.mimicEl);
            }
        }
    };


    /* Mimic PLUGIN DEFINITION
    * ===================== */

    $.fn.mimic = function (option) {
        return this.each(function () {
            var $this = $(this),
                data = $this.data('mimic');
            if (!data) {
                $this.data('mimic', (data = new Mimic(this)));
            }
            if (typeof option === 'string') {
                if (option) {
                    data[option](); 
               } 
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
    });
}(window.jQuery));