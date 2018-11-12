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

		//listener on add item button
		tmp = jQuery("#new_item");
		tmp.on('click', () => {
			var name = $("#new_name_item").val();
			var desc = $("#new_desc_item").val();
			var nb = $("#new_nb_item").val();

			if (name != "" && name != null && nb != "" && nb != null) {
				var item = new Item(desc, nb);
				this.inventory[name] = item;
				jQuery("#inventory").empty();
				jQuery("#inventory").append(do_inventory_list(this.inventory));
				this.set_listener_on_inventory(this.inventory);
				$("#new_name_item").val("");
				$("#new_desc_item").val("");
				$("#new_nb_item").val("");
			}
		});
	}

	//add listener on stats
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

	//add listener on each items of inventory
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

	//set the listener on caracteristics
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

	//save the inventory in Perso class
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