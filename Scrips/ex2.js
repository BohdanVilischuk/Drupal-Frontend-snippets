/**
 * @file
 * otg behaviors.
 */

(function ($, Drupal) {

  'use strict';

  /**
   * Behavior description.
   */






  /**
   * Form filter open.
   */

  Drupal.behaviors.ObjectDetailsSlider = {
    attach: function (context, settings) {
      $( document ).ready(function() {
        $('.slider-for__big-slides > div > div:nth-child(2)').slick({
          slidesToShow: 1,
          arrows: false,
          fade: true,
          swipe: false,
          adaptiveHeight: true,
          asNavFor: '.slider-nav__small-slides > div > div:nth-child(2)',
          responsive: [
            {
              breakpoint: 1025,
              settings: {
                dots: true,
                swipe: true,
                fade: false,
              }
            }
          ]
        });
        $('.slider-nav__small-slides > div > div:nth-child(2)').slick({
          slidesToShow: 4,
          infinite: false,
          asNavFor: '.slider-for__big-slides > div > div:nth-child(2)',
          focusOnSelect: true,
          prevArrow: false,
          nextArrow: false,
          adaptiveHeight: true,
          swipe: true,
          responsive: [
            {
              breakpoint: 1025,
              settings: "unslick"
            }
          ]
        })
      })
    }
  }
  Drupal.behaviors.goBack = {
    attach: function (context, settings)
    {if(document.referrer.indexOf(window.location.hostname) != -1){
      // $('a.back-to__button').show();
      $('a.back-to__button').click(function(){
        parent.history.back();
        return false;
      });
      }
    }
  }
  Drupal.behaviors.stylingDataMessage = {
    attach: function (context, settings) {
      let dataMessage =  $("div[data-drupal-messages]")
      dataMessage.addClass('data-styling')
      dataMessage.css("display", "none")
    }
  }



  Drupal.behaviors.filterSelectChange = {
    attach: function (context, settings) {
      $("#filter-form__bottom-select-block div select, #filter-form__bottom-select-block2 div select").change(function() {
        $("#filter-form__bottom-space-block, #filter-form__bottom-space-block2").children().each(function () {
          if ($(this).attr("style") === "display: none;") {
            $(this).children('input').each(function () {
              $(this).val('');
            });
          }
        });
      });
    }
  }

  Drupal.behaviors.geofieldGoogleMapInteraction = {
    attach: function (context, settings) {
      $(document).on('geofieldMapInit', function (e, mapid) {
        let data = Drupal.geoFieldMap.map_data;
        let map = Drupal.geoFieldMap.map_data[mapid].map;
        let clusters = Drupal.geoFieldMap.map_data[mapid].mapCluster;
        let markerGreenImage = "/themes/custom/otg/img/Svg/VectorMarkerGreen.svg"
        let markerImage = "/themes/custom/otg/img/Svg/VectorMarker.svg"
        let markers = Drupal.geoFieldMap.map_data[mapid].markers;
        $.each(markers, function(k, m) {
          m.setIcon(markerImage)
          m.addListener("click", function() {
            map.setZoom(14);
            map.panTo(m.getPosition());
            m.setIcon(markerGreenImage)
          });
        })
      })
    }
  };

} (jQuery, Drupal));
