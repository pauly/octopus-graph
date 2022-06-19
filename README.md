# octopus-graph

A bit hacky to try and avoid too many dependencies, I might clean this up.

1. See https://octopus.energy/dashboard/developer/ to get your key etc
2. `curl -u "your-key-here:" "https://api.octopus.energy/v1/electricity-meter-points/your-mpan/meters/your-serial-number/consumption/?period_from=2022-06-12T00:00:00Z" > ./data/electricity_this_week.json
3. `./scripts/octopus.js > images/octopus.svg # it's just html`

![Sample octopus energy graph](images/octopus.svg)
