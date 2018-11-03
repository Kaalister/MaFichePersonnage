function do_list(list)
{
	var resultat = "";
		for (var i in list) {
			if (list.hasOwnProperty(i)) {
					resultat += "<li id='" + i + "'><strong>" + i + "</strong> :\n " + list[i] + "</li>";
			}
	}
	return resultat;
}

function do_list_edit(list)
{
	var resultat = "";
		for (var i in list) {
			if (list.hasOwnProperty(i)) {
					resultat += "<input type='text' class='browser-default name_input shadow_in' style='margin-top : 1rem;' id='" + i + "_name' value='" + i + "'/> : ";
					resultat += "<input type='text' class='browser-default desc_input shadow_in' style='margin-top : 1rem;' id='" + i + "_desc' value='" + list[i] + "'/><br>";
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
						resultat += "<li><strong>" + i.toUpperCase() +"</strong>: <input type='number' class='input_stat' id='" + i + "' min='0' value='" + (list.Player_Def.stat[i] + list.Player.stat[i]) + "'></li>";
					else if (src_page == "page_edit")
						resultat += "<li><strong>" + i.toUpperCase() +"</strong>: <input type='number' class='browser-default input_stat' id='" + i + "' min='0' value='" + list.Player_Def.stat[i] + "'></li>";
			}
	}
	return resultat;
}

function do_inventory_list(list)
{
	var resultat = "";
	var regex = /['" ()\[\]]/gi;

		for (var i in list) {
			if (list.hasOwnProperty(i)) {
				resultat += "<li class='li_item'><div class='case name_item browser-default' id='name_item'>" + i +"</div><div class='case desc_item browser-default' id='desc_item'>" + list[i].desc + "</div><input type='number' class='case nb_item browser-default' id='nb_item' min='0' value='" + list[i].nb + "'><i class='material-icons tiny add_button' id='remove_" + i.replace(regex, '_') + "'>remove</i></li>";
			}
	}
	return resultat;
}

function do_caract_list(list, src_page = null)
{
	var resultat = "";
		for (var i in list.Player_Def.caract) {
			if (list.Player_Def.caract.hasOwnProperty(i)) {
					if  (src_page == "page_perso")
						resultat += "<li><strong>" + i.toUpperCase() +"</strong>: <input type='number' class='browser-default caract_input' id='" + i + "' min='0' value='" + (list.Player_Def.caract[i] + list.Player.caract[i]) + "' max='" + list.Player_Def.caract[i] + "'></li>";
					else if (src_page == "page_edit")
						resultat += "<li><strong>" + i.toUpperCase() +"</strong> : <input type='number' class='browser-default caract_input' id='" + i + "' min='0' value='" + list.Player_Def.caract[i] + "'></li>";
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