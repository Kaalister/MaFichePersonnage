<html lang="fr">
	
	<head>
		<meta charset="utf-8">
		<title>Fiche preso</title>
		<link rel="icon" href="images/avatar.ico"/>
		<link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/materialize/1.0.0/css/materialize.min.css">
		<link rel="stylesheet" href="css/style.css">
		<link rel="stylesheet" href="css/jquery.mCustomScrollbar.min.css">
		<link href="https://fonts.googleapis.com/icon?family=Material+Icons" rel="stylesheet">
	</head>

	<body>
		<div id="header">
			<i class="material-icons small" id="edit_button">edit</i>
			<i class="material-icons small" id="back_button">arrow_back</i>
			<i class="material-icons small" id="help">help</i>
			<i class="material-icons small" id="no_help" style="display: none;">help_outline</i>
			<?php require('html/help_page.html'); ?>
			<h1 id="title_global">Ma Fiche Personnage</h1>
		</div>
		<div id="main">
			<?php require('html/page_start.html'); ?>
			<?php require('html/page_perso.html'); ?>
			<?php require('html/page_edit.html'); ?>
		</div>
		<div id="footer"></div>
		<script src="https://cdnjs.cloudflare.com/ajax/libs/materialize/1.0.0/js/materialize.min.js"></script>
	 	<script src="https://ajax.googleapis.com/ajax/libs/jquery/1/jquery.min.js"></script>
	 	<script src="js/jquery.mCustomScrollbar.concat.min.js"></script>
	 	<script src="js/FileSaver.js"></script>
	 	<script src="js/global_function.js"></script>
	 	<script src="js/item_class.js"></script>
	 	<script src="js/Player.js"></script>
	 	<script src="js/Player_Def.js"></script>
		<script src="js/start.js"></script>
	</body>

</html>