// All material copyright ESRI, All Rights Reserved, unless otherwise specified.
// See http://js.arcgis.com/3.15/esri/copyright.txt and http://www.arcgis.com/apps/webappbuilder/copyright.txt for details.

require({cache:{"url:builder/plugins/attribute-config/dataSource/DataFields.html":'\x3cdiv\x3e\r\n\t\x3cdiv data-dojo-attach-point\x3d"fieldsContent" class\x3d"fields-content"\x3e\r\n\t\x3c/div\x3e\r\n\t\x3cdiv class\x3d"operation"\x3e\r\n\t\t\x3cdiv data-dojo-attach-point\x3d"btnUp" data-dojo-attach-event\x3d"onclick:_moveUp" class\x3d"jimu-icon jimu-icon-up" title\x3d"${nls.moveUp}"\x3e\x3c/div\x3e\r\n\t\t\x3cdiv data-dojo-attach-point\x3d"btnDown" data-dojo-attach-event\x3d"onclick:_moveDown" class\x3d"jimu-icon jimu-icon-down" title\x3d"${nls.moveDown}"\x3e\x3c/div\x3e\r\n\t\x3c/div\x3e\r\n\x3c/div\x3e'}});
define("dojo/_base/declare dojo/_base/lang dojo/_base/array dojo/_base/html dojo/_base/query dojo/on dijit/_WidgetBase dijit/_TemplatedMixin dojo/Evented dojo/text!./DataFields.html".split(" "),function(k,c,d,b,e,g,l,m,n,p){return k([l,n,m],{baseClass:"jimu-widget-chart-setting-data-fields",templateString:p,postCreate:function(){this.inherited(arguments);this.own(g(this.domNode,"click",c.hitch(this,this._onDomClicked)))},clear:function(){b.empty(this.fieldsContent);this.emit("change")},setFields:function(a){this.clear();
d.forEach(a,c.hitch(this,function(a){var f=b.toDom('\x3cdiv class\x3d"field-item"\x3e\x3cinput type\x3d"checkbox" /\x3e\x3cspan class\x3d"jimu-ellipsis" /\x3e\x3c/div\x3e'),d=e("input",f)[0],h=e("span",f)[0];d.checked=!!a.checked;d.disabled=!!a.disabled;h.innerHTML=a.alias||a.name;h.title=a.alias||a.name;f.fieldName=a.name;b.place(f,this.fieldsContent);this.own(g(d,"change",c.hitch(this,function(){this.emit("change")})))}));this.emit("change")},selectFields:function(a){c.isArrayLike(a)&&(a=c.clone(a),
a.reverse(),d.forEach(a,c.hitch(this,function(a){if(a=this._getFieldItemDivByName(a))b.place(a,a.parentNode,"first"),e("input",a)[0].checked=!0})));this.emit("change")},getSelectedFieldNames:function(){var a=e(".field-item",this.fieldsContent),b=[];d.forEach(a,c.hitch(this,function(a){e("input",a)[0].checked&&b.push(a.fieldName)}));return b},_getFieldItemDivByName:function(a){var b=e(".field-item",this.fieldsContent);return d.filter(b,c.hitch(this,function(b){return b.fieldName===a}))[0]},_onDomClicked:function(a){a=
a.target||a.srcElement;if(b.isDescendant(a,this.fieldsContent)&&a!==this.fieldsContent){var f=a.tagName.toLowerCase(),c=null;b.hasClass(a,"field-item")?this._selectFieldItemDom(a):"span"===f?(c=a.parentNode,this._selectFieldItemDom(c)):"input"===f&&(c=a.parentNode,a.checked?this._selectFieldItemDom(c):b.removeClass(c,"selected"));this._updateHighLightIcons()}},_updateHighLightIcons:function(){var a=this._getSelectedFieldItemDiv();a&&b.hasClass(a,"selected")&&(a.previousSibling?b.addClass(this.btnUp,
"high-light"):b.removeClass(this.btnUp,"high-light"),a.nextSibling?b.addClass(this.btnDown,"high-light"):b.removeClass(this.btnDown,"high-light"))},_selectFieldItemDom:function(a){e(".field-item",this.fieldsContent).removeClass("selected");b.addClass(a,"selected")},_getSelectedFieldItemDiv:function(){var a=null,b=e(".field-item.selected",this.fieldsContent);0<b.length&&(a=b[0]);return a},_moveUp:function(){var a=this._getSelectedFieldItemDiv();a&&a.previousSibling&&b.place(a,a.previousSibling,"before");
this._updateHighLightIcons()},_moveDown:function(){var a=this._getSelectedFieldItemDiv();a&&a.nextSibling&&b.place(a,a.nextSibling,"after");this._updateHighLightIcons()}})});