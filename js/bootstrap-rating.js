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
        this.emptyStarClass = this.options.starClass || this.starClass;
        this.clearRatingClass = this.options.clearRatingClass || this.clearRatingClass;
        this.init();
    };

    Rating.prototype = {

        constructor: Rating

        , init: function () {
            var $inputs = this.$element.find('input[type=radio]'),
                score = $this.$element.find('input[type=radio]:checked'),
                template = '<div class="bootstrap-timepicker"><a class="clear-rating" href="#"><i class="' + this.clearRatingIconClass +'</a></div>',
                $stars;

            $i = 0;
            for ($inputs.length) {
                if (score > $i) { 
                    var starred = true;
                }

                $stars.add('<a class="star" href="#" data-value="' + $inputs.length + '"><i class="' + starred ? this.starClass : this.emptyStarClass + '"></i></a>');

                $i++;
            }

            this.$widget = this.$element.append(template.append($stars));

            $stars.on('click', $.proxy(this.starClicked, this));
            
        }
        , starClicked: function(e) {
            e.preventDefault();
            
            var score = this.val();
            console.log(score);
            $stars.find('i').removeClass();
            this.$widget.find('a.star:data(value<='+ score +') i').addClass(this.starClass);
            this.$widget.find('a.star:data(value>'+ score +') i').addClass(this.emptyStarClass);
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
    }

    $.fn.rating.Constructor = Rating
}(window.jQuery);

