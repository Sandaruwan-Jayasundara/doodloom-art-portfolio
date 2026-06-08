(function () {
  "use strict";

  const grid = document.getElementById("gallery-grid");
  const errorBox = document.getElementById("gallery-error");
  
  function getImagePath(file) {
    const value = String(file || "").trim();

    if (!value) {
      return "";
    }

    if (
      value.startsWith("images/") ||
      value.startsWith("./images/") ||
      value.startsWith("/") ||
      value.startsWith("http://") ||
      value.startsWith("https://")
    ) {
      return value;
    }

    return `images/${value}`;
  }

  function showError(title, message) {
    if (!errorBox) {
      return;
    }

    errorBox.innerHTML = "";

    const heading = document.createElement("strong");
    heading.textContent = title;

    const text = document.createElement("p");
    text.textContent = message;

    errorBox.append(heading, text);
    errorBox.hidden = false;
  }

  function hideError() {
    if (!errorBox) {
      return;
    }

    errorBox.hidden = true;
    errorBox.innerHTML = "";
  }

  function createArtworkCard(item) {
    const imagePath = getImagePath(item.file);
    const title = String(item.title || "Untitled artwork").trim();
    const caption = String(item.caption || "").trim();

    if (!imagePath) {
      return null;
    }

    const card = document.createElement("article");
    card.className = "artwork-card";
    card.setAttribute("role", "listitem");

    const imageWrap = document.createElement("div");
    imageWrap.className = "card-image-wrap";

    const placeholder = document.createElement("div");
    placeholder.className = "card-image-placeholder";
    placeholder.textContent = "Image loading";

    const image = document.createElement("img");
    image.className = "card-image";
    image.src = imagePath;
    image.alt = `Illustration titled ${title}`;
    image.loading = "lazy";
    image.decoding = "async";

    image.addEventListener("load", function () {
      placeholder.remove();
    });

    image.addEventListener("error", function () {
      image.remove();
      placeholder.className = "card-image-fallback";
      placeholder.textContent = "Image not found";
    });

    imageWrap.append(placeholder, image);

    const body = document.createElement("div");
    body.className = "card-body";

    const heading = document.createElement("h3");
    heading.className = "card-title";
    heading.textContent = title;

    body.appendChild(heading);

    if (caption) {
      const text = document.createElement("p");
      text.className = "card-caption";
      text.textContent = caption;
      body.appendChild(text);
    }

    card.append(imageWrap, body);

    return card;
  }

  function renderGallery(items) {
    if (!grid) {
      return;
    }

    const list = Array.isArray(items) ? items : [];
    const fragment = document.createDocumentFragment();

    grid.innerHTML = "";

    list.forEach(function (item) {
      const card = createArtworkCard(item);

      if (card) {
        fragment.appendChild(card);
      }
    });

    if (!fragment.childNodes.length) {
      showError(
        "No artwork found",
        "Add at least five valid artwork entries to gallery.json.",
      );
      return;
    }

    hideError();
    grid.appendChild(fragment);
  }

  async function loadGallery() {
    try {
      const response = await fetch("gallery.json", {
        cache: "no-store",
      });

      if (!response.ok) {
        throw new Error("gallery.json could not be loaded.");
      }

      const data = await response.json();
      const items = Array.isArray(data) ? data : data.items;

      renderGallery(items);
    } catch (error) {
      console.warn(error);
    }
  }

  loadGallery();
})();
