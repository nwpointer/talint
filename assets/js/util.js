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