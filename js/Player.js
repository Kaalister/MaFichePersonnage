class Player {
	constructor(player)
	{
		this.caract = player.caract;
		this.stat = player.stat;
		this.inventory = player.inventory;

		this.init();
	}

	init()
	{
		var tmp = null;

		//listener sur le bouton création de d'item
		tmp = jQuery("#new_item");
		tmp.on('click', () => {
			var name = $("#new_name_item").val();
			var desc = $("#new_desc_item").val();
			var nb = $("#new_nb_item").val();

			if (desc == "Description")
				desc = "";
			if (name != "" && name != null && nb != "" && nb != null) {
				var item = new Item(desc, nb);
				this.inventory[name] = item;
				jQuery("#inventory").empty();
				jQuery("#inventory").append(do_inventory_list(this.inventory));
				this.set_listener_on_inventory(this.inventory);
				$("#new_name_item").val("Nom");
				$("#new_desc_item").val("Description");
				$("#new_nb_item").val("");
			}
		});
	}

	//fonction qui set les listener des stats players après leur ajout en html
	set_listener_on_stat(list)
	{
		for (var i in list.Player_Def.stat) {
			if (list.Player_Def.stat.hasOwnProperty(i)) {
				let tmp = null;

				tmp = jQuery("#" + i);
				tmp.data("owner", i);
				tmp.on('change', () => {
					list.Player.stat[tmp.data("owner")] = -1 * (list.Player_Def.stat[tmp.data("owner")] - $("#" + tmp.data("owner")).val());
					if (list.Player.stat[tmp.data("owner")] == 0)
						list.Player.stat[tmp.data("owner")] = 0;
				});
			}
		}
	}

	//fonction qui set les listeners sur les remove de chaque item
	set_listener_on_inventory(inventory)
	{
		var regex = /['"() \[\]]/gi;
		for (var i in inventory) {
			if (inventory.hasOwnProperty(i)) {
				let tmp = null;

				tmp = jQuery("#remove_" + i.replace(regex, '_'));
				tmp.data("owner", i);
				tmp.on('click', () => {
						delete inventory[tmp.data("owner")];
						jQuery("#inventory").empty();
						jQuery("#inventory").append(do_inventory_list(this.inventory));
						this.set_listener_on_inventory(this.inventory);
				});
			}
		}
	}

	//fonction qui set les listener des caract players après leur ajout en html
	set_listener_on_caract(list)
	{
		for (var i in list.Player_Def.caract) {
			if (list.Player_Def.caract.hasOwnProperty(i)) {
				let tmp = null;

				tmp = jQuery("#" + i);
				tmp.data("owner", i);
				tmp.on('change', () => {
					list.Player.caract[tmp.data("owner")] = -1 * (list.Player_Def.caract[tmp.data("owner")] - $("#" + tmp.data("owner")).val());
					if (list.Player.caract[tmp.data("owner")] == 0)
						list.Player.caract[tmp.data("owner")] = 0;
				});
			}
		}
	}

	//fonction qui sauvegarde l'inventaire avant le telechargement du fichier
	save_inventory()
	{
		var Player = this;
		
		$( "#inventory > li" ).each(function( index ) {
			let name = "";
			let desc = "";
			let nb = "";

			name = $(this).find("#name_item").text();
			desc = $(this).find("#desc_item").text();
			nb = $(this).find("#nb_item").val();
			if (nb == "" ||nb == null)
				nb = 0;
			Player.inventory[name].desc = desc;
			Player.inventory[name].nb = nb;
		});
	}
}