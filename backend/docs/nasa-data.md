# NASA Earth observation API

AgroOrbit currently integrates the public NASA POWER Daily Point API through Laravel only. React never receives or stores NASA configuration.

Endpoint:

```text
GET /api/nasa/observations
```

Required query parameters:

- `latitude`: -90 to 90
- `longitude`: -180 to 180

Optional query parameters:

- `start_date`: `YYYY-MM-DD`, defaults to seven days ago
- `end_date`: `YYYY-MM-DD`, defaults to yesterday
- `variables`: comma-separated NASA POWER parameters

The default variables are:

- `PRECTOTCORR`: bias-corrected precipitation, `mm/day`
- `T2M`: air temperature at 2 meters, `deg C`
- `ALLSKY_SFC_SW_DWN`: all-sky surface shortwave downward irradiance, `kWh/m^2/day`

Laravel calls:

```text
https://power.larc.nasa.gov/api/temporal/daily/point/{latitude}/{longitude}
```

with `community=ag`, `format=json`, and the requested date range. Successful observations are persisted in `nasa_observations`. If NASA POWER is unavailable, only previously persisted observations are returned and the response is explicitly marked `status: cached`, `cached: true`, and each record contains cached metadata. If neither live nor cached data exists, the API returns `503`; it never invents values.

Configure the public endpoint and timeout in `backend/.env`:

```dotenv
NASA_POWER_BASE_URL=https://power.larc.nasa.gov/api
NASA_POWER_TIMEOUT=20
NASA_POWER_COMMUNITY=ag
```
