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
  'dojo/Deferred',
  'jimu/BaseWidgetSetting',
  'jimu/portalUtils',
  'dijit/_WidgetsInTemplateMixin',
  'dijit/form/Select',
  'jimu/dijit/CheckBox'
],
function(
  declare,
  lang,
  Deferred,
  BaseWidgetSetting,
  portalUtils,
  _WidgetsInTemplateMixin) {

  return declare([BaseWidgetSetting, _WidgetsInTemplateMixin], {

    baseClass: 'jimu-widget-measurement-setting',

    postCreate: function(){
      if (!this.config.measurement) {
        this.config.measurement = {};
      }

      // hide the checkboxes
      // until more measurement options are available
      // this.showArea.setStatus(false);
      // // this.showDistance.setStatus(false);
      // this.showLocation.setStatus(false);
    },

    startup: function() {
      this.inherited(arguments);

      this.setConfig(this.config);
    },

    setConfig: function(config){
      if(!config) return;

      this.config = config;

      this._processConfig(config).then(lang.hitch(this, function(configJson) {

        //

        if (configJson.measurement && configJson.measurement.lengthUnit) {
          this.selectLengthUnit.set('value', configJson.measurement.lengthUnit);
        } else {
          this.selectLengthUnit.set('value', configJson.defaultLengthUnit);
        }

        // hide all options until more are available
        // // only show "distance" as the available option for now
        // this.showDistance.setValue(true);
        // this.showArea.setValue(false);
        // this.showLocation.setValue(false);
      }));


    },

    getConfig: function(){
      this.config.measurement.lengthUnit = this.selectLengthUnit.value;

      // hide all options until more are available
      // this.config.showArea = this.showArea.checked;
      // this.config.showDistance = this.showDistance.checked;
      // this.config.showLocation = this.showLocation.checked;

      return this.config;
    },


    _processConfig: function(configJson) {
      var def = new Deferred();
      if (configJson.defaultLengthUnit) {
        def.resolve(configJson);
      } else {
        portalUtils.getUnits(this.appConfig.portalUrl).then(function(units) {
          configJson.defaultLengthUnit = units === 'english' ?
            'imperial' : 'metric'
          def.resolve(configJson);
        });
      }

      return def;
    }

  });
});