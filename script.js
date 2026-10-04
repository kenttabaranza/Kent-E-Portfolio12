(function(){
  var root=document.documentElement;

  function currentTheme(){
    var t=root.getAttribute('data-theme');
    if(t) return t;
    return window.matchMedia('(prefers-color-scheme: dark)').matches?'dark':'light';
  }
  try{var saved=localStorage.getItem('kt-theme'); if(saved) root.setAttribute('data-theme',saved);}catch(e){}
  document.getElementById('theme').addEventListener('click',function(){
    var next=currentTheme()==='dark'?'light':'dark';
    root.setAttribute('data-theme',next);
    try{localStorage.setItem('kt-theme',next);}catch(e){}
  });

  var links=[].slice.call(document.querySelectorAll('.nav a'));
  var map={};
  links.forEach(function(a){map[a.getAttribute('href').slice(1)]=a;});
  if('IntersectionObserver' in window){
    var io=new IntersectionObserver(function(entries){
      entries.forEach(function(en){
        if(en.isIntersecting){
          links.forEach(function(a){a.removeAttribute('aria-current');});
          var a=map[en.target.id]; if(a) a.setAttribute('aria-current','true');
        }
      });
    },{rootMargin:'-35% 0px -55% 0px'});
    Object.keys(map).forEach(function(id){var el=document.getElementById(id); if(el) io.observe(el);});
  }
  var status=document.getElementById('status');
  document.querySelectorAll('.copy').forEach(function(btn){
    var label=btn.textContent;
    btn.addEventListener('click',function(){
      var text=btn.getAttribute('data-copy');
      function done(ok){
        btn.textContent=ok?'Copied':'Copy failed';
        status.textContent=ok?text+' copied to clipboard':'Could not copy. Select the text and copy it manually.';
        setTimeout(function(){btn.textContent=label;},1800);
      }
      if(navigator.clipboard&&navigator.clipboard.writeText){
        navigator.clipboard.writeText(text).then(function(){done(true);},function(){done(false);});
      }else{done(false);}
    });
  });

  document.getElementById('year').textContent=new Date().getFullYear();
})();