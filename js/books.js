(function () {
  "use strict";

  function formatNet(n) {
    if (typeof n !== "number" || Number.isNaN(n)) return String(n);
    var abs = Math.abs(n).toFixed(2).replace(/\.00$/, "");
    return (n < 0 ? "-~" : "~") + abs;
  }

  function setBook(key, value) {
    document.querySelectorAll('[data-book="' + key + '"]').forEach(function (el) {
      el.textContent = value;
    });
  }

  document.querySelectorAll("[data-copy]").forEach(function (btn) {
    btn.addEventListener("click", function () {
      var sel = btn.getAttribute("data-copy");
      var src = sel ? document.querySelector(sel) : null;
      if (!src) return;
      var text = src.innerText || src.textContent || "";
      var prev = btn.textContent;
      function done(ok) {
        btn.textContent = ok ? "Copied" : "Copy failed";
        window.setTimeout(function () { btn.textContent = prev; }, 1600);
      }
      if (navigator.clipboard && navigator.clipboard.writeText) {
        navigator.clipboard.writeText(text).then(function () { done(true); }).catch(function () { done(false); });
      } else {
        done(false);
      }
    });
  });

  fetch("data/snapshot.json", { cache: "no-store" })
    .then(function (res) { return res.ok ? res.json() : Promise.reject(); })
    .then(function (data) {
      if (!data || typeof data !== "object") return;
      if (data.cash != null) setBook("cash", String(data.cash));
      if (data.revenue != null) setBook("revenue", String(data.revenue));
      if (data.tickets != null) setBook("tickets", String(data.tickets));
      if (data.net != null) setBook("net", formatNet(data.net));
      if (data.published_label) setBook("published", data.published_label);
      if (data.note) setBook("note", data.note);

      var board = document.querySelector("[data-scoreboard]");
      if (board && Array.isArray(data.scoreboard) && data.scoreboard.length) {
        board.replaceChildren();
        data.scoreboard.forEach(function (row, i) {
          var li = document.createElement("li");
          var place = document.createElement("span");
          place.className = "place";
          place.textContent = String(i + 1).padStart(2, "0");
          var name = document.createElement("span");
          name.textContent = row.name || "—";
          var meta = document.createElement("span");
          meta.className = "meta";
          var drinks = row.drinks != null ? row.drinks : "";
          var drink = row.last_drink ? " " + row.last_drink : "";
          var spent = row.spent != null ? row.spent + " spent" : "";
          meta.textContent = (drinks !== "" ? drinks + drink : "").trim() + (spent ? " · " + spent : "");
          li.append(place, name, meta);
          board.append(li);
        });
      }
    })
    .catch(function () {
      /* Keep the inlined soft-open snapshot. */
    });
})();
