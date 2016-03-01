# nobo-debugger
Browser extension to show comScore/NOBO tracker request values

![Screenshot of nobo-debugger Chrome extension in use](/doc/screenshot.png)

## Install in Chrome
- Clone or download this repo to a local dir
- Open `chrome://extensions`
- Click `Load unpacked extension...`
- Select `nobo-debugger-chrome-ext` dir

## Usage
After installation, any webpage that does a NOBO-request should show a blue 'NOBO' icon at the end of the Address bar. Clicking it will reveal a popup showing all `nb_*` values sent to NOBO for the current page.
