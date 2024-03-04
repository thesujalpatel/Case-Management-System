fetch("/config")
  .then((response) => response.json())
  .then((config) => {
    $(".web-name").text(config.website_name);
    $(".dev-name").text(config.devloper_name);
    var port = config.port;

    const color1 = "#1F1717";
    const color2 = "#CE5A67";
    const color3 = "#F4BF96";
    const grid = "#ff9c507d";
    const tooltip_bg = "#F5F5DC";
    const tooltip_border = "#79155B";
    const tooltip_title = "#79155B";

    var menu_open = true;

    $(".scroll-top-icon").click(function () {
      window.scrollTo({ top: 0, behavior: "smooth" });
    });

    // Menu botton animation
    var nevListItems = $(".nev, .nev-section");
    var menubtn = $(".nev-btn");
    menubtn.click(function () {
      if (menu_open) {
        $(".web-name").fadeTo(190, 0).hide(190);
        $(".nev-sec").fadeTo(350, 0).hide(390);
        $(".div").fadeTo(500, 0).hide(500);
        $(".option-title").fadeTo(400, 0).hide();
        nevListItems.animate({ width: "40px" }, 500);
        $(".spacial").show(500).fadeTo(500, 1);
        $(".nev-btn").removeClass("selected");
        menu_open = false;

        setTimeout(function () {
          $(".logo-img").css({
            width: "25px",
            height: "25px",
          });
        }, 500);
      } else {
        $(".spacial").show(500).fadeTo(500, 1);
        $(".option-title").show(500).fadeTo(500, 1);
        $(".div").show(500).fadeTo(500, 1);
        $(".nev-sec").show(500).fadeTo(500, 1);
        $(".logo-img").animate(
          {
            width: "50px",
            height: "50px",
          },
          500
        );
        $(".nev-btn").addClass("selected");
        nevListItems.animate({ width: "250px" }, 500);
        menu_open = true;

        setTimeout(function () {
          $(".web-name").show(250);
          $(".web-name").fadeTo(500, 1);
        }, 500);
      }
    });

    // Operation for edit case
    $("#updatecases").submit(function (event) {
      event.preventDefault();
      var data_array = $(this).serializeArray();
      var data = {};
      $.map(data_array, function (n, i) {
        data[n["name"]] = n["value"];
      });
      var request = {
        url: `http://localhost:${port}/api/cases/${data.id}`,
        method: "PUT",
        data: data,
      };
      $.ajax(request).done(function (response) {
        alert("Data Saved Successfully");
        return (location.href = "/");
      });
    });

    // Operation for delete case
    $(".delete-op").click(function () {
      var id = $(this).attr("data-id");
      var request = {
        url: `http://localhost:${port}/api/cases/${id}`,
        method: "DELETE",
      };
      if (confirm("Do you want to delete this case?")) {
        $.ajax(request).done(function (response) {
          alert("Case deleted successfully");
          return location.reload();
        });
      }
    });
    $("#addcases").submit(function (event) {
      alert("Case Added Successfully");
    });

    var url = window.location.href;
    const selected_array = {
      "/": [".dashboard", "Dashboard"],
      "/appointments": [".appointments", "Appointments"],
      "/cases": [".cases", "Cases"],
      "/attorney": [".attorney", "Attorney"],
      "/features": [".features", "Features"],
      "/ftc": [".ftc", "Forms, Tables & Charts"],
      "/aw": [".aw", "Application & Widgets"],
      "/authentication": [".authentication", "Authentication"],
      "/miscellaneous": [".miscellaneous", "Miscellaneous"],
    };
    for (var key in selected_array) {
      if (url.endsWith(key)) {
        $(selected_array[key][0]).addClass("selected");
        $("title").text(selected_array[key][1]);
        $(".page-title").text(selected_array[key][1]);
      }
    }

    // routes
    $(".dashboard").click(function (event) {
      location.href = "/";
    });
    $(".appointments").click(function () {
      location.href = "/appointments";
    });
    $(".cases").click(function () {
      location.href = "/cases";
    });
    $(".attorney").click(function () {
      location.href = "/attorney";
    });
    $(".features").click(function () {
      location.href = "/features";
    });
    $(".ftc").click(function () {
      location.href = "/ftc";
    });
    $(".aw").click(function () {
      location.href = "/aw";
    });
    $(".authentication").click(function () {
      location.href = "/authentication";
    });
    $(".miscellaneous").click(function () {
      location.href = "/miscellaneous";
    });

    const ctx1 = document.getElementById("myChart1");
    const ctx2 = document.getElementById("myChart2");
    const ctx3 = document.getElementById("myChart3");
    const ctx4 = document.getElementById("myChart4");
    const ctx5 = document.getElementById("myChart5");
    const ctx6 = document.getElementById("myChart6");
    const ctx7 = document.getElementById("myChart7");

    $(document).ready(function () {
      // Scroll to top button
      window.onscroll = function () {
        scrollFunction();
      };
      var isButtonVisible = false;
      $(".scroll-top-icon").css("opacity", 0);
      function scrollFunction() {
        if (
          document.body.scrollTop > 20 ||
          document.documentElement.scrollTop > 20
        ) {
          if (!isButtonVisible) {
            $(".scroll-top-icon").animate({ opacity: 1 }, 500);
            isButtonVisible = true;
          }
        } else {
          if (isButtonVisible) {
            $(".scroll-top-icon").animate({ opacity: 0 }, 500);
            isButtonVisible = false;
          }
        }
      }

      var cases = {
        url: `http://localhost:${port}/api/cases`,
        method: "GET",
      };
      $.ajax(cases).done(function (response) {
        var months = [
            "JANUARY",
            "FEBRUARY",
            "MARCH",
            "APRIL",
            "MAY",
            "JUNE",
            "JULY",
            "AUGUST",
            "SEPTEMBER",
            "OCTOBER",
            "NOVEMBER",
            "DECEMBER",
          ],
          date_current = Date.now(),
          month_current =
            new Date(date_current).getMonth("en-IN", {
              timeZone: config.timezone,
            }) + 1,
          c3_won = 0,
          c3_lost = 0,
          c4 = [];
        for (var i = 0; i < 12; i++) {
          var c4_insert = {
            x: months[month_current],
            y: 0,
          };
          c4.push(c4_insert);
          month_current++;
          if (month_current > 11) month_current = 0;
        }
        response.forEach((element) => {
          c3_won = element.status == "win" ? c3_won + 1 : c3_won;
          c3_lost = element.status == "lost" ? c3_lost + 1 : c3_lost;
          var date = new Date(element.createDate).getMonth("en-IN", {
            timeZone: config.timezone,
          });
          for (var i = 0; i < c4.length; i++) {
            if (c4[i].x == months[date]) {
              c4[i].y =
                element.revenue == undefined || null
                  ? c4[i].y
                  : c4[i].y + element.revenue;
              console.log(element.revenue);
            }
          }
        });
        new Chart(ctx1, {
          type: "line",
          data: {
            datasets: [
              {
                label: "ONGOING",
                data: [
                  {
                    x: 10,
                    y: 20,
                  },
                  {
                    x: 15,
                    y: 4,
                  },
                  {
                    x: 20,
                    y: 10,
                  },
                  {
                    x: 25,
                    y: 5,
                  },
                  {
                    x: 30,
                    y: 15,
                  },
                  {
                    x: 35,
                    y: 10,
                  },
                  {
                    x: 40,
                    y: 20,
                  },
                  {
                    x: 45,
                    y: 5,
                  },
                  {
                    x: 50,
                    y: 15,
                  },
                  {
                    x: 55,
                    y: 10,
                  },
                ],
                borderWidth: 2,
                tension: 0.3,
                borderColor: color1,
                backgroundColor: color1,
              },
              {
                label: "SETTLED",
                data: [
                  {
                    x: 10,
                    y: 10,
                  },
                  {
                    x: 15,
                    y: 5,
                  },
                  {
                    x: 20,
                    y: 15,
                  },
                  {
                    x: 25,
                    y: 10,
                  },
                  {
                    x: 30,
                    y: 20,
                  },
                  {
                    x: 35,
                    y: 5,
                  },
                  {
                    x: 40,
                    y: 15,
                  },
                  {
                    x: 45,
                    y: 10,
                  },
                  {
                    x: 50,
                    y: 20,
                  },
                  {
                    x: 55,
                    y: 5,
                  },
                ],
                borderWidth: 2,
                tension: 0.3,
                borderDash: [5, 10],
                borderColor: color2,
                backgroundColor: color2,
              },
            ],
          },
          options: {
            plugins: {
              tooltip: {
                backgroundColor: tooltip_bg,
                titleAlign: "center",
                cornerRadius: 10,
                usePointStyle: true,
                intersect: false,
                titleColor: tooltip_title,
                bodyColor: color1,
                borderColor: tooltip_border,
                borderWidth: 2,
                bodyFont: {
                  weight: 600,
                },
              },
              legend: {
                labels: {
                  color: color1,
                },
              },
            },
            scales: {
              x: {
                type: "linear",
                position: "bottom",
                border: {
                  width: 2,
                  color: color1,
                },
                grid: {
                  color: grid,
                  tickColor: grid,
                },
                ticks: {
                  color: color1,
                },
              },
              y: {
                type: "linear",
                position: "left",
                border: {
                  width: 2,
                  color: color1,
                },
                grid: {
                  color: grid,
                  tickColor: grid,
                },
                ticks: {
                  color: color1,
                },
              },
            },
            maintainAspectRatio: false,
          },
        });
        new Chart(ctx2, {
          type: "line",
          data: {
            datasets: [
              {
                label: "SATTLED",
                data: [
                  {
                    x: 10,
                    y: 5,
                  },
                  {
                    x: 15,
                    y: 15,
                  },
                  {
                    x: 20,
                    y: 8,
                  },
                  {
                    x: 25,
                    y: 12,
                  },
                  {
                    x: 30,
                    y: 18,
                  },
                  {
                    x: 35,
                    y: 7,
                  },
                  {
                    x: 40,
                    y: 14,
                  },
                  {
                    x: 45,
                    y: 9,
                  },
                  {
                    x: 50,
                    y: 22,
                  },
                  {
                    x: 55,
                    y: 3,
                  },
                ],
                borderWidth: 2,
                tension: 0.3,
                borderColor: color1,
                backgroundColor: color1,
              },
            ],
          },
          options: {
            plugins: {
              tooltip: {
                backgroundColor: tooltip_bg,
                titleAlign: "center",
                cornerRadius: 10,
                usePointStyle: true,
                intersect: false,
                titleColor: tooltip_title,
                bodyColor: color1,
                borderColor: tooltip_border,
                borderWidth: 2,
                bodyFont: {
                  weight: 600,
                },
              },
              legend: {
                labels: {
                  color: color1,
                },
              },
            },
            scales: {
              x: {
                type: "linear",
                position: "bottom",
                border: {
                  width: 2,
                  color: color1,
                },
                grid: {
                  color: grid,
                  tickColor: grid,
                },
                ticks: {
                  color: color1,
                },
              },
              y: {
                type: "linear",
                position: "left",
                border: {
                  width: 2,
                  color: color1,
                },
                grid: {
                  color: grid,
                  tickColor: grid,
                },
                ticks: {
                  color: color1,
                },
              },
            },
            maintainAspectRatio: false,
          },
        });
        new Chart(ctx3, {
          type: "doughnut",
          data: {
            labels: ["WON", "LOST"],
            datasets: [
              {
                label: "VOTES",
                data: [c3_won, c3_lost],
                backgroundColor: [color1, color2],
                hoverOffset: 4,
                borderColor: "rgba(0, 0, 0, 0)",
              },
            ],
          },
          options: {
            plugins: {
              tooltip: {
                backgroundColor: tooltip_bg,
                titleAlign: "center",
                cornerRadius: 10,
                usePointStyle: true,
                intersect: false,
                titleColor: tooltip_title,
                bodyColor: color1,
                borderColor: tooltip_border,
                borderWidth: 2,
                bodyFont: {
                  weight: 600,
                },
              },
              legend: {
                labels: {
                  color: color1,
                },
              },
            },
            maintainAspectRatio: false,
          },
        });
        new Chart(ctx4, {
          type: "bar",
          data: {
            labels: [
              "REAL ESTATE",
              "M&A",
              "CORPORATE",
              "EMPLOYMENT",
              "ENVIROMENTAL",
              "LITIGATION",
              "IP",
            ],
            datasets: [
              {
                label: "WON",
                data: [50, 70, 60, 80, 60, 70, 80],
                backgroundColor: color1,
              },
              {
                label: "LOST",
                data: [15, 25, 30, 20, 35, 40, 30],
                backgroundColor: color2,
              },
              {
                label: "DECLINED",
                data: [10, 30, 45, 25, 35, 30, 30],
                backgroundColor: color3,
              },
            ],
          },
          options: {
            plugins: {
              tooltip: {
                backgroundColor: tooltip_bg,
                titleAlign: "center",
                cornerRadius: 10,
                usePointStyle: true,
                intersect: false,
                titleColor: tooltip_title,
                bodyColor: color1,
                borderColor: tooltip_border,
                borderWidth: 2,
                bodyFont: {
                  weight: 600,
                },
              },
              legend: {
                labels: {
                  color: color1,
                },
              },
            },
            indexAxis: "y",
            scales: {
              x: {
                type: "linear",
                position: "bottom",
                stacked: true,
                border: {
                  width: 2,
                  color: color1,
                },
                grid: {
                  color: grid,
                  tickColor: grid,
                },
                ticks: {
                  color: color1,
                },
              },
              y: {
                position: "left",
                stacked: true,
                border: {
                  width: 2,
                  color: color1,
                },
                grid: {
                  color: grid,
                  tickColor: grid,
                },
                ticks: {
                  color: color1,
                },
              },
            },
            maintainAspectRatio: false,
          },
        });
        new Chart(ctx5, {
          type: "line",
          data: {
            datasets: [
              {
                label: "SERIES",
                data: [
                  {
                    x: 0,
                    y: 0,
                  },
                  {
                    x: 3,
                    y: 200,
                  },
                  {
                    x: 6,
                    y: 300,
                  },
                  {
                    x: 9,
                    y: 150,
                  },
                  {
                    x: 12,
                    y: 350,
                  },
                  {
                    x: 15,
                    y: 100,
                  },
                  {
                    x: 18,
                    y: 250,
                  },
                  {
                    x: 21,
                    y: 200,
                  },
                  {
                    x: 24,
                    y: 400,
                  },
                  {
                    x: 27,
                    y: 50,
                  },
                ],
                borderWidth: 2,
                tension: 0.3,
                borderColor: color1,
                backgroundColor: color1,
              },
            ],
          },
          options: {
            plugins: {
              tooltip: {
                backgroundColor: tooltip_bg,
                titleAlign: "center",
                cornerRadius: 10,
                usePointStyle: true,
                intersect: false,
                titleColor: tooltip_title,
                bodyColor: color1,
                borderColor: tooltip_border,
                borderWidth: 2,
                bodyFont: {
                  weight: 600,
                },
              },
              legend: {
                labels: {
                  color: color1,
                },
              },
            },
            scales: {
              x: {
                type: "linear",
                position: "bottom",
                border: {
                  width: 2,
                  color: color1,
                },
                grid: {
                  color: grid,
                  tickColor: grid,
                },
                ticks: {
                  color: color1,
                },
              },
              y: {
                type: "linear",
                position: "left",
                border: {
                  width: 2,
                  color: color1,
                },
                grid: {
                  color: grid,
                  tickColor: grid,
                },
                ticks: {
                  color: color1,
                },
              },
            },
            maintainAspectRatio: false,
          },
        });
        new Chart(ctx6, {
          type: "line",
          data: {
            datasets: [
              {
                label: "REVENUE",
                data: c4,
                borderWidth: 2,
                tension: 0.3,
                borderColor: color1,
                backgroundColor: color1,
              },
            ],
          },
          options: {
            plugins: {
              tooltip: {
                backgroundColor: tooltip_bg,
                titleAlign: "center",
                cornerRadius: 10,
                usePointStyle: true,
                intersect: false,
                titleColor: tooltip_title,
                bodyColor: color1,
                borderColor: tooltip_border,
                borderWidth: 2,
                bodyFont: {
                  weight: 600,
                },
              },
              legend: {
                labels: {
                  color: color1,
                },
              },
            },
            scales: {
              x: {
                position: "bottom",
                border: {
                  width: 2,
                  color: color1,
                },
                grid: {
                  color: grid,
                  tickColor: grid,
                },
                ticks: {
                  color: color1,
                },
              },
              y: {
                type: "linear",
                position: "left",
                border: {
                  width: 2,
                  color: color1,
                },
                grid: {
                  color: grid,
                  tickColor: grid,
                },
                ticks: {
                  color: color1,
                },
              },
            },
            maintainAspectRatio: false,
          },
        });
        new Chart(ctx7, {
          type: "bar",
          data: {
            labels: [
              "CAMPAIGN",
              "EVENT",
              "REFERRAL",
              "SEMINAR",
              "SPONSORSHIP",
              "TICKETS",
            ],
            datasets: [
              {
                label: "WON",
                data: [30, 20, 25, 10, 15, 5, 20],
                backgroundColor: color1,
              },
              {
                label: "LOST",
                data: [5, 10, 15, 5, 20, 25, 15],
                backgroundColor: color2,
              },
            ],
          },
          options: {
            plugins: {
              tooltip: {
                backgroundColor: tooltip_bg,
                titleAlign: "center",
                cornerRadius: 10,
                usePointStyle: true,
                intersect: false,
                titleColor: tooltip_title,
                bodyColor: color1,
                borderColor: tooltip_border,
                borderWidth: 2,
                bodyFont: {
                  weight: 600,
                },
              },
              legend: {
                labels: {
                  color: color1,
                },
              },
            },
            scales: {
              x: {
                position: "bottom",
                border: {
                  width: 2,
                  color: color1,
                },
                grid: {
                  color: grid,
                  tickColor: grid,
                },
                ticks: {
                  color: color1,
                },
              },
              y: {
                position: "left",
                border: {
                  width: 2,
                  color: color1,
                },
                grid: {
                  color: grid,
                  tickColor: grid,
                },
                ticks: {
                  color: color1,
                },
              },
            },
            maintainAspectRatio: false,
          },
        });
      });
    });
  });
