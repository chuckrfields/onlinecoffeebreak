(function () {
  var toggle = document.querySelector(".nav-toggle");
  var nav = document.querySelector(".site-nav");
  if (toggle && nav) {
    toggle.addEventListener("click", function () {
      var open = nav.classList.toggle("open");
      toggle.setAttribute("aria-expanded", open ? "true" : "false");
    });
  }

  function formatDate(iso) {
    if (!iso) return "Date not in the capture";
    var d = new Date(iso + "T12:00:00");
    return d.toLocaleDateString("en-US", { month: "long", day: "numeric", year: "numeric" });
  }

  function card(ep) {
    var season = ep.season === "Later" ? "Later special" : "Season " + ep.season;
    var epNo = ep.episode ? " · Episode " + ep.episode : "";
    var watch = ep.youtube
      ? '<a href="' + ep.youtube + '" rel="noopener">Watch</a>'
      : '<a href="https://www.youtube.com/@youronlinecoffeebreak" rel="noopener">YouTube channel</a>';
    return (
      '<article class="episode" id="' + ep.id + '">' +
        '<div class="meta"><span>' + formatDate(ep.date) + '</span><span>' + season + epNo + '</span><span>' + ep.category + '</span><span>' + ep.minutes + '</span></div>' +
        '<h3>' + ep.title + '</h3>' +
        '<p>' + ep.summary + '</p>' +
        '<p>' + watch + ' · <a href="https://open.spotify.com/show/3PTh8YE6Fi4L7sUTMGk0wC" rel="noopener">Spotify</a></p>' +
      '</article>'
    );
  }

  function render(list, episodes) {
    var limit = Number(list.getAttribute("data-limit") || episodes.length);
    var cat = list.getAttribute("data-category") || "All";
    var filtered = episodes.filter(function (ep) { return cat === "All" || ep.category === cat; });
    filtered.sort(function (a, b) { return (b.date || "") < (a.date || "") ? -1 : 1; });
    list.innerHTML = filtered.slice(0, limit).map(card).join("");
  }

  var lists = document.querySelectorAll(".episode-list");
  if (!lists.length) return;
  fetch("data/episodes.json")
    .then(function (r) { return r.json(); })
    .then(function (episodes) {
      lists.forEach(function (list) { render(list, episodes); });
      document.querySelectorAll(".chip").forEach(function (chip) {
        chip.addEventListener("click", function () {
          document.querySelectorAll(".chip").forEach(function (c) { c.setAttribute("aria-pressed", "false"); });
          chip.setAttribute("aria-pressed", "true");
          lists.forEach(function (list) {
            list.setAttribute("data-category", chip.getAttribute("data-category"));
            render(list, episodes);
          });
        });
      });
    })
    .catch(function () {
      lists.forEach(function (list) {
        list.innerHTML = "<p>Episode list could not be loaded. Open this site from a local server or GitHub Pages.</p>";
      });
    });
})();
