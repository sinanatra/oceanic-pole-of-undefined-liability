import{s as Ce,n as Kn,o as Te,x as lt,k as ii}from"../chunks/scheduler.BWih1DpW.js";import{S as Fe,i as be,e as dn,s as Hn,b as Tn,y as J,c as _n,d as B,g as I,h as Vn,z as Ye,f as Fn,A as K,o as m,p as Ln,j as nn,k as X,B as ri,l as ot,C as Dn,m as zn,a as wt,n as li,t as Mt,q as oi,u as ui,v as ai,w as fi,D as ci,x as si}from"../chunks/index.C79tYGn6.js";function cn(t){return(t==null?void 0:t.length)!==void 0?t:Array.from(t)}function hi(t){return t}function pi(t){if(t==null)return hi;var n,i,e=t.scale[0],r=t.scale[1],l=t.translate[0],o=t.translate[1];return function(u,c){c||(n=i=0);var s=2,a=u.length,f=new Array(a);for(f[0]=(n+=u[0])*e+l,f[1]=(i+=u[1])*r+o;s<a;)f[s]=u[s],++s;return f}}function gi(t,n){for(var i,e=t.length,r=e-n;r<--e;)i=t[r],t[r++]=t[e],t[e]=i}function _t(t,n){return typeof n=="string"&&(n=t.objects[n]),n.type==="GeometryCollection"?{type:"FeatureCollection",features:n.geometries.map(function(i){return Qt(t,i)})}:Qt(t,n)}function Qt(t,n){var i=n.id,e=n.bbox,r=n.properties==null?{}:n.properties,l=vi(t,n);return i==null&&e==null?{type:"Feature",properties:r,geometry:l}:e==null?{type:"Feature",id:i,properties:r,geometry:l}:{type:"Feature",id:i,bbox:e,properties:r,geometry:l}}function vi(t,n){var i=pi(t.transform),e=t.arcs;function r(a,f){f.length&&f.pop();for(var h=e[a<0?~a:a],p=0,v=h.length;p<v;++p)f.push(i(h[p],p));a<0&&gi(f,v)}function l(a){return i(a)}function o(a){for(var f=[],h=0,p=a.length;h<p;++h)r(a[h],f);return f.length<2&&f.push(f[0]),f}function u(a){for(var f=o(a);f.length<4;)f.push(f[0]);return f}function c(a){return a.map(u)}function s(a){var f=a.type,h;switch(f){case"GeometryCollection":return{type:f,geometries:a.geometries.map(s)};case"Point":h=l(a.coordinates);break;case"MultiPoint":h=a.coordinates.map(l);break;case"LineString":h=o(a.arcs);break;case"MultiLineString":h=a.arcs.map(o);break;case"Polygon":h=c(a.arcs);break;case"MultiPolygon":h=a.arcs.map(c);break;default:return null}return{type:f,coordinates:h}}return s(n)}class Rn{constructor(){this._partials=new Float64Array(32),this._n=0}add(n){const i=this._partials;let e=0;for(let r=0;r<this._n&&r<32;r++){const l=i[r],o=n+l,u=Math.abs(n)<Math.abs(l)?n-(o-l):l-(o-n);u&&(i[e++]=u),n=o}return i[e]=n,this._n=e+1,this}valueOf(){const n=this._partials;let i=this._n,e,r,l,o=0;if(i>0){for(o=n[--i];i>0&&(e=o,r=n[--i],o=e+r,l=r-(o-e),!l););i>0&&(l<0&&n[i-1]<0||l>0&&n[i-1]>0)&&(r=l*2,e=o+r,r==e-o&&(o=e))}return o}}function*di(t){for(const n of t)yield*n}function Be(t){return Array.from(di(t))}function bn(t,n,i){t=+t,n=+n,i=(r=arguments.length)<2?(n=t,t=0,1):r<3?1:+i;for(var e=-1,r=Math.max(0,Math.ceil((n-t)/i))|0,l=new Array(r);++e<r;)l[e]=t+e*i;return l}var T=1e-6,_i=1e-12,F=Math.PI,hn=F/2,Ut=F/4,gn=F*2,wn=180/F,an=F/180,Z=Math.abs,mi=Math.atan,Bn=Math.atan2,W=Math.cos,xn=Math.ceil,V=Math.sin,Ei=Math.sign||function(t){return t>0?1:t<0?-1:0},Pn=Math.sqrt;function Xe(t){return t>1?0:t<-1?F:Math.acos(t)}function Xn(t){return t>1?hn:t<-1?-hn:Math.asin(t)}function pn(){}function ut(t,n){t&&ne.hasOwnProperty(t.type)&&ne[t.type](t,n)}var xt={Feature:function(t,n){ut(t.geometry,n)},FeatureCollection:function(t,n){for(var i=t.features,e=-1,r=i.length;++e<r;)ut(i[e].geometry,n)}},ne={Sphere:function(t,n){n.sphere()},Point:function(t,n){t=t.coordinates,n.point(t[0],t[1],t[2])},MultiPoint:function(t,n){for(var i=t.coordinates,e=-1,r=i.length;++e<r;)t=i[e],n.point(t[0],t[1],t[2])},LineString:function(t,n){zt(t.coordinates,n,0)},MultiLineString:function(t,n){for(var i=t.coordinates,e=-1,r=i.length;++e<r;)zt(i[e],n,0)},Polygon:function(t,n){te(t.coordinates,n)},MultiPolygon:function(t,n){for(var i=t.coordinates,e=-1,r=i.length;++e<r;)te(i[e],n)},GeometryCollection:function(t,n){for(var i=t.geometries,e=-1,r=i.length;++e<r;)ut(i[e],n)}};function zt(t,n,i){var e=-1,r=t.length-i,l;for(n.lineStart();++e<r;)l=t[e],n.point(l[0],l[1],l[2]);n.lineEnd()}function te(t,n){var i=-1,e=t.length;for(n.polygonStart();++i<e;)zt(t[i],n,1);n.polygonEnd()}function Cn(t,n){t&&xt.hasOwnProperty(t.type)?xt[t.type](t,n):ut(t,n)}function Pt(t){return[Bn(t[1],t[0]),Xn(t[2])]}function qn(t){var n=t[0],i=t[1],e=W(i);return[e*W(n),e*V(n),V(i)]}function nt(t,n){return t[0]*n[0]+t[1]*n[1]+t[2]*n[2]}function at(t,n){return[t[1]*n[2]-t[2]*n[1],t[2]*n[0]-t[0]*n[2],t[0]*n[1]-t[1]*n[0]]}function mt(t,n){t[0]+=n[0],t[1]+=n[1],t[2]+=n[2]}function tt(t,n){return[t[0]*n,t[1]*n,t[2]*n]}function Nt(t){var n=Pn(t[0]*t[0]+t[1]*t[1]+t[2]*t[2]);t[0]/=n,t[1]/=n,t[2]/=n}function Rt(t,n){function i(e,r){return e=t(e,r),n(e[0],e[1])}return t.invert&&n.invert&&(i.invert=function(e,r){return e=n.invert(e,r),e&&t.invert(e[0],e[1])}),i}function It(t,n){return Z(t)>F&&(t-=Math.round(t/gn)*gn),[t,n]}It.invert=It;function Si(t,n,i){return(t%=gn)?n||i?Rt(ie(t),re(n,i)):ie(t):n||i?re(n,i):It}function ee(t){return function(n,i){return n+=t,Z(n)>F&&(n-=Math.round(n/gn)*gn),[n,i]}}function ie(t){var n=ee(t);return n.invert=ee(-t),n}function re(t,n){var i=W(t),e=V(t),r=W(n),l=V(n);function o(u,c){var s=W(c),a=W(u)*s,f=V(u)*s,h=V(c),p=h*i+a*e;return[Bn(f*r-p*l,a*i-h*e),Xn(p*r+f*l)]}return o.invert=function(u,c){var s=W(c),a=W(u)*s,f=V(u)*s,h=V(c),p=h*r-f*l;return[Bn(f*r+h*l,a*i+p*e),Xn(p*i-a*e)]},o}function yi(t,n,i,e,r,l){if(i){var o=W(n),u=V(n),c=e*i;r==null?(r=n+e*gn,l=n-c/2):(r=le(o,r),l=le(o,l),(e>0?r<l:r>l)&&(r+=e*gn));for(var s,a=r;e>0?a>l:a<l;a-=c)s=Pt([o,-u*W(a),-u*V(a)]),t.point(s[0],s[1])}}function le(t,n){n=qn(n),n[0]-=t,Nt(n);var i=Xe(-n[1]);return((-n[2]<0?-i:i)+gn-T)%gn}function qe(){var t=[],n;return{point:function(i,e,r){n.push([i,e,r])},lineStart:function(){t.push(n=[])},lineEnd:pn,rejoin:function(){t.length>1&&t.push(t.pop().concat(t.shift()))},result:function(){var i=t;return t=[],n=null,i}}}function rt(t,n){return Z(t[0]-n[0])<T&&Z(t[1]-n[1])<T}function et(t,n,i,e){this.x=t,this.z=n,this.o=i,this.e=e,this.v=!1,this.n=this.p=null}function je(t,n,i,e,r){var l=[],o=[],u,c;if(t.forEach(function(v){if(!((P=v.length-1)<=0)){var P,E=v[0],M=v[P],N;if(rt(E,M)){if(!E[2]&&!M[2]){for(r.lineStart(),u=0;u<P;++u)r.point((E=v[u])[0],E[1]);r.lineEnd();return}M[0]+=2*T}l.push(N=new et(E,v,null,!0)),o.push(N.o=new et(E,null,N,!1)),l.push(N=new et(M,v,null,!1)),o.push(N.o=new et(M,null,N,!0))}}),!!l.length){for(o.sort(n),oe(l),oe(o),u=0,c=o.length;u<c;++u)o[u].e=i=!i;for(var s=l[0],a,f;;){for(var h=s,p=!0;h.v;)if((h=h.n)===s)return;a=h.z,r.lineStart();do{if(h.v=h.o.v=!0,h.e){if(p)for(u=0,c=a.length;u<c;++u)r.point((f=a[u])[0],f[1]);else e(h.x,h.n.x,1,r);h=h.n}else{if(p)for(a=h.p.z,u=a.length-1;u>=0;--u)r.point((f=a[u])[0],f[1]);else e(h.x,h.p.x,-1,r);h=h.p}h=h.o,a=h.z,p=!p}while(!h.v);r.lineEnd()}}}function oe(t){if(n=t.length){for(var n,i=0,e=t[0],r;++i<n;)e.n=r=t[i],r.p=e,e=r;e.n=r=t[0],r.p=e}}function Et(t){return Z(t[0])<=F?t[0]:Ei(t[0])*((Z(t[0])+F)%gn-F)}function wi(t,n){var i=Et(n),e=n[1],r=V(e),l=[V(i),-W(i),0],o=0,u=0,c=new Rn;r===1?e=hn+T:r===-1&&(e=-hn-T);for(var s=0,a=t.length;s<a;++s)if(h=(f=t[s]).length)for(var f,h,p=f[h-1],v=Et(p),P=p[1]/2+Ut,E=V(P),M=W(P),N=0;N<h;++N,v=w,E=y,M=$,p=d){var d=f[N],w=Et(d),z=d[1]/2+Ut,y=V(z),$=W(z),k=w-v,D=k>=0?1:-1,L=D*k,R=L>F,G=E*y;if(c.add(Bn(G*D*V(L),M*$+G*W(L))),o+=R?k+D*gn:k,R^v>=i^w>=i){var Y=at(qn(p),qn(d));Nt(Y);var C=at(l,Y);Nt(C);var g=(R^k>=0?-1:1)*Xn(C[2]);(e>g||e===g&&(Y[0]||Y[1]))&&(u+=R^k>=0?1:-1)}}return(o<-T||o<T&&c<-_i)^u&1}function He(t,n,i,e){return function(r){var l=n(r),o=qe(),u=n(o),c=!1,s,a,f,h={point:p,lineStart:P,lineEnd:E,polygonStart:function(){h.point=M,h.lineStart=N,h.lineEnd=d,a=[],s=[]},polygonEnd:function(){h.point=p,h.lineStart=P,h.lineEnd=E,a=Be(a);var w=wi(s,e);a.length?(c||(r.polygonStart(),c=!0),je(a,zi,w,i,r)):w&&(c||(r.polygonStart(),c=!0),r.lineStart(),i(null,null,1,r),r.lineEnd()),c&&(r.polygonEnd(),c=!1),a=s=null},sphere:function(){r.polygonStart(),r.lineStart(),i(null,null,1,r),r.lineEnd(),r.polygonEnd()}};function p(w,z){t(w,z)&&r.point(w,z)}function v(w,z){l.point(w,z)}function P(){h.point=v,l.lineStart()}function E(){h.point=p,l.lineEnd()}function M(w,z){f.push([w,z]),u.point(w,z)}function N(){u.lineStart(),f=[]}function d(){M(f[0][0],f[0][1]),u.lineEnd();var w=u.clean(),z=o.result(),y,$=z.length,k,D,L;if(f.pop(),s.push(f),f=null,!!$){if(w&1){if(D=z[0],(k=D.length-1)>0){for(c||(r.polygonStart(),c=!0),r.lineStart(),y=0;y<k;++y)r.point((L=D[y])[0],L[1]);r.lineEnd()}return}$>1&&w&2&&z.push(z.pop().concat(z.shift())),a.push(z.filter(Mi))}}return h}}function Mi(t){return t.length>1}function zi(t,n){return((t=t.x)[0]<0?t[1]-hn-T:hn-t[1])-((n=n.x)[0]<0?n[1]-hn-T:hn-n[1])}const ue=He(function(){return!0},Pi,Ri,[-F,-hn]);function Pi(t){var n=NaN,i=NaN,e=NaN,r;return{lineStart:function(){t.lineStart(),r=1},point:function(l,o){var u=l>0?F:-F,c=Z(l-n);Z(c-F)<T?(t.point(n,i=(i+o)/2>0?hn:-hn),t.point(e,i),t.lineEnd(),t.lineStart(),t.point(u,i),t.point(l,i),r=0):e!==u&&c>=F&&(Z(n-e)<T&&(n-=e*T),Z(l-u)<T&&(l-=u*T),i=Ni(n,i,l,o),t.point(e,i),t.lineEnd(),t.lineStart(),t.point(u,i),r=0),t.point(n=l,i=o),e=u},lineEnd:function(){t.lineEnd(),n=i=NaN},clean:function(){return 2-r}}}function Ni(t,n,i,e){var r,l,o=V(t-i);return Z(o)>T?mi((V(n)*(l=W(e))*V(i)-V(e)*(r=W(n))*V(t))/(r*l*o)):(n+e)/2}function Ri(t,n,i,e){var r;if(t==null)r=i*hn,e.point(-F,r),e.point(0,r),e.point(F,r),e.point(F,0),e.point(F,-r),e.point(0,-r),e.point(-F,-r),e.point(-F,0),e.point(-F,r);else if(Z(t[0]-n[0])>T){var l=t[0]<n[0]?F:-F;r=i*l/2,e.point(-l,r),e.point(0,r),e.point(l,r)}else e.point(n[0],n[1])}function Ii(t){var n=W(t),i=2*an,e=n>0,r=Z(n)>T;function l(a,f,h,p){yi(p,t,i,h,a,f)}function o(a,f){return W(a)*W(f)>n}function u(a){var f,h,p,v,P;return{lineStart:function(){v=p=!1,P=1},point:function(E,M){var N=[E,M],d,w=o(E,M),z=e?w?0:s(E,M):w?s(E+(E<0?F:-F),M):0;if(!f&&(v=p=w)&&a.lineStart(),w!==p&&(d=c(f,N),(!d||rt(f,d)||rt(N,d))&&(N[2]=1)),w!==p)P=0,w?(a.lineStart(),d=c(N,f),a.point(d[0],d[1])):(d=c(f,N),a.point(d[0],d[1],2),a.lineEnd()),f=d;else if(r&&f&&e^w){var y;!(z&h)&&(y=c(N,f,!0))&&(P=0,e?(a.lineStart(),a.point(y[0][0],y[0][1]),a.point(y[1][0],y[1][1]),a.lineEnd()):(a.point(y[1][0],y[1][1]),a.lineEnd(),a.lineStart(),a.point(y[0][0],y[0][1],3)))}w&&(!f||!rt(f,N))&&a.point(N[0],N[1]),f=N,p=w,h=z},lineEnd:function(){p&&a.lineEnd(),f=null},clean:function(){return P|(v&&p)<<1}}}function c(a,f,h){var p=qn(a),v=qn(f),P=[1,0,0],E=at(p,v),M=nt(E,E),N=E[0],d=M-N*N;if(!d)return!h&&a;var w=n*M/d,z=-n*N/d,y=at(P,E),$=tt(P,w),k=tt(E,z);mt($,k);var D=y,L=nt($,D),R=nt(D,D),G=L*L-R*(nt($,$)-1);if(!(G<0)){var Y=Pn(G),C=tt(D,(-L-Y)/R);if(mt(C,$),C=Pt(C),!h)return C;var g=a[0],A=f[0],j=a[1],Q=f[1],U;A<g&&(U=g,g=A,A=U);var Sn=A-g,fn=Z(Sn-F)<T,un=fn||Sn<T;if(!fn&&Q<j&&(U=j,j=Q,Q=U),un?fn?j+Q>0^C[1]<(Z(C[0]-g)<T?j:Q):j<=C[1]&&C[1]<=Q:Sn>F^(g<=C[0]&&C[0]<=A)){var q=tt(D,(-L+Y)/R);return mt(q,$),[C,Pt(q)]}}}function s(a,f){var h=e?t:F-t,p=0;return a<-h?p|=1:a>h&&(p|=2),f<-h?p|=4:f>h&&(p|=8),p}return He(o,u,l,e?[0,-t]:[-F,t-F])}function ki(t,n,i,e,r,l){var o=t[0],u=t[1],c=n[0],s=n[1],a=0,f=1,h=c-o,p=s-u,v;if(v=i-o,!(!h&&v>0)){if(v/=h,h<0){if(v<a)return;v<f&&(f=v)}else if(h>0){if(v>f)return;v>a&&(a=v)}if(v=r-o,!(!h&&v<0)){if(v/=h,h<0){if(v>f)return;v>a&&(a=v)}else if(h>0){if(v<a)return;v<f&&(f=v)}if(v=e-u,!(!p&&v>0)){if(v/=p,p<0){if(v<a)return;v<f&&(f=v)}else if(p>0){if(v>f)return;v>a&&(a=v)}if(v=l-u,!(!p&&v<0)){if(v/=p,p<0){if(v>f)return;v>a&&(a=v)}else if(p>0){if(v<a)return;v<f&&(f=v)}return a>0&&(t[0]=o+a*h,t[1]=u+a*p),f<1&&(n[0]=o+f*h,n[1]=u+f*p),!0}}}}}var Zn=1e9,it=-Zn;function Ai(t,n,i,e){function r(s,a){return t<=s&&s<=i&&n<=a&&a<=e}function l(s,a,f,h){var p=0,v=0;if(s==null||(p=o(s,f))!==(v=o(a,f))||c(s,a)<0^f>0)do h.point(p===0||p===3?t:i,p>1?e:n);while((p=(p+f+4)%4)!==v);else h.point(a[0],a[1])}function o(s,a){return Z(s[0]-t)<T?a>0?0:3:Z(s[0]-i)<T?a>0?2:1:Z(s[1]-n)<T?a>0?1:0:a>0?3:2}function u(s,a){return c(s.x,a.x)}function c(s,a){var f=o(s,1),h=o(a,1);return f!==h?f-h:f===0?a[1]-s[1]:f===1?s[0]-a[0]:f===2?s[1]-a[1]:a[0]-s[0]}return function(s){var a=s,f=qe(),h,p,v,P,E,M,N,d,w,z,y,$={point:k,lineStart:G,lineEnd:Y,polygonStart:L,polygonEnd:R};function k(g,A){r(g,A)&&a.point(g,A)}function D(){for(var g=0,A=0,j=p.length;A<j;++A)for(var Q=p[A],U=1,Sn=Q.length,fn=Q[0],un,q,vn=fn[0],O=fn[1];U<Sn;++U)un=vn,q=O,fn=Q[U],vn=fn[0],O=fn[1],q<=e?O>e&&(vn-un)*(e-q)>(O-q)*(t-un)&&++g:O<=e&&(vn-un)*(e-q)<(O-q)*(t-un)&&--g;return g}function L(){a=f,h=[],p=[],y=!0}function R(){var g=D(),A=y&&g,j=(h=Be(h)).length;(A||j)&&(s.polygonStart(),A&&(s.lineStart(),l(null,null,1,s),s.lineEnd()),j&&je(h,u,g,l,s),s.polygonEnd()),a=s,h=p=v=null}function G(){$.point=C,p&&p.push(v=[]),z=!0,w=!1,N=d=NaN}function Y(){h&&(C(P,E),M&&w&&f.rejoin(),h.push(f.result())),$.point=k,w&&a.lineEnd()}function C(g,A){var j=r(g,A);if(p&&v.push([g,A]),z)P=g,E=A,M=j,z=!1,j&&(a.lineStart(),a.point(g,A));else if(j&&w)a.point(g,A);else{var Q=[N=Math.max(it,Math.min(Zn,N)),d=Math.max(it,Math.min(Zn,d))],U=[g=Math.max(it,Math.min(Zn,g)),A=Math.max(it,Math.min(Zn,A))];ki(Q,U,t,n,i,e)?(w||(a.lineStart(),a.point(Q[0],Q[1])),a.point(U[0],U[1]),j||a.lineEnd(),y=!1):j&&(a.lineStart(),a.point(g,A),y=!1)}N=g,d=A,w=j}return $}}function ae(t,n,i){var e=bn(t,n-T,i).concat(n);return function(r){return e.map(function(l){return[r,l]})}}function fe(t,n,i){var e=bn(t,n-T,i).concat(n);return function(r){return e.map(function(l){return[l,r]})}}function $i(){var t,n,i,e,r,l,o,u,c=10,s=c,a=90,f=360,h,p,v,P,E=2.5;function M(){return{type:"MultiLineString",coordinates:N()}}function N(){return bn(xn(e/a)*a,i,a).map(v).concat(bn(xn(u/f)*f,o,f).map(P)).concat(bn(xn(n/c)*c,t,c).filter(function(d){return Z(d%a)>T}).map(h)).concat(bn(xn(l/s)*s,r,s).filter(function(d){return Z(d%f)>T}).map(p))}return M.lines=function(){return N().map(function(d){return{type:"LineString",coordinates:d}})},M.outline=function(){return{type:"Polygon",coordinates:[v(e).concat(P(o).slice(1),v(i).reverse().slice(1),P(u).reverse().slice(1))]}},M.extent=function(d){return arguments.length?M.extentMajor(d).extentMinor(d):M.extentMinor()},M.extentMajor=function(d){return arguments.length?(e=+d[0][0],i=+d[1][0],u=+d[0][1],o=+d[1][1],e>i&&(d=e,e=i,i=d),u>o&&(d=u,u=o,o=d),M.precision(E)):[[e,u],[i,o]]},M.extentMinor=function(d){return arguments.length?(n=+d[0][0],t=+d[1][0],l=+d[0][1],r=+d[1][1],n>t&&(d=n,n=t,t=d),l>r&&(d=l,l=r,r=d),M.precision(E)):[[n,l],[t,r]]},M.step=function(d){return arguments.length?M.stepMajor(d).stepMinor(d):M.stepMinor()},M.stepMajor=function(d){return arguments.length?(a=+d[0],f=+d[1],M):[a,f]},M.stepMinor=function(d){return arguments.length?(c=+d[0],s=+d[1],M):[c,s]},M.precision=function(d){return arguments.length?(E=+d,h=ae(l,r,90),p=fe(n,t,E),v=ae(u,o,90),P=fe(e,i,E),M):E},M.extentMajor([[-180,-90+T],[180,90-T]]).extentMinor([[-180,-80-T],[180,80+T]])}const kt=t=>t;var St=new Rn,At=new Rn,Ve,Ze,$t,Lt,Mn={point:pn,lineStart:pn,lineEnd:pn,polygonStart:function(){Mn.lineStart=Li,Mn.lineEnd=Ci},polygonEnd:function(){Mn.lineStart=Mn.lineEnd=Mn.point=pn,St.add(Z(At)),At=new Rn},result:function(){var t=St/2;return St=new Rn,t}};function Li(){Mn.point=Di}function Di(t,n){Mn.point=Ge,Ve=$t=t,Ze=Lt=n}function Ge(t,n){At.add(Lt*t-$t*n),$t=t,Lt=n}function Ci(){Ge(Ve,Ze)}var jn=1/0,ft=jn,Qn=-jn,ct=Qn,st={point:Ti,lineStart:pn,lineEnd:pn,polygonStart:pn,polygonEnd:pn,result:function(){var t=[[jn,ft],[Qn,ct]];return Qn=ct=-(ft=jn=1/0),t}};function Ti(t,n){t<jn&&(jn=t),t>Qn&&(Qn=t),n<ft&&(ft=n),n>ct&&(ct=n)}var Dt=0,Ct=0,Gn=0,ht=0,pt=0,Yn=0,Tt=0,Ft=0,On=0,Oe,We,mn,En,sn={point:In,lineStart:ce,lineEnd:se,polygonStart:function(){sn.lineStart=Yi,sn.lineEnd=Bi},polygonEnd:function(){sn.point=In,sn.lineStart=ce,sn.lineEnd=se},result:function(){var t=On?[Tt/On,Ft/On]:Yn?[ht/Yn,pt/Yn]:Gn?[Dt/Gn,Ct/Gn]:[NaN,NaN];return Dt=Ct=Gn=ht=pt=Yn=Tt=Ft=On=0,t}};function In(t,n){Dt+=t,Ct+=n,++Gn}function ce(){sn.point=Fi}function Fi(t,n){sn.point=bi,In(mn=t,En=n)}function bi(t,n){var i=t-mn,e=n-En,r=Pn(i*i+e*e);ht+=r*(mn+t)/2,pt+=r*(En+n)/2,Yn+=r,In(mn=t,En=n)}function se(){sn.point=In}function Yi(){sn.point=Xi}function Bi(){Je(Oe,We)}function Xi(t,n){sn.point=Je,In(Oe=mn=t,We=En=n)}function Je(t,n){var i=t-mn,e=n-En,r=Pn(i*i+e*e);ht+=r*(mn+t)/2,pt+=r*(En+n)/2,Yn+=r,r=En*t-mn*n,Tt+=r*(mn+t),Ft+=r*(En+n),On+=r*3,In(mn=t,En=n)}function Ke(t){this._context=t}Ke.prototype={_radius:4.5,pointRadius:function(t){return this._radius=t,this},polygonStart:function(){this._line=0},polygonEnd:function(){this._line=NaN},lineStart:function(){this._point=0},lineEnd:function(){this._line===0&&this._context.closePath(),this._point=NaN},point:function(t,n){switch(this._point){case 0:{this._context.moveTo(t,n),this._point=1;break}case 1:{this._context.lineTo(t,n);break}default:{this._context.moveTo(t+this._radius,n),this._context.arc(t,n,this._radius,0,gn);break}}},result:pn};var bt=new Rn,yt,Qe,Ue,Wn,Jn,Un={point:pn,lineStart:function(){Un.point=qi},lineEnd:function(){yt&&xe(Qe,Ue),Un.point=pn},polygonStart:function(){yt=!0},polygonEnd:function(){yt=null},result:function(){var t=+bt;return bt=new Rn,t}};function qi(t,n){Un.point=xe,Qe=Wn=t,Ue=Jn=n}function xe(t,n){Wn-=t,Jn-=n,bt.add(Pn(Wn*Wn+Jn*Jn)),Wn=t,Jn=n}let he,gt,pe,ge;class ve{constructor(n){this._append=n==null?ni:ji(n),this._radius=4.5,this._=""}pointRadius(n){return this._radius=+n,this}polygonStart(){this._line=0}polygonEnd(){this._line=NaN}lineStart(){this._point=0}lineEnd(){this._line===0&&(this._+="Z"),this._point=NaN}point(n,i){switch(this._point){case 0:{this._append`M${n},${i}`,this._point=1;break}case 1:{this._append`L${n},${i}`;break}default:{if(this._append`M${n},${i}`,this._radius!==pe||this._append!==gt){const e=this._radius,r=this._;this._="",this._append`m0,${e}a${e},${e} 0 1,1 0,${-2*e}a${e},${e} 0 1,1 0,${2*e}z`,pe=e,gt=this._append,ge=this._,this._=r}this._+=ge;break}}}result(){const n=this._;return this._="",n.length?n:null}}function ni(t){let n=1;this._+=t[0];for(const i=t.length;n<i;++n)this._+=arguments[n]+t[n]}function ji(t){const n=Math.floor(t);if(!(n>=0))throw new RangeError(`invalid digits: ${t}`);if(n>15)return ni;if(n!==he){const i=10**n;he=n,gt=function(r){let l=1;this._+=r[0];for(const o=r.length;l<o;++l)this._+=Math.round(arguments[l]*i)/i+r[l]}}return gt}function Hi(t,n){let i=3,e=4.5,r,l;function o(u){return u&&(typeof e=="function"&&l.pointRadius(+e.apply(this,arguments)),Cn(u,r(l))),l.result()}return o.area=function(u){return Cn(u,r(Mn)),Mn.result()},o.measure=function(u){return Cn(u,r(Un)),Un.result()},o.bounds=function(u){return Cn(u,r(st)),st.result()},o.centroid=function(u){return Cn(u,r(sn)),sn.result()},o.projection=function(u){return arguments.length?(r=u==null?(t=null,kt):(t=u).stream,o):t},o.context=function(u){return arguments.length?(l=u==null?(n=null,new ve(i)):new Ke(n=u),typeof e!="function"&&l.pointRadius(e),o):n},o.pointRadius=function(u){return arguments.length?(e=typeof u=="function"?u:(l.pointRadius(+u),+u),o):e},o.digits=function(u){if(!arguments.length)return i;if(u==null)i=null;else{const c=Math.floor(u);if(!(c>=0))throw new RangeError(`invalid digits: ${u}`);i=c}return n===null&&(l=new ve(i)),o},o.projection(t).digits(i).context(n)}function Bt(t){return function(n){var i=new Yt;for(var e in t)i[e]=t[e];return i.stream=n,i}}function Yt(){}Yt.prototype={constructor:Yt,point:function(t,n){this.stream.point(t,n)},sphere:function(){this.stream.sphere()},lineStart:function(){this.stream.lineStart()},lineEnd:function(){this.stream.lineEnd()},polygonStart:function(){this.stream.polygonStart()},polygonEnd:function(){this.stream.polygonEnd()}};function Xt(t,n,i){var e=t.clipExtent&&t.clipExtent();return t.scale(150).translate([0,0]),e!=null&&t.clipExtent(null),Cn(i,t.stream(st)),n(st.result()),e!=null&&t.clipExtent(e),t}function ti(t,n,i){return Xt(t,function(e){var r=n[1][0]-n[0][0],l=n[1][1]-n[0][1],o=Math.min(r/(e[1][0]-e[0][0]),l/(e[1][1]-e[0][1])),u=+n[0][0]+(r-o*(e[1][0]+e[0][0]))/2,c=+n[0][1]+(l-o*(e[1][1]+e[0][1]))/2;t.scale(150*o).translate([u,c])},i)}function Vi(t,n,i){return ti(t,[[0,0],n],i)}function Zi(t,n,i){return Xt(t,function(e){var r=+n,l=r/(e[1][0]-e[0][0]),o=(r-l*(e[1][0]+e[0][0]))/2,u=-l*e[0][1];t.scale(150*l).translate([o,u])},i)}function Gi(t,n,i){return Xt(t,function(e){var r=+n,l=r/(e[1][1]-e[0][1]),o=-l*e[0][0],u=(r-l*(e[1][1]+e[0][1]))/2;t.scale(150*l).translate([o,u])},i)}var de=16,Oi=W(30*an);function _e(t,n){return+n?Ji(t,n):Wi(t)}function Wi(t){return Bt({point:function(n,i){n=t(n,i),this.stream.point(n[0],n[1])}})}function Ji(t,n){function i(e,r,l,o,u,c,s,a,f,h,p,v,P,E){var M=s-e,N=a-r,d=M*M+N*N;if(d>4*n&&P--){var w=o+h,z=u+p,y=c+v,$=Pn(w*w+z*z+y*y),k=Xn(y/=$),D=Z(Z(y)-1)<T||Z(l-f)<T?(l+f)/2:Bn(z,w),L=t(D,k),R=L[0],G=L[1],Y=R-e,C=G-r,g=N*Y-M*C;(g*g/d>n||Z((M*Y+N*C)/d-.5)>.3||o*h+u*p+c*v<Oi)&&(i(e,r,l,o,u,c,R,G,D,w/=$,z/=$,y,P,E),E.point(R,G),i(R,G,D,w,z,y,s,a,f,h,p,v,P,E))}}return function(e){var r,l,o,u,c,s,a,f,h,p,v,P,E={point:M,lineStart:N,lineEnd:w,polygonStart:function(){e.polygonStart(),E.lineStart=z},polygonEnd:function(){e.polygonEnd(),E.lineStart=N}};function M(k,D){k=t(k,D),e.point(k[0],k[1])}function N(){f=NaN,E.point=d,e.lineStart()}function d(k,D){var L=qn([k,D]),R=t(k,D);i(f,h,a,p,v,P,f=R[0],h=R[1],a=k,p=L[0],v=L[1],P=L[2],de,e),e.point(f,h)}function w(){E.point=M,e.lineEnd()}function z(){N(),E.point=y,E.lineEnd=$}function y(k,D){d(r=k,D),l=f,o=h,u=p,c=v,s=P,E.point=d}function $(){i(f,h,a,p,v,P,l,o,r,u,c,s,de,e),E.lineEnd=w,w()}return E}}var Ki=Bt({point:function(t,n){this.stream.point(t*an,n*an)}});function Qi(t){return Bt({point:function(n,i){var e=t(n,i);return this.stream.point(e[0],e[1])}})}function Ui(t,n,i,e,r){function l(o,u){return o*=e,u*=r,[n+t*o,i-t*u]}return l.invert=function(o,u){return[(o-n)/t*e,(i-u)/t*r]},l}function me(t,n,i,e,r,l){if(!l)return Ui(t,n,i,e,r);var o=W(l),u=V(l),c=o*t,s=u*t,a=o/t,f=u/t,h=(u*i-o*n)/t,p=(u*n+o*i)/t;function v(P,E){return P*=e,E*=r,[c*P-s*E+n,i-s*P-c*E]}return v.invert=function(P,E){return[e*(a*P-f*E+h),r*(p-f*P-a*E)]},v}function xi(t){return nr(function(){return t})()}function nr(t){var n,i=150,e=480,r=250,l=0,o=0,u=0,c=0,s=0,a,f=0,h=1,p=1,v=null,P=ue,E=null,M,N,d,w=kt,z=.5,y,$,k,D,L;function R(g){return k(g[0]*an,g[1]*an)}function G(g){return g=k.invert(g[0],g[1]),g&&[g[0]*wn,g[1]*wn]}R.stream=function(g){return D&&L===g?D:D=Ki(Qi(a)(P(y(w(L=g)))))},R.preclip=function(g){return arguments.length?(P=g,v=void 0,C()):P},R.postclip=function(g){return arguments.length?(w=g,E=M=N=d=null,C()):w},R.clipAngle=function(g){return arguments.length?(P=+g?Ii(v=g*an):(v=null,ue),C()):v*wn},R.clipExtent=function(g){return arguments.length?(w=g==null?(E=M=N=d=null,kt):Ai(E=+g[0][0],M=+g[0][1],N=+g[1][0],d=+g[1][1]),C()):E==null?null:[[E,M],[N,d]]},R.scale=function(g){return arguments.length?(i=+g,Y()):i},R.translate=function(g){return arguments.length?(e=+g[0],r=+g[1],Y()):[e,r]},R.center=function(g){return arguments.length?(l=g[0]%360*an,o=g[1]%360*an,Y()):[l*wn,o*wn]},R.rotate=function(g){return arguments.length?(u=g[0]%360*an,c=g[1]%360*an,s=g.length>2?g[2]%360*an:0,Y()):[u*wn,c*wn,s*wn]},R.angle=function(g){return arguments.length?(f=g%360*an,Y()):f*wn},R.reflectX=function(g){return arguments.length?(h=g?-1:1,Y()):h<0},R.reflectY=function(g){return arguments.length?(p=g?-1:1,Y()):p<0},R.precision=function(g){return arguments.length?(y=_e($,z=g*g),C()):Pn(z)},R.fitExtent=function(g,A){return ti(R,g,A)},R.fitSize=function(g,A){return Vi(R,g,A)},R.fitWidth=function(g,A){return Zi(R,g,A)},R.fitHeight=function(g,A){return Gi(R,g,A)};function Y(){var g=me(i,0,0,h,p,f).apply(null,n(l,o)),A=me(i,e-g[0],r-g[1],h,p,f);return a=Si(u,c,s),$=Rt(n,A),k=Rt(a,$),y=_e($,z),C()}function C(){return D=L=null,R}return function(){return n=t.apply(this,arguments),R.invert=n.invert&&G,Y()}}function tr(t){return function(n,i){var e=W(n),r=W(i),l=t(e*r);return l===1/0?[2,0]:[l*r*V(n),l*V(i)]}}function er(t){return function(n,i){var e=Pn(n*n+i*i),r=t(e),l=V(r),o=W(r);return[Bn(n*l,e*o),Xn(e&&i*l/e)]}}var ei=tr(function(t){return(t=Xe(t))&&t/V(t)});ei.invert=er(function(t){return t});function ir(){return xi(ei).scale(79.4188).clipAngle(180-.001)}function Ee(t,n,i){const e=t.slice();return e[17]=n[i].cx,e[18]=n[i].cy,e[19]=n[i].name,e}function Se(t,n,i){const e=t.slice();return e[22]=n[i],e[24]=i,e}function ye(t,n,i){const e=t.slice();return e[17]=n[i].cx,e[18]=n[i].cy,e[19]=n[i].name,e[24]=i,e}function we(t,n,i){const e=t.slice();return e[26]=n[i],e[24]=i,e}function Me(t,n,i){const e=t.slice();return e[22]=n[i],e[24]=i,e}function ze(t,n,i){const e=t.slice();return e[22]=n[i],e[24]=i,e}function Pe(t){let n,i;return{c(){n=J("path"),this.h()},l(e){n=K(e,"path",{d:!0,class:!0}),B(n).forEach(I),this.h()},h(){m(n,"d",i=t[9](t[22])),m(n,"class","marineBorders")},m(e,r){nn(e,n,r)},p(e,r){r&4&&i!==(i=e[9](e[22]))&&m(n,"d",i)},d(e){e&&I(n)}}}function Ne(t){let n,i;return{c(){n=J("path"),this.h()},l(e){n=K(e,"path",{d:!0,class:!0}),B(n).forEach(I),this.h()},h(){m(n,"d",i=t[9](t[22])),m(n,"class","country")},m(e,r){nn(e,n,r)},p(e,r){r&2&&i!==(i=e[9](e[22]))&&m(n,"d",i)},d(e){e&&I(n)}}}function Re(t){let n,i=cn(t[5]),e=[];for(let r=0;r<i.length;r+=1)e[r]=ke(we(t,i,r));return{c(){for(let r=0;r<e.length;r+=1)e[r].c();n=zn()},l(r){for(let l=0;l<e.length;l+=1)e[l].l(r);n=zn()},m(r,l){for(let o=0;o<e.length;o+=1)e[o]&&e[o].m(r,l);nn(r,n,l)},p(r,l){if(l&32){i=cn(r[5]);let o;for(o=0;o<i.length;o+=1){const u=we(r,i,o);e[o]?e[o].p(u,l):(e[o]=ke(u),e[o].c(),e[o].m(n.parentNode,n))}for(;o<e.length;o+=1)e[o].d(1);e.length=i.length}},d(r){r&&I(n),Dn(e,r)}}}function Ie(t){let n,i,e,r,l,o;return{c(){n=J("line"),this.h()},l(u){n=K(u,"line",{x1:!0,y1:!0,x2:!0,y2:!0,class:!0}),B(n).forEach(I),this.h()},h(){m(n,"x1",i=t[5][t[24]-1].cx),m(n,"y1",e=t[5][t[24]-1].cy),m(n,"x2",r=t[26].cx),m(n,"y2",l=t[26].cy),m(n,"class",o=lt(t[24]===t[5].length-1?"line highlite":"line old")+" svelte-1n5vzlb")},m(u,c){nn(u,n,c)},p(u,c){c&32&&i!==(i=u[5][u[24]-1].cx)&&m(n,"x1",i),c&32&&e!==(e=u[5][u[24]-1].cy)&&m(n,"y1",e),c&32&&r!==(r=u[26].cx)&&m(n,"x2",r),c&32&&l!==(l=u[26].cy)&&m(n,"y2",l),c&32&&o!==(o=lt(u[24]===u[5].length-1?"line highlite":"line old")+" svelte-1n5vzlb")&&m(n,"class",o)},d(u){u&&I(n)}}}function ke(t){let n,i=t[24]>0&&t[5][t[24]].name===t[5][t[24]-1].name&&Ie(t);return{c(){i&&i.c(),n=zn()},l(e){i&&i.l(e),n=zn()},m(e,r){i&&i.m(e,r),nn(e,n,r)},p(e,r){e[24]>0&&e[5][e[24]].name===e[5][e[24]-1].name?i?i.p(e,r):(i=Ie(e),i.c(),i.m(n.parentNode,n)):i&&(i.d(1),i=null)},d(e){e&&I(n),i&&i.d(e)}}}function Ae(t){let n,i=t[19]+"",e,r,l;return{c(){n=J("text"),e=Tn(i),this.h()},l(o){n=K(o,"text",{x:!0,y:!0,class:!0,"font-size":!0});var u=B(n);e=Fn(u,i),u.forEach(I),this.h()},h(){m(n,"x",r=t[17]+8),m(n,"y",l=t[18]+2),m(n,"class","satellite-name svelte-1n5vzlb"),m(n,"font-size","8")},m(o,u){nn(o,n,u),X(n,e)},p(o,u){u&32&&i!==(i=o[19]+"")&&ot(e,i),u&32&&r!==(r=o[17]+8)&&m(n,"x",r),u&32&&l!==(l=o[18]+2)&&m(n,"y",l)},d(o){o&&I(n)}}}function $e(t){let n,i,e,r,l,o,u=t[24]===t[5].length-1&&Ae(t);return{c(){n=J("circle"),u&&u.c(),o=zn(),this.h()},l(c){n=K(c,"circle",{cx:!0,cy:!0,r:!0,fill:!0,class:!0}),B(n).forEach(I),u&&u.l(c),o=zn(),this.h()},h(){m(n,"cx",i=t[17]),m(n,"cy",e=t[18]),m(n,"r",r=t[24]===t[5].length-1?5:1),m(n,"fill","blue"),m(n,"class",l=lt(t[24]===t[5].length-1?"dot highlite":"dot old")+" svelte-1n5vzlb")},m(c,s){nn(c,n,s),u&&u.m(c,s),nn(c,o,s)},p(c,s){s&32&&i!==(i=c[17])&&m(n,"cx",i),s&32&&e!==(e=c[18])&&m(n,"cy",e),s&32&&r!==(r=c[24]===c[5].length-1?5:1)&&m(n,"r",r),s&32&&l!==(l=lt(c[24]===c[5].length-1?"dot highlite":"dot old")+" svelte-1n5vzlb")&&m(n,"class",l),c[24]===c[5].length-1?u?u.p(c,s):(u=Ae(c),u.c(),u.m(o.parentNode,o)):u&&(u.d(1),u=null)},d(c){c&&(I(n),I(o)),u&&u.d(c)}}}function Le(t){let n,i;return{c(){n=J("path"),this.h()},l(e){n=K(e,"path",{d:!0,class:!0}),B(n).forEach(I),this.h()},h(){m(n,"d",i=t[9](t[22])),m(n,"class","spoua svelte-1n5vzlb")},m(e,r){nn(e,n,r)},p(e,r){r&8&&i!==(i=e[9](e[22]))&&m(n,"d",i)},d(e){e&&I(n)}}}function De(t){let n,i,e,r,l=t[19]+"",o,u,c;return{c(){n=J("circle"),r=J("text"),o=Tn(l),this.h()},l(s){n=K(s,"circle",{cx:!0,cy:!0,r:!0,fill:!0,class:!0}),B(n).forEach(I),r=K(s,"text",{x:!0,y:!0,"font-size":!0,class:!0});var a=B(r);o=Fn(a,l),a.forEach(I),this.h()},h(){m(n,"cx",i=t[17]),m(n,"cy",e=t[18]),m(n,"r",1),m(n,"fill","black"),m(n,"class","svelte-1n5vzlb"),m(r,"x",u=t[17]+4),m(r,"y",c=t[18]+2),m(r,"font-size","8"),m(r,"class","svelte-1n5vzlb")},m(s,a){nn(s,n,a),nn(s,r,a),X(r,o)},p(s,a){a&1&&i!==(i=s[17])&&m(n,"cx",i),a&1&&e!==(e=s[18])&&m(n,"cy",e),a&1&&l!==(l=s[19]+"")&&ot(o,l),a&1&&u!==(u=s[17]+4)&&m(r,"x",u),a&1&&c!==(c=s[18]+2)&&m(r,"y",c)},d(s){s&&(I(n),I(r))}}}function rr(t){var qt,jt;let n,i,e,r,l,o,u,c=`<p class="svelte-1n5vzlb">An interactive visualisation of all the space debris that reenteblue
            the atmosphere in the South Pacific Ocean. From 1960 until today.</p>`,s,a,f,h,p=((qt=t[5][t[5].length-1])==null?void 0:qt.name)+"",v,P,E,M,N=((jt=t[5][t[5].length-1])==null?void 0:jt.year)+"",d,w,z,y,$,k,D,L,R,G,Y,C,g,A,j,Q,U,Sn,fn,un=cn(t[2]),q=[];for(let _=0;_<un.length;_+=1)q[_]=Pe(ze(t,un,_));let vn=cn(t[1]),O=[];for(let _=0;_<vn.length;_+=1)O[_]=Ne(Me(t,vn,_));let on=t[5].length>1&&Re(t),kn=cn(t[5]),en=[];for(let _=0;_<kn.length;_+=1)en[_]=$e(ye(t,kn,_));let An=cn(t[3]),rn=[];for(let _=0;_<An.length;_+=1)rn[_]=Le(Se(t,An,_));let $n=cn(t[0]),ln=[];for(let _=0;_<$n.length;_+=1)ln[_]=De(Ee(t,$n,_));return{c(){n=dn("div"),i=dn("div"),e=Hn(),r=dn("div"),l=Hn(),o=dn("div"),u=dn("div"),u.innerHTML=c,s=Hn(),a=dn("div"),f=dn("span"),h=Tn("Satellite: "),v=Tn(p),P=Hn(),E=dn("span"),M=Tn("Year: "),d=Tn(N),w=Hn(),z=J("svg"),y=J("defs"),$=J("path"),k=J("clipPath"),D=J("use"),L=J("g"),R=J("circle"),G=J("g");for(let _=0;_<q.length;_+=1)q[_].c();Y=J("g");for(let _=0;_<O.length;_+=1)O[_].c();C=J("g"),on&&on.c(),g=J("g");for(let _=0;_<en.length;_+=1)en[_].c();A=J("g"),j=J("path"),Q=J("g");for(let _=0;_<rn.length;_+=1)rn[_].c();U=J("g");for(let _=0;_<ln.length;_+=1)ln[_].c();this.h()},l(_){n=_n(_,"DIV",{class:!0});var H=B(n);i=_n(H,"DIV",{class:!0,style:!0}),B(i).forEach(I),e=Vn(H),r=_n(H,"DIV",{class:!0,style:!0}),B(r).forEach(I),H.forEach(I),l=Vn(_),o=_n(_,"DIV",{class:!0});var b=B(o);u=_n(b,"DIV",{class:!0,"data-svelte-h":!0}),Ye(u)!=="svelte-aipxdi"&&(u.innerHTML=c),s=Vn(b),a=_n(b,"DIV",{class:!0});var Nn=B(a);f=_n(Nn,"SPAN",{class:!0});var S=B(f);h=Fn(S,"Satellite: "),v=Fn(S,p),S.forEach(I),P=Vn(Nn),E=_n(Nn,"SPAN",{class:!0});var tn=B(E);M=Fn(tn,"Year: "),d=Fn(tn,N),tn.forEach(I),Nn.forEach(I),b.forEach(I),w=Vn(_),z=K(_,"svg",{viewBox:!0,style:!0});var vt=B(z);y=K(vt,"defs",{});var dt=B(y);$=K(dt,"path",{id:!0,d:!0}),B($).forEach(I),k=K(dt,"clipPath",{class:!0,id:!0});var Ht=B(k);D=K(Ht,"use",{href:!0}),B(D).forEach(I),Ht.forEach(I),dt.forEach(I),L=K(vt,"g",{"clip-path":!0,class:!0});var yn=B(L);R=K(yn,"circle",{cx:!0,cy:!0,r:!0,fill:!0}),B(R).forEach(I),G=K(yn,"g",{class:!0,fill:!0,stroke:!0});var Vt=B(G);for(let x=0;x<q.length;x+=1)q[x].l(Vt);Vt.forEach(I),Y=K(yn,"g",{class:!0,fill:!0,stroke:!0});var Zt=B(Y);for(let x=0;x<O.length;x+=1)O[x].l(Zt);Zt.forEach(I),C=K(yn,"g",{class:!0});var Gt=B(C);on&&on.l(Gt),Gt.forEach(I),g=K(yn,"g",{class:!0});var Ot=B(g);for(let x=0;x<en.length;x+=1)en[x].l(Ot);Ot.forEach(I),A=K(yn,"g",{class:!0});var Wt=B(A);j=K(Wt,"path",{class:!0,fill:!0,d:!0}),B(j).forEach(I),Wt.forEach(I),Q=K(yn,"g",{class:!0});var Jt=B(Q);for(let x=0;x<rn.length;x+=1)rn[x].l(Jt);Jt.forEach(I),U=K(yn,"g",{class:!0});var Kt=B(U);for(let x=0;x<ln.length;x+=1)ln[x].l(Kt);Kt.forEach(I),yn.forEach(I),vt.forEach(I),this.h()},h(){m(i,"class","progress svelte-1n5vzlb"),Ln(i,"width",(t[6]+1)/t[4].length*100+"%"),m(r,"class","draggable svelte-1n5vzlb"),Ln(r,"left",(t[6]+1)/t[4].length*100+"%"),m(n,"class","progress-bar svelte-1n5vzlb"),m(u,"class","description svelte-1n5vzlb"),m(f,"class","svelte-1n5vzlb"),m(E,"class","svelte-1n5vzlb"),m(a,"class","satellite-info svelte-1n5vzlb"),m(o,"class","top-bar svelte-1n5vzlb"),m($,"id","sphere"),m($,"d",t[9]({type:"Sphere"})),m(D,"href","#sphere"),m(k,"class","clip"),m(k,"id","clip"),m(R,"cx",t[7]/2),m(R,"cy",t[8]/2),m(R,"r",t[7]),m(R,"fill","#efffff"),m(G,"class","marine svelte-1n5vzlb"),m(G,"fill","#e2eaea"),m(G,"stroke","blue"),m(Y,"class","world svelte-1n5vzlb"),m(Y,"fill","white"),m(Y,"stroke","none"),m(C,"class","svelte-1n5vzlb"),m(g,"class","svelte-1n5vzlb"),m(j,"class","graticule svelte-1n5vzlb"),m(j,"fill","none"),m(j,"d",t[9](t[10]())),m(A,"class","svelte-1n5vzlb"),m(Q,"class","spoua svelte-1n5vzlb"),m(U,"class","nemo svelte-1n5vzlb"),m(L,"clip-path","url(#clip)"),m(L,"class","svelte-1n5vzlb"),m(z,"viewBox","0 0 "+t[7]+" "+t[8]),Ln(z,"width","100%"),Ln(z,"height","100vh")},m(_,H){nn(_,n,H),X(n,i),X(n,e),X(n,r),nn(_,l,H),nn(_,o,H),X(o,u),X(o,s),X(o,a),X(a,f),X(f,h),X(f,v),X(a,P),X(a,E),X(E,M),X(E,d),nn(_,w,H),nn(_,z,H),X(z,y),X(y,$),X(y,k),X(k,D),X(z,L),X(L,R),X(L,G);for(let b=0;b<q.length;b+=1)q[b]&&q[b].m(G,null);X(L,Y);for(let b=0;b<O.length;b+=1)O[b]&&O[b].m(Y,null);X(L,C),on&&on.m(C,null),X(L,g);for(let b=0;b<en.length;b+=1)en[b]&&en[b].m(g,null);X(L,A),X(A,j),X(L,Q);for(let b=0;b<rn.length;b+=1)rn[b]&&rn[b].m(Q,null);X(L,U);for(let b=0;b<ln.length;b+=1)ln[b]&&ln[b].m(U,null);Sn||(fn=ri(n,"mousedown",t[11]),Sn=!0)},p(_,[H]){var b,Nn;if(H&80&&Ln(i,"width",(_[6]+1)/_[4].length*100+"%"),H&80&&Ln(r,"left",(_[6]+1)/_[4].length*100+"%"),H&32&&p!==(p=((b=_[5][_[5].length-1])==null?void 0:b.name)+"")&&ot(v,p),H&32&&N!==(N=((Nn=_[5][_[5].length-1])==null?void 0:Nn.year)+"")&&ot(d,N),H&516){un=cn(_[2]);let S;for(S=0;S<un.length;S+=1){const tn=ze(_,un,S);q[S]?q[S].p(tn,H):(q[S]=Pe(tn),q[S].c(),q[S].m(G,null))}for(;S<q.length;S+=1)q[S].d(1);q.length=un.length}if(H&514){vn=cn(_[1]);let S;for(S=0;S<vn.length;S+=1){const tn=Me(_,vn,S);O[S]?O[S].p(tn,H):(O[S]=Ne(tn),O[S].c(),O[S].m(Y,null))}for(;S<O.length;S+=1)O[S].d(1);O.length=vn.length}if(_[5].length>1?on?on.p(_,H):(on=Re(_),on.c(),on.m(C,null)):on&&(on.d(1),on=null),H&32){kn=cn(_[5]);let S;for(S=0;S<kn.length;S+=1){const tn=ye(_,kn,S);en[S]?en[S].p(tn,H):(en[S]=$e(tn),en[S].c(),en[S].m(g,null))}for(;S<en.length;S+=1)en[S].d(1);en.length=kn.length}if(H&520){An=cn(_[3]);let S;for(S=0;S<An.length;S+=1){const tn=Se(_,An,S);rn[S]?rn[S].p(tn,H):(rn[S]=Le(tn),rn[S].c(),rn[S].m(Q,null))}for(;S<rn.length;S+=1)rn[S].d(1);rn.length=An.length}if(H&1){$n=cn(_[0]);let S;for(S=0;S<$n.length;S+=1){const tn=Ee(_,$n,S);ln[S]?ln[S].p(tn,H):(ln[S]=De(tn),ln[S].c(),ln[S].m(U,null))}for(;S<ln.length;S+=1)ln[S].d(1);ln.length=$n.length}},i:Kn,o:Kn,d(_){_&&(I(n),I(l),I(o),I(w),I(z)),Dn(q,_),Dn(O,_),on&&on.d(),Dn(en,_),Dn(rn,_),Dn(ln,_),Sn=!1,fn()}}}function lr(t,n,i){let e=window.innerWidth,r=window.innerHeight;const l=ir().rotate([123,48]).scale(250).precision(1).clipAngle(95.3).translate([e/2,r/2]),o=Hi().projection(l),u=$i().step([0,10]);let{data:c}=n,s=[{lon:-126.3622344,lat:-72.9741938,name:"Maher Island"},{lon:-109.452777777778,lat:-27.2013888888889,name:"Easter Island"},{lon:-124.787888,lat:-24.6807263,name:"Ducie Island"},{lon:-123.3933333,lat:-48.8766667,name:"Point Nemo"}],a=[],f=[],h=[],p=[],v=[],P=0,E;Te(async()=>{try{const d=await fetch("world.json").then(y=>y.json()),w=await fetch("EEZ_land_v2_201410.json").then(y=>y.json()),z=await fetch("spoua.json").then(y=>y.json());i(1,a=_t(d,d.objects.countries).features),i(2,f=_t(w,w.objects.EEZ_land_v2_201410).features),i(3,h=_t(z,z.objects.spoua).features),i(4,p=c.map(y=>{const[$,k]=l([y.lon,y.lat]);return{cx:$,cy:k,name:y.satellite_name,year:y.satellite_decay}}).filter(y=>!isNaN(y.cx)&&!isNaN(y.cy))),i(0,s=s.map(y=>{const[$,k]=l([y.lon,y.lat]);return{cx:$,cy:k,name:y.name}})),M()}catch(d){console.error("Error loading or processing data:",d)}});const M=()=>{E=setInterval(()=>{P<p.length?(i(5,v=[...v,p[P]]),i(6,P+=1)):clearInterval(E)},500)};function N(d){const w=d.currentTarget.getBoundingClientRect();let z=d.clientX-w.left;const y=w.width;z<0?z=0:z>y&&(z=y);const $=z/y*100;i(6,P=Math.floor($/100*p.length)),i(5,v=p.slice(0,P+1))}return t.$$set=d=>{"data"in d&&i(12,c=d.data)},[s,a,f,h,p,v,P,e,r,o,u,N,c]}let or=class extends Fe{constructor(n){super(),be(this,n,lr,rr,Ce,{data:12})}};function ur(t){let n,i,e,r;return i=new or({props:{data:t[0]}}),{c(){n=dn("article"),ui(i.$$.fragment),this.h()},l(l){n=_n(l,"ARTICLE",{class:!0});var o=B(n);ai(i.$$.fragment,o),o.forEach(I),this.h()},h(){m(n,"class","svelte-16tfz48"),ii(()=>t[3].call(n))},m(l,o){nn(l,n,o),fi(i,n,null),e=ci(n,t[3].bind(n)),r=!0},p(l,o){const u={};o&1&&(u.data=l[0]),i.$set(u)},i(l){r||(Mt(i.$$.fragment,l),r=!0)},o(l){wt(i.$$.fragment,l),r=!1},d(l){l&&I(n),si(i),e()}}}function ar(t){let n,i="Loading...";return{c(){n=dn("article"),n.textContent=i,this.h()},l(e){n=_n(e,"ARTICLE",{class:!0,"data-svelte-h":!0}),Ye(n)!=="svelte-1qk6kpe"&&(n.textContent=i),this.h()},h(){m(n,"class","svelte-16tfz48")},m(e,r){nn(e,n,r)},p:Kn,i:Kn,o:Kn,d(e){e&&I(n)}}}function fr(t){let n,i,e,r;const l=[ar,ur],o=[];function u(c,s){return c[0].length===0?0:1}return n=u(t),i=o[n]=l[n](t),{c(){i.c(),e=zn()},l(c){i.l(c),e=zn()},m(c,s){o[n].m(c,s),nn(c,e,s),r=!0},p(c,[s]){let a=n;n=u(c),n===a?o[n].p(c,s):(oi(),wt(o[a],1,1,()=>{o[a]=null}),li(),i=o[n],i?i.p(c,s):(i=o[n]=l[n](c),i.c()),Mt(i,1),i.m(e.parentNode,e))},i(c){r||(Mt(i),r=!0)},o(c){wt(i),r=!1},d(c){c&&I(e),o[n].d(c)}}}function cr(t,n,i){let e=[],r,l;Te(async()=>{const u=await fetch("data.json");i(0,e=await u.json())});function o(){r=this.clientWidth,l=this.clientHeight,i(1,r),i(2,l)}return[e,r,l,o]}class gr extends Fe{constructor(n){super(),be(this,n,cr,fr,Ce,{})}}export{gr as component};
