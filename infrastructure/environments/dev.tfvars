environment = "dev"

front_door_config = {
  name        = "pins-fd-common-tooling"
  rg          = "pins-rg-common-tooling"
  ep_name     = "pins-fde-applications"
  use_tooling = true
}

web_app_config = {
  name = "pins-app-applications-service-applications-wfe-dev-ukw-001"
  rg   = "pins-rg-applications-service-dev-ukw-001"
}

waf_rate_limits = {
  enabled             = true
  duration_in_minutes = 5
  threshold           = 1500
}

web_domain = "applications-service-dev.planninginspectorate.gov.uk"
