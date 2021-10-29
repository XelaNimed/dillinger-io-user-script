[![Version_badge](https://img.shields.io/badge/dynamic/json?style=flat-square&color=%232C3E50&label=Version&query=%24.UserScript.version%5B0%5D.value&url=https%3A%2F%2Fopenuserjs.org%2Fmeta%2FXelaNimed%2FDillinger.io.meta.json)](https://openuserjs.org/scripts/XelaNimed/Dillinger.io)
[![OpenUserJS_badge](https://img.shields.io/badge/dynamic/json?style=flat-square&suffix=%20installs&color=%232C3E50&label=OpenUserJS&query=%24.OpenUserJS.installs%5B0%5D.value&url=https%3A%2F%2Fopenuserjs.org%2Fmeta%2FXelaNimed%2FDillinger.io.meta.json)](https://openuserjs.org/scripts/XelaNimed/Dillinger.io)
[![GreasyFork badge](https://img.shields.io/badge/dynamic/json?style=flat-square&color=%232C3E50&label=GreasyFork&query=total_installs&suffix=%20installs&url=https%3A%2F%2Fgreasyfork.org%2Fscripts%2F434565.json)](https://greasyfork.org/en/scripts/434565-dillinger-io)

# User Script for Dillinger.io

Adds the ability to export and import documents from local storage in raw format (see `Export as` and `Import from` menus).  
When exporting documents, you can select the option to automatically delete documents after exporting.

## How to use

To export all the documents present in the local storage, click on the `Export as` menu and select the `Raw` menu item, then, in the confirmation window that appears, you can select the option to delete the documents after exporting by clicking on `Ok`. In the Save File dialog box that appears, select a location to save the export file.

To import previously saved documents, select the `Raw` item in the `Import from` menu and select the previously exported file in the dialog box that appears.

> Note: keep in mind that the script doesn't check the data for correctness and assumes that the imported files were previously exported by the script.


![How to use](https://github.com/XelaNimed/dillinger-io-user-script/blob/master/images/usage.gif)
