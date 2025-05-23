environment = "prod"

front_door_config = {
  name        = "pins-fd-common-prod"
  rg          = "pins-rg-common-prod"
  ep_name     = "pins-fde-applications-prod"
  use_tooling = false
}

web_app_config = {
  name = "pins-app-applications-service-applications-wfe-prod-ukw-001"
  rg   = "pins-rg-applications-service-prod-ukw-001"
}

waf_rate_limits = {
  enabled             = true
  duration_in_minutes = 5
  threshold           = 1500
}

web_domain = "national-infrastructure-consenting.planninginspectorate.gov.uk"
