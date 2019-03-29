var xQuery = xQuery || {};
(function(win){
  //not jQuery
  function xQuery ( selector, scope ){
    return xQuery.prototype.init( selector, scope );
  }

  xQuery.prototype = {
    el     : null,
    style  : null,
    init   : init,
    splice : function (){
      return [].splice;
    },
    length : 0,
    noop   : function (){},
    html   : function ( string ) {
      this.el.innerHTML = string;
    },
    extend : function (){
      var args, target, start;
      args    = [].slice.call(arguments);
      target  = args[0];
      start   = 1;

      if (typeof target === "boolean"){
        target = args[1];
        start  = 2;
      }
      for( var i= start; i < args.length; i++ ){
        var obj = args[i];
        for( var key in obj ){
          target[key] = obj[key];
          //references will be shallow copied
          //no deep-copy as of now
        }
      }
    },
    hide : function (){
      if(this.el instanceof HTMLElement){
        this.el.style.display = 'none';
      }
        
      return this;
    },
    show : function (){
      if(this.el instanceof HTMLElement){
        console.log(this.style.display);
        this.el.style.display = this.style.display;
      }
      return this;
    },
    on : function (event, callback, bubbles) {
      this.el && this.el[xQuery.listenerType](event, callback, bubbles);
    }

  }

  xQuery.noop = xQuery.prototype.noop;
  xQuery.extend = xQuery.prototype.extend;
  xQuery.prototype.init.prototype = xQuery.prototype;
  xQuery.listenerType = (function () {
    if( window.addEventListener) return "addEventListener";
    if( window.attachEvent)      return "attachEvent";
  })();
  function init( selector, scope ) {
    var element;
    element = Zizzle ( selector, scope );
    if(element){
      this.el = element;
      this.style = this.style || window.getComputedStyle(element, null);
    }
    return this;
  }

  // Not Sizzle
  function Zizzle( selector, scope ){

    if (!selector){
      return window;
    }

    // not a very good selector
    if(selector.indexOf('#') > -1 ){
      var selector = selector.split("#")[1];
      return document.getElementById(selector);
    }
  }

  



  window.xQuery = window.X = xQuery;

})(window);

// console.log(X);