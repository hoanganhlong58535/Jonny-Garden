window.addEventListener("load", function () {
  const cookieBanner = document.getElementById("cookieBanner");
  const acceptButton = document.getElementById("cookieAcceptBtn");
  const rejectButton = document.getElementById("cookieRejectBtn");

  if (!cookieBanner) return;

  function setCookie(name, value, days) {
    const date = new Date();
    date.setTime(date.getTime() + days * 24 * 60 * 60 * 1000);
    const expires = "expires=" + date.toUTCString();
    document.cookie = name + "=" + encodeURIComponent(value) + ";" + expires + ";path=/;SameSite=Lax";
  }

  function getCookie(name) {
    const cookies = document.cookie ? document.cookie.split("; ") : [];
    for (let i = 0; i < cookies.length; i++) {
      const parts = cookies[i].split("=");
      const cookieName = parts.shift();
      const cookieValue = parts.join("=");
      if (cookieName === name) return decodeURIComponent(cookieValue || "");
    }
    return null;
  }

  if (getCookie("cookies_accepted") === null) {
    cookieBanner.classList.add("show");
  } else {
    cookieBanner.classList.remove("show");
  }

  if (acceptButton) {
    acceptButton.addEventListener("click", function () {
      setCookie("cookies_accepted", "true", 365);
      cookieBanner.classList.remove("show");
    });
  }

  if (rejectButton) {
    rejectButton.addEventListener("click", function () {
      setCookie("cookies_accepted", "false", 365);
      cookieBanner.classList.remove("show");
    });
  }
});
