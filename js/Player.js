class Player {
	constructor(player)
	{
		this.caract = player.caract;
		this.stat = player.stat;

		this.init();
	}

	init()
	{
		var tmp = null;

		tmp = jQuery("#pv");
		tmp.on('change', () => {
			this.pv = -1 * ($("#pv").attr('max') - $("#pv").val());
		});
		tmp = jQuery("#psm");
		tmp.on('change', () => {
			this.psm = -1 * ($("#psm").attr('max') - $("#psm").val());
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
}