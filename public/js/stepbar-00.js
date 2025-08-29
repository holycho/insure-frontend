var globalResizeTimeOut = 50;

function initStepbar00() {
  var stepbar00 = $('.stepbar-00');
  if (!stepbar00.length) return;
  var setLocation;
  stepbar00.each(function (i, o) {
    var stepProgress = $(o).find('.stepbar-00__progress');
    var cellChildren = $(o).find('.stepbar-00__cell').children();
    var activeChild = cellChildren.filter('.stepbar-00-step--active');
    var activeIndex = activeChild.parent('.stepbar-00__cell').index();

    // (昕力) 先還原所有步驟
    cellChildren.each(function (i, o) {
      $(o).find('.stepbar-00-step__done-line').remove();
    });
    // 把active項目以前的所有步驟都補上.stepbar-00-step--done 這個class
    var doneStep = cellChildren.filter(function (i, o) {
      var isDone = $(o).parent('.stepbar-00__cell').index() <= activeIndex;
      return isDone;
    })
    var doneLine = $('<div class="stepbar-00-step__done-line"></div>');

    if (activeIndex > 0) {
      doneStep.each(function (i, o) {
        $(o).find('.stepbar-00-step__done-line').remove(); // (昕力) 效果取消
        $(o).append(doneLine.clone()); // 主步驟進度
      })

      doneStep.addClass('stepbar-00-step--done');
    }

    var setDoneLineWidth = function () {
      if (activeIndex == 0) return;
      doneStep.each(function (i, o) {

        var doneLine = $(o).find('.stepbar-00-step__done-line');
        doneLine.css({
          'width': '',
          'right': ''
        });

        var doneLineWidth = doneLine.width();
        doneLine.css({
          'width': doneLineWidth - $(o).width() / 2,
          'right': $(o).width() / 2
        });
      })
    }

    setDoneLineWidth();

    $(window).on('resize', debounce(setDoneLineWidth, globalResizeTimeOut));

    // 取得active項目內的文字/進度分數並轉填到progress元素內部對應的地方
    var progressNumberNow = parseInt(activeChild.attr('data-step-progress-now'));
    var progressSteps = [];
    var stringArr = activeChild.attr('data-steps');
    console.log('lib', stringArr);
    if (!stringArr) {
      stepProgress.css('display', 'none');
      // stepProgress.hide(300);
      return;
    }
    else {
      // 修正為「可動態載入」的流程
      stepProgress.css('display', 'block');
      // stepProgress.show(300);
      progressSteps = JSON.parse(activeChild.attr('data-steps'));
    }
    var progressNumberTotal = progressSteps.length;
    var progressNumberText = progressNumberNow + '/' + progressNumberTotal;
    var progressPercent = (progressNumberNow / progressNumberTotal) * 100 + '%';
    var numberTextEle = stepProgress.find('.stepbar-00-step-progress__text--number');
    var titleTextEle = stepProgress.find('.stepbar-00-step-progress__text--title');
    var progressDiagramEle = stepProgress.find('.stepbar-00-step-progress-bar__inner');
    progressDiagramEle.css('width', progressPercent);
    numberTextEle.empty().html(progressNumberText);
    titleTextEle.empty().html(progressSteps[progressNumberNow - 1]);
    // 修正為「可動態載入」的流程
    stepProgress.css('opacity', 1);

    //計算大版時progress的絕對位置(小版是直接用css !important寫死)
    setLocation = function () {
      var activeItemOffsetLeft =
        activeChild.offset().left
        + activeChild.outerWidth() / 2
        - $(o).offset().left;
      stepProgress.css('left', activeItemOffsetLeft);
    }
    setLocation()
    $(window).on('resize', debounce(setLocation, globalResizeTimeOut));
  })

  return stepbar00;
}

// components
var $stepbar00;

function init() {
  $stepbar00 = initStepbar00();
}

// includeHTML(function () {
//   init();
// })

(function () {
  init();
})();