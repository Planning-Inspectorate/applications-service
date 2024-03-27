workspace "Applications service" {
	model {
		# Required for nested groups - https://docs.structurizr.com/dsl/cookbook/groups/
		properties {
				"structurizr.groupSeparator" "/"
		}

		userPublicIndividual = person "Private individual" "Member of public interested in nationally significant infrastructure projects"
		userMemberOfOrg = person "Member of organisation" "Member of an organisation interested in nationally significant infrastructure projects"
		userAgent = person "Agent" "Represent a private individualm family or organisation"


		group "Planning Inspectorate"{
			userCaseWorker = person "Case worker" "Member of PINS staff who administers project information"

			systemAppsFo = softwareSystem "Applications Front-Office" "External facing service providing ability to participate in the application process for Nationally Significant Infrastructure Projects (NSIPs) within England and Wales" "Node.js, Azure Web App, Azure Function App" {

				containerFoWeb = container "Web FO Web" "Front-end website" "Node.js, Azure Web App"{
					tags "Microsoft Azure - App Services"
				}

				containerFoApi = container "Web FO API" "Front Office API handles all interactions with other services" "Node.js, Azure Web App" {
					tags "Microsoft Azure - App Services"
				}

				containerRedis = container "Redis" "Session storage" {
					tags "Microsoft Azure - Cache Redis"
				}

				containerAzureSql = container "Database" "Local projection of cases" "Azure SQL" {
					tags "Database" "Microsoft Azure - Azure SQL"
				}

				group "Function Apps"{
					containerFunctionAppProjects = container "Projects" "Read Project messages from Service Bus" "Function App, JavaScript"{
						tags "Microsoft Azure - Function Apps"
					}

					containerFunctionAppProjectUpdates = container "Project Updates" "Read Project Update messages from Service Bus" "Function App, JavaScript"{
						tags "Microsoft Azure - Function Apps"
					}

					containerFunctionAppDocumentMetadata = container "Document Metadata" "Document Metadata messages from Service Bus" "Function App, JavaScript"{
						tags "Microsoft Azure - Function Apps"
					}
				}

				containerFoKeyVault = container "Key Vault" "Hold secrets and sensitive data" "Azure Key Vault"{
					tags "Microsoft Azure - Key Vaults"
				}
			}

			systemAppsBo = softwareSystem "Applications Back-Office" "Internally facing service allowing for management of cases relating to Nationally Significant Infrastructure Projects (NSIPs) within England and Wales"  {
				containerBoFileStorage = container "File storage" {
					tags "Microsoft Azure - Storage Azure Files"
				}

				containerBoWeb = container "Web BO Web" "Back-office website used to manage cases" "Node.js, Azure Web App"{
					tags "Microsoft Azure - App Services"
				}

				containerBoApi = container "Web BO API" "" "Node.js, Azure Web App" {
					tags "Microsoft Azure - App Services"
				}

				containerBoAzureSql = container "Database" "Source of truth for cases" "Azure SQL" {
					tags "Database" "Microsoft Azure - Azure SQL"
				}

				containerBoFunctionApp1 = container "Function App 1"{
					tags "Microsoft Azure - Function Apps"
				}

				containerBoFunctionApp2 = container "Function App 2"{
					tags "Microsoft Azure - Function Apps"
				}

				containerBoFunctionApp3 = container "Function App 3"{
					tags "Microsoft Azure - Function Apps"
				}

				containerBoKeyVault = container "Key Vault" "Hold secrets and sensitive data" "Azure Key Vault"{
					tags "Microsoft Azure - Key Vaults"
				}
			}

			systemOdw = softwareSystem "Operational Data Warehouse (ODW)" "Holds all Planning Inspectorate data so that it can be used for internal purposes" {
				tags "Microsoft Azure - Azure Synapse Analytics"
			}

			group "Legacy"{
				systemHorizon = softwareSystem "Horizon" "Legacy back office system for managing planning applications and appeals"{
					tags "LegacySystem"
				}

				systemNspiApi = softwareSystem "NSIP API" "[ What does this do ?? ]"{
					tags "LegacySystem"
				}

				systemNsipDocumentStore = softwareSystem "NSIP Document Store" "[ What does this do ?? ]"{
					tags "LegacySystem"
				}

				systemNiDatabase = softwareSystem "NI Database" "Persistant storage for legacy NI website content" "MySQL" {
					tags "LegacySystem" "Database"
				}
			}
		}

		systemGovUk = softwareSystem "GOV.UK"{
			tags = "ExternalSystem"
			containerGovNotify = container "GOV Notify" "UK government messaging platform for sending emails, text and letters to users"
		}

		### Releationships
		userPublicIndividual -> containerFoWeb "Finds project information and registers interest" "HTTPS, HTML"
		userMemberOfOrg -> containerFoWeb "Finds project information and registers interest" "HTTPS, HTML"
		userAgent -> containerFoWeb "Finds project information and registers interest" "HTTPS, HTML"
		userCaseWorker -> systemAppsBo "Manages cases through" "HTTPS, HTML, Active Directory Auth"

		# Back-office
		systemAppsBo -> systemOdw "Broadcasts message when entities change" "Azure Service Bus via topic XXX" "ServiceBus"
		containerBoWeb -> containerBoApi "[ NEEDS DESCRIPTION ??" "HTTP, JSON"
		containerBoApi -> containerBoAzureSql "Reads and writes case data to"
		containerBoApi -> containerFunctionAppProjects "Broadcasts message on Project changes" "Azure Service via topic XXX" "ServiceBus"
		containerBoApi -> containerFunctionAppProjectUpdates "Broadcasts message on Project Update changes" "Azure Service via topic XXX" "ServiceBus"
		containerBoApi -> containerFunctionAppDocumentMetadata "Broadcasts message on Document Metadata changes" "Azure Service via topic XXX" "ServiceBus"

		# Front-office
		containerFunctionAppProjects -> containerAzureSql "Writes updates to"
		containerFunctionAppProjectUpdates -> containerAzureSql "Writes updates to"
		containerFunctionAppDocumentMetadata -> containerAzureSql "Writes updates to"

		containerFoWeb -> containerRedis "Maintains session state through"
		containerFoWeb -> containerFoKeyVault "Retrieves secrets from"
		containerFoWeb -> containerFoApi "[NEEDS DESCRIPTION ?? ]" "HTTP, JSON"

		containerFoApi -> containerAzureSql "Read only access to"
		containerFoApi -> containerGovNotify "Sends notification emails through" "HTTPS, JSON"
		containerFoApi -> systemNiDatabase "Reads and writes legacy case data from", "TCP, SQL"
		containerFoApi -> systemNspiApi "Uploads files (what type?) to"
		containerFoApi -> containerFoKeyVault "Retrieves secrets from"
		containerFoApi -> containerBoFileStorage "[ NEEDS DESCRIPTION ?? ]"

		# Misc
		systemNiDatabase -> systemHorizon "Extracts project data including documents and interested party comments (representations)"
		systemNspiApi -> systemNsipDocumentStore "Stores files in"
		systemHorizon -> systemNspiApi "Syncronises datas with"
	}

	views {
		theme default

		# Icons and colours
		# theme https://static.structurizr.com/themes/microsoft-azure-2023.01.24/theme.json

		# Icons only
		theme https://static.structurizr.com/themes/microsoft-azure-2023.01.24/icons.json


		styles {

			element Database {
				shape Cylinder
			}

			element ExternalSystem {
				background #AAAAAA
			}

			element LegacySystem {
				background #CCCCCC
			}

			relationship ServiceBus {
					style dotted
			}
		}
	}
}
