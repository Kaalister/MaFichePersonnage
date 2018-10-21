class Player {
	constructor(player)
	{
		this.pv = player.pv;
		this.psm = player.psm;
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
	set_listener(list)
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
}