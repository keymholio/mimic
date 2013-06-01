(function ($) {

    "use strict"; // jshint ;_;

    /*global $, window: false, location: false */

    /* Mimic CLASS DEFINITION
    * ==================== */

    var Mimic = function (element, options) {
        this.element = $(element);
        this.options = this.element.data();
    };

    Mimic.prototype = {

        constructor: Mimic,

        replicate: function () {
          var $el_to_copy = $(this.options.mimicEl)
          $el_to_copy.clone().insertAfter(this.options.mimicEl);
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