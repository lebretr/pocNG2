#!/bin/sh

#/*────────────────────────────────────────────────────────────────────────────────────────*\
#│                              Copyright (C) 2014 Remi Lebret                              │
#│                                                                                          │
#│                   .     Licensed under the Apache License, Version 2.0 (the "License");  │
#│                ,        you may not use this file except in compliance with the License. │
#│                         You may obtain a copy of the License at                          │
#│                                                                                          │
#│    ,         ,                   http://www.apache.org/licenses/LICENSE-2.0              │
#│       , .                                                                                │
#│ ,                        .                                                               │
#│.               ,                   Unless required by applicable law or agreed to in     │
#│       .                            writing, software distributed under the License is    │
#│    ,  ,         ,   .              distributed on an "AS IS" BASIS,                      │
#│ ,          ,        .     ,        WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND,         │
#│                                    either express or implied.                            │
#│  ++++++++++++++++++++++++++',                                                            │
#│                                                                                          │
#│   See the License for the specific language governing permissions and                    │
#│   limitations under the License.                                                         │
#│                                                                                          │
#\*────────────────────────────────────────────────────────────────────────────────────────*/

# Fichiers de properties generales
GENERAL_PROPERTIES_FILE="param.dic"

# Date
DATE=`date '+%Y%m%d_%H%M%S'`

# Fichier de log
LOGFILE="postInstall.log"

FIC_RAML='./docs/api-media.raml'
FIC_RAML_BACK='./docs/api-media.raml.back'
LOGO_BU_DESTINATION='./docs/ressources/img/logo_bu.png'
LOGO_PAYS_DESTINATION='./docs/ressources/img/pays.png'
LOGO_REP_SOURCE='./ressources/img'


######################################################################################

echo "DEBUT postinstall.sh - `date '+%d/%m/%Y %H:%M:%S'`" | tee -a ${LOGFILE}

NUM_ETAPE=0

#######################################################################################
## Recuperation du repertoire contenant le fichier de variables exportees
##

NUM_ETAPE=`echo ${NUM_ETAPE}+10 | bc`

echo "INFO - Recuperation des repertoire du fichier de proprietes general (fichier ${GENERAL_PROPERTIES_FILE}) - ETAPE ${NUM_ETAPE} - `date '+%d/%m/%Y %H:%M:%S'`" | tee -a ${LOGFILE}

GENERAL_PROPERTIES_FILE_DIR=`find /home2/ -name "${GENERAL_PROPERTIES_FILE}" -exec dirname {} \; 2>/dev/null`

if [ "X"${GENERAL_PROPERTIES_FILE_DIR} = "X" ]
then
  echo "ERREUR - Aucun repertoire pour param.dic trouvé ce serveur" | tee -a ${LOGFILE}
  exit 1
else
  NUM_ETAPE=`echo ${NUM_ETAPE}+10 | bc`
  echo "INFO - Chargement des propriete generales (fichier ${GENERAL_PROPERTIES_FILE_DIR}/${GENERAL_PROPERTIES_FILE}) - ETAPE ${NUM_ETAPE}" | tee -a ${LOGFILE}

  . ${GENERAL_PROPERTIES_FILE_DIR}/${GENERAL_PROPERTIES_FILE}

  retour=${?}

  if [ ${retour} -ne 0 ]
  then
      echo "ERREUR - Probleme de chargement du fichier de proprietes generales ("${GENERAL_PROPERTIES_FILE_DIR}/${GENERAL_PROPERTIES_FILE}"). code retour : "${retour} | tee -a ${LOGFILE}
      exit 1
  fi
fi

#######################################################################################
## Logo pour la Doc
##
##

NUM_ETAPE=`echo ${NUM_ETAPE}+10 | bc`

echo "INFO - Copie des LOGO de la BU et du Pays pour la Documentation RAML - ETAPE ${NUM_ETAPE} - `date '+%d/%m/%Y %H:%M:%S'`" | tee -a ${LOGFILE}

if [ "X"${__LOGO_BU__} = "X" ]
then
	if [ "X"${__BU__} = "X" ]
	then
		#__LOGO_BU__=${LOGO_REP_SOURCE}"/BCIT.png"
		echo "ERREUR - variable __BU__ absente du fichier de proprietes generales ("${GENERAL_PROPERTIES_FILE_DIR}/${GENERAL_PROPERTIES_FILE}")." | tee -a ${LOGFILE}
		exit 1
	else
		__LOGO_BU__=${LOGO_REP_SOURCE}"/"
		__LOGO_BU__=${__LOGO_BU__}${__BU__}
		__LOGO_BU__=${__LOGO_BU__}".png"
	fi
