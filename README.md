# asbplayer

asbplayer is a browser-based media player and Chrome extension for subtitle sentence mining, hosted at [https://killergerbah.github.io/asbplayer/](https://killergerbah.github.io/asbplayer/). Use asbplayer to combine subtitles and media extracted from streaming or local video sources to create media-rich Anki flashcards.

Thank you to all of my sponsors:

-   [@vivekchoksi](https://www.github.com/vivekchoksi)
-   [@nzarbayezid](https://www.github.com/nzarbayezid)
-   [@ManuJapan](https://www.github.com/ManuJapan)
-   AdamM
-   realgoodsmiley
-   Alex
-   [@m4eko](https://github.com/m4eko)
-   Simon
-   Attenius

... and to those who have donated privately.

Thank you to all those who have contributed to asbplayer:

-   [@Renji-XD](https://www.github.com/Renji-XD)
-   [@MatiasIslaA](https://www.github.com/MatiasIslaA)
-   [@cyphar](https://www.github.com/cyphar)

Thank you to all those who have translated asbplayer:

-   Mana Tsutsumi (Japanese, initial translation)
-   Kai Böse (German)

If you are a non-English native, and would like to help translate asbplayer, please contact me on [Discord](https://discord.gg/ad7VAQru7m).

## Getting Started (streaming video)

First, see if you can get started with one of the [community guides](#community-guides).

Otherwise, the following steps will work for any language:

1. Install a dictionary for your target language that allows you to do instant lookups. Popular ones are [Yomichan](https://chrome.google.com/webstore/detail/yomichan/ogmnaimimemjmbakcfefmnahgdfhfami) for Japanese and [VocabSieve](https://github.com/FreeLanguageTools/vocabsieve) for European languages.
2. Install the asbplayer Chrome [extension](https://github.com/killergerbah/asbplayer/releases/latest).
3. Install [Anki](https://apps.ankiweb.net/), and create a deck and note type.
4. Install the [AnkiConnect](https://ankiweb.net/shared/info/2055492159) plugin for Anki.
5. [Configure](https://killergerbah.github.io/asbplayer/?view=settings) asbplayer to create cards via AnkiConnect with your deck and note type.
6. Drag-and-drop a subtitle file into the streaming video you want to mine. You may have to [adjust the subtitle offset](#adjusting-subtitle-offset) to get the subtitles in sync.
7. When a subtitle appears that you want to mine, use <kbd>Ctrl+Shift+X</kbd> to open the Anki dialog.
8. Fill in the definition and word fields and then export the card. To fill in the definition field you may use the dictionary you installed in step 1.

## Usage

### Syncing with streaming video

Install the Chrome [extension](https://github.com/killergerbah/asbplayer/releases/latest). There are three ways to sync streaming video with asbplayer:

1. Drag-and-drop a subtitle file into the video element you want to sync.
2. Load a file into the [asbplayer site](https://killergerbah.github.io/asbplayer/) and click on the camera in the bottom right to pick a video element to sync. This is the recommended way to load BluRay subtitle files onto streaming video.
3. Use <kbd>Ctrl+Shift+F</kbd> to select a video element to sync. From the dialog that appears you can choose whether to load an [auto-detected subtitle track](#subtitle-track-detection-for-streaming-video) or an empty one.

### Loading files

Drag-and-drop media and subtitle files into the [asbplayer site](https://killergerbah.github.io/asbplayer/) to load them.

### Creating Anki flashcards

Make sure Anki and AnkiConnect are installed. Integration with AnkiConnect can be configured in the [settings](https://killergerbah.github.io/asbplayer/?view=settings) as in this [video](https://youtu.be/Mv7fEVb6PHo?t=44).

When a subtitle that you want to mine appears, <kbd>Ctrl+Shift+X</kbd> opens the Anki export dialog.

### Adjusting Anki flashcards

All text fields can be edited from the Anki export dialog before exporting the Anki flashcard.

To adjust audio or subtitle selection, adjust the selected time interval for the card using the slider at the bottom of the export dialog.
The newly selected time interval can be applied using the buttons in either the sentence or audio fields. See this [video](https://youtu.be/BSr_JusW8E8?t=34) for a demo of this.

### Adjusting subtitle offset

<kbd>Ctrl+Left/Right</kbd> will adjust subtitle offset so that the previous/next subtitle appears at the current timestamp. <kbd>Ctrl+Shift+Left/Right</kbd> will adjust offset by 100 ms increments.

You can also adjust offset manually by clicking on the "Subtitle Offset" text field in the controls in the asbplayer tab, typing a number, and pressing <kbd>Enter</kbd>.

### Subtitle track detection for streaming video

<kbd>Ctrl+Shift+F</kbd> will show detected subtitle tracks for streaming video. Below are the sites where automatic subtitle detection is supported:

-   Netflix
-   Youtube
-   Disney Plus (known issue: subtitles sometimes off by ~5 seconds)
-   Hulu
-   TVer
-   Bandai Channel
-   Amazon Prime (known issue: subtitles sometimes off by ~30 seconds)

<kbd>Ctrl+Shift+F</kbd> also allows you to choose an empty subtitle track so that you can mine streaming video without subtitles.

### Audio track selection for mkv files

An audio track selector will appear for `mkv` files if experimental web platform features are enabled from `chrome://flags`. Note that enabling this flag may cause issues with other features of asbplayer, such as card creation from streaming sources.

### Keyboard shortcuts

Most keyboard shortcuts shared by the extension and the website are customizable from the [asbplayer website settings](https://killergerbah.github.io/asbplayer/?view=settings#keyboard-shortcuts). These shortcuts can be toggled on and off from the extension popup. Extension-only shortcuts and some shared shortcuts that require special access to Chrome extension features are customizable from `chrome://extensions/shortcuts`.

## Common issues

### asbplayer isn't detecting streaming video.

-   Try refreshing both the asbplayer tab and the video in the other tab.
-   Make sure that in the extension details, the extension has access to all sites.
    A lot of video players are loaded inside of iframes, so it's difficult to
    know every single URL that the extension might need access to.

### The extension keyboard shortcuts aren't working.

-   Check `chrome://extensions/shortcuts`.
-   Check the keyboard shortcut settings from the asbplayer website.
-   You can also check the currently-bound shortcuts from the extension popup menu.
-   Try uninstalling and reinstalling the extension and restarting Chrome.
-   Make sure the extension isn't installed twice.

### The asbplayer website keyboard shortcuts aren't working.

-   See the [Keyboard Shortcuts](#keyboard-shortcuts) section.

### asbplayer can't connect to Anki. It shows an error message e.g. 'Failed to fetch.'

-   If you're using Brave, make sure asbplayer isn't being blocked by Shield.
-   Make sure that asbplayer is allowed by AnkiConnect, as in this [video](https://youtu.be/Mv7fEVb6PHo?t=44).
-   Check that your browser or an ad blocker isn't blocking the request. A good place to start is by opening your browser's developer console and looking for errors.
-   As of this writing enabling experimental web platform features is known to cause this issue. Try disabling this flag from `chrome://flags`.
-   On later versions of macOS AnkiConnect will not respond sometimes Anki is in the background. See "Notes for MacOS Users" at the AnkiConnect developer's [website](https://foosoft.net/projects/anki-connect/).

### When loading a local file asbplayer either shows a black screen, or doesn't play audio.

-   See the [Browser Compatibility](#browser-compatibility) section.

### asbplayer isn't including audio/screenshot in flashcards.

-   If you're mining streaming video make sure you use an extension keyboard shortcut (<kbd>Ctrl+Shift+X</kbd> by default) from the tab with the streaming video.

### asbplayer isn't properly cropping screenshots from streaming video.

-   Make sure the browser zoom setting is at 100%.
-   You can disable cropping altogether using the extension settings menu.

## Demos

-   [3 ways to mine streaming video with asbplayer](https://www.youtube.com/watch?v=HrIJZ6cUMFw)
-   [Sentence mining a video file with asbplayer](https://www.youtube.com/watch?v=BSr_JusW8E8)

## Community guides

-   [Shiki's Lazy Sentence Mining Workflow (Japanese)](https://docs.google.com/document/d/e/2PACX-1vQuEAoZFoJbULZzCJ3_tW7ayT_DcQl9eDlrXMnuPGTwDk62r5fQrXak3ayxBsEgkL85_Z-YY5W4yUom/pub)
-   [Sentence mining from Netflix and YouTube with asbplayer (Japanese)](https://soyuz18.notion.site/Sentence-mining-from-Netflix-and-YouTube-with-asbplayer-83a03590cd8349ba81ca10340645b565)
-   [Refold's installation guide](https://www.youtube.com/watch?v=Pv4Sp01Uh64)
-   [Refold's sentence mining guide (Japanese + European languages)](https://www.youtube.com/watch?v=jXO4gmCmcNE)

## Browser compatibility

The asbplayer application and extension have only been tested on the latest version Chrome and likely work on other Chromium-based browsers.

Local video file playback is supported only for codecs supported by the browser. The [animebook](https://github.com/animebook/animebook.github.io#video-format-support) readme has a detailed explanation of this and links to browsers that have good compatibility. Personally, I use Microsoft Edge and paid one dollar for HEVC support.

## Contributing

Pull requests are welcome! However, to reduce back-and-forth during review ideally consult with me on the corresponding issue or on [Discord](https://discord.gg/ad7VAQru7m) before attempting changes to UI/UX. When making changes, format code according to the Prettier config and attempt to match the style of surrounding code.

## Building and running

```
# Install yarn
npm install --global yarn

# Make sure you're on yarn 3
yarn set version berry && yarn set version canary

# Install dependencies
yarn

# Starts the development server
yarn workspace @project/client run start

# Build the extension to extension/dist
yarn workspace @project/extension buildDev
```

If you have problems building try deleting `node_modules` and re-running `yarn`.

## Contact

Submit bugs or feature requests from the [issues page](https://github.com/killergerbah/asbplayer/issues). Join the [Discord](https://discord.gg/ad7VAQru7m) server to talk with me and other language learners.

## Donations

If you've benefited from asbplayer, please consider supporting my work via [Github Sponsors](https://github.com/sponsors/killergerbah?frequency=one-time) or [Ko-fi](https://ko-fi.com/killergerbah).
