CREATE TYPE "enquete_status" AS ENUM (
  'en_attente',
  'en_traitement',
  'ferme'
);

CREATE TYPE "demande_status" AS ENUM (
  'en_attente',
  'en_traitement',
  'ferme'
);

CREATE TYPE "reclamation_status" AS ENUM (
  'en_attente',
  'en_traitement',
  'ferme'
);

CREATE TYPE "motif_transport" AS ENUM (
  'urgence',
  'traitement_ambulatoire'
);

CREATE TYPE "categorie_vehicule" AS ENUM (
  'vehicule_leger',
  'vehicule_equipe',
  'ambulance',
  'helicoptere'
);

CREATE TABLE "operateur" (
  "id" SERIAL UNIQUE PRIMARY KEY NOT NULL,
  "nomfr" varchar,
  "prenomfr" varchar,
  "nomarabe" varchar,
  "prenomarabe" varchar,
  "password" varchar,
  "created_at" date,
  "adresse" varchar,
  "adresse_mail" varchar,
  "numero_telephone" varchar,
  "date_affiliation" date,
  "nb_vehicules" int DEFAULT 1
);

CREATE TABLE "assure" (
  "id" SERIAL UNIQUE PRIMARY KEY NOT NULL,
  "nomfr" varchar,
  "prenomfr" varchar,
  "nomarabe" varchar,
  "prenomarabe" varchar,
  "date_naissance" varchar,
  "numero_ss" int,
  "adresse" varchar,
  "adresse_mail" varchar,
  "created_at" timestamp,
  "date_fin_droit" date
);

CREATE TABLE "vehicule" (
  "id" SERIAL UNIQUE PRIMARY KEY NOT NULL,
  "id_operateur" int,
  "type_vehicule" varchar,
  "nom_chauffeur" varchar,
  "matricule" varchar,
  "created_at" timestamp
);

CREATE TABLE "itineraire" (
  "id" SERIAL UNIQUE PRIMARY KEY NOT NULL,
  "id_operateur" int,
  "id_assure" int,
  "adresse_malade" varchar,
  "adresse_operateur" varchar,
  "adresse_soin" varchar,
  "distance" float,
  "duree_moyenne" interval,
  "created_at" timestamp,
  "id_facture" int
);

CREATE TABLE "demandeAffiliation" (
  "id" SERIAL UNIQUE PRIMARY KEY NOT NULL,
  "id_operateur" int,
  "adresse" varchar,
  "nb_vehicules" int,
  "email" varchar,
  "status" demande_status
);

CREATE TABLE "enquete" (
  "id" SERIAL UNIQUE PRIMARY KEY NOT NULL,
  "id_operateur" int,
  "idAgent" int,
  "description" varchar,
  "id_itineraire" int,
  "date" date,
  "status" enquete_status
);

CREATE TABLE "reclamation" (
  "id" SERIAL UNIQUE PRIMARY KEY NOT NULL,
  "id_operateur" int,
  "id_assure" int,
  "description" varchar,
  "id_itineraire" int,
  "date" date,
  "status" reclamation_status
);

CREATE TABLE "facture" (
  "id" SERIAL UNIQUE PRIMARY KEY NOT NULL,
  "total_ttc" float,
  "id_itineraire" int
);

CREATE TABLE "transport" (
  "id" SERIAL UNIQUE PRIMARY KEY NOT NULL,
  "id_operateur" int,
  "motif" motif_transport,
  "categorie" categorie_vehicule,
  "id_assure" int,
  "description" varchar,
  "id_itineraire" int,
  "date" date
);

ALTER TABLE "vehicule" ADD FOREIGN KEY ("id_operateur") REFERENCES "operateur" ("id");

ALTER TABLE "itineraire" ADD FOREIGN KEY ("id_operateur") REFERENCES "operateur" ("id");

ALTER TABLE "enquete" ADD FOREIGN KEY ("id_operateur") REFERENCES "operateur" ("id");

ALTER TABLE "reclamation" ADD FOREIGN KEY ("id_operateur") REFERENCES "operateur" ("id");

ALTER TABLE "reclamation" ADD FOREIGN KEY ("id_assure") REFERENCES "assure" ("id");

ALTER TABLE "itineraire" ADD FOREIGN KEY ("id_facture") REFERENCES "facture" ("id");

ALTER TABLE "transport" ADD FOREIGN KEY ("id_itineraire") REFERENCES "itineraire" ("id");

ALTER TABLE "transport" ADD FOREIGN KEY ("id_assure") REFERENCES "assure" ("id");

ALTER TABLE "transport" ADD FOREIGN KEY ("id_operateur") REFERENCES "operateur" ("id");

ALTER TABLE "demandeAffiliation" ADD FOREIGN KEY ("id_operateur") REFERENCES "operateur" ("id");


