/* =========================================================
 * bootstrap-rating.js
 * http://www.github.com/jdewit/bootstrap-rating
 * =========================================================
 * Copyright 2012
 *
 * Created By:
 * Joris de Wit @joris_dewit
 *
 * Contributions By:
 *
 * ...
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 * ========================================================= */

!function($) {

    "use strict"; // jshint ;_;

    /* TIMEPICKER PUBLIC CLASS DEFINITION
     * ================================== */
    var Rating = function(element, options) {
        this.$element = $(element);
        this.options = $.extend({}, $.fn.rating.defaults, options, this.$element.data());
        this.starClass = this.options.starClass || this.starClass;
        this.emptyStarClass = this.options.emptyStarClass || this.emptyStarClass;
        this.clearStarClass = this.options.clearStarClass || this.clearStarClass;
        this.post = this.options.post || this.post;
        this.init();
    };

    Rating.prototype = {

        constructor: Rating

        , init: function () {
            var $inputs = this.$element.find('input[type=radio]'),
                score = this.$element.find('input[type=radio]:checked').val(),
                template = '<div class="rating">',
                starClass = this.starClass,
                emptyStarClass = this.emptyStarClass,
                clearStarClass = this.clearStarClass;

            $inputs.each(function() {
                var value = $(this).val();

                if (value == 0) {
                    template = template + '<a class="clear-stars" href="#" title="Clear stars"><i class="' + clearStarClass +'"></i></a>';
                } else {
                    if (value <= score) { 
                        var iconClass = starClass;
                    } else {
                        var iconClass = emptyStarClass;
                    }
                    template = template + '<a class="star" href="#" title="'+ $(this).val() + ' stars" data-value="' + $(this).val() + '" data-target="#'+ $(this).attr('id') +'"><i class="'+ iconClass +'"></i></a>';
                }
            });
            template = template + '</div>';
            this.$widget = this.$element.parent().append(template);
            this.$widget.find('a.star').on('click', $.proxy(this.starClick, this));
            this.$widget.find('a.clear-stars').on('click', $.proxy(this.clearStarsClick, this));
            
        }
        , starClick: function(e) {
            e.preventDefault();

            this.clearRadios();
            $($(e.currentTarget).data('target')).attr('checked', 'checked');

            var score = $(e.currentTarget).data('value');

            this.updateStars(score);
        }
        , clearStarsClick: function(e) {
            e.preventDefault();

            this.clearRadios();
            this.$element.find('input[type=radio]:first').attr('checked', 'checked');

            this.updateStars(0);
        }
        , clearRadios: function() {
            this.$element.find('input[type="radio"]').attr('checked', false);
        }
        , updateStars: function(score) {
            var starClass = this.starClass,
                emptyStarClass = this.emptyStarClass;

            this.$widget.find('a.star i').removeClass();

            this.$widget.find('a.star').each(function() {
                if ($(this).data('value') <= score) {
                    $(this).find('i').addClass(starClass);
                } else {
                    $(this).find('i').addClass(emptyStarClass);
                }
            });
console.log(this.post);
            if (this.post) {
                this.$element.parents('form').submit();
            }
        }
    };


    /* TIMEPICKER PLUGIN DEFINITION
     * =========================== */

    $.fn.rating = function (option) {
        return this.each(function () {
            var $this = $(this)
            , data = $this.data('rating')
            , options = typeof option == 'object' && option;
            if (!data) {
                $this.data('rating', (data = new Rating(this, options)));
            }
            if (typeof option == 'string') {
                data[option]();
            }
        })
    }

    $.fn.rating.defaults = {
      starClass: 'icon-star'
    , emptyStarClass: 'icon-star-empty'
    , clearStarClass: 'icon-ban-circle'
    , post: false
    }

    $.fn.rating.Constructor = Rating
}(window.jQuery);

