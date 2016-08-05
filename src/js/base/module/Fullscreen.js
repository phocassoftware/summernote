define([
  'jquery'
], function ($) {
  var Fullscreen = function (context) {
    var $editor = context.layoutInfo.editor;
    var $toolbar = context.layoutInfo.toolbar;
    var $editable = context.layoutInfo.editable;
    var $codable = context.layoutInfo.codable;

    var $window = $(window);
    var $scrollbar = $('html, body');

    var resizeToParent = context.options.resizeToParent;

    var isFullscreen = false;

    /**
     * toggle fullscreen
     */
    this.toggle = function (value) {
      var resize = function (size) {
        $editable.css('height', size.h);
        $codable.css('height', size.h);
        if ($codable.data('cmeditor')) {
          $codable.data('cmeditor').setsize(null, size.h);
        }
      };

      var resizeToElement = function ($element) {
          resize({
            h: $element.height() - $toolbar.outerHeight()
          });
        };

      isFullscreen = value === undefined ? !isFullscreen : value;

      $editor.removeClass('fullscreen');
      $editor.removeClass('resize-to-parent');

      if (isFullscreen) {
        $editor.addClass('fullscreen');

        $editable.data('orgHeight', $editable.css('height'));

        $window.off('resize');
        $window.on('resize', function () {
          resizeToElement($window);
        }).trigger('resize');

        $scrollbar.css('overflow', 'hidden');
      }
      else if (resizeToParent) {
        $editor.addClass('resize-to-parent');

        $editable.data('orgHeight', $editable.css('height'));

        $window.off('resize');
        $window.on('resize', function () {
          resizeToElement($editor.parent());
        }).trigger('resize');

        $scrollbar.css('overflow', 'hidden');
      }
      else {
        $window.off('resize');
        resize({
          h: $editable.data('orgHeight')
        });
        $scrollbar.css('overflow', 'visible');
      }

      context.invoke('toolbar.updateFullscreen', isFullscreen);
    };

    console.log('Bar');
    this.toggle(false);
    console.log('Qux');
  };

  return Fullscreen;
});
