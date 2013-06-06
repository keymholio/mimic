(function ($) {

    "use strict"; // jshint ;_;

    /*global $, window: false, location: false, console: false */

    /* Mimic CLASS DEFINITION
    * ==================== */

    var Mimic = function (element) {
        this.element = $(element);
        this.options = this.element.data();
        this.indicies = [];
        this.limit = this.options.mimicLimit;
        this.last_index = 0;
    };

    Mimic.prototype = {

        constructor: Mimic,

        init: function () {
            var i = 1;
            if ($(this.options.mimicEl).length === 1) {
                // check if there are existing clones
                if ($('[data-mimic-remove]:last').attr('data-mimic-remove')) {
                    // update the last index
                    this.last_index = parseInt($('[data-mimic-remove]:last').attr('data-mimic-remove').match(/\d/)[0], 16);

                    // update indicies array
                    for (i = 1; i <= this.last_index; i += 1) {
                        this.indicies.push(i);
                    }

                    // remove add button if we are at our limit
                    if ($('[data-mimic-remove] a').length + 1 === $('[data-mimic-limit]').data('mimicLimit')) {
                        $('[data-mimic-limit]').hide();
                    }
                } else {
                    this.last_index = parseInt($(this.options.mimicEl).attr('id').match(/\d/)[0], 16) + 1;
                }
            }
        },

        replicate: function () {
            var $mimic_el = $(this.options.mimicEl),
                $clone = $mimic_el.clone(),
                index,
                limit = this.limit ? this.limit - 1 : null;

            this.last_index += 1;
            index = this.last_index;

            if (limit) {
                if (index > limit) {
                    index = this.last_index = 1;
                }

                if (this.indicies.length === (limit - 1)) {
                    this.element.hide();
                }

                // update indicies tracker
                while (this.indicies.indexOf(index) !== -1) {
                    if (index < limit) {
                        index += 1;
                    } else {
                        index = 1;
                    }
                }
            }

            this.indicies.push(index);

            // check if the element we're trying to replicate exists
            if ($mimic_el.length === 1) {
                // update element's ID
                $clone.attr('id', $clone.attr('id').replace(/\d/, index));
                // update children's ID and names
                $clone.find('[id]').each(function() {
                    $(this).attr('id', $(this).attr('id').replace(/\d/, index));
                });
                $clone.find('[name]').each(function() {
                    $(this).attr('name', $(this).attr('name').replace(/\d/, index)).val('');
                });

                // adding the remove link
                $clone.find('[data-mimic-remove]').append('<a href="#">Remove</a>');
                $clone.find('[data-mimic-remove]').children('a').attr({
                    'data-mimic-remove': '#' + $clone.attr('id'),
                    'data-mimic-src': this.element.data('mimicEl')
                });

                // insert the clone before trigger
                $clone.insertBefore(this.element);

            } else {
                console.log("Mimicked element doesn't exist or is referring to too many elements: " + this.options.mimicEl);
            }
        },

        remove: function () {
            var remove_id = this.options.mimicRemove,
                $trigger = $('[data-mimic-el=' + this.options.mimicSrc + ']'),
                el_index = parseInt(remove_id.match(/\d/)[0], 16),
                index = $trigger.data('mimic').indicies.indexOf(el_index);
            if ($(remove_id).length === 1) {
                $(remove_id).remove();
                $trigger.data('mimic').indicies.splice(index, 1);
                $trigger.show();
            } else {
                console.log("Remove element doesn't exist or is referring to too many elements: " + remove_id);
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
                data = new Mimic(this);
                $this.data('mimic', data);
            }
            if (typeof option === 'string') {
                data[option]();
            } else {
                data.replicate();
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

        $('[data-mimic-el]').mimic('init');
    });
}(window.jQuery));