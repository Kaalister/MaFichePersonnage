<!doctype html>
<html lang="fr">
	
	<head>
	  <meta charset="utf-8">
	  <title>Fiche preso</title>
	  <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/materialize/1.0.0/css/materialize.min.css">
	  <link rel="stylesheet" href="css/style.css">
	  <link href="https://fonts.googleapis.com/icon?family=Material+Icons" rel="stylesheet">
	</head>

	<body>
		<i class="material-icons small" id="edit_button">edit</i>
		<i class="material-icons small" id="back_button">arrow_back</i>
		<center><h1 id="title_global">Ma fiche Personnage</h1></center>
		<?php require('html/page_start.html'); ?>
		<?php require('html/page_perso.html'); ?>
		<?php require('html/page_edit.html'); ?>
	 	<script src="https://cdnjs.cloudflare.com/ajax/libs/materialize/1.0.0/js/materialize.min.js"></script>
	 	<script src="https://ajax.googleapis.com/ajax/libs/jquery/1/jquery.min.js"></script>
	 	<script src="js/global_function.js"></script>
	 	<script src="js/Player.js"></script>
	 	<script src="js/Player_Def.js"></script>
	  	<script src="js/start.js"></script>
	</body>

</html>