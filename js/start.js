class Page 
{
	constructor()
	{
		this.Player = null;
		this.Player_Def = null;
		this.init();
	}
	
	toggle_content(page)
	{
		switch (page) {
			case "start" :
				jQuery("#page_perso").hide();
				jQuery("#start_page").fadeIn("fast");
				jQuery("#edit_button").hide();
				jQuery("#page_edit").hide();
				jQuery("#back_button").hide();
				this.toggle_help(false);
			break;
			case "perso" :
				jQuery("#page_perso").fadeIn("fast");
				jQuery("#edit_button").fadeIn("fast");
				jQuery("#start_page").hide();
				jQuery("#page_edit").hide();
				jQuery("#back_button").hide();
				this.toggle_help(false);
			break;
			case "edit" :
				jQuery("#page_perso").hide();
				jQuery("#start_page").hide();
				jQuery("#edit_button").hide();
				jQuery("#page_edit").fadeIn("fast");
				jQuery("#back_button").fadeIn("fast");
				this.toggle_help(false);
			break;
		}
	}

	toggle_help(help = false)
	{
		if (help == true) {
			$("#help").hide();
			$("#no_help").fadeIn("fast");
			if (jQuery("#start_page").css('display') != 'none' && jQuery("#start_page").css("visibility") != "hidden") {
				$("#start_help").fadeIn("fast");
			} else if (jQuery("#page_edit").css('display') != 'none' && jQuery("#page_edit").css("visibility") != "hidden") {
				$("#edit_help").fadeIn("fast");
			} else if (jQuery("#page_perso").css('display') != 'none' && jQuery("#page_perso").css("visibility") != "hidden") {
				$("#perso_help").fadeIn("fast");
			}
		} else {
			$("#help").fadeIn("fast");
			$("#no_help").hide();
			$(".help_content").hide();
		}
	}

	init()
	{
		var tmp;
		var page = this;

		this.toggle_content("start");
		this.toggle_help(false);
		this.windows_size();
		
		//permet de lancer la demande de ficher
		tmp = jQuery("#open_save");
		tmp.on('click', () => {
			jQuery("#take_save").click();
		});


		//lance la lecture du ficher envoyé
		tmp = jQuery("#take_save");
		tmp.on('change', () => {
			var file = $("#take_save").prop("files")[0];
			var reader = new FileReader();
			reader.readAsText(file);
			reader.onload = function() {
				var obj = JSON.parse(reader.result);
				page.load_save(obj);
			};
			reader.addEventListener("load", function () {
    			page.generate_perso_page();
				page.toggle_content("perso");
  			}, false);
		});

		//ouvre le profil défault pour créer un nouveau personnage
		tmp = jQuery("#new_perso");
		tmp.on('click', () => {
			var txt = null;
			$.getJSON('../model/default.jdr.json', function( data ) {
   				 page.load_save(data);
   				 page.generate_edit_page();
   				 page.toggle_content("edit");
			});
		});

		//ouvre le mode edition
		tmp = jQuery("#edit_button");
		tmp.on('click', () => {
			this.clear_page_perso();
			this.generate_edit_page();
			this.toggle_content("edit");
		});

		//reviens à la page principale
		tmp = jQuery("#back_button");
		tmp.on('click', () => {
			this.save_edition();
			this.clear_page_edit();
			this.generate_perso_page();
			this.toggle_content("perso");
		});
		
		//lance télécharge le fichier de sauvgarde
		tmp = jQuery("#save_btn");
		tmp.on('click', () => {
			this.Player.save_inventory();
			var txt = JSON.stringify(page);
			download(page.Player_Def.firstName + page.Player_Def.lastName + ".jdr.json", txt);
		});

		//affiche aide lorsque l'on appuie sur help
		tmp = jQuery("#help");
		tmp.on('click', () => {
			this.toggle_help(true);
		});

		//cache l'aide lorsque l'on appuie sur help
		tmp = jQuery("#no_help");
		tmp.on('click', () => {
			this.toggle_help(false);
		});
	}

	//function qui récupère le contenu du Json
	load_save(obj)
	{
		this.Player_Def = new Player_Def(obj.Player_Def);
		this.Player = new Player(obj.Player, this.Player_Def);
	}

	//génère le code html de la page perso
	generate_perso_page()
	{
		jQuery("#title_global").text(this.Player_Def.firstName + " " + this.Player_Def.lastName);
		jQuery("#competences").append(do_list(this.Player_Def.competences));
		jQuery("#caract").append(do_caract_list(this, "page_perso"));
		this.Player.set_listener_on_caract(this);
		var name = this.Player_Def.firstName +
					" " + this.Player_Def.lastName +
					", " + this.Player_Def.age + " ans" + "<br>"
					+ this.Player_Def.work;
		jQuery("#nom").append(name);
		jQuery("#bio").append("<h5>Bio :</h5>" + convert_to_html(this.Player_Def.bio));
		jQuery("#stats").append(do_stat_list(this, "page_perso"));
		this.Player.set_listener_on_stat(this);
		jQuery("#desc").append(convert_to_html(this.Player_Def.desc));
		if (this.Player_Def.avatar)
			jQuery("#avatar").attr('src', this.Player_Def.avatar);
		else
			jQuery("#avatar").attr('src', '../images/avatar.jpg');
		jQuery("#inventory").append(do_inventory_list(this.Player.inventory));
		this.Player.set_listener_on_inventory(this.Player.inventory);
	}

	//genere le code html de la page edit
	generate_edit_page()
	{
		var page = this;
		jQuery("#title_global").text(this.Player_Def.firstName + " " + this.Player_Def.lastName);
		jQuery("#competences_def").append(do_list_edit(this.Player_Def.competences));
		jQuery("#caract_def").append(do_caract_list(this, "page_edit"));
		jQuery("#prenom_def").attr('value', page.Player_Def.firstName);
		jQuery("#nom_def").attr('value', page.Player_Def.lastName);
		jQuery("#age_def").attr('value', page.Player_Def.age);
		jQuery("#work_def").attr('value', page.Player_Def.work);
		jQuery("#bio_def").val(convert_to_string(page.Player_Def.bio));
		jQuery("#stats_def").append(do_stat_list(this, "page_edit"));
		jQuery("#desc_def").val(convert_to_string(page.Player_Def.desc));
		if (page.Player_Def.avatar)
		 	jQuery("#avatar_def").attr('src', page.Player_Def.avatar);
		else
		 	jQuery("#avatar_def").attr('src', '../images/avatar.jpg');
	}

	//vide le code html de la page perso
	clear_page_perso()
	{
		jQuery("#competences").empty();
		jQuery("#inventory").empty();
		jQuery("#caract").empty();
		jQuery("#nom").empty();
		jQuery("#bio").empty();
		jQuery("#stats").empty();
		jQuery("#desc").empty();
	}

	//vide le code html de la page perso
	clear_page_edit()
	{
		jQuery("#competences_def").empty();
		jQuery("#caract_def").empty();
		jQuery("#bio_def").empty();
		jQuery("#stats_def").empty();
		jQuery("#desc_def").empty();
	}

	//function qui va set et suppr les données
	save_edition()
	{
		this.Player_Def.firstName = jQuery("#prenom_def").val();
		this.Player_Def.lastName = jQuery("#nom_def").val();
		this.Player_Def.age = parseInt(jQuery("#age_def").val());
		this.Player_Def.work = jQuery("#work_def").val();
		this.get_competencies();
		this.get_caract();
		this.Player_Def.bio =jQuery("#bio_def").val();
		this.get_stats();
		this.Player_Def.desc = jQuery("#desc_def").val();
	}

	get_competencies()
	{
		var page = this;
		let name = "";
		let desc = "";

		$( "#competences_def > input" ).each(function( index ) {
			
			if (index % 2  != 0) {
				desc = $(this).val();
				if (desc != null && desc != "") {
					page.Player_Def.competences[name] = desc;
				}
			} else {
				name = $(this).val();
				if (name == null || name == "") {
					name = $(this).attr('id');
					name = name.replace('_name', "");
					delete page.Player_Def.competences[name];
					$("#" + name + "_desc").val("");
				}
			}
		});
	}

	get_stats()
	{
		let val = null;
		let id = null;
		var page = this;

		$( "#stats_def > li > input" ).each(function( index ) {
			val = parseInt($(this).val(), 10);
			id = $(this).attr('id');
			if (isNaN(val)) {
					delete page.Player_Def.stat[id];
					delete page.Player.stat[id];
			} else {
				page.Player_Def.stat[id] = val;
			}
		});

		for (var i in page.Player_Def.stat) {
      		if (!page.Player.stat[i]) {
      			page.Player.stat[i] = 0;
      		}
    	}
  	}

  	get_caract()
	{
		let val = null;
		let id = null;
		var page = this;

		$( "#caract_def > li > input" ).each(function( index ) {
			val = parseInt($(this).val(), 10);
			id = $(this).attr('id');
			if (isNaN(val)) {
					delete page.Player_Def.caract[id];
					delete page.Player.caract[id];
			} else {
				page.Player_Def.caract[id] = val;
			}
		});

		for (var i in page.Player_Def.caract) {
      		if (!page.Player.caract[i]) {
      			page.Player.caract[i] = 0;
      		}
    	}
  	}

  	windows_size()
  	{
  		var windows_height = $(window).height();
  		var main_height = windows_height - 600;

  		$('#main').css('min-height', main_height);
  	}
}

var start = new Page;