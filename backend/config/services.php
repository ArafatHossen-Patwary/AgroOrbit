<?php

return [
    'postmark' => [
        'key' => env('POSTMARK_API_KEY'),
    ],
    'resend' => [
        'key' => env('RESEND_API_KEY'),
    ],
    'ses' => [
        'key' => env('AWS_ACCESS_KEY_ID'),
        'secret' => env('AWS_SECRET_ACCESS_KEY'),
        'region' => env('AWS_DEFAULT_REGION', 'us-east-1'),
    ],
    'slack' => [
        'notifications' => [
            'bot_user_oauth_token' => env('SLACK_BOT_USER_OAUTH_TOKEN'),
            'channel' => env('SLACK_BOT_USER_DEFAULT_CHANNEL'),
        ],
    ],
    'nasa' => [
        'power' => [
            'base_url' => env('NASA_POWER_BASE_URL', 'https://power.larc.nasa.gov/api'),
            'timeout' => env('NASA_POWER_TIMEOUT', 20),
            'community' => env('NASA_POWER_COMMUNITY', 'ag'),
            // NASA POWER Daily Point variables: mm/day, °C, kWh/m²/day.
            'default_variables' => ['PRECTOTCORR', 'T2M', 'ALLSKY_SFC_SW_DWN'],
        ],
    ],
];
