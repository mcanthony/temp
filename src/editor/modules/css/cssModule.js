'use strict';

var CssTrack = require('./CssTrack');
var ParamsTab = require('./paramsTab/ParamsTab');
var qsgen = require('../../qsgen');

var paramsTab;

exports.init = function () {

    paramsTab = new ParamsTab();

    am.registerTrackType(CssTrack, CssTrack.prototype.type);

    am.on('selectDomElem', onSelectDomElem);

    am.workspace.fillTab('Css Style', paramsTab.domElem);

    am.domPicker.on('add', function (e) {

        e.demand(10).than(() => {

            am.domPicker.hide();

            var selector = qsgen(e.target);
            console.log('selector:', selector);

            var track = new CssTrack({
                selectors: [{type: 'css', value: selector}],
                paramTree: {save: {name: selector}},
            });

            am.timeline.addTrack(track);

            am.selectTrack(track);
        });
    });
};

function onSelectDomElem(de) {

    am.timeline.tracks.forEach(function (track) {

        if (track instanceof CssTrack) {

            if (track.isOwnedDomElem(de)) {

                am.selectTrack(track);
                track.focusTransformer(de);
                am.domPicker.hide();
            }
            else {
                if (am.selectedTrack === track) {

                    am.deselectTrack();
                } 
            }
        }
    });
}