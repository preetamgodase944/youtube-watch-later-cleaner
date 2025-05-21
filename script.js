
---

## 📄 `script.js`

```js
(async () => {
  const delay = ms => new Promise(res => setTimeout(res, ms));
  const log = msg => console.log(`[WatchLater Remover] ${msg}`);

  log("Starting removal process...");

  let removedCount = 0;
  let cycles = 0;

  while (true) {
    const menuButtons = Array.from(document.querySelectorAll('ytd-playlist-video-renderer #button[aria-label]'))
      .filter(btn => btn.offsetParent !== null); // visible buttons

    if (menuButtons.length === 0) {
      log("No more videos found. Exiting.");
      break;
    }

    log(`Found ${menuButtons.length} videos to process in this cycle.`);

    for (const btn of menuButtons) {
      btn.click();
      await delay(400);

      const removeBtn = document.evaluate(
        '//*[@id="items"]/ytd-menu-service-item-renderer[3]',
        document,
        null,
        XPathResult.FIRST_ORDERED_NODE_TYPE,
        null
      ).singleNodeValue;

      if (removeBtn) {
        removeBtn.click();
        removedCount++;
        log(`Removed video #${removedCount}`);
      } else {
        log("Remove button not found. Skipping.");
      }

      await delay(500);
    }

    await delay(1500);
    cycles++;

    // Scroll to load more
    window.scrollBy(0, 1000);
    await delay(1000);

    // Safety exit if too many cycles
    if (cycles > 50) {
      log("Too many cycles, stopping to avoid infinite loop.");
      break;
    }
  }

  log(`Finished! Total videos removed: ${removedCount}`);
})();

