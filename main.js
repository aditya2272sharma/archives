NameSpace.PatternUnlock.init({
  element : document.getElementById("pattern-wrapper")
});

X("#createNew").on("click", function(){
  NameSpace.PatternUnlock.new();
});

// X("#savePattern").on("click", function(){
//   NameSpace.PatternUnlock.save();
// });