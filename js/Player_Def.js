class Player_Def {
	constructor(player)
	{
		this.firstName = player.firstName;
		this.lastName = player.lastName;
		this.age = player.age;
		this.competences = player.competences
		this.caract = player.caract;
		this.stat = player.stat;
		this.bio = player.bio;
		this.work = player.work;
		this.desc = player.desc;
		this.avatar = player.avatar;

		this.init();
	}

	init()
	{
		var tmp = null;

		tmp = jQuery("#new_competence_def");
		tmp.on('click', () => {
			var name = jQuery("#new_name_comp").val();
			var desc = jQuery("#new_desc_comp").val();
			if (name != null && desc != null && name != "" && desc != "" && name != "Nom" && desc != "Description") {
				jQuery("#new_name_comp").val("Nom");
				jQuery("#new_desc_comp").val("Description");
				this.add_new_comp(name, desc);
			}
		});

		tmp = jQuery("#new_stat_def");
		tmp.on('click', () => {
			var name = jQuery("#new_name_stat").val();
			var desc = jQuery("#new_value_stat").val();
			if (name != null && desc != null && name != "" && name != "Nom") {
				jQuery("#new_name_stat").val("Nom");
				jQuery("#new_value_stat").val('');
				this.add_new_stat(name, desc);
			}
		});

		tmp = jQuery("#new_caract_def");
		tmp.on('click', () => {
			var name = jQuery("#new_name_caract").val();
			var desc = jQuery("#new_value_caract").val();
			if (name != null && desc != null && name != "" && name != "Nom") {
				jQuery("#new_name_caract").val("Nom");
				jQuery("#new_value_caract").val('');
				this.add_new_caract(name, desc);
			}
		});

		tmp = jQuery("#avatar_def");
		tmp.on('click', () => {
			jQuery("#new_avatar").click();
		});

		tmp = jQuery("#new_avatar");
		tmp.on('change', () =>{
			var preview = $("#avatar_def");
			var file = tmp.prop("files")[0];
			var reader = new FileReader();
			reader.addEventListener('load', (file) => {
				preview.attr('src', reader.result);
				this.avatar = $("#avatar_def").attr('src');
    		}, false);
    		if (file) {
    			reader.readAsDataURL(file);
    		}
		});
	}

	add_new_comp(name, desc)
	{
		var html_added = "";

		this.competences[name] = desc;
		html_added = "<input type='text' class='browser-default name_input shadow_in' id='" + name + "_name' value='" + name + "'/> : "
		html_added += "<input type='text' class='browser-default desc_input shadow_in' style='margin-top : 1rem;' id='" + name + "_desc' value='" + desc.replace(/\'/gi, " ") + "'/><br>"
		jQuery("#competences_def").append(html_added);
	}

	add_new_stat(name, desc)
	{
		var html_added = "";

		desc = parseInt(desc, 10)
		this.stat[name] = desc;
		html_added = "<li>" + name.toUpperCase() +" : <input type='number' class='browser-default input_stat' id='" + name + "' min='0' value='" + desc + "'></li>";
		jQuery("#stats_def").append(html_added);
	}

	add_new_caract(name, desc)
	{
		var html_added = "";

		desc = parseInt(desc, 10)
		this.caract[name] = desc;
		html_added = "<li>" + name.toUpperCase() +" : <input type='number' class='browser-default caract_input' id='" + name + "' min='0' value='" + desc + "'></li>";
		jQuery("#caract_def").append(html_added);
	}
}