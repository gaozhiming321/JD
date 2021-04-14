// 轮播区域
$(function () {
  var w = parseFloat($(".banner li").css("width"));
  var start;
  var index = 1;

  var first = $(".viewBox li").first().clone();
  var last = $(".viewBox li").last().clone();
  $(".viewBox").append(first).prepend(last);
  var len = $(".viewBox").children().length;
  $(".banner").on("touchstart", function (e) {
    start = e.targetTouches[0].pageX;
    console.log(e);
    // w = parseFloat($(".banner li").css("width"));
  })
  $(".viewBox").on("touchend", function (e) {
    var end = e.changedTouches[0].pageX;
    if (start - end > w / 4) {
      index++;
      if (index > len - 2) {
        index = 1;
        $(".viewBox").css({
          transform: "translateX(0)"
        })
      }
    } else if (start - end < -w / 4) {
      index--;
      if (index < 1) {
        index = len - 2;
        $(".viewBox").css({
          transform: "translateX(" + -6.4 * (len - 1) + "rem)"
        })
      }
    }
    console.log(index);
    bannerTab()
  })

  function bannerTab() {
    $(".viewBox").animate({
      transform: "translateX(" + (-6.3 * index) + "rem)"
    }, 200)
    $(".pagination span").eq(index - 1).addClass("active").siblings().removeClass("active")
  }
})

//icon展示区域
$(function () {

  var startX;
  var currentIndex = 0;
  var onloadWidth = parseFloat($(".icon-viewBox ul").css("width"));
  $(".icon-swiper").on("touchstart", function (e) {
    startX = e.targetTouches[0].pageX;
    // onloadWidth = parseFloat($(".icon-viewBox ul").css("width"))
  })
  $(".icon-viewBox").on("touchend", function (e) {
    var endX = e.changedTouches[0].pageX;
    if (startX - endX > onloadWidth / 4) {
      currentIndex = 1;
    } else if (startX - endX < -onloadWidth / 4) {
      currentIndex = 0;
    }
    showTab()
  })


  function showTab() {
    $(".icon-viewBox").animate({
      transform: "translateX(" + -6.1 * currentIndex + "rem)"
    }, 500)
    $(".icon-pagination span").eq(currentIndex).addClass("active").siblings().removeClass("active")
  }


})




// 猜你喜欢区域
$(function () {
  $.ajax({
    type: "get",
    dataType: "json",
    url: "../data/product.json",
    success: function (res) {
      console.log(res);
      $.each(res, function (index, item) {
        var ele = $(`<div class="product-item">
      <a href="detail.html?pid=${item.pid}">
        <div class="item-img">
          <img src="${item.imgSrc}" alt="">
        </div>
        <div class="item-intr">
          <h3>
            <img src="${item.isJD=item.isJD?item.isJD:" "}" alt="">
            ${item.title}
          </h3>
          <p class="price">￥${item.price}</p>
        </div>
      </a>
    </div>`)
        $(".guess").append(ele)
      })
    }
  })
})