fi

if [ "X"${__LOGO_PAYS__} = "X" ]
then
	if [ "X"${__PAYS__} = "X" ]
	then
		#__LOGO_PAYS__=${LOGO_REP_SOURCE}"/IT.png"
		echo "ERREUR - variable __PAYS__ absente du fichier de proprietes generales ("${GENERAL_PROPERTIES_FILE_DIR}/${GENERAL_PROPERTIES_FILE}")." | tee -a ${LOGFILE}
		exit 1
	else
		__LOGO_PAYS__=${LOGO_REP_SOURCE}"/"
		__LOGO_PAYS__=${__LOGO_PAYS__}${__PAYS__}
		__LOGO_PAYS__=${__LOGO_PAYS__}".png"
	fi
fi


cp -f "${__LOGO_BU__}" "${LOGO_BU_DESTINATION}"

retour=${?}

if [ ${retour} -ne 0 ]
then
  echo "ERREUR - Copie du fichier logo BU \"${__LOGO_BU__}\" vers  \"${LOGO_BU_DESTINATION}\" code retour : "${retour} | tee -a ${LOGFILE}
  exit 1
fi


cp -f "${__LOGO_PAYS__}" "${LOGO_PAYS_DESTINATION}"

retour=${?}

if [ ${retour} -ne 0 ]
then
  echo "ERREUR - Copie du fichier drapeau Pays \"${__LOGO_PAYS__}\" vers  \"${LOGO_PAYS_DESTINATION}\" code retour : "${retour} | tee -a ${LOGFILE}
  exit 1
fi

#######################################################################################
## Generation du fichier ./docs/api-media.raml
##
##

NUM_ETAPE=`echo ${NUM_ETAPE}+10 | bc`

echo "INFO - Generation du fichier ./docs/api-media.raml (fichier ${FIC_APPJSON}) - ETAPE ${NUM_ETAPE} - `date '+%d/%m/%Y %H:%M:%S'`" | tee -a ${LOGFILE}


if [ "X"${__API_PRODUCT_PROTOCOL_RAML__} = "X" ]
then
  echo "ERREUR - variable __API_PRODUCT_PROTOCOL_RAML__ absente du fichier de proprietes generales ("${GENERAL_PROPERTIES_FILE_DIR}/${GENERAL_PROPERTIES_FILE}")." | tee -a ${LOGFILE}
  exit 1
fi
if [ "X"${__API_PRODUCT_SERVER_RAML__} = "X" ]
then
  echo "ERREUR - variable __API_PRODUCT_SERVER_RAML__ absente du fichier de proprietes generales ("${GENERAL_PROPERTIES_FILE_DIR}/${GENERAL_PROPERTIES_FILE}")." | tee -a ${LOGFILE}
  exit 1
fi
if [ "X"${__API_PRODUCT_PORT_RAML__} = "X" ]
then
  echo "ERREUR - variable __API_PRODUCT_PORT_RAML__ absente du fichier de proprietes generales ("${GENERAL_PROPERTIES_FILE_DIR}/${GENERAL_PROPERTIES_FILE}")." | tee -a ${LOGFILE}
  exit 1
fi
if [ "X"${__API_PRODUCT_PROTOCOL_LIST_RAML__} = "X" ]
then
  echo "ERREUR - variable __API_PRODUCT_PROTOCOL_LIST_RAML__ absente du fichier de proprietes generales ("${GENERAL_PROPERTIES_FILE_DIR}/${GENERAL_PROPERTIES_FILE}")." | tee -a ${LOGFILE}
  exit 1
fi

cp ${FIC_RAML} ${FIC_RAML_BACK}

sed -e "s/baseUri:.*$/baseUri: ${__API_PRODUCT_PROTOCOL_RAML__}:\/\/${__API_PRODUCT_SERVER_RAML__}:${__API_PRODUCT_PORT_RAML__}/" \
  -e "s/protocols:.*$/protocols: [ ${__API_PRODUCT_PROTOCOL_LIST_RAML__} ]/" ${FIC_RAML_BACK} > ${FIC_RAML}

retour=${?}

if [ ${retour} -ne 0 ]
then
  echo "ERREUR - Generation du fichier ./docs/api-media.raml. code retour : "${retour} | tee -a ${LOGFILE}
  exit 1
fi

#######################################################################################
## FIN
##
##
echo "FIN postinstall.sh - `date '+%d/%m/%Y %H:%M:%S'`" | tee -a ${LOGFILE}
echo " " | tee -a ${LOGFILE}
