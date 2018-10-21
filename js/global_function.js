function do_list(list)
{
	var resultat = "";
		for (var i in list) {
			if (list.hasOwnProperty(i)) {
					resultat += "<li id='" + i + "'>" + i + " :\n " + list[i] + "</li>";
			}
	}
	return resultat;
}

function do_list_edit(list)
{
	var resultat = "";
		for (var i in list) {
			if (list.hasOwnProperty(i)) {
					resultat += "<input type='text' class='browser-default name_input' id='" + i + "_name' value='" + i + "'/> : ";
					resultat += "<input type='text' class='browser-default desc_input' id='" + i + "_desc' value='" + list[i] + "'/><br>";
			}
	}
	return resultat;
}

function do_stat_list(list, src_page = null)
{
	var resultat = "";
		for (var i in list.Player_Def.stat) {
			if (list.Player_Def.stat.hasOwnProperty(i)) {
					if  (src_page == "page_perso")
						resultat += "<li>" + i.toUpperCase() +" : <input type='number' class='input_stat' id='" + i + "' min='0' value='" + (list.Player_Def.stat[i] + list.Player.stat[i]) + "'></li>";
					else if (src_page == "page_edit")
						resultat += "<li>" + i.toUpperCase() +" : <input type='number' class='browser-default input_stat' id='" + i + "' min='0' value='" + list.Player_Def.stat[i] + "'></li>";
			}
	}
	return resultat;
}

function convert_to_string(txt)
{
	var regex = /<br>/gi;
	txt = txt.replace(regex, '\n');
	return txt;
}

function convert_to_html(txt)
{
	var regex = /\n/gi;
	txt = txt.replace(regex, '<br>');
	return txt;
}

function download(filename, text) {
    var pom = document.createElement('a');
    pom.setAttribute('href', 'data:text/plain;charset=utf-8,' + encodeURIComponent(text));
    pom.setAttribute('download', filename);

    if (document.createEvent) {
        var event = document.createEvent('MouseEvents');
        event.initEvent('click', true, true);
        pom.dispatchEvent(event);
    }
    else {
        pom.click();
    }
}