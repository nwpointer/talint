leaves= function(obj, l, path){
	// returns all leaves with the path to the root added 
	var l = l || [];
	Object.keys(obj).forEach(function(k,i,keys){
		var p = copyArr(path)
		p.push(k);
		if(Array.isArray(obj[k])){
			set=obj[k].map(function(v){
				v.path = copyArr(p)
				v.path.push(v.id.toString())
				return(v);
			})
			l = l.concat(obj[k]);
		}else{

			l = leaves(obj[k], l, p);
		}
	});
	return l;
};
traverse = function(obj,keys){
	if(keys.length){
		key = keys.shift();
		return (isIndex(key) ? obj.filter(bykey)[0] : traverse(obj[key], keys));
	}
	function bykey(record){
		return record.id == key
	}
}
copyArr = function(arr){
	return arr ? arr.slice(): [];
}
tail = function(list){p = copyArr(list);p.shift(); return p ? p :[false]};
last = function(list){return list[list.length - 1] || [false]}
head = function(list){return list[0] || [false]}
isIndex = function(num){return !isNaN(parseInt(num))}

function decodeHtml(html) {
    var txt = document.createElement("textarea");
    txt.innerHTML = html;
    return txt.value;
}

function setCookie(cname, cvalue, exdays) {
    var d = new Date();
    d.setTime(d.getTime() + (exdays*24*60*60*1000));
    var expires = "expires="+d.toUTCString();
    document.cookie = cname + "=" + cvalue + "; " + expires;
}

function getCookie(cname) {
    var name = cname + "=";
    var ca = document.cookie.split(';');
    for(var i=0; i<ca.length; i++) {
        var c = ca[i];
        while (c.charAt(0)==' ') c = c.substring(1);
        if (c.indexOf(name) == 0) return c.substring(name.length,c.length);
    }
    return "";
}