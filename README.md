# YouTube Watch Later Cleaner

A simple browser console script to **bulk remove videos** from your YouTube **Watch Later** playlist in just a few clicks.

![demo](https://img.shields.io/badge/script-type--safe-green)  
> ⚠️ Use responsibly. This script modifies your YouTube playlist.

---

## 🔧 What It Does

- Clicks the menu (⋮) on each video in your Watch Later list
- Clicks "Remove from Watch later"
- Loops through all visible videos
- Scrolls down and repeats until done

---

## ✅ How to Use

1. Open your browser and go to  
   👉 [https://www.youtube.com/playlist?list=WL](https://www.youtube.com/playlist?list=WL)

2. Scroll down to load more videos (optional for speed).

3. Open **Developer Tools** → Console (`Ctrl + Shift + J` on most browsers)

4. Paste the script from [`script.js`](./script.js) into the console and press `Enter`.

5. Let it run — it will clean your Watch Later list automatically.

---

## ⚙️ script.js

See [`script.js`](./script.js) or copy it directly below:

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
```
## 🛡️ Disclaimer

This project is not affiliated with YouTube or Google in any way.
Use it responsibly and at your own risk.

## 📄 License

MIT License 

## 💬 Contributing

Feel free to open issues, request features, or submit PRs!
