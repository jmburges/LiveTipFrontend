(function() {
    // There's nothing to do for older browsers ;)
    if (!window.addEventListener)
        return;
    var blockPopstateEvent = true;
    window.addEventListener("load", function() {
        // The timeout ensures that popstate-events will be unblocked right
        // after the load event occured, but not in the same event-loop cycle.
        setTimeout(function(){ blockPopstateEvent = false; }, 0);
    }, false);
    window.addEventListener("popstate", function(evt) {
        if (blockPopstateEvent && document.readyState=="complete") {
            evt.preventDefault();
            evt.stopImmediatePropagation();
        }
    }, false);
})();


function getUrlVars()
{
  return getVars(window.location.href);
}

function getVars(href)
{
    var vars = [], hash;
    var hashes = href.slice(href.indexOf('?') + 1).split('&');
    for(var i = 0; i < hashes.length; i++)
    {
        hash = hashes[i].split('=');
        vars.push(hash[0]);
        vars[hash[0]] = hash[1];
    }
    return vars;

}
