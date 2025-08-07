workspace "Applications service" {

	!docs architecture

	model {
		# Required for nested groups - https://docs.structurizr.com/dsl/cookbook/groups/
		properties {
				"structurizr.groupSeparator" "/"
		}

		userPublicIndividual = person "Private individual" "Member of public interested in nationally significant infrastructure projects"
		userMemberOfOrg = person "Member of organisation" "Member of an organisation interested in nationally significant infrastructure projects"
		userAgent = person "Agent" "Represent a private individual family or organisation"


		group "Planning Inspectorate"{
			userCaseWorker = person "Case worker" "Member of PINS staff who administers project information"

			systemAppsFo = softwareSystem "Applications Front-Office" "External facing service providing ability to participate in the application process for Nationally Significant Infrastructure Projects (NSIPs) within England and Wales" "Node.js, Azure Web App, Azure Function App" {

				containerFoWeb = container "FO Web" "Front-end website" "Node.js, Azure Web App"{
					tags "Microsoft Azure - App Services"
				}

				containerFoApi = container "Web FO API" "Front Office API handles all interactions with other services" "Node.js, Azure Web App" {
					tags "Microsoft Azure - App Services"
				}

				containerRedis = container "Redis" "Session storage" {
					tags "Microsoft Azure - Cache Redis"
				}

				containerAzureSql = container "Database" "Local projection of data from Back-Office" "Azure SQL" {
					tags "Database" "Microsoft Azure - Azure SQL"
				}

				group "Function Apps" {

					containerFunctionAppAdvice = container "Advice" "Consumes Advice messages from Service Bus" "Function App, JavaScript"{
						tags "Microsoft Azure - Function Apps", "FunctionApp"
					}

					containerFunctionAppAdviceUnpublish = container "Advice Unpublish" "Consumes Advice unpublish messages from Service Bus" "Function App, JavaScript"{
						tags "Microsoft Azure - Function Apps", "FunctionApp"
					}

					containerFunctionAppDocumentMetadata = container "Document Metadata" "Consumes Document Metadata messages from Service Bus" "Function App, JavaScript"{
						tags "Microsoft Azure - Function Apps", "FunctionApp"
					}

					containerFunctionAppDocumentMetadataUnpublish = container "Document Metadata Unpublish" "Consumes Document Metadata Unpublish messages from Service Bus" "Function App, JavaScript"{
						tags "Microsoft Azure - Function Apps", "FunctionApp"
					}

					containerFunctionAppExamTimeTable = container "Exam Time Table" "Consumes ExamTimeTable messages from Service Bus" "Function App, JavaScript"{
						tags "Microsoft Azure - Function Apps", "FunctionApp"
					}

					containerFunctionAppExamTimeTableUnpublish = container "Exam Time Table Unpublish" "Consumes ExamTimeTable Unpublish messages from Service Bus" "Function App, JavaScript"{
						tags "Microsoft Azure - Function Apps", "FunctionApp"
					}

					containerFunctionAppProjects = container "Projects" "Consumes Project messages from Service Bus" "Function App, JavaScript"{
						tags "Microsoft Azure - Function Apps", "FunctionApp"
					}

					containerFunctionAppProjectsUnpublish = container "Projects Unpublish" "Consumes Project Unpublish messages from Service Bus" "Function App, JavaScript"{
						tags "Microsoft Azure - Function Apps", "FunctionApp"
					}

					containerFunctionAppProjectUpdates = container "Project Updates" "Consumes Project Update messages from Service Bus" "Function App, JavaScript"{
						tags "Microsoft Azure - Function Apps", "FunctionApp"
					}

					containerFunctionAppRepresentations = container "Representations" "Consumes Representation messages from Service Bus" "Function App, JavaScript"{
						tags "Microsoft Azure - Function Apps", "FunctionApp"
					}

					containerFunctionAppRepresentationUpdate = container "Representation Update" "Consumes Representation Update messages from Service Bus" "Function App, JavaScript"{
						tags "Microsoft Azure - Function Apps", "FunctionApp"
					}

					containerFunctionAppRepresentationsUnpublish = container "Representations Unpublish" "Consumes Representation Unpublish messages from Service Bus" "Function App, JavaScript"{
						tags "Microsoft Azure - Function Apps", "FunctionApp"
					}

					containerFunctionAppServiceUsers = container "Service Users" "Consumes Service User (Represented or Representative) messages from Service Bus" "Function App, JavaScript"{
						tags "Microsoft Azure - Function Apps", "FunctionApp"
					}

					containerFunctionAppServiceUsersUnpublish = container "Service Users Unpublish" "Consumes Service User Unpublish messages from Service Bus" "Function App, JavaScript"{
						tags "Microsoft Azure - Function Apps", "FunctionApp"
					}

				}

				containerFoKeyVault = container "Key Vault" "Hold secrets and sensitive data" "Azure Key Vault"{
					tags "Microsoft Azure - Key Vaults"
				}
			}

			systemAppsBo = softwareSystem "Applications Back-Office" "Internally facing service allowing for management of cases relating to Nationally Significant Infrastructure Projects (NSIPs) within England and Wales"  {
					tags "InternalCollaboratorSystem"

				containerBoFileStorage = container "File storage" {
					tags "Microsoft Azure - Blob Storage"
				}

				containerBoWeb = container "BO Web" "Back-office website used to manage cases" "Node.js, Azure Web App"{
					tags "Microsoft Azure - App Services"
				}

				containerBoApi = container "Web BO API" "" "Node.js, Azure Web App" {
					tags "Microsoft Azure - App Services"
				}

				containerBoAzureSql = container "Database" "Source of truth for cases" "Azure SQL" {
					tags "Database" "Microsoft Azure - Azure SQL"
				}
			}

			systemOdw = softwareSystem "Operational Data Warehouse (ODW)" "Holds all Planning Inspectorate data so that it can be used for internal purposes" {
				tags "Microsoft Azure - Azure Synapse Analytics" "InternalCollaboratorSystem"
			}

			group "Legacy"{
				systemHorizon = softwareSystem "Horizon" "Legacy back office system for managing planning applications and appeals"{
					tags "LegacySystem"
				}

				systemNiDatabase = softwareSystem "NI Database" "Persistant storage for legacy NI website content" "MySQL" {
					tags "LegacySystem" "Database"
				}
			}
		}

		systemGovUk = softwareSystem "GOV.UK"{
			tags "ExternalSystem"
			containerGovNotify = container "GOV Notify" "UK government messaging platform for sending emails, text and letters to users"
		}

		##################################################################################
		# Releationships
		userPublicIndividual -> containerFoWeb "Finds projects, registers for interest, and makes submissions", "HTTPS, HTML"
		userMemberOfOrg -> containerFoWeb "Finds projects, registers for interest, and makes submissions", "HTTPS, HTML"
		userAgent -> containerFoWeb "Finds projects, registers for interest, and makes submissions", "HTTPS, HTML"
		userCaseWorker -> systemAppsBo "Manages cases through" "HTTPS, HTML, Active Directory Auth"

		# Back-office
		systemAppsBo -> systemOdw "Broadcasts message when entities change" "Azure Service Bus via topic subscriptions" "ServiceBus"
		containerBoWeb -> containerBoApi "Renders page, gets and posts data using" "HTTPS, JSON"
		containerBoApi -> containerBoAzureSql "Reads and writes case data to"
		systemAppsBo -> systemAppsFo "Broadcasts message when entities change" "Azure Service Bus via topic subscriptions" "ServiceBus"

		containerBoApi -> containerFunctionAppAdvice "Broadcasts message on Advice changes" "Azure Service via topic s51-advice" "ServiceBus"
		containerBoApi -> containerFunctionAppAdviceUnpublish "Broadcasts message on Advice Unpublish changes" "Azure Service via topic s51-advice" "ServiceBus"
		containerBoApi -> containerFunctionAppDocumentMetadata "Broadcasts message on Document Metadata changes" "Azure Service via topic nsip-document" "ServiceBus"
		containerBoApi -> containerFunctionAppDocumentMetadataUnpublish "Broadcasts message on Document Metadata Unpublish changes" "Azure Service via topic nsip-document" "ServiceBus"
		containerBoApi -> containerFunctionAppExamTimeTable "Broadcasts message on Exam Time Table changes" "Azure Service via topic nsip-exam-timetable" "ServiceBus"
		containerBoApi -> containerFunctionAppExamTimeTableUnpublish "Broadcasts message on Exam Time Table Unpublish changes" "Azure Service via topic nsip-exam-timetable" "ServiceBus"
		containerBoApi -> containerFunctionAppProjects "Broadcasts message on Project changes" "Azure Service via topic nsip-project" "ServiceBus"
		containerBoApi -> containerFunctionAppProjectsUnpublish "Broadcasts message on Project Unpublish changes" "Azure Service via topic nsip-project" "ServiceBus"
		containerBoApi -> containerFunctionAppProjectUpdates "Broadcasts message on Project Update changes" "Azure Service via topic nsip-project-update" "ServiceBus"
		containerBoApi -> containerFunctionAppRepresentations "Broadcasts message on Representation changes" "Azure Service via topic nsip-representation" "ServiceBus"
		containerBoApi -> containerFunctionAppRepresentationUpdate "Broadcasts message on Representation Update changes" "Azure Service via topic nsip-representation" "ServiceBus"
		containerBoApi -> containerFunctionAppRepresentationsUnpublish "Broadcasts message on Representation Unpublish changes" "Azure Service via topic nsip-representation" "ServiceBus"
		containerBoApi -> containerFunctionAppServiceUsers "Broadcasts message on Service User changes" "Azure Service via topic nsip-service-user" "ServiceBus"
		containerBoApi -> containerFunctionAppServiceUsersUnpublish "Broadcasts message on Service User Unpublish changes" "Azure Service via topic nsip-service-user" "ServiceBus"

		# Front-office
		containerFunctionAppAdvice -> containerAzureSql "Consumes message body to Advice table"
		containerFunctionAppAdviceUnpublish -> containerAzureSql "Deletes from Advice table"
		containerFunctionAppDocumentMetadata -> containerAzureSql "Consumes message body to Document Metadata table"
		containerFunctionAppDocumentMetadataUnpublish -> containerAzureSql "Deletes from Document Metadata table"
		containerFunctionAppExamTimeTable -> containerAzureSql "Consumes message body to Exam Time Table table"
		containerFunctionAppExamTimeTableUnpublish -> containerAzureSql "Deletes from Exam Time Table table"
		containerFunctionAppProjects -> containerAzureSql "Consumes message body to Project table"
		containerFunctionAppProjectsUnpublish -> containerAzureSql "Deletes from Project table"
		containerFunctionAppProjectUpdates -> containerAzureSql "Consumes message body to Project Update table"
		containerFunctionAppRepresentations -> containerAzureSql "Consumes message body to Representation table"
		containerFunctionAppRepresentationUpdate -> containerAzureSql "Consumes message body to Representation Update table"
		containerFunctionAppRepresentationsUnpublish -> containerAzureSql "Deletes from Representation table"
		containerFunctionAppServiceUsers -> containerAzureSql "Consumes message body to Service User table"
		containerFunctionAppServiceUsersUnpublish -> containerAzureSql "Deletes from Service User table"


		containerFoWeb -> containerRedis "Maintains session state and caches data from"
		containerFoWeb -> containerFoKeyVault "Retrieves secrets from"
		containerFoWeb -> containerFoApi "renders pages, gets and posts data using" "HTTPS, JSON"

		containerFoApi -> containerAzureSql "Read only access to"
		containerFoApi -> containerGovNotify "Sends notification emails through" "HTTPS, JSON"
		containerFoApi -> systemNiDatabase "Reads and writes legacy case data from", "TCP, SQL"
		containerFoApi -> containerFoKeyVault "Retrieves secrets from"
		containerFoApi -> containerBoFileStorage "Sends file for submission" "HTTPS"


		containerBoFileStorage -> containerFoApi "Reads published documents files"
		# Misc
		systemNiDatabase -> systemHorizon "Extracts project data including documents and interested party comments (representations)"

		##################################################################################
		# Deployment environments
		# https://docs.structurizr.com/dsl/cookbook/deployment-groups/
	}

	views {

		properties {
			"structurizr.sort" "created"
		}

		# System Landscape
		systemLandscape "SystemLandscape" {
			include *
			autoLayout lr
			title "System Landscape"
		}

		# Front Office
		systemContext systemAppsFo "ApplicationsFOContext" {
			include *
			autoLayout lr
			title "Applications Front-Office Context"
		}

		container systemAppsFo "ApplicationsFOContainer" {
			include *
		  exclude element.tag==FunctionApp
			autoLayout lr
			title "Applications Front-Office Container"
			description "Shows the containers within the Applications Front-Office system. Go to the next view to see the rest."
		}

		container systemAppsFo "ApplicationsFOFunctionApps" {
				include element.tag==FunctionApp
				include containerAzureSql
				include containerBoApi
        autoLayout tb
				title "Applications Front-Office Function Apps"
				description "Shows the function apps within the Applications Front-Office system - these are responsible for consuming messages from the Service Bus and updating the Azure SQL database."
		}

	# Back Office
		systemContext systemAppsBo 	"ApplicationsBOContext" {
			include *
			autoLayout lr
			title "Applications Back-Office Context"
		}

		container systemAppsBo "ApplicationsBOContainer" {
			include *
			autoLayout lr
			title "Applications Back-Office Container"
		}

	 # Operational Data Warehouse
	 	systemContext systemOdw "OperationalDataWarehouseContext" {
			include *
			autoLayout lr
			title "Operational Data Warehouse Context"
		}


		# Azure icons only
		theme default
		theme https://static.structurizr.com/themes/microsoft-azure-2023.01.24/icons.json

		styles {

			element Database {
				shape Cylinder
			}

			element "Person" {
				shape Person
			}

			element ExternalSystem {
				background #AAAAAA
			}

			element LegacySystem {
				background #CCCCCC
			}

			element InternalCollaboratorSystem {
				background #888888
			}

			relationship ServiceBus {
					style dotted
			}
		}
	}
}
