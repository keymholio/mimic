(function ($) {

    "use strict"; // jshint ;_;

    /*global $, window: false, location: false, console: false */

    /* Mimic CLASS DEFINITION
    * ==================== */

    var Mimic = function (element, options) {
        this.element = $(element);
        this.options = options;
        this.indicies = [];
        this.last_index = 0;
        this.last_element = '';
    };

    Mimic.prototype = {

        constructor: Mimic,

        init: function () {
            var i = 1,
                that = this;
            this.last_index = $('[data-cloned=#' + this.element.attr('id') + ']').length;

            // update indicies array
            for (i = 1; i <= this.last_index; i += 1) {
                this.indicies.push(i);
            }

            //hide remove button
            this.element.find('[data-mimic-remove] a').hide();

            // remove add button if we are at our limit
            if (this.options.limit && this.last_index + 1 === this.options.limit) {
                $(this.options.trigger).hide();
            }

            if (this.options.trigger) {
                $(this.options.trigger).on('click.mimic', function() {
                    that.replicate();
                });
            }
        },

        replicate: function () {
            var $clone = this.clean(this.element.clone()),
                index,
                limit = this.options.limit ? this.options.limit - 1 : null;

            this.last_index += 1;
            index = this.last_index;

            if (limit && this.options.trigger) {
                if (index > limit) {
                    index = this.last_index = 1;
                }

                if (this.indicies.length === (limit - 1)) {
                    $(this.options.trigger).hide();
                }

                if (this.indicies.length !== limit) {
                    // update indicies tracker
                    while (this.indicies.indexOf(index) !== -1) {
                        if (index < limit) {
                            index += 1;
                        } else {
                            index = 1;
                        }
                    }
                }
            }

            this.indicies.push(index);

            // check if the element we're trying to replicate exists
            if (this.element.length === 1) {
                // update element's ID
                $clone.attr('id', $clone.attr('id').replace(/\d/, index));
                $clone.attr('data-cloned', '#' + this.element.attr('id'));
                // update children's ID and names
                $clone.find('[id]').each(function() {
                    $(this).attr('id', $(this).attr('id').replace(/\d/, index));
                });
                $clone.find('[name]').each(function() {
                    $(this).attr('name', $(this).attr('name').replace(/\d/, index)).val('');
                });

                // adding the remove link
                $clone.find('[data-mimic-remove] a').show();

                this.last_element = $clone.attr('id');
                if (this.options.insertBeforeTrigger) {
                    $clone.insertBefore($(this.options.trigger));
                } else {
                    $clone.insertAfter(this.element);
                }

                this.element.trigger('cloned', ['#' + $clone.attr('id')]);

            } else {
                console.log("Mimicked element doesn't exist or is referring to too many elements: " + this.element.attr('id'));
            }
        },

        clean: function ($clone) {
            var remove_elements = this.options.removeElements,
                remove_classes = this.options.removeClasses,
                dotless_classes;
            if (remove_elements) {
                $clone.find(remove_elements).remove(remove_elements).end();
            }
            if (remove_classes) {
                // remove dots
                dotless_classes = remove_classes.replace(/\.|\,/g, "");
                $clone.find(remove_classes).removeClass(dotless_classes);
            }
            return $clone;
        },

        remove: function () {
            var source_id = this.element.data('cloned'),
                $source = $(source_id).data('mimic'),
                clone_index = parseInt(this.element.attr('id').match(/\d/)[0], 16),
                index = $source.indicies.indexOf(clone_index);
            if (this.element.length === 1) {
                this.element.remove();
                $source.indicies.splice(index, 1);
                if ($source.options.limit) {
                    $($source.options.trigger).show();
                }
                $(source_id).trigger('removed', ['#' + this.element.attr('id')]);
            } else {
                console.log("Remove element doesn't exist or is referring to too many elements: " + $(this).attr('id'));
            }
        }
    };


    /* Mimic PLUGIN DEFINITION
    * ===================== */

    $.fn.mimic = function (option) {
        return this.each(function () {
            var $this = $(this),
                data = $this.data('mimic'),
                options = $.extend({}, $.fn.mimic.defaults, $this.data(), typeof option === 'object' && option);
            if (!data) {
                data = new Mimic(this, options);
                $this.data('mimic', data);
            }
            if (typeof option === 'string') {
                data[option]();
            } else if (!option) {
                data.replicate();
            } else {
                data.init();
            }
        });
    };

    $.fn.mimic.defaults = {
        limit: false,
        removeElements: false,
        removeClasses: false,
        trigger: false,
        insertBeforeTrigger: false
    };

    $.fn.mimic.Constructor = Mimic;


    /* Mimic DATA-API
     * ============ */

    $(function () {

        $('body').on('click', '[data-cloned] [data-mimic-remove] a', function () {
            $(this).parents('[data-cloned]').mimic('remove');
        });

        $('[data-clone]').mimic('init');
    });
}(window.jQuery));