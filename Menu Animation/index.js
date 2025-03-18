 var tl = new TimelineMax({ paused: true });

      tl.to(".nav-container", 1, {
        left: 0,
        ease: Expo.easeInOut,
      });

      tl.staggerFrom(
        ".menu > div",
        0.8,
        { y: 100, opacity: 0, ease: Expo.easeOut },
        "0.1",
        "-=0.4"
      );

      tl.reverse();
      $(document).on("click", ".menu-open", function () {
        tl.reversed(!tl.reversed());
      });
      $(document).on("click", ".menu-close", function () {
        tl.reversed(!tl.reversed());
      });

      $(document).ready(function () {
        $(".item-1").hover(
          function () {
            $(".nav-container").css("background-color", "#938089");
          },
          function () {
            $(".nav-container").css("background", "#dfe8e0");
          }
        );

        $(".item-2").hover(
          function () {
            $(".nav-container").css("background-color", "#b1b2b6");
          },
          function () {
            $(".nav-container").css("background", "#dfe8e0");
          }
        );

        $(".item-3").hover(
          function () {
            $(".nav-container").css("background-color", "#88a388");
          },
          function () {
            $(".nav-container").css("background", "#dfe8e0");
          }
        );

        $(".item-4").hover(
          function () {
            $(".nav-container").css("background-color", "#b1b2b6");
          },
          function () {
            $(".nav-container").css("background", "#dfe8e0");
          }
        );

        $(".item-5").hover(
          function () {
            $(".nav-container").css("background-color", "#b9b098");
          },
          function () {
            $(".nav-container").css("background", "#dfe8e0");
          }
        );

        $(".item-6").hover(
          function () {
            $(".nav-container").css("background-color", "#979781");
          },
          function () {
            $(".nav-container").css("background", "#dfe8e0");
          }
        );
      });