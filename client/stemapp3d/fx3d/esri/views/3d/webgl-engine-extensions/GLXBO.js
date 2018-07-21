/**
 * Copyright @ 2017 Esri.
 * All rights reserved under the copyright laws of the United States and applicable international laws, treaties, and conventions.
 */
define(["./Number32ArrayList","esri/views/3d/webgl-engine/lib/Util"],function(t,e){var i=0,f=0,r=e.assert,s=function(){function e(e,r,s,u){this.glName=e.createBuffer(),this._gl=e,this.num=0,this.drawMode=u?35048:35044,this.dataBuffer=new t(r),this.isDirty=!1,this.bufferType=r?34962:34963,this.isVBO=r,this.vertexBufferLayout=s,this.id=r?i++:f++}return e.prototype.setData=function(t,e){r(t instanceof this.dataBuffer.getArrayType()),this._gl.bindBuffer(this.bufferType,this.glName),this._gl.bufferData(this.bufferType,t,this.drawMode),this._gl.bindBuffer(this.bufferType,null),this.isVBO&&this.vertexBufferLayout?this.num=e/this.vertexBufferLayout.getStride():this.num=e},e.prototype.addData=function(t,e){r(e instanceof this.dataBuffer.getArrayType()),t!==!0?this.dataBuffer.whole(e):this.dataBuffer.append(e),this.isDirty=!0},e.prototype.updateSubData=function(t,e,i){this._gl.bindBuffer(this.bufferType,this.glName),this._gl.bufferSubData(this.bufferType,4*e,t.subarray(e,i)),this._gl.bindBuffer(this.bufferType,null)},e.prototype.updateData=function(t,e){this._gl.bindBuffer(this.bufferType,this.glName),this._gl.bufferSubData(this.bufferType,4*t,e),this._gl.bindBuffer(this.bufferType,null)},e.prototype.bind=function(t){this.isDirty&&(this.isDirty=!1,this.setData(this.dataBuffer.getArray(),this.dataBuffer.getSize())),this._gl.bindBuffer(this.bufferType,this.glName),this.isVBO&&this.vertexBufferLayout&&this.vertexBufferLayout.setVertexAttribPointers(this._gl,t)},e.prototype.unbind=function(){this._gl.bindBuffer(this.bufferType,null)},e.prototype.getNum=function(){return this.num},e.prototype.getId=function(){return this.id},e.prototype.dispose=function(){this._gl.deleteBuffer(this.glName);var t=this.dataBuffer.getArray();t=null},e}();return s});