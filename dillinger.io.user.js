// ==UserScript==
// @name        Dillinger.io
// @namespace   https://github.com/XelaNimed
// @version     0.1
// @description Adds the ability to export and import documents from local storage in raw format (see "Export as" and "Import from" menus). When exporting documents, you can select the option to automatically delete documents after exporting.
// @author      XelaNimed
// @copyright   2021, XelaNimed (https://github.com/XelaNimed)
// @updateURL   https://raw.githubusercontent.com/XelaNimed/dillinger-io-user-script/master/stackoverflow.user.js
// @downloadURL https://raw.githubusercontent.com/XelaNimed/dillinger-io-user-script/master/stackoverflow.user.js
// @homepageURL https://raw.githubusercontent.com/XelaNimed/dillinger-io-user-script
// @supportURL  https://github.com/XelaNimed/dillinger-io-user-script/issues
// @license     MIT
// @match       https://dillinger.io/
// @icon        https://www.google.com/s2/favicons?domain=dillinger.io&sz=32
// @require     https://cdn.jsdelivr.net/npm/jquery@3.4.1/dist/jquery.min.js#sha256-CSXorXvZcTkaix6Yvo6HppcZGetbYMGWSFlBw8HfCJo=
// @grant       none
// ==/UserScript==

(function($) {

    'use strict';

    $(document).ready(function() {

        const exportMenuSelector = `.menu.menu-utilities>li:nth-child(2)>ul`;
        const importMenuSelector = `.menu.menu-utilities>li:nth-child(4)>ul`;
        const exportMenu = $(exportMenuSelector);
        const importMenu = $(importMenuSelector);
        const exportText = `Raw`;
        const importText = `Raw`;
        const localStorageFilesKey = `files`;
        const localStorageCurrentDocumentKey = `currentDocument`;
        const jsonFileName = `dilinger_raw.json`;
        const confirmMessageByOverwrite = `Keep in mind that the script does not check the syntax of the imported data and assumes that the imported file was previously exported. After applying the settings, the page will reload and all saved documents will be overwritten. Continue?`;
        const confirmMessageByExport = `Delete saved documents after exporting and then reloading the page?`;

        const saveJSON = function (data, filename) {

            if(typeof data === 'object') {
                data = JSON.stringify(data, undefined, 4);
            }

            var blob = new Blob([data], {type: 'text/json'}),
                e = document.createEvent('MouseEvents'),
                a = document.createElement('a');

            a.download = filename;
            a.href = window.URL.createObjectURL(blob);
            a.dataset.downloadurl = ['text/json', a.download, a.href].join(':');
            e.initMouseEvent('click', true, false, window, 0, 0, 0, 0, 0, false, false, false, false, 0, null);
            a.dispatchEvent(e);
        };

        const readJSON = function (files) {
            if(files && files.length === 1) {
                const fr = new FileReader();
                fr.readAsText(files[0]);
                fr.onload = function(e){
                    if(confirm(confirmMessageByOverwrite)) {
                        const json = JSON.parse(e.target.result);
                        localStorage.setItem(localStorageCurrentDocumentKey, JSON.stringify(json[0]));
                        localStorage.setItem(localStorageFilesKey, e.target.result);
                        window.location.reload();
                    }
                };
            }
        };

        if(exportMenu.length > 0) {

            let a = document.createElement('a');
                a.innerText = exportText;
                a.addEventListener('click', function(e) {
                    const deleteSavedDocs = confirm(confirmMessageByExport);
                    saveJSON(localStorage.getItem(localStorageFilesKey), jsonFileName);
                    if(deleteSavedDocs){
                        localStorage.removeItem(localStorageFilesKey);
                        localStorage.removeItem(localStorageCurrentDocumentKey);
                        window.location.reload();
                    }
                    e.preventDefault();
                });

            let li = document.createElement('li');
                li.appendChild(a);

            exportMenu[0].appendChild(li);

        } else {
            console.error("Export menu not found by selector: %s", exportMenuSelector);
        }

        if(importMenu.length > 0) {

            let inp = document.createElement('input');
                inp.id = 'fileElem';
                inp.type = 'file';
                inp.multiple = false;
                inp.accept = 'application/json';
                inp.style.display = 'none';
                inp.onchange = function(){
                    readJSON(this.files);
                };

            let span = document.createElement('span');
                span.innerText = importText;

            let a = document.createElement('a');
                a.appendChild(span);
                a.addEventListener('click', function(e) {
                    inp.click();
                    e.preventDefault();
                });

            let li = document.createElement('li');
                li.appendChild(a);
                li.appendChild(inp);
                importMenu[0].appendChild(li);

        } else {
            console.error("Import menu not found by selector: %s", importMenuSelector);
        }

    });

})(window.jQuery);