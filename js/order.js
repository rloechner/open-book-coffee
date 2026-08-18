(function () {
  "use strict";

  var ENDPOINT = "https://ntfy.sh/open-book-rloechner";
  var DRINKS = {
    drip: "House drip",
    espresso: "Espresso",
    americano: "Americano",
    latte: "Latte",
    cappuccino: "Cappuccino",
    oat_latte: "Oat latte",
    cold_brew: "Cold brew"
  };

  var form = document.getElementById("order-form");
  var statusEl = document.getElementById("order-status");
  if (!form) return;

  function setStatus(text, kind) {
    if (!statusEl) return;
    statusEl.textContent = text;
    statusEl.dataset.kind = kind || "";
  }

  form.addEventListener("submit", function (event) {
    event.preventDefault();
    var data = new FormData(form);
    var customer = String(data.get("customer") || "").trim();
    var drink = String(data.get("drink") || "").trim();
    var note = String(data.get("note") || "").trim();
    if (!customer || !DRINKS[drink]) {
      setStatus("Name and a menu drink, please.", "err");
      return;
    }

    var title = "Order: " + drink + " for " + customer;
    var body = "customer: " + customer + "\ndrink: " + drink + (note ? "\nnote: " + note : "");
    var btn = form.querySelector('[type="submit"]');
    if (btn) btn.disabled = true;
    setStatus("Sending to the bar…", "");

    fetch(ENDPOINT, {
      method: "POST",
      headers: {
        "Title": title,
        "Tags": "coffee",
        "Content-Type": "text/plain"
      },
      body: body
    })
      .then(function (res) {
        if (!res.ok) throw new Error("counter " + res.status);
        setStatus("Ticket in. If the shop is open, Jules will ring it up.", "ok");
        form.reset();
      })
      .catch(function () {
        setStatus("Didn't go through. Try the POST in For Grok Bots, or come back in a minute.", "err");
      })
      .finally(function () {
        if (btn) btn.disabled = false;
      });
  });
})();
