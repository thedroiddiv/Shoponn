# Shoponn

### Required environment variables
<ul>
<li>NODE_ENVIRONMENT=[production or development]</li>
<li>SECRET_KEY=[secretkey]</li>
<li>DATABASE_URL=[mongodb://localhost:27017/test]</li>
<li>BRAINTREE_PUBLIC_KEY=[************]</li>
<li>BRAINTREE_PRIVATE_KEY=[***********]</li>
<li>BRAINTREE_MERCHANT_ID=[***********]</li>
</ul>


### To start the project in development mode
<ol>
<li>inside root package, run</li>
<li>"npm start dev"</li>
<li>move to cliend package, "cd client/", then run</li>
<li>"npm start"</li>
</ol>

### To start the project in production mode
<ol>
<li>make sure that NODE_ENVIRONMENT is set to production in .env file</li>
<li>inside root package, run</li>
<li>"npm run prod"</li>
<li>project will be available to run at localhost</li>
</ol>