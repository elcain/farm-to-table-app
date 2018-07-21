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
  'dojo/on',
  'dojo/dom-class',
  'dojo/Deferred',
  'jimu/BaseWidget',
  'esri/widgets/DirectLineMeasurement3D',
  'dojo/i18n!esri/widgets/DirectLineMeasurement3D/nls/DirectLineMeasurement3D'
], function(
  declare,
  lang,
  on,
  domClass,
  Deferred,
  BaseWidget,
  DirectLineMeasurement3D, 
  i18n_Measure) {

  var clazz = declare([BaseWidget], {

    baseClass: 'jimu-widget-measurement',
    name: 'Measurement',
    measurementWidget: null,
    CSS: {
      // CSS classes taken from API 4. This is only a temporary solution 
      //before all measurement widgets are available.
      clearButton: 'esri-direct-line-measurement-3d__clear-button'
    }, 

    //--------------------------------------------------------------------------
    //
    //  Lifecycle
    //
    //--------------------------------------------------------------------------

    postCreate: function() {
      this.inherited(arguments);      

      this.measurementButton.textContent = i18n_Measure.newMeasurement;
      this.measurementButton.className = 'esri-button ' + this.CSS.clearButton;

      this.own(
        on(this.measurementButton, 'click', lang.hitch(this, function() {
          this.activate();
        }))
      );
    },

    startup: function() {
      this.inherited(arguments);
    },

    destroy: function() {
      if (this.measurementWidget) {
        this.measurementWidget.destroy();
      }
      this.inherited(arguments);
    },

    onClose: function() {
      if (this.measurementWidget) {
        this.measurementWidget.viewModel.tool.stop();
        this.measurementWidget.viewModel.tool.deactivate();
        if(this.measurementWidget.viewModel.state === 'ready') {
          // if the measurement has started a new measuring process:
          // reset the UI to the initial state
          this.resetUI();
        }        
      }
    },

    onActive: function() {
      this.activate();
    },

    onDeActive: function() {
      this.onClose();
    },

    //--------------------------------------------------------------------------
    //
    //  Private Methods
    //
    //--------------------------------------------------------------------------

    _applyConfig: function(configJson) {
      if(!(configJson && this.measurementWidget)) return;

      // update measurement widget according to the config.
      if(configJson.measurement &&
         configJson.measurement.lengthUnit) {
        this.measurementWidget.unit = configJson.measurement.lengthUnit;
      } else if(configJson.defaultLengthUnit) {
        this.measurementWidget.unit = configJson.defaultLengthUnit;
      }
      // else condition: 'esri/widgets/DirectLineMeasurement3D'is able to
      //pick up the unit set in a user's profile
    },

    _createWidget: function() {
      // make sure the widget has been initialized
      this._ensureWidget().then(lang.hitch(this, function(measureWidget) {
        this._applyConfig(this.config);
      }));
    },

    _ensureWidget: function() {
      var def = new Deferred();
      if(!this.measurementWidget) {
        var measureWidgetContainer = document.createElement('div');
        window.test = this.measurementWidget = new DirectLineMeasurement3D({
          container: measureWidgetContainer,
          view: this.sceneView
        });
        this.measurementDiv.appendChild(measureWidgetContainer);
      }
      def.resolve(this.measurementWidget);
      return def;
    },

    //--------------------------------------------------------------------------
    //
    //  Public Methods
    //
    //--------------------------------------------------------------------------

    activate: function() {
      domClass.add(this.measurementButtonDiv, 'hidden');
      domClass.remove(this.measurementDiv, 'hidden');
      this._createWidget();
      if(this.measurementWidget && 
         this.measurementWidget.viewModel &&
         this.measurementWidget.viewModel.tool) {
        this.measurementWidget.viewModel.tool.activate();
      }
    },

    resetUI: function() {
      domClass.remove(this.measurementButtonDiv, 'hidden');
      domClass.add(this.measurementDiv, 'hidden');
    }

  });

  return clazz;

});