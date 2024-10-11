# DeathFriends

Contrôle:
Flèche du haut pour Sauter
Flèche de droite pour aller à droite
Flèche de gauche pour aller à gauche

1. Concept
   1. Plateformer Dead Cells Like
   2. Style Happy Tree Friends like
   3. Courir, sauter, taper
   4. Choix entre 3 armes, spawn dans une grande map, enemis sur le passage, but tuer le boss, ennemis gauche droite. Si victoire fin, si barre de vie vide, ded et reboot du jeu. bonus de vie à drop / ramasser.
2. Front
   - Landing page
     - Bouton jouer
   - Background, plateformes, ennemis, joueur, power ups
   - HUD vie, bonus potentiel
3. Back
   - weapons(id int, damage int, name varchar, canShoot bool, projectileSpeed int, cooldown int, image varchar)
   - enemies(id int, damage int, name varchar, moveType varchar, speed int, canShoot bool, projectileSpeed int, cooldown int, hp int, image varchar)
   - powerUps(id int, name varchar, heal int, maxHp int, damageBoost int, speedBoost int, time int, image varchar)
4. Besoin
   - Parallax
