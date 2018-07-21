///////////////////////////////////////////////////////////////////////////
// Copyright © 2014 - 2018 Esri. All Rights Reserved.
//
// Licensed under the Apache License Version 2.0 (the "License");
// you may not use this file except in compliance with the License.
// You may obtain a copy of the License at
//
//    http://www.apache.org/licenses/LICENSE-2.0
//
// Unless required by applicable law or agreed to in writing, software
// distributed under the License is distributed on an "AS IS" BASIS,
// WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
// See the License for the specific language governing permissions and
// limitations under the License.
///////////////////////////////////////////////////////////////////////////

define([
    'dojo/_base/declare',
    'dojo/_base/lang',
    'dojo/_base/html',
    'dojo/on',
    './Utils',
    'dijit/_WidgetsInTemplateMixin',
    'jimu/BaseWidget',
    'jimu/LayerInfos/LayerInfos',
    'esri/dijit/Legend'
], function(declare, lang, html, on, legendUtils,
_WidgetsInTemplateMixin, BaseWidget, LayerInfos, Legend) {

  var clazz = declare([BaseWidget, _WidgetsInTemplateMixin], {
    name: 'Legend',
    baseClass: 'jimu-widget-legend',
    legend: null,
    _jimuLayerInfos: null,

    startup: function() {
      this.inherited(arguments);
    },

    onOpen: function() {
      if(!this.config.layerState || this.config.syncWithWebmap) {
        // compatible before online5.4
        this.config.layerState = {};
      }
      this._jimuLayerInfos = LayerInfos.getInstanceSync();
      var legendParams = {
        arrangement: this.config.legend.arrangement,
        autoUpdate: this.config.legend.autoUpdate,
        respectCurrentMapScale: this.config.legend.respectCurrentMapScale,
        //respectVisibility: false,
        map: this.map,
        layerInfos: this._getLayerInfosParam()
      };
      this.legend = new Legend(legendParams, html.create("div", {}, this.domNode));
      this.legend.startup();
      this._bindEvent();
    },

    onClose: function() {
      this.legend.destroy();
    },

    _bindEvent: function() {
      if(this.config.legend.autoUpdate) {
        this.own(on(this._jimuLayerInfos,
                    'layerInfosIsShowInMapChanged',
                    lang.hitch(this, 'refreshLegend')));

        this.own(on(this._jimuLayerInfos,
                    'layerInfosChanged',
                    lang.hitch(this, 'refreshLegend')));

        this.own(on(this._jimuLayerInfos,
                    'layerInfosRendererChanged',
                    lang.hitch(this, 'refreshLegend')));
      }
    },

    _getLayerInfosParam: function() {
      var layerInfosParam;

      /*
      if(this.config.legend.layerInfos === undefined) {
        // widget has not been configed.
        layerInfosParam = legendUtils.getLayerInfosParam();
      } else {
        // widget has been configed, respect config.
        layerInfosParam = legendUtils.getLayerInfosParamByConfig(this.config.legend);
      }
      */

      layerInfosParam = legendUtils.getLayerInfosParam(this.config);

      return layerInfosParam;
    },

    refreshLegend: function() {
      var layerInfos = this._getLayerInfosParam();
      this.legend.refresh(layerInfos);
    }

  });
  return clazz;
});
