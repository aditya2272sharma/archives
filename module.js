var NameSpace = NameSpace || {};

(function(){
  function PatternUnlock(){

    var defaults = {}, config = {}, cache = {}, fn = {}, api = {};

    var patternObject;

    fn = {
      init : function ( args ){
        patternObject = new pattern(args);
      },
      new : function ( args ) {
        patternObject.isRegistering = true;
      },
      totalReset : function ( args ) {
        this.isUnlocking = false;
        this.isRegistering = false;
        this.hasRegistrationStarted = false;
        this.patternTest = [];
        this.currentTargets = [];
      },
      start : function ( event ) {
        var target;

        target = event.target;
        if(this.hasTouch){
           target = event.touches[0];
        }
        if( target.className.indexOf("dots")>=0 ){
          if(this.isRegistering){
            this.hasRegistrationStarted = true;
          } else {
            this.isUnlocking = true;
          }
        }

        
      },
      move : function ( event ) {
        var target;

        target = event.target;

        if( this.isRegistering){
          if( target.className.indexOf("dots")>=0 ){


            if(this.hasRegistrationStarted){
              if(target.className.indexOf("active")==-1){
                target.className = target.className + " active";
                this.patternTargets.push(target);
                this.patternArray.push({
                  row     : target.getAttribute("row"),
                  column  : target.getAttribute("col")
                });

                console.log(this.patternArray);
              }
            }


          }
        }  else if(this.isUnlocking) {

          if( target.className.indexOf("dots")>=0 ){
            if(target.className.indexOf("selected")==-1){
                target.className = target.className + " selected";
                this.currentTargets.push(target);
                this.patternTest.push({
                  row     : target.getAttribute("row"),
                  column  : target.getAttribute("col")
                });
              }
          }
        }
      },
      end : function ( event ) {
        // if( (event.target == this.el) ){

          if(this.hasRegistrationStarted ){
            if(this.patternArray.length >= 3){
              X("#message").html("Registration Successful");
            } else {
              X("#message").html("Registration Failed");
            }
            this.isRegistering = false;
          }
          if ( this.isUnlocking ) {
            //Unlocking Algo
            if(this.patternArray.length != this.patternTest.length){
              X("#message").html("Error: Incorrect Pattern");
            } else {
              for ( var i =0; i < this.patternArray.length; i++ ){
                if(
                    (this.patternArray[i].row == this.patternTest[i].row)
                  &&
                    (this.patternArray[i].column == this.patternTest[i].column)
                ){
                  X("#message").html("Success: Patterns Matching");
                } else {
                  X("#message").html("Error: Patterns Mismatch");
                }
              }
            }
          }


        // }


        for( var index in this.patternTargets){
          this.patternTargets[index].className = "dots";
        }
        for( var index in this.currentTargets){
          this.currentTargets[index].className = "dots";
        }

        fn.totalReset.call(this);

      }

    }

    function pattern ( options ){
      var el;

      el = options['element'];
      if (el){
        this.el = el;

        el.addEventListener("touchstart", this, false);
        el.addEventListener("mousedown", this, false);

        el.addEventListener("touchmove", this, false);
        el.addEventListener("mousemove", this, false);

        el.addEventListener("touchend", this, false);
        el.addEventListener("touchcancel", this, false);
        el.addEventListener("mouseup", this, false);
      }
    }

    pattern.prototype = {
      patternArray : [],    //Saved Pattern Data
      patternTargets : [],  //html elements collection
      patternTest : [],     //Unlocking Pattern Data
      currentTargets : [],  //html elements collection
      isRegistering : false,
      isUnlocking   : false,
      hasTouch : 'ontouchstart' in window,
      hasRegistrationStarted : false,
      handleEvent : function ( event ) {
        switch( event.type ){
          case "touchstart":
          case "mousedown":
          fn.start.call(this, event);
          break;

          case "touchmove":
          case "mousemove":
          fn.move.call(this, event);
          break;

          case "touchend":
          case "touchcancel":
          case "mouseup":
          fn.end.call(this, event);
          break;
        }
      }
    }


    api = {
      init : function ( args ) { return fn.init.apply(this, [args]); },
      // save : function ( args ) { return fn.save.apply(this, [args]); },
      new  : function ( args ) { return fn.new.apply (this, [args]); }
    }

    return api;
  }


  this.PatternUnlock = PatternUnlock();

}).apply(NameSpace);
