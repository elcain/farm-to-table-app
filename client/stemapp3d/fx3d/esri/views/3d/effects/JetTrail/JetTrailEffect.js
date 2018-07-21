/**
 * Copyright @ 2017 Esri.
 * All rights reserved under the copyright laws of the United States and applicable international laws, treaties, and conventions.
 */
define(["dojo/_base/lang","dojo/_base/array","esri/core/declare","esri/core/lang","esri/views/3d/webgl-engine/lib/Util","esri/views/3d/webgl-engine/lib/gl-matrix","../../webgl-engine-extensions/VertexBufferLayout","../../webgl-engine-extensions/GLVertexArrayObject","../../webgl-engine-extensions/GLXBO","../../webgl-engine-extensions/GLVerTexture","../../support/fx3dUtils","../../support/fx3dUnits","../Effect","./JetTrailMaterial"],function(i,e,t,s,r,n,a,h,l,_,o,d,u,g){var f=n.vec3d,c=n.vec2,p=1.11,m=f.create(),v=f.create(),x=f.create(),w=0,V=r.VertexAttrConstants,O={ALONG:0,AROUND:1},B={HEAD:1,TAIL:4},I=t([u],{declaredClass:"esri.views.3d.effects.JetTrail.JetTrailEffect",effectName:"JetTrail",constructor:function(e){i.hitch(this,e),this.orderId=2,this._needsAllLoaded=!0},_initRenderingInfo:function(){this.renderingInfo.radius=20,this.renderingInfo.pulseRadius=1e5,this.renderingInfo.colors=[o.rgbNames.cadetblue,o.rgbNames.yellowgreen,o.rgbNames.lightpink,o.rgbNames.orangered,o.rgbNames.green,o.rgbNames.indianred],this.renderingInfo.showEndPoints=!0,this._colorBarDirty=!0,this._renderingInfoDirty=!0,this._curveType=O.AROUND,this._vacDirty=!0,this._shapeDirty=!0,this._needsRenderPulse=!1,this.inherited(arguments)},_doRenderingInfoChange:function(i){this.inherited(arguments);for(var e in i)i.hasOwnProperty(e)&&this.renderingInfo.hasOwnProperty(e)&&(s.endsWith(e.toLowerCase(),"info")?o.isInforAttrChanged(this.renderingInfo[e],i[e])&&(this._renderingInfoDirty=!0):s.endsWith(e.toLowerCase(),"colors")?i[e]instanceof Array&&(this.renderingInfo[e]=i[e],this._colorBarDirty=!0,this._renderingInfoDirty=!0):"radius"===e.toLowerCase()||"pulseRadius"===e.toLowerCase()||"transparency"===e.toLowerCase()?(this._clampScope(i,e),"radius"==e&&this._radiusUnit?this.renderingInfo[e]=d.toMeters(this._radiusUnit,i[e],this._view.viewingMode):"pulseRadius"==e&&this._pulseRadiusUnit?this.renderingInfo[e]=d.toMeters(this._pulseRadiusUnit,i[e],this._view.viewingMode):this.renderingInfo[e]=i[e]):typeof i[e]==typeof this.renderingInfo[e]&&(this.renderingInfo[e]=i[e]))},setContext:function(t){this.inherited(arguments),this._effectConfig&&i.isArray(this._effectConfig.renderingInfo)&&(this._radiusUnit=null,this._pulseRadiusUnit=null,e.forEach(this._effectConfig.renderingInfo,function(i){"radius"===i.name.toLowerCase()?(this._radiusUnit=i.unit,this.renderingInfo.radius=d.toMeters(this._radiusUnit,this.renderingInfo.radius,this._view.viewingMode)):"pulseRadius"===i.name.toLowerCase()&&(this._pulseRadiusUnit=i.unit,this.renderingInfo.pulseRadius=d.toMeters(this._pulseRadiusUnit,this.renderingInfo.pulseRadius,this._view.viewingMode))}.bind(this)),this._aroundVerticesTexture=new _(this._gl),this._aroundVerticesTextureSize=c.create())},destroy:function(){this._resetXBOs(),this._dispose("_aroundVerticesTexture"),this._dispose("_headVAO"),this._dispose("_tailVAO"),this._dispose("_pulseVAO")},_resetXBOs:function(){this._dispose("_headVBO"),this._dispose("_tailVBO"),this._dispose("_tailIBO"),this._dispose("_pulseVBO"),this._dispose("_pulseIBO"),this._needsRenderPulse=!1},_initVertexLayout:function(){this._vertexAttrConstants=[V.AUXPOS1,V.AUXPOS2],this._vertexBufferLayout=new a(this._vertexAttrConstants,[2,3],[5126,5126])},_initRenderContext:function(){return this.inherited(arguments),this._vacDirty&&(this._initVertexLayout(),this._resetXBOs(),this._vacDirty=!1,this._headVAO&&(this._headVAO.unbind(),this._headVAO._initialized=!1),this._tailVAO&&(this._tailVAO.unbind(),this._tailVAO._initialized=!1),this._pulseVAO&&(this._pulseVAO.unbind(),this._pulseVAO._initialized=!1)),this._headVBO||(this._headVBO=new l(this._gl,(!0),this._vertexBufferLayout)),this._tailVBO||(this._tailVBO=new l(this._gl,(!0),this._vertexBufferLayout)),this._tailIBO||(this._tailIBO=new l(this._gl,(!1))),this._pulseVBO||(this._pulseVBO=new l(this._gl,(!0),this._vertexBufferLayout)),this._pulseIBO||(this._pulseIBO=new l(this._gl,(!1))),this._vaoExt&&(this._headVAO=new h(this._gl,this._vaoExt),this._tailVAO=new h(this._gl,this._vaoExt),this._pulseVAO=new h(this._gl,this._vaoExt)),this._localBindsCallback||(this._localBindsCallback=this._localBinds.bind(this)),this._curveType===O.AROUND?this._buildAroundPathGeometries():this._curveType===O.ALONG&&this._buildAlongPathGeometries()},_buildAroundPathGeometries:function(){if(!this._needsAllLoaded)return console.warn("All features should be loaded first."),!1;var i=this._allGraphics();if(i.length>0){var t,s,r,n,a,h,l,_=[],d=[],u=[],g=0,c=[];return this._pathIdNum=0,e.forEach(i,function(i,e){if(null!==i.geometry)for(a=i.geometry.paths,h=0;h<a.length;h++)if(!(a[h].length<2)){for(t=a[h][0],null==t[2]&&(t[2]=p),s=a[h][a[h].length-1],null==s[2]&&(s[2]=p),f.set3(t[0],t[1],t[2],m),"global"===this._view.viewingMode?o.wgs84ToSphericalEngineCoords(m,0,m,0):"local"===this._view.viewingMode&&o.wgs84ToWebMerc(m,0,m,0),f.set3(s[0],s[1],s[2],v),"global"===this._view.viewingMode?o.wgs84ToSphericalEngineCoords(v,0,v,0):"local"===this._view.viewingMode&&o.wgs84ToWebMerc(v,0,v,0),f.subtract(m,v,x),n=f.length(x),"global"===this._view.viewingMode?r=n<=1e3?32:n<=1e4?24:n<=5e5?18:n<=1e6?40:Math.floor(1e-5*n):"local"===this._view.viewingMode&&(r=n<=1e3?48:n<=1e4?42:n<=1e5?32:n<=1e6?24:n<=2e6?36:Math.floor(6e-6*n)),r=2*r-1,r=Math.max(5,Math.floor(.26*r)),_.push(this._pathIdNum,e,B.HEAD,r-1,r-1),c.push([t[0],t[1],t[2]]),c.push([s[0],s[1],s[2]]),l=0;l<r;l++)d.push(this._pathIdNum,e,B.TAIL,l,r-1),l<r-1&&u.push(g+l,g+l+1);this._pathIdNum++,g+=r}}.bind(this)),this._headVBO.addData(!1,new Float32Array(_)),this._tailVBO.addData(!1,new Float32Array(d)),this._tailIBO.addData(!1,new Uint32Array(u)),this._headVAO&&(this._headVAO._initialized=!1),this._tailVAO&&(this._tailVAO._initialized=!1),this._resetAddGeometries(),this._initAroundVerticesTexture(c)&&this._initPulseGeometries(c)}return!1},_buildAlongPathGeometries:function(){return!1},_initAroundVerticesTexture:function(i){if(2*this._pathIdNum!==i.length)return console.warn("The quantity of paths and points is invalid."),!1;var e=this._gl.getParameter(3379),t=2,s=this._pathIdNum*t,r=o.nextHighestPowerOfTwo(s);r>e&&(r=e,console.warn("Too many graphics, and some data will be discarded."));var n=Math.ceil(s/r);n=o.nextHighestPowerOfTwo(n),n>e&&(n=e,console.warn("Too many graphics, and some data will be discarded."));var a,h,l=new Float32Array(r*n*4);for(a=0;a<this._pathIdNum;a++)h=a*t*4,l[0+h]=a,l[1+h]=i[a*t][0],l[2+h]=i[a*t][1],l[3+h]=i[a*t][2],l[4+h]=a,l[5+h]=i[a*t+1][0],l[6+h]=i[a*t+1][1],l[7+h]=i[a*t+1][2];return this._aroundVerticesTexture.setData(r,n,l),c.set2(r,n,this._aroundVerticesTextureSize),!0},_initPulseGeometries:function(i){if(2*this._pathIdNum!==i.length)return console.warn("The quantity of paths and points is invalid."),!1;if(i.length>0){var e,t,s,r,n,a,h,l=2,_=40,o=this._vertexBufferLayout.getStride(),d=new Float32Array((_+1)*o*this._pathIdNum),u=new Uint32Array(3*_*this._pathIdNum),g=2*Math.PI;for(e=0;e<this._pathIdNum;e++){for(r=e*(_+1)*o,n=i[e*l+1],d[r+2]=n[0],d[r+3]=n[1],d[r+4]=n[2],d[r+0]=-1,d[r+1]=e,r+=o,t=0;t<_;t++)s=r+o*t,d[s+2]=n[0],d[s+3]=n[1],d[s+4]=n[2],d[s+0]=g*(t/_),d[s+1]=e;for(h=e*(_+1),a=3*h,t=0;t<_-1;t++)s=a+3*t,u[s+0]=0+h,u[s+1]=t+1+h,u[s+2]=t+2+h;s=a+3*(_-1),u[s+0]=0+h,u[s+1]=_+h,u[s+2]=1+h}return this._pulseVBO.addData(!1,d),this._pulseIBO.addData(!1,u),this._pulseVAO&&(this._pulseVAO._initialized=!1),!0}return!1},_initColourMap:function(){this._colourMapTexture||(this._colourMapTexture=this._gl.createTexture());var i=new Image;i.src=o.spriteImg;var e=this;return i.onload=function(){var t=e._gl.getParameter(e._gl.TEXTURE_BINDING_2D);e._gl.bindTexture(3553,e._colourMapTexture),e._gl.pixelStorei(37440,!0),e._gl.texParameteri(3553,10240,9728),e._gl.texParameteri(3553,10241,9728),e._gl.texParameteri(3553,10242,33071),e._gl.texParameteri(3553,10243,33071),e._gl.texImage2D(3553,0,6408,6408,5121,i),e._gl.generateMipmap(3553),e._gl.bindTexture(3553,t)},0===this._gl.getError()},_loadShaders:function(){return this.inherited(arguments),this._material||(this._material=new g({pushState:this._pushState.bind(this),restoreState:this._restoreState.bind(this),gl:this._gl,viewingMode:this._view.viewingMode,shaderSnippets:this._shaderSnippets})),this._material.loadShaders()},_initColorBar:function(){if(!this._colorBarDirty)return!0;this._colorBarTexture||(this._colorBarTexture=this._gl.createTexture());var i=this._gl.getParameter(32873);this._gl.bindTexture(3553,this._colorBarTexture),this._gl.pixelStorei(37440,!0),this._gl.texParameteri(3553,10240,9728),this._gl.texParameteri(3553,10241,9728),this._gl.texParameteri(3553,10242,33071),this._gl.texParameteri(3553,10243,33071);var e=o.createColorBarTexture(32,1,this.renderingInfo.colors);return this._gl.texImage2D(3553,0,6408,6408,5121,e),this._gl.generateMipmap(3553),this._gl.bindTexture(3553,i),0===this._gl.getError()},_localBinds:function(i,e,t){i.bind(t),this._vertexBufferLayout.enableVertexAttribArrays(this._gl,t),e&&e.bind()},_bindBuffer:function(i,e,t,s){i?(i._initialized||i.initialize(this._localBindsCallback,[e,t,s]),i.bind()):this._localBinds(e,t,s)},_unBindBuffer:function(i,e,t,s){i?i.unbind():(e.unbind(),this._vertexBufferLayout.disableVertexAttribArrays(this._gl,s),t&&t.unbind())},render:function(e,t){this.inherited(arguments),this._layer.visible&&this.ready&&this._bindPramsReady()&&(this._hasSentReady||(this._layer.emit("fx3d-ready"),this._hasSentReady=!0),this._material.bind(i.mixin({},{pp:this._aroundVerticesTexture,pi:this._aroundVerticesTextureSize,lm:this._colourMapTexture,so:this._vizFieldVerTextures[this._vizFields[this._currentVizPage]],im:this._vizFieldVerTextureSize,oo:this.renderingInfo.animationInterval,ss:this.renderingInfo.radius,mo:this.renderingInfo.transparency,ps:this._vizFieldMinMaxs[this._vizFieldDefault].min>this._vizFieldMinMaxs[this._vizFields[this._currentVizPage]].min?this._vizFieldMinMaxs[this._vizFields[this._currentVizPage]].min:this._vizFieldMinMaxs[this._vizFieldDefault].min,mi:this._vizFieldMinMaxs[this._vizFieldDefault].max>this._vizFieldMinMaxs[this._vizFields[this._currentVizPage]].max?this._vizFieldMinMaxs[this._vizFieldDefault].max:this._vizFieldMinMaxs[this._vizFields[this._currentVizPage]].max,si:this._colorBarTexture},e),t),this._material.blend(!0,t),this._bindBuffer(this._tailVAO,this._tailVBO,this._tailIBO,this._material._program),this._gl.drawElements(1,this._tailIBO.getNum(),5125,0),this._unBindBuffer(this._tailVAO,this._tailVBO,this._tailIBO,this._material._program),this._material.blend(!1,t),this._bindBuffer(this._headVAO,this._headVBO,null,this._material._program),this._gl.drawArrays(0,0,this._headVBO.getNum()),this._unBindBuffer(this._headVAO,this._headVBO,null,this._material._program),this._needsRenderPulse||(w=this.time/this.renderingInfo.animationInterval,w-Math.floor(w)>.8&&(this._needsRenderPulse=!0)),this._needsRenderPulse&&(this.renderingInfo.showEndPoints&&(this._material.bindPulse(i.mixin({},{so:this._vizFieldVerTextures[this._vizFields[this._currentVizPage]],im:this._vizFieldVerTextureSize,oo:this.renderingInfo.animationInterval,ol:[this._scopes.pulseRadius[0]>this._layerView._minDelta?this._layerView._minDelta||10:this._scopes.pulseRadius[0],this.renderingInfo.pulseRadius>this._layerView._minDelta?this._layerView._minDelta||10:this.renderingInfo.pulseRadius],mo:this.renderingInfo.transparency,ps:this._vizFieldMinMaxs[this._vizFieldDefault].min>this._vizFieldMinMaxs[this._vizFields[this._currentVizPage]].min?this._vizFieldMinMaxs[this._vizFields[this._currentVizPage]].min:this._vizFieldMinMaxs[this._vizFieldDefault].min,mi:this._vizFieldMinMaxs[this._vizFieldDefault].max>this._vizFieldMinMaxs[this._vizFields[this._currentVizPage]].max?this._vizFieldMinMaxs[this._vizFieldDefault].max:this._vizFieldMinMaxs[this._vizFields[this._currentVizPage]].max,si:this._colorBarTexture},e),t),this._material.blend(!0,t),this._bindBuffer(this._pulseVAO,this._pulseVBO,this._pulseIBO,this._material._pulseProgram),this._gl.drawElements(4,this._pulseIBO.getNum(),5125,0),this._unBindBuffer(this._pulseVAO,this._pulseVBO,this._pulseIBO,this._material._pulseProgram)),w=this.time/this.renderingInfo.animationInterval,w-Math.floor(w)>.79&&(this._needsRenderPulse=!1)),this._material.release(t))}});return I});