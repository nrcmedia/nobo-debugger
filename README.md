# nobo-debugger
Browser extension to show comScore/NOBO tracker request values

![Screenshot of nobo-debugger Chrome extension in use](/doc/screenshot.png)

## Install in Chrome
- Clone or download this repo to a local dir
- Open Chrome, go to **Menu** -> **More Tools** -> **Extensions**
- Enable **Developer mode** checkbox
- Click **Load unpacked extension...**
- Select `nobo-debugger-chrome-ext` dir

## Usage
After installation, any webpage that does a NOBO-request should show a blue 'NOBO' icon at the end of the Address bar. Clicking it will reveal a popup showing all `nb_*` values sent to NOBO for the current page.

## Limitations
This version is currently limited to showing only one NOBO-request per tab; be advised that unpredicable results may happen when a webpage does a secondary request in the same tab, for example when an article is opened in a popup/overlay/iframe.
