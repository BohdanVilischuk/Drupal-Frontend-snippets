/**
 * @file
 * header-usermenu.js.
 */

'use strict';

(function ($, Drupal, drupalSettings) {

  let reinitialize_quicktabs = function () {
    if (
      (typeof Drupal.quicktabs !== 'undefined')
      && (typeof Drupal.quicktabs.prepare !== 'undefined')
    ) {
      $('body')
        .find('div.quicktabs-wrapper')
        .each(function () {
          let el = $(this);
          Drupal.quicktabs.prepare(el);
          el.find('.quicktabs-loaded').click(function () {
            let b = $('body').find('div.quicktabs-wrapper');
            if (b.find('.active').length > 1) {
              b.find('.quicktabs-loaded').each(
                function (id, element) {
                  $(element).parent().removeClass('active');
                }
              )
              $(this).parent().addClass('active');
              let id = $(this)[0].attributes['data-quicktabs-tab-index'].value;
              let qtab = $('#quicktabs-container-otg_page');
              qtab.find('.quicktabs-tabpage')
                .each(function (id, el) {
                  if (!$(el).hasClass('quicktabs-hide')) {
                    $(el).addClass('quicktabs-hide')
                  }
                })

              qtab.find('#' + 'quicktabs-tabpage-otg_page' + '-' + id).removeClass('quicktabs-hide')
            }

          });
        });
    }
  }

    $(window).on('load resize orientationchange', function() {
        $(
          '#main-slider__nav, ' +
          '#block-quicktabsotgpage .land-plot__nav'
        ).each(function(){
            let $carousel = $(this);
            if ($(window).width() > 767) {
                if ($carousel.hasClass('slick-initialized')) {
                    $carousel.slick('unslick');

                    // Reinitialize quicktabs.
                  $('body')
                    .find('div.quicktabs-wrapper')
                    .each(function () {
                      let el = $(this);
                      Drupal.quicktabs.prepare(el);
                    });
                }
            }
            else{
                if (!$carousel.hasClass('slick-initialized')) {
                    $carousel.slick({
                        slidesToShow: 3,
                        slidesToScroll: 1,
                        infinite: true,
                        centerMode: false,
                        variableWidth: true,
                        prevArrow: false,
                        nextArrow: false,
                        dots: false,
                        autoplay: true,
                    });

                    // Reinitialize quicktabs.
                    reinitialize_quicktabs();
                }
            }
        });
    });

})(
  jQuery,
  ((typeof Drupal !== 'undefined' && Drupal !== null) ? Drupal : Object),
  ((typeof drupalSettings !== 'undefined' && drupalSettings !== null) ? drupalSettings : Object),
);
