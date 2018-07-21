/**
 * Copyright @ 2017 Esri.
 * All rights reserved under the copyright laws of the United States and applicable international laws, treaties, and conventions.
 */
define(["esri/views/3d/layers/graphics/Graphics3DSymbolCommonCode","esri/views/3d/webgl-engine/lib/gl-matrix","esri/views/3d/webgl-engine/lib/Util"],function(e,r,a){var i=r.vec3d,t=r.mat4d,n=a.logWithBase,o=1e4,c=10,l={getOrigin:function(r,a,l,s){if(!(r.length<=0)){var v=i.create();e.chooseOrigin(r,l,s,v),e.subtractCoordinates(r,0,a,v);for(var d,h=0,g=i.createFrom(r[h],r[h+1],r[h+2]),m=i.create(this.bbMin),u=0;u<a;u++){h=3*u;for(var b=0;b<3;b++)d=r[h+b],d<g[b]?g[b]=d:d>m[b]&&(m[b]=d)}var f=i.create();i.lerp(g,m,.5,f);for(var M=0,u=0;u<a;u++){h=3*u;var w=r[h]-f[0],p=r[h+1]-f[1],y=r[h+2]-f[2],C=w*w+p*p+y*y;C>M&&(M=C)}M=Math.sqrt(M);var _=t.identity();t.translate(_,v,_);var x=t.maxScale(_);t.multiplyVec3(_,f,f),M*=x;var F=c,O=0,S=M*F/o;S>1&&(O=Math.ceil(n(S,2)));var q=Math.pow(2,O)*o,u=Math.round(f[0]/q),B=Math.round(f[1]/q),b=Math.round(f[2]/q),D=O+"_"+u+"_"+B+"_"+b;return{vec3:i.createFrom(u*q,B*q,b*q),id:D}}}};return l});