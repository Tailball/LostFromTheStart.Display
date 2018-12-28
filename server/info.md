#Request longterm access token (60 days)

**Connect to:**

    GET /oauth/access_token?  
        grant_type=fb_exchange_token&           
        client_id={app-id}&
        client_secret={app-secret}&
        fb_exchange_token={short-lived-token}

**Connect on:**

    https://graph.facebook.com/

**Short-lived token:**

    Get a new one on developers.facebook.com > apps > graph explorer > page access token

**App-id and app-secret**

    Find em on developers.facebook.com > apps > settings > basic